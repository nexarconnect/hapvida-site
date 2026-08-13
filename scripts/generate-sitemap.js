/**
 * generate-sitemap.js
 * Gera public/sitemap.xml a partir de src/data/publicRoutes.js antes do
 * `vite build`, para que o arquivo final vá para dist/ e seja servido de
 * verdade (antes ficava em sitemap.xml na raiz do repo, que nunca entrava
 * no build — em produção a URL devolvia o index.html da SPA em vez do XML).
 *
 * Uso: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { PUBLIC_ROUTES } from '../src/data/publicRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://tabelaplanosaude.com.br';
const today = new Date().toISOString().slice(0, 10);

// Rota pública -> arquivo fonte que renderiza essa rota, para resolver o
// lastmod real (data do último commit que tocou o arquivo) em vez de sempre
// usar a data do build. Prefixos são checados em ordem, o primeiro que bate
// vence — por isso as rotas dinâmicas (/plano-hapvida/:slug, /blog/:slug,
// /rede-nacional/:slug) ficam por último.
const ROUTE_SOURCE_FILES = [
  { prefix: '/tabela-de-preco-hapvida', file: 'src/pages/TabelaDePrecoHapvida.jsx' },
  { prefix: '/plano-odontologico-hapvida', file: 'src/pages/PlanoOdontologico.jsx' },
  { prefix: '/plano-individual-hapvida', file: 'src/pages/PlanoIndividual.jsx' },
  { prefix: '/plano-empresarial-hapvida', file: 'src/pages/PlanoEmpresarial.jsx' },
  { prefix: '/planos-hapvida-por-cidade', file: 'src/pages/PlanosPorCidade.jsx' },
  { prefix: '/tipos-de-planos', file: 'src/pages/TiposDePlanos.jsx' },
  { prefix: '/sobre-o-grupo-hapvida', file: 'src/pages/SobreOGrupoHapvida.jsx' },
  { prefix: '/sobre-nos', file: 'src/pages/SobreNos.jsx' },
  { prefix: '/contato', file: 'src/pages/Contato.jsx' },
  { prefix: '/perguntas-frequentes', file: 'src/pages/PerguntasFrequentes.jsx' },
  { prefix: '/rede-de-atendimento', file: 'src/pages/RedeAtendimento.jsx' },
  { prefix: '/rede-nacional/urgencia-e-emergencia', file: 'src/pages/RedeUrgenciaEmergencia.jsx' },
  { prefix: '/rede-nacional/rede-pediatrica', file: 'src/pages/RedePediatrica.jsx' },
  { prefix: '/rede-nacional/clinicas-por-capital', file: 'src/pages/RedeClinicas.jsx' },
  { prefix: '/rede-nacional/', file: 'src/pages/RedeEstado.jsx' },
  { prefix: '/plano-hapvida/', file: 'src/pages/PlanoPorCidade.jsx' },
  { prefix: '/blog/', file: 'src/pages/BlogPost.jsx' },
  { prefix: '/blog', file: 'src/pages/BlogIndex.jsx' },
  { prefix: '/', file: 'src/pages/HomePage.jsx' },
];

function sourceFileFor(routePath) {
  const match = ROUTE_SOURCE_FILES.find((entry) => routePath.startsWith(entry.prefix));
  return match ? match.file : null;
}

const lastmodCache = new Map();

function lastmodFor(routePath) {
  const file = sourceFileFor(routePath);
  if (!file) return today;
  if (lastmodCache.has(file)) return lastmodCache.get(file);

  let result = today;
  try {
    const out = execFileSync(
      'git',
      ['log', '--format=%aI', '-1', '--', file],
      { cwd: REPO_ROOT, encoding: 'utf8' }
    ).trim();
    if (out) result = out.slice(0, 10);
  } catch {
    // Arquivo novo/sem histórico git ainda: mantém a data do build.
  }

  lastmodCache.set(file, result);
  return result;
}

const urls = PUBLIC_ROUTES
  .filter((route) => !route.noindex)
  .map(({ path: routePath, priority }) => {
    // Barra final: o prerender grava dist/<rota>/index.html, então o servidor
    // responde 301 de /rota para /rota/. Sem a barra, todas as URLs do sitemap
    // (menos a home) chegavam ao Google como redirect. Mesma regra de
    // buildCanonicalUrl em src/components/SEO.jsx — as duas precisam bater.
    const loc = routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmodFor(routePath)}</lastmod>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');

const indexedCount = PUBLIC_ROUTES.filter((route) => !route.noindex).length;
console.log(`[generate-sitemap] ${indexedCount} URLs escritas em ${outPath}`);
