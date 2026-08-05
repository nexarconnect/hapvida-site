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
// Versão da lógica de parsing. Incrementar SEMPRE que parsePricePdf/validatePrices
// mudarem: entra na chave do cache e força reprocessar todos os PDFs, senão os
// preços antigos (possivelmente errados) continuariam sendo servidos do estado.
const PARSER_VERSION   = 4;

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

  // ── Identificação por CÓD. INTERNO — fonte de verdade ──────────────────────
  //
  // ATENÇÃO (verificado em 2026-08-04): o laço por título acima NUNCA extrai
  // valor em nenhuma das 13 cidades. O pdf-parse emite os títulos dos planos
  // DEPOIS das tabelas (em Bauru: tabelas nos índices 182/1419/2881, títulos só
  // em 3879+), então `slice(índiceDoTítulo)` nunca alcança uma tabela.
  //
  // A versão anterior caía num fallback que rotulava pela ORDEM das tabelas, e
  // errava feio: em São Carlos a 2ª tabela virava "Nosso Plano" R$ 339,85
  // quando o CÓD. INTERNO mostra que é o Pleno.
  //
  // Agora cada tabela é identificada pelo CÓD. INTERNO do cabeçalho — a
  // identidade real do produto. Tabela sem assinatura conhecida é DESCARTADA
  // com aviso, nunca adivinhada.
  const byCode  = {};
  const unknown = [];
  for (const table of extractPriceTables(normalized)) {
    const plan = identifyPlanByCodes(table.codes);
    if (!plan) { unknown.push(table); continue; }
    // Entre variantes do mesmo plano fica o menor (copart + enfermaria).
    if (byCode[plan] === undefined || table.min < byCode[plan]) byCode[plan] = table.min;
  }

  return { prices: byCode, unknown, ...validatePrices(byCode) };
}

/**
 * Assinaturas de CÓD. INTERNO por plano — verificadas nas 13 cidades (2026-08-04).
 * Basta UM código da lista aparecer no cabeçalho da tabela.
 *
 * NÃO usar o código 11412 como discriminador: ele aparece em Mix, Nosso Plano
 * E no produto desconhecido — é compartilhado (provavelmente item avulso).
 */
const PLAN_SIGNATURES = [
  // Pleno é idêntico em todas as cidades. Pirassununga traz só a cauda da lista.
  { plan: 'Pleno',       codes: ['21092', '11827'] },
  // Nosso Plano varia por região: 21087 (6 cidades), 21129 (Limeira), 21135 (SJC).
  { plan: 'Nosso Plano', codes: ['21087', '21129', '21135'] },
  // Integrado: só em Barretos, Marília, Piracicaba, Pirassununga e São Carlos.
  // Essas 5 cidades vendem Integrado + Pleno (não têm Mix nem Nosso Plano).
  // Confirmado pela legenda "PLANO / INTEGRADOPLENO" no PDF e pela linha
  // TX. ADESÃO com 2 valores (contra 3 nas cidades de três planos).
  { plan: 'Integrado',   codes: ['21096', '11832'] },
];

/**
 * Planos que o site exibe. ESPELHA a whitelist de PriceTablesSection.jsx
 * (`allowedPlans`) — se mudar lá, mude aqui.
 *
 * Integrado fica de fora de propósito: é gravado por cidade para consulta e
 * uso futuro, mas não entra nas linhas globais (city = null) que alimentam os
 * cards de preço da home.
 */
const DISPLAY_PLANS = ['Mix', 'Nosso Plano', 'Pleno'];

/** Mix usa código próprio de cada cidade, sempre na faixa 36000–38999. */
const MIX_CODE_MIN = 36000;
const MIX_CODE_MAX = 38999;

/** @returns {string|null} nome do plano, ou null se não identificado */
function identifyPlanByCodes(codes) {
  for (const { plan, codes: sig } of PLAN_SIGNATURES) {
    if (codes.some(c => sig.includes(c))) return plan;
  }

  if (codes.some(c => { const n = parseInt(c, 10); return n >= MIX_CODE_MIN && n <= MIX_CODE_MAX; })) {
    return 'Mix';
  }
  return null;
}

/**
 * Extrai as tabelas de preço do texto: para cada linha "00 a 18 anos" (faixa
 * mais barata) pega os CÓD. INTERNO do cabeçalho logo acima e o menor valor.
 */
function extractPriceTables(normalized) {
  const tables = [];
  for (const m of normalized.matchAll(/00\s+a\s+18\s+anos/gi)) {
    const header = normalized.slice(Math.max(0, m.index - 300), m.index);
    const codMatch = header.match(/C[ÓO]D\.?\s*INTERNO\s*([\d\s]+)/i);
    // Os códigos vêm colados no PDF ("3860038598..."), sempre de 5 dígitos.
    const codes = codMatch ? (codMatch[1].replace(/\s/g, '').match(/\d{5}/g) || []) : [];

    const line = normalized.slice(m.index, m.index + 220).split('\n')[0];
    const vals = [...line.matchAll(/(\d{1,3}(?:\.\d{3})*,\d{2})/g)]
      .map(x => parseFloat(x[1].replace(/\./g, '').replace(',', '.')))
      .filter(v => v >= 80 && v <= 2000); // mensalidade plausível

    if (vals.length > 0) tables.push({ codes, min: Math.min(...vals), count: vals.length });
  }
  return tables;
}

