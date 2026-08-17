// Cidades onde a Nexar efetivamente atende com consultoria Hapvida.
// Usado no Mapa Nacional e na seção de Rede Própria.
//
// lat/lng são as coordenadas aproximadas do centro de cada cidade (dado
// geográfico público, não é informação do negócio) — usadas só para achar a
// cidade coberta mais próxima a partir da geolocalização do navegador (ver
// src/hooks/useCityDetection.js). Não precisam de precisão de GPS: as 14
// cidades ficam a dezenas de km de distância umas das outras, então mesmo
// com erro de arredondamento o cálculo acerta qual é a mais próxima.
//
// `sitemapPriority`: prioridade dessa cidade no sitemap.xml (ver
// scripts/generate-sitemap.js) — escalonada por relevância comercial da
// cidade, não um valor fixo para todas.
// Jaboticabal removida em 2026-08-17: estava listada aqui sem nenhum preço
// em pricing_table (nunca teve PDF de origem em scripts/sync-prices.js nem
// entrada em scripts/data/cidades-expansao-2026-08.json), o que deixava
// /plano-hapvida/jaboticabal em produção com a página quebrada ("Não foi
// possível carregar os planos agora"). Só recolocar depois de ter preço
// real Mix/Nosso Plano/Pleno confirmado, mesmo critério já usado para as
// cidades em NETWORK_ONLY_CITIES.
export const COVERED_CITIES = [
  { name: 'Campinas', state: 'SP', lat: -22.9099, lng: -47.0626, sitemapPriority: 1.0 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1775, lng: -47.8208, sitemapPriority: 1.0 },
  { name: 'São José dos Campos', state: 'SP', lat: -23.1791, lng: -45.8872, sitemapPriority: 1.0 },
  { name: 'Araraquara', state: 'SP', lat: -21.7845, lng: -48.1781, sitemapPriority: 0.8 },
  { name: 'Bauru', state: 'SP', lat: -22.3145, lng: -49.0608, sitemapPriority: 0.8 },
  { name: 'Franca', state: 'SP', lat: -20.5386, lng: -47.4008, sitemapPriority: 0.8 },
  { name: 'Limeira', state: 'SP', lat: -22.5646, lng: -47.4017, sitemapPriority: 0.8 },
  { name: 'Piracicaba', state: 'SP', lat: -22.7253, lng: -47.6492, sitemapPriority: 0.8 },
  { name: 'Sertãozinho', state: 'SP', lat: -21.1378, lng: -48.0286, sitemapPriority: 0.8 },
  { name: 'Barretos', state: 'SP', lat: -20.5572, lng: -48.5675, sitemapPriority: 0.7 },
  { name: 'Lins', state: 'SP', lat: -21.6795, lng: -49.7427, sitemapPriority: 0.7 },
  { name: 'Marília', state: 'SP', lat: -22.2139, lng: -49.9458, sitemapPriority: 0.7 },
  { name: 'Pirassununga', state: 'SP', lat: -21.9994, lng: -47.4256, sitemapPriority: 0.7 },
  { name: 'São Carlos', state: 'SP', lat: -22.0175, lng: -47.8908, sitemapPriority: 0.7 },

  // Expansão de 2026-08-13: cidades novas fora do interior de SP, com preço
  // e rede verificados (ver scripts/data/cidades-expansao-2026-08.json).
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333, sitemapPriority: 1.0 },
  { name: 'São Bernardo do Campo', state: 'SP', lat: -23.6939, lng: -46.565, sitemapPriority: 0.8 },
  { name: 'Santo André', state: 'SP', lat: -23.6639, lng: -46.5383, sitemapPriority: 0.8 },
  { name: 'Americana', state: 'SP', lat: -22.7375, lng: -47.3311, sitemapPriority: 0.7 },
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9167, lng: -43.9345, sitemapPriority: 1.0 },
  { name: 'Uberlândia', state: 'MG', lat: -18.9186, lng: -48.2772, sitemapPriority: 0.8 },
  { name: 'Uberaba', state: 'MG', lat: -19.7483, lng: -47.9319, sitemapPriority: 0.7 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729, sitemapPriority: 1.0 },
  { name: 'Salvador', state: 'BA', lat: -12.9777, lng: -38.5016, sitemapPriority: 1.0 },
  { name: 'Feira de Santana', state: 'BA', lat: -12.2667, lng: -38.9667, sitemapPriority: 0.7 },
  { name: 'Fortaleza', state: 'CE', lat: -3.7172, lng: -38.5433, sitemapPriority: 1.0 },
  { name: 'Recife', state: 'PE', lat: -8.0476, lng: -34.877, sitemapPriority: 1.0 },
  { name: 'Olinda', state: 'PE', lat: -8.0089, lng: -34.8553, sitemapPriority: 0.7 },
  { name: 'João Pessoa', state: 'PB', lat: -7.1195, lng: -34.845, sitemapPriority: 0.8 },
  { name: 'Campina Grande', state: 'PB', lat: -7.2306, lng: -35.8811, sitemapPriority: 0.7 },
  { name: 'Natal', state: 'RN', lat: -5.7945, lng: -35.211, sitemapPriority: 0.8 },
  { name: 'Maceió', state: 'AL', lat: -9.6498, lng: -35.7089, sitemapPriority: 0.8 },
  { name: 'Aracaju', state: 'SE', lat: -10.9472, lng: -37.0731, sitemapPriority: 0.8 },
  { name: 'São Luís', state: 'MA', lat: -2.5307, lng: -44.3068, sitemapPriority: 0.8 },
  { name: 'Teresina', state: 'PI', lat: -5.0892, lng: -42.8019, sitemapPriority: 0.8 },
  { name: 'Belém', state: 'PA', lat: -1.4558, lng: -48.4902, sitemapPriority: 0.8 },
  { name: 'Ananindeua', state: 'PA', lat: -1.3656, lng: -48.3722, sitemapPriority: 0.7 },
  { name: 'Manaus', state: 'AM', lat: -3.119, lng: -60.0217, sitemapPriority: 1.0 },
  { name: 'Goiânia', state: 'GO', lat: -16.6869, lng: -49.2648, sitemapPriority: 0.8 },
  { name: 'Anápolis', state: 'GO', lat: -16.3267, lng: -48.953, sitemapPriority: 0.7 },
  { name: 'Brasília', state: 'DF', lat: -15.7942, lng: -47.8822, sitemapPriority: 1.0 },
  { name: 'Campo Grande', state: 'MS', lat: -20.4697, lng: -54.6201, sitemapPriority: 0.8 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733, sitemapPriority: 1.0 },
  { name: 'Londrina', state: 'PR', lat: -23.3045, lng: -51.1696, sitemapPriority: 0.8 },
  { name: 'Maringá', state: 'PR', lat: -23.4205, lng: -51.9331, sitemapPriority: 0.7 },
  { name: 'Joinville', state: 'SC', lat: -26.3044, lng: -48.8464, sitemapPriority: 0.8 },
  { name: 'Itajaí', state: 'SC', lat: -26.9078, lng: -48.6614, sitemapPriority: 0.7 },
];

