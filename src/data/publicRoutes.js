import { COVERED_CITIES, NETWORK_CITIES_BY_STATE, slugifyCity } from './coveredCities.js';
import { BLOG_POSTS_META } from './blogPostsMeta.js';

// Registro central das rotas públicas indexáveis do site.
// Usado por scripts/generate-sitemap.js e scripts/prerender.js — mudou uma
// rota pública (adicionou, removeu, mudou prioridade), muda aqui.
export const PUBLIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/sobre-nos', changefreq: 'monthly', priority: 0.8 },
  { path: '/sobre-o-grupo-hapvida', changefreq: 'monthly', priority: 0.7 },
  { path: '/contato', changefreq: 'monthly', priority: 0.7 },
  { path: '/perguntas-frequentes', changefreq: 'monthly', priority: 0.8 },
  { path: '/rede-de-atendimento', changefreq: 'monthly', priority: 0.8 },
  { path: '/rede-nacional', changefreq: 'monthly', priority: 0.6 },
  { path: '/rede-nacional/urgencia-e-emergencia', changefreq: 'monthly', priority: 0.6 },
  { path: '/rede-nacional/rede-pediatrica', changefreq: 'monthly', priority: 0.6 },
  { path: '/rede-nacional/clinicas-por-capital', changefreq: 'monthly', priority: 0.6 },
  ...NETWORK_CITIES_BY_STATE.map((group) => ({
    path: `/rede-nacional/${group.slug}`,
    changefreq: 'monthly',
    priority: 0.5,
  })),
  { path: '/planos-hapvida-por-cidade', changefreq: 'monthly', priority: 0.8 },
  { path: '/tabela-de-preco-hapvida', changefreq: 'weekly', priority: 1.0 },
  { path: '/plano-odontologico-hapvida', changefreq: 'monthly', priority: 0.9 },
  { path: '/plano-individual-hapvida', changefreq: 'monthly', priority: 0.9 },
  { path: '/plano-empresarial-hapvida', changefreq: 'monthly', priority: 0.9 },
  { path: '/tipos-de-planos', changefreq: 'monthly', priority: 0.8 },
  // noindex: página não entra no sitemap.xml (ver generate-sitemap.js) e a
  // própria página deve renderizar <SEO noindex /> — as demais institucionais
  // (sobre-nos, sobre-o-grupo, contato) continuam indexadas.
  {
    // Conteúdo genérico, ainda sem confirmação de que a Nexar opera essa
    // modalidade nem qual administradora usa — ver placeholder em
    // PlanoHapvidaAdesao.jsx. Trocar para indexável só depois de confirmar.
    path: '/plano-hapvida-adesao',
    changefreq: 'monthly',
    priority: 0.3,
    noindex: true,
  },
  { path: '/politicas-privacidade', changefreq: 'monthly', priority: 0.6, noindex: true },
  { path: '/termos-de-uso', changefreq: 'monthly', priority: 0.5, noindex: true },
  { path: '/aviso-legal', changefreq: 'monthly', priority: 0.5, noindex: true },
  // Uma rota por cidade atendida — gerada a partir de COVERED_CITIES, então
  // adicionar uma cidade lá já propaga para sitemap, prerender e App.jsx
  // (a rota em si é dinâmica: /plano-hapvida-:slug). Prioridade vem de
  // city.sitemapPriority, escalonada por relevância comercial da cidade.
  ...COVERED_CITIES.map((city) => ({
    path: `/plano-hapvida/${slugifyCity(city.name)}`,
    changefreq: 'weekly',
    priority: city.sitemapPriority,
  })),
  { path: '/blog', changefreq: 'weekly', priority: 0.7 },
  ...BLOG_POSTS_META.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
  })),
];
