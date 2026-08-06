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
