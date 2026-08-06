// Cidades onde a Nexar efetivamente atende com consultoria Hapvida.
// Usado no Mapa Nacional e na seção de Rede Própria.
export const COVERED_CITIES = [
  { name: 'Bauru', state: 'SP' },
  { name: 'Ribeirão Preto', state: 'SP' },
  { name: 'Franca', state: 'SP' },
  { name: 'São José dos Campos', state: 'SP' },
  { name: 'Sertãozinho', state: 'SP' },
  { name: 'Lins', state: 'SP' },
  { name: 'Araraquara', state: 'SP' },
  { name: 'Limeira', state: 'SP' },
  { name: 'Barretos', state: 'SP' },
  { name: 'Pirassununga', state: 'SP' },
  { name: 'Marília', state: 'SP' },
  { name: 'São Carlos', state: 'SP' },
  { name: 'Piracicaba', state: 'SP' },
];

// "São José dos Campos" -> "sao-jose-dos-campos" — usado na URL
// /plano-hapvida-[slug] das páginas por cidade (ver PlanoPorCidade.jsx).
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
