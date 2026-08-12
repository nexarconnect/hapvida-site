/**
 * sync-corretoras.js
 * Grava no Supabase os dados de monitoramento de corretoras concorrentes
 * (preço de leads, anúncios, ímãs de leads, reputação, novidades).
 *
 * Não busca os dados sozinho — a coleta usa a ferramenta MCP
 * `monitor-corretoras`, disponível só dentro de uma sessão do Claude. Este
 * script só faz o upsert de um JSON já coletado.
 *
 * Uso:
 *   node scripts/sync-corretoras.js caminho/para/dados.json
 *
 * Formato esperado do JSON (array de objetos, um por corretora):
 *   [{ "corretora": "webplan", "preco": "...", "anuncios": "...",
 *      "imas": "...", "reputacao": "...", "novidades": "..." }, ...]
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_service_role;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('As variáveis VITE_SUPABASE_URL e SUPABASE_service_role são obrigatórias (defina-as no ambiente antes de rodar o script).');
}

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error('Uso: node scripts/sync-corretoras.js caminho/para/dados.json');
}

const rows = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
if (!Array.isArray(rows) || rows.length === 0) {
  throw new Error('O JSON precisa ser um array não vazio de corretoras.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const payload = rows.map((r) => ({
  corretora: String(r.corretora || '').trim().toLowerCase(),
  preco: r.preco ?? null,
  anuncios: r.anuncios ?? null,
  imas: r.imas ?? null,
  reputacao: r.reputacao ?? null,
  novidades: r.novidades ?? null,
  updated_at: new Date().toISOString(),
})).filter((r) => r.corretora);

const { error } = await supabase
  .from('corretoras_monitoramento')
  .upsert(payload, { onConflict: 'corretora' });

if (error) {
  console.error('Erro ao gravar corretoras_monitoramento:', error);
  process.exit(1);
}

console.log(`OK — ${payload.length} corretoras atualizadas em corretoras_monitoramento.`);