// Cidades onde a Hapvida tem unidade própria e a Nexar quer exibir a rede,
// mas AINDA sem preço/cotação cadastrados (ver network_units no Supabase).
// Diferente de COVERED_CITIES: não gera página /plano-hapvida, não entra no
// sitemap, não afeta pricing_table. Só alimenta o seletor de cidade da seção
// "Rede de Atendimento" (NetworkSection.jsx). Mover uma cidade daqui para
// COVERED_CITIES só depois de ter o preço real Mix/Nosso Plano/Pleno dela.
//
// "São Gonçalo do Amarante" existe em dois estados diferentes (CE e RN) com
// unidades Hapvida distintas — por isso o nome leva o estado, tanto aqui
// quanto na coluna `city` de network_units, pra não misturar as duas.
// Promovidas para COVERED_CITIES em 2026-08-13 (preço real confirmado):
// Fortaleza, Manaus, Salvador, Feira de Santana, Belém, Ananindeua, Natal.
// Parauapebas continua aqui: o CSV de origem trouxe só um placeholder de
// preço, sem valor real confirmado ainda.
export const NETWORK_ONLY_CITIES = [
  { name: 'Maracanaú', state: 'CE' },
  { name: 'Juazeiro do Norte', state: 'CE' },
  { name: 'São Gonçalo do Amarante - CE', state: 'CE' },
  { name: 'Pacajus', state: 'CE' },
  { name: 'Camaçari', state: 'BA' },
  { name: 'Lauro de Freitas', state: 'BA' },
  { name: 'Alagoinhas', state: 'BA' },
  { name: 'Parauapebas', state: 'PA' },
  { name: 'São Gonçalo do Amarante - RN', state: 'RN' },
  { name: 'Mossoró', state: 'RN' },
];

// Nome completo de cada estado presente em NETWORK_ONLY_CITIES — usado só
// pra rotular a seção de cada estado na página de rede nacional. São Paulo
// fica de fora de propósito: a cobertura de SP já tem sua própria seção
// (COVERED_CITIES).
const STATE_NAMES = {
  CE: 'Ceará',
  BA: 'Bahia',
  PA: 'Pará',
  RN: 'Rio Grande do Norte',
};

// NETWORK_ONLY_CITIES agrupada por estado, uma página por estado (ver
// RedeEstado.jsx, rota /rede-nacional/:slug). Cada grupo tem o nome do
// estado, o slug da URL e TODAS as cidades atendidas ali (capital incluída,
// sem distinção — a rede é a mesma seja a cidade capital ou não).
export const NETWORK_CITIES_BY_STATE = Object.entries(STATE_NAMES).map(([state, stateName]) => ({
  state,
  stateName,
  slug: slugifyCity(stateName),
  cities: NETWORK_ONLY_CITIES.filter((city) => city.state === state),
}));

export function getNetworkStateBySlug(slug) {
  return NETWORK_CITIES_BY_STATE.find((group) => group.slug === slug) || null;
}

// "São José dos Campos" -> "sao-jose-dos-campos" — usado na URL
// /plano-hapvida/[slug] das páginas por cidade (ver PlanoPorCidade.jsx).
export function slugifyCity(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCityBySlug(slug) {
  return COVERED_CITIES.find((city) => slugifyCity(city.name) === slug) || null;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Cidade coberta mais próxima de um ponto (lat/lng), só se estiver a até
// maxKm de distância — evita "adivinhar" uma cidade coberta pra quem
// claramente está em outra região (ex.: capital de outro estado).
export function getNearestCoveredCity(lat, lng, maxKm = 60) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;

  let nearest = null;
  let nearestDist = Infinity;

  for (const city of COVERED_CITIES) {
    const dist = haversineKm(lat, lng, city.lat, city.lng);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = city;
    }
  }

  return nearest && nearestDist <= maxKm ? nearest : null;
}
