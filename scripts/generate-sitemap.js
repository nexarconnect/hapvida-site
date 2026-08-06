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
import { fileURLToPath } from 'url';
import { PUBLIC_ROUTES } from '../src/data/publicRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://tabelaplanosaude.com.br';
const today = new Date().toISOString().slice(0, 10);

const urls = PUBLIC_ROUTES.map(({ path: routePath, changefreq, priority }) => {
  const loc = routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
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

console.log(`[generate-sitemap] ${PUBLIC_ROUTES.length} URLs escritas em ${outPath}`);
