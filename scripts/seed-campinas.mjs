/**
 * seed-campinas.mjs
 * Carga única (one-off) de Campinas: 3 linhas em pricing_table (Mix/Nosso
 * Plano/Pleno, valores idênticos aos de Ribeirão Preto, confirmado com a
 * Amanda que Campinas segue a mesma Tabela 2 SP/BH) e 6 linhas em
 * network_units (unidades confirmadas via Google Maps + www2.hapvida.com.br
 * / gndi.com.br / CNES-DATASUS, não só a página do concorrente que originou
 * a lista).
 *
 * Uso:
 *   node scripts/seed-campinas.mjs          — grava
 *   node scripts/seed-campinas.mjs --dry    — só mostra o que seria gravado
 *
 * Requer VITE_SUPABASE_URL e SUPABASE_service_role no ambiente (mesmo padrão
 * de sync-prices.js). Rode a partir da raiz do projeto:
 *   export $(cat .env.local | grep -v '^#' | xargs) && node scripts/seed-campinas.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_service_role;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    'As variáveis VITE_SUPABASE_URL e SUPABASE_service_role são obrigatórias (defina-as no ambiente antes de rodar o script).'
  );
}

const DRY_RUN = process.argv.includes('--dry');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CITY = 'Campinas';

const PRICING = [
  {
    plan_name: 'Mix',
    price: 157.29,
    city: CITY,
    age_range: '0-18',
    description: 'Rede própria Hapvida com cobertura acessível. Ideal para quem busca economia.',
  },
  {
    plan_name: 'Nosso Plano',
    price: 185.05,
    city: CITY,
    age_range: '0-18',
    description: 'Melhor custo-benefício com boa rede e atendimento completo. O mais procurado.',
  },
  {
    plan_name: 'Pleno',
    price: 248.88,
    city: CITY,
    age_range: '0-18',
    description: 'Cobertura mais ampla, mais conforto e liberdade. Ideal para mais segurança.',
  },
];

const UNITS = [
  { name: 'Hospital Renascença', address: 'Av. Barão de Itapura, 1444 - Jardim Guanabara', display_order: 0 },
  { name: 'Centro Clínico Andrade Neves I', address: 'R. Marechal Deodoro, 134 - Centro', display_order: 1 },
  { name: 'Centro Clínico Andrade Neves II', address: 'Av. Andrade Neves, 1300 - Centro', display_order: 2 },
  { name: 'Centro Clínico Itapura', address: 'Av. Barão de Itapura, 2642 - Jardim Guanabara', display_order: 3 },
  { name: 'NotreLabs Campinas', address: 'Av. Prefeito Passos, 295 - Jardim Guanabara', display_order: 4 },
  { name: 'Qualivida Campinas', address: 'Av. Barão de Itapura, 1356 - Vila Itapura', display_order: 5 },
].map((u) => ({
  ...u,
  city: CITY,
  map_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${u.name} ${CITY}`)}`,
  is_active: true,
}));

async function main() {
  const { data: existingPricing } = await supabase.from('pricing_table').select('id').eq('city', CITY);
  const { data: existingUnits } = await supabase.from('network_units').select('id').eq('city', CITY);

  if ((existingPricing && existingPricing.length) || (existingUnits && existingUnits.length)) {
    console.error(
      `Já existem linhas para ${CITY} (pricing: ${existingPricing?.length ?? 0}, units: ${existingUnits?.length ?? 0}). Abortando para não duplicar — apague manualmente antes de rodar de novo, se for intencional.`
    );
    process.exit(1);
  }

  console.log(`pricing_table a inserir (${PRICING.length}):`);
  console.table(PRICING.map(({ description, ...rest }) => rest));
  console.log(`network_units a inserir (${UNITS.length}):`);
  console.table(UNITS.map(({ map_link, ...rest }) => rest));

  if (DRY_RUN) {
    console.log('\n--dry: nada foi gravado.');
    return;
  }

  const { data: p, error: pe } = await supabase.from('pricing_table').insert(PRICING).select();
  if (pe) throw pe;
  console.log(`✓ pricing_table: ${p.length} linhas gravadas`);

  const { data: u, error: ue } = await supabase.from('network_units').insert(UNITS).select();
  if (ue) throw ue;
  console.log(`✓ network_units: ${u.length} linhas gravadas`);

  console.log(
    `\nPróximo passo: adicionar "${CITY}" em src/data/coveredCities.js (COVERED_CITIES) para a página /plano-hapvida/campinas e o sitemap passarem a existir.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
