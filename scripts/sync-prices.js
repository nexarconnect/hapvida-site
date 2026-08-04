/**
 * sync-prices.js
 * Lê PDFs de tabela de preços do Google Drive (pasta Plano Individual),
 * parseia os valores por plano/cidade e atualiza o Supabase pricing_table.
 *
 * Uso:
 *   node scripts/sync-prices.js          — sincroniza tudo
 *   node scripts/sync-prices.js --dry    — simula sem gravar
 *   node scripts/sync-prices.js --force  — força reprocessar mesmo sem mudança
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { createRequire } from 'module';

// pdf-parse v1 (via n8n) — compatível com CJS require no contexto ESM
const _require = createRequire(import.meta.url);
const pdfParse  = _require('/usr/local/lib/node_modules/n8n/node_modules/pdf-parse/index.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Configuração ──────────────────────────────────────────────────────────────

const SUPABASE_URL  = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY  = process.env.SUPABASE_service_role;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('As variáveis VITE_SUPABASE_URL e SUPABASE_service_role são obrigatórias (defina-as no ambiente antes de rodar o script).');
}

const DRIVE_FOLDER_ID  = '1_F9UvrdcH3tmj8YHM6s9PfKxrMtHcLPA'; // Plano Individual
const CACHE_DIR        = path.join(__dirname, 'drive-cache');
const STATE_FILE       = path.join(__dirname, 'drive-cache', '.sync-state.json');

// Arquivos conhecidos da pasta Plano Individual
// Última descoberta: 2026-08-04 (vigência 01/07/2026 a 30/09/2026)
// Nota: cada cidade passou a ter 2 PDFs no Drive; o com sufixo "- 2" é só a
// página de reajuste por faixa etária (verso), sem tabela de preços — ignorado.
const KNOWN_FILES = [
  { id: '1Tk0IVVIpKIaj3oX_zWTGGFKK7LGi3Drt', city: 'Bauru',               filename: 'Bauru.pdf' },
  { id: '12AsyDB9Y7jOrXcEVlklNitanUQFCta33', city: 'Ribeirão Preto',      filename: 'Ribeirão Preto.pdf' },
  { id: '1ZH_VfXQpxxroNIkXg0IfH0dzxES1EGh3', city: 'Franca',              filename: 'Franca.pdf' },
  { id: '1HPxywY-F-nVQ3Fz-Smp_PhEVM-goGR1v', city: 'São José dos Campos', filename: 'São José dos Campos.pdf' },
  { id: '162fbvUPOdURxsAz0ewb3fz4DF9B800DH', city: 'Sertãozinho',         filename: 'Sertãozinho.pdf' },
  { id: '1ZNiIKLYMneJ-TMeDax21iO7aR9WeC6Zh', city: 'Lins',                filename: 'Lins.pdf' },
  { id: '1Lsjcm7_t7WxYfSauD7TOQbtnx9-svHsp', city: 'Araraquara',         filename: 'Araraquara.pdf' },
  { id: '15pBwLFeA2a1gsmufu6X4qJDBFIvX4dN1', city: 'Limeira',             filename: 'Limeira.pdf' },
  { id: '12QhHmQn_haWAJmEj0SZK8fucspsPzz3O', city: 'Barretos',            filename: 'Barretos.pdf' },
  { id: '1KtEDPHuaH9NiM8KWY6b7bSbVJ9HXJAqe',  city: 'Pirassununga',       filename: 'Pirassununga.pdf' },
  { id: '1ygAh_oUhzXkOkLLwOAYKNtOIc-9j1khs',  city: 'Marília',            filename: 'Marilia.pdf' },
  { id: '1ElD3EZgzORqhSfhqT9hguWzRWZ3MSAdF',  city: 'São Carlos',         filename: 'São Carlos.pdf' },
  { id: '1rblFW33POwzHNVEJJtR3BKeYBJKxhJQF',  city: 'Piracicaba',         filename: 'Piracicaba.pdf' },
];

// Mapeamento: nome no PDF → nome no site/Supabase
const PLAN_MAP = {
  'nosso médico': 'Mix',
  'nosso medico': 'Mix',
  'nosso plano':  'Nosso Plano',
  'pleno':        'Pleno',
};

// Descrições para o Supabase
const PLAN_DESCRIPTIONS = {
  'Mix':       'Rede própria Hapvida com cobertura acessível. Ideal para quem busca economia.',
  'Nosso Plano': 'Melhor custo-benefício com boa rede e atendimento completo. O mais procurado.',
  'Pleno':     'Cobertura mais ampla, mais conforto e liberdade. Ideal para mais segurança.',
};

// ── Utilitários ───────────────────────────────────────────────────────────────

const isDry   = process.argv.includes('--dry');
const isForce = process.argv.includes('--force');

function log(msg)  { console.log(`[sync-prices] ${msg}`); }
function warn(msg) { console.warn(`[sync-prices] ⚠️  ${msg}`); }
function ok(msg)   { console.log(`[sync-prices] ✅ ${msg}`); }

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { processedFiles: {}, lastSync: null }; }
}

function saveState(state) {
  if (!isDry) fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/** Baixa arquivo do Drive para o disco */
