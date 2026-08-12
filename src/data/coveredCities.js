// Cidades onde a Nexar efetivamente atende com consultoria Hapvida.
// Usado no Mapa Nacional e na seção de Rede Própria.
//
// lat/lng são as coordenadas aproximadas do centro de cada cidade (dado
// geográfico público, não é informação do negócio) — usadas só para achar a
// cidade coberta mais próxima a partir da geolocalização do navegador (ver
// src/hooks/useCityDetection.js). Não precisam de precisão de GPS: as 13
// cidades ficam a dezenas de km de distância umas das outras, então mesmo
// com erro de arredondamento o cálculo acerta qual é a mais próxima.
export const COVERED_CITIES = [
  { name: 'Bauru', state: 'SP', lat: -22.3145, lng: -49.0608 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1775, lng: -47.8208 },
  { name: 'Franca', state: 'SP', lat: -20.5386, lng: -47.4008 },
  { name: 'São José dos Campos', state: 'SP', lat: -23.1791, lng: -45.8872 },
  { name: 'Sertãozinho', state: 'SP', lat: -21.1378, lng: -48.0286 },
  { name: 'Lins', state: 'SP', lat: -21.6795, lng: -49.7427 },
  { name: 'Araraquara', state: 'SP', lat: -21.7845, lng: -48.1781 },
  { name: 'Limeira', state: 'SP', lat: -22.5646, lng: -47.4017 },
  { name: 'Barretos', state: 'SP', lat: -20.5572, lng: -48.5675 },
  { name: 'Pirassununga', state: 'SP', lat: -21.9994, lng: -47.4256 },
  { name: 'Marília', state: 'SP', lat: -22.2139, lng: -49.9458 },
  { name: 'São Carlos', state: 'SP', lat: -22.0175, lng: -47.8908 },
  { name: 'Piracicaba', state: 'SP', lat: -22.7253, lng: -47.6492 },
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
export const NETWORK_ONLY_CITIES = [
  { name: 'Fortaleza', state: 'CE' },
  { name: 'Maracanaú', state: 'CE' },
  { name: 'Juazeiro do Norte', state: 'CE' },
  { name: 'São Gonçalo do Amarante - CE', state: 'CE' },
  { name: 'Pacajus', state: 'CE' },
  { name: 'Manaus', state: 'AM' },
  { name: 'Salvador', state: 'BA' },
  { name: 'Camaçari', state: 'BA' },
  { name: 'Feira de Santana', state: 'BA' },
  { name: 'Lauro de Freitas', state: 'BA' },
  { name: 'Alagoinhas', state: 'BA' },
  { name: 'Belém', state: 'PA' },
  { name: 'Parauapebas', state: 'PA' },
  { name: 'Ananindeua', state: 'PA' },
  { name: 'São Gonçalo do Amarante - RN', state: 'RN' },
  { name: 'Mossoró', state: 'RN' },
  { name: 'Natal', state: 'RN' },
];

// Nome completo de cada estado presente em NETWORK_ONLY_CITIES — usado só
// pra rotular a seção de cada estado na página de rede nacional. São Paulo
// fica de fora de propósito: a cobertura de SP já tem sua própria seção
// (COVERED_CITIES).
const STATE_NAMES = {
  CE: 'Ceará',
  AM: 'Amazonas',
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