/**
 * Guarda-corpo do parser — decide se dá para CONFIAR nos rótulos de plano.
 *
 * A identificação em si é feita por CÓD. INTERNO em identifyPlanByCodes().
 * Esta função é a checagem de sanidade do resultado: preferimos não publicar
 * preço a publicar preço errado.
 *
 * @returns {{trusted: boolean, reason: string|null}}
 */
function validatePrices(prices) {
  const found = Object.keys(prices);
  if (found.length === 0) {
    return { trusted: false, reason: 'nenhuma tabela do PDF pôde ser identificada por CÓD. INTERNO' };
  }

  // Gate — o preço tem de subir na ordem dos planos.
  // Rede de segurança: se uma assinatura de código for atribuída ao plano
  // errado no futuro, os valores saem fora de ordem e a cidade é barrada.
  // Só planos presentes são comparados; Mix e Integrado nunca coexistem
  // (são linhas de produto de cidades diferentes).
  const ORDER = ['Mix', 'Integrado', 'Nosso Plano', 'Pleno'];
  const seq = ORDER.filter(p => prices[p] !== undefined).map(p => ({ plan: p, v: prices[p] }));
  for (let i = 1; i < seq.length; i++) {
    if (seq[i].v <= seq[i - 1].v) {
      return {
        trusted: false,
        reason: `preços fora de ordem (${seq[i - 1].plan} R$ ${seq[i - 1].v} >= ${seq[i].plan} R$ ${seq[i].v})`,
      };
    }
  }

  return { trusted: true, reason: null };
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
  const skipped   = []; // [{ city, reason, discarded }] — cidades barradas pelos gates

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
    const fileKey  = `${cacheKey}:${fileStat.size}:v${PARSER_VERSION}`;

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
    const { prices, trusted, reason, unknown } = parsePricePdf(text);

    if (!trusted) {
      warn(`IGNORANDO ${file.city}: ${reason}`);
      warn(`  valores descartados: ${JSON.stringify(prices)} — confira o PDF à mão`);
      skipped.push({ city: file.city, reason, discarded: prices });
      continue;
    }

    // Tabelas que existem no PDF mas não casaram com nenhum plano conhecido.
    // Não bloqueiam a cidade (os planos identificados seguem válidos), mas
    // precisam aparecer: é assim que um produto novo vira visível.
    for (const t of unknown) {
      warn(`  ${file.city}: tabela não identificada ignorada — CÓD. INTERNO [${t.codes.join(' ')}], menor valor R$ ${t.min.toFixed(2)}`);
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
  // Só planos exibidos entram aqui: estas linhas (city = null) são as que o
  // site lê para montar os cards. Integrado é gravado por cidade, mas não vira
  // card na home — ver DISPLAY_PLANS.
  const globalMin = {};
  for (const { planName, price } of allPrices) {
    if (!DISPLAY_PLANS.includes(planName)) continue;
    if (!globalMin[planName] || price < globalMin[planName]) {
      globalMin[planName] = price;
    }
  }

  log('\n📊 Resumo de preços mínimos (a partir de):');
  for (const [plan, price] of Object.entries(globalMin)) {
    log(`  ${plan}: R$ ${price.toFixed(2).replace('.', ',')}`);
  }

  // ── Cidades barradas pelos gates de confiança ──────────────────────────────
  // Ficam FORA de allPrices, portanto fora do banco e fora do mínimo global —
  // um preço mal rotulado não pode virar o "a partir de" exibido no site.
  if (skipped.length > 0) {
    warn(`\n⚠️  ${skipped.length} cidade(s) NÃO serão gravadas (rótulo de plano não confiável):`);
    for (const s of skipped) {
      warn(`  • ${s.city}: ${s.reason}`);
    }
    warn('  Corrija o PDF ou o parser e rode de novo. Os preços destas cidades');
    warn('  permanecem com o valor anterior no banco (nada é apagado por engano).');
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
  //
  // Requer índice único em (plan_name, city), que a tabela pode não ter:
  //   CREATE UNIQUE INDEX pricing_table_plan_city_uniq
  //     ON pricing_table (plan_name, city);
  // Sem ele o onConflict abaixo falha em TODAS as linhas.
  //
  // A versão anterior engolia justamente esse erro (`!message.includes('constraint')`)
  // e ainda assim declarava "Preços por cidade atualizados (N registros)" — ou
  // seja, reportava sucesso de trabalho que não fez. Agora contamos de verdade.
  let cityOk = 0;
  const cityErrors = [];
  for (const { city, planName, price } of allPrices) {
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

    if (error) cityErrors.push({ city, planName, message: error.message });
    else cityOk++;
  }

  if (cityOk > 0) ok(`Preços por cidade atualizados (${cityOk}/${allPrices.length} registros)`);

  if (cityErrors.length > 0) {
    warn(`FALHA em ${cityErrors.length}/${allPrices.length} upserts por cidade.`);
    const faltaConstraint = cityErrors.some(e =>
      /constraint|conflict|unique|exclusion/i.test(e.message));
    if (faltaConstraint) {
      warn('  Causa provável: falta o índice único (plan_name, city). Rode no Supabase:');
      warn('    CREATE UNIQUE INDEX pricing_table_plan_city_uniq ON pricing_table (plan_name, city);');
    }
    // Mostra alguns exemplos reais em vez de só o total.
    for (const e of cityErrors.slice(0, 3)) {
      warn(`  • ${e.city}/${e.planName}: ${e.message}`);
    }
    if (cityErrors.length > 3) warn(`  ... e mais ${cityErrors.length - 3}`);
    warn('  Os preços GLOBAIS (usados pelo site hoje) foram gravados normalmente.');
  }

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