function downloadFile(fileId, dest) {
  return new Promise((resolve, reject) => {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const follow = (u) => {
      const mod = u.startsWith('https') ? https : http;
      mod.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return follow(res.headers.location);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} para ${u}`));
        }
        const out = fs.createWriteStream(dest);
        res.pipe(out);
        out.on('finish', resolve);
        out.on('error', reject);
      }).on('error', reject);
    };
    follow(url);
  });
}

/** Extrai texto do PDF usando pdf-parse v1 */
async function extractPdfText(pdfPath) {
  const buf = fs.readFileSync(pdfPath);
  const result = await pdfParse(buf);
  return result.text;
}

// ── Parser de PDF ─────────────────────────────────────────────────────────────

/**
 * Extrai preços por plano a partir do texto bruto do PDF.
 * Retorna: { 'Mix': minPrice, 'Nosso Plano': minPrice, 'Pleno': minPrice }
 *
 * Estratégia:
 *  1. Divide o texto por seções (cada plan tem um bloco separado)
 *  2. Em cada bloco pega as linhas "00 a 18 anos" (faixa mais barata)
 *  3. Extrai todos os valores monetários da linha
 *  4. Filtra valores plausíveis para mensalidade (R$ 80–2000)
 *  5. Pega o menor (= com coparticipação + enfermaria + com desconto dental)
 */
function parsePricePdf(text) {
  const prices = {};

  // Normaliza: remove espaços duplos, tabs etc.
  const normalized = text.replace(/\r\n/g, '\n').replace(/  +/g, ' ');

  // Identifica blocos por nome do plano (título aparece como letras separadas por espaços)
  // Ex: "N O S S O   M É D I C O" ou "NOSSO MÉDICO" ou "NOSSO PLANO" ou "PLENO"
  const planPatterns = [
    { regex: /N[\s.]*O[\s.]*S[\s.]*S[\s.]*O[\s.]*[\s.]*M[\s.]*[EÉ][\s.]*D[\s.]*I[\s.]*C[\s.]*O|NOSSO\s+M[EÉ]DICO/i, planName: 'Mix' },
    { regex: /N[\s.]*O[\s.]*S[\s.]*S[\s.]*O[\s.]*[\s.]*P[\s.]*L[\s.]*A[\s.]*N[\s.]*O|NOSSO\s+PLANO/i,             planName: 'Nosso Plano' },
    { regex: /P[\s.]*L[\s.]*E[\s.]*N[\s.]*O(?!\s+MÉDICO)/i,                                                       planName: 'Pleno' },
  ];

  // Para cada plano, encontra a primeira linha "00 a 18 anos" após a menção do plano
  for (const { regex, planName } of planPatterns) {
    const match = normalized.match(regex);
    if (!match) continue;

    const afterPlan = normalized.slice(match.index);

    // Pega a primeira linha com "00 a 18" nesse trecho
    const lineMatch = afterPlan.match(/00\s+a\s+18\s+anos(.+?)(?=\n|19\s+a\s+23|\d{2}\s+a\s+\d{2})/i);
    if (!lineMatch) continue;

    const priceLine = lineMatch[1];

    // Extrai todos os valores R$ (formato BRL: 1.234,56 ou 234,56)
    const priceValues = [];
    const priceRegex = /(\d{1,3}(?:\.\d{3})*,\d{2})/g;
    let m;
    while ((m = priceRegex.exec(priceLine)) !== null) {
      const val = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
      // Filtra: mensalidade plausível (R$ 80 a R$ 2000)
      if (val >= 80 && val <= 2000) priceValues.push(val);
    }

    if (priceValues.length > 0) {
      prices[planName] = Math.min(...priceValues);
    }
  }

  // Fallback: se não encontrou pelos títulos, usa posição ordinal das linhas "00 a 18"
  if (Object.keys(prices).length === 0) {
    const lines18 = [];
    const regex18 = /00\s+a\s+18\s+anos(.+?)(?=\n|19\s+a\s+23)/gi;
    let m;
    while ((m = regex18.exec(normalized)) !== null) {
      const vals = [];
      const rr = /(\d{1,3}(?:\.\d{3})*,\d{2})/g;
      let mm;
      while ((mm = rr.exec(m[1])) !== null) {
        const v = parseFloat(mm[1].replace(/\./g, '').replace(',', '.'));
        if (v >= 80 && v <= 2000) vals.push(v);
      }
      if (vals.length > 0) lines18.push(Math.min(...vals));
    }

    const planOrder = ['Mix', 'Nosso Plano', 'Pleno'];
    lines18.forEach((v, i) => { if (planOrder[i]) prices[planOrder[i]] = v; });
  }

  return prices;
}

// ── Vigência ──────────────────────────────────────────────────────────────────

/** Extrai vigência do texto do PDF: "Para contratos assinados de 09/04/2026 a 30/06/2026" */
function parseValidityFromText(text) {
  const m = text.match(/(\d{2})\/(\d{2})\/(\d{4})\s+a\s+(\d{2})\/(\d{2})\/(\d{4})/);
  if (m) {
    return {
      valid_from:  `${m[3]}-${m[2]}-${m[1]}`,
      valid_until: `${m[6]}-${m[5]}-${m[4]}`,
    };
  }
  return { valid_from: null, valid_until: null };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  log(`Iniciando sincronização de preços${isDry ? ' (DRY RUN)' : ''}...`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const state = loadState();

  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const allPrices = []; // [{ city, planName, price, valid_from, valid_until, fileId }]

  for (const file of KNOWN_FILES) {
    const localPath = path.join(CACHE_DIR, file.filename);
    const cacheKey  = file.id;

    // Baixa se não existe em cache
    if (!fs.existsSync(localPath)) {
      log(`Baixando ${file.filename}...`);
      try {
        await downloadFile(file.id, localPath);
        ok(`Baixado: ${file.filename}`);
      } catch (e) {
        warn(`Erro ao baixar ${file.filename}: ${e.message}`);
        continue;
      }
    }

    // Verifica se já foi processado (pelo tamanho do arquivo como proxy de mudança)
    const fileStat = fs.statSync(localPath);
    const fileKey  = `${cacheKey}:${fileStat.size}`;

    if (!isForce && state.processedFiles[fileKey]) {
      log(`Sem mudança: ${file.city} — pulando`);
      // Mesmo sem processar de novo, usa os dados salvos em state
      if (state.processedFiles[fileKey].prices) {
        const { prices, valid_from, valid_until } = state.processedFiles[fileKey];
        for (const [planName, price] of Object.entries(prices)) {
          allPrices.push({ city: file.city, planName, price, valid_from, valid_until, fileId: file.id });
        }
      }
      continue;
    }

    // Parseia o PDF
    log(`Parseando ${file.city}...`);
    let text;
    try {
      text = await extractPdfText(localPath);
    } catch (e) {
      warn(`Erro ao extrair texto de ${file.filename}: ${e.message}`);
      continue;
    }

    const validity = parseValidityFromText(text);
    const prices   = parsePricePdf(text);

    if (Object.keys(prices).length === 0) {
      warn(`Nenhum preço encontrado em ${file.filename}`);
      continue;
    }

    log(`  ${file.city}: ${JSON.stringify(prices)}`);

    // Salva no estado para não reprocessar
    state.processedFiles[fileKey] = { prices, ...validity, processedAt: new Date().toISOString() };

    for (const [planName, price] of Object.entries(prices)) {
      allPrices.push({ city: file.city, planName, price, ...validity, fileId: file.id });
    }
  }

  if (allPrices.length === 0) {
    warn('Nenhum preço para atualizar. Verifique os PDFs.');
    return;
  }

  // ── Calcula preços globais (mínimo entre cidades) para o site ──────────────
  const globalMin = {};
  for (const { planName, price } of allPrices) {
    if (!globalMin[planName] || price < globalMin[planName]) {
      globalMin[planName] = price;
    }
  }

  log('\n📊 Resumo de preços mínimos (a partir de):');
  for (const [plan, price] of Object.entries(globalMin)) {
    log(`  ${plan}: R$ ${price.toFixed(2).replace('.', ',')}`);
  }

  // ── Vigência mais recente ──────────────────────────────────────────────────
  const latestValidity = allPrices
    .filter(p => p.valid_from)
    .sort((a, b) => (b.valid_until || '').localeCompare(a.valid_until || ''))[0] || {};

  // ── Atualiza Supabase ─────────────────────────────────────────────────────
  if (isDry) {
    log('\n[DRY RUN] Dados que seriam gravados no Supabase:');
    for (const [planName, price] of Object.entries(globalMin)) {
      log(`  UPSERT pricing_table — plan_name="${planName}" price=${price} valid_until=${latestValidity.valid_until}`);
    }
    log('\nPor cidade:');
    allPrices.forEach(p => log(`  ${p.city} | ${p.planName} | R$ ${p.price.toFixed(2)}`));
    return;
  }

  // 1. Remove registros antigos (sem cidade) para reinserir limpos
  const { error: delError } = await supabase
    .from('pricing_table')
    .delete()
    .is('city', null);

  if (delError) warn(`Erro ao limpar registros antigos: ${delError.message}`);

  // 2. Insere registros globais (sem cidade) para display no site
  const globalRows = Object.entries(globalMin).map(([planName, price]) => ({
    plan_name:   planName,
    price,
    city:        null,
    age_range:   '0-18',
    description: PLAN_DESCRIPTIONS[planName] || null,
    updated_at:  new Date().toISOString(),
  }));

  const { error: insError } = await supabase
    .from('pricing_table')
    .insert(globalRows);

  if (insError) {
    warn(`Erro ao inserir preços globais: ${insError.message}`);
  } else {
    ok(`Preços globais atualizados (${globalRows.length} planos)`);
  }

  // 3. Upsert por cidade (para futuro filtro por cidade)
  for (const { city, planName, price, valid_from, valid_until } of allPrices) {
    const { error } = await supabase
      .from('pricing_table')
      .upsert(
        {
          plan_name:   planName,
          price,
          city,
          age_range:   '0-18',
          description: PLAN_DESCRIPTIONS[planName] || null,
          updated_at:  new Date().toISOString(),
        },
        { onConflict: 'plan_name,city', ignoreDuplicates: false }
      );

    if (error && !error.message.includes('constraint')) {
      warn(`Erro ao upsert ${city}/${planName}: ${error.message}`);
    }
  }

  ok(`Preços por cidade atualizados (${allPrices.length} registros)`);

  // Salva estado
  state.lastSync = new Date().toISOString();
  saveState(state);

  log(`\n✅ Sincronização concluída: ${new Date().toLocaleString('pt-BR')}`);
  log(`   Próxima verificação automática: diariamente às 07:00`);
}

main().catch(e => {
  console.error('[sync-prices] ERRO FATAL:', e);
  process.exit(1);
});
