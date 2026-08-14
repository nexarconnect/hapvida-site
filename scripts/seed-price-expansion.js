/**
 * seed-price-expansion.js
 * Carga única (one-off) da expansão de 2026-08-13: grava o preço de entrada
 * (plano Mix) das cidades novas listadas em
 * scripts/data/cidades-expansao-2026-08.json em pricing_table.
 *
 * Só grava o plano Mix — Nosso Plano e Pleno ficam sem preço até termos o
 * PDF tarifário oficial de cada cidade (o CSV de origem só trouxe um valor
 * de entrada por cidade, não a tabela completa). PlanoPorCidade.jsx já lida
 * bem com planos sem preço, então isso não quebra a página.
 *
 * Uso:
 *   node scripts/seed-price-expansion.js          — grava
 *   node scripts/seed-price-expansion.js --dry    — só mostra o que seria gravado
 *
 * Requer VITE_SUPABASE_URL e SUPABASE_service_role no ambiente (mesmo padrão
 * de scripts/sync-prices.js e scripts/seed-campinas.mjs). Rode a partir da
 * raiz do projeto:
 *   export $(cat .env.local | grep -v '^#' | xargs) && node scripts/seed-price-expansion.js
 *
 * Pré-requisito: rodar no SQL Editor do Supabase antes de usar este script
 *   CREATE UNIQUE INDEX IF NOT EXISTS pricing_table_plan_city_uniq ON pricing_table (plan_name, city);
 * (upserts por cidade falham silenciosamente sem esse índice, já documentado
 * em memória do projeto).
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_service_role;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    'As variáveis VITE_SUPABASE_URL e SUPABASE_service_role são obrigatórias (defina-as no ambiente antes de rodar o script).'
  );
}

const DRY_RUN = process.argv.includes('--dry');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const cities = JSON.parse(
  readFileSync(path.join(__dirname, 'data', 'cidades-expansao-2026-08.json'), 'utf-8')
);

const rows = cities.map((c) => ({
  plan_name: 'Mix',
  price: c.price,
  city: c.name,
  age_range: '0-18',
  description: 'Rede própria e credenciada Hapvida. Ideal para quem busca economia.',
}));

async function main() {
  console.log(`pricing_table a inserir (${rows.length} cidades):`);
  console.table(rows.map(({ description, ...rest }) => rest));

  if (DRY_RUN) {
    console.log('\n--dry: nada foi gravado.');
    return;
  }

  for (const row of rows) {
    const { error } = await supabase
      .from('pricing_table')
      .upsert(row, { onConflict: 'plan_name,city' });
    if (error) {
      console.error(`✗ ${row.city}: ${error.message}`);
      continue;
    }
    console.log(`✓ ${row.city}: R$ ${row.price}`);
  }

  console.log('\nConcluído. Confira o resultado com uma leitura direta do Supabase antes de considerar publicado.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
