import { COVERED_CITIES, slugifyCity } from './coveredCities.js';
import { BLOG_POSTS_META } from './blogPostsMeta.js';

// Registro central das rotas públicas indexáveis do site.
// Usado por scripts/generate-sitemap.js e scripts/prerender.js — mudou uma
// rota pública (adicionou, removeu, mudou prioridade), muda aqui.
export const PUBLIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/perguntas-frequentes', changefreq: 'monthly', priority: 0.8 },
  { path: '/rede-de-atendimento', changefreq: 'monthly', priority: 0.8 },
  { path: '/politicas-privacidade', changefreq: 'monthly', priority: 0.6 },
  { path: '/termos-de-uso', changefreq: 'monthly', priority: 0.5 },
  { path: '/aviso-legal', changefreq: 'monthly', priority: 0.5 },
  // Uma rota por cidade atendida — gerada a partir de COVERED_CITIES, então
  // adicionar uma cidade lá já propaga para sitemap, prerender e App.jsx
  // (a rota em si é dinâmica: /plano-hapvida-:slug).
  ...COVERED_CITIES.map((city) => ({
    path: `/plano-hapvida/${slugifyCity(city.name)}`,
    changefreq: 'weekly',
    priority: 0.9,
  })),
  { path: '/blog', changefreq: 'weekly', priority: 0.7 },
  ...BLOG_POSTS_META.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
  })),
];
