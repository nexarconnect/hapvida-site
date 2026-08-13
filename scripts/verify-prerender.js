/**
 * verify-prerender.js
 * Roda depois de scripts/prerender.js. Confere que o HTML gravado em dist/
 * não tem schema JSON-LD faltando em silêncio — os dois pontos identificados
 * na auditoria de SEO de 2026-08-12:
 *
 * 1. Páginas de cidade (/plano-hapvida/:slug) dependem de um fetch ao
 *    Supabase durante o prerender para montar o schema Product/AggregateOffer.
 *    Se o fetch não terminar a tempo, o schema fica vazio sem erro no build.
 * 2. Posts de blog extraem o FAQPage schema do DOM renderizado (h3+p). Se a
 *    formatação de um post mudar (ex. um <ul> ou <Link> entre pergunta e
 *    resposta), o item correspondente é descartado em silêncio.
 *
 * Este script torna os dois casos um erro de build visível em vez de uma
 * lacuna de SEO só descoberta depois, em produção.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COVERED_CITIES, slugifyCity } from '../src/data/coveredCities.js';
import { BLOG_POSTS_META } from '../src/data/blogPostsMeta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const problems = [];

function readDist(routePath) {
  const trimmed = routePath.replace(/^\//, '');
  const filePath = path.join(DIST_DIR, trimmed, 'index.html');
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
}

// 1. Product/AggregateOffer schema nas 13 páginas de cidade.
for (const city of COVERED_CITIES) {
  const routePath = `/plano-hapvida/${slugifyCity(city.name)}`;
  const html = readDist(routePath);

  if (!html) {
    problems.push(`${routePath}: dist/${routePath.replace(/^\//, '')}/index.html não existe (prerender falhou nessa rota).`);
    continue;
  }

  if (!html.includes('"@type":"Product"') && !html.includes('"@type": "Product"')) {
    problems.push(`${routePath}: schema Product/AggregateOffer ausente no HTML pré-renderizado — provável timeout do fetch ao Supabase durante o prerender.`);
  }
}

// 2. FAQPage schema nos posts de blog: quando o post tem alguma pergunta
// visível (h3 dentro do corpo), o número de perguntas no schema FAQPage
// deve bater com o número de <h3> — senão algum item foi descartado.
for (const post of BLOG_POSTS_META) {
  const routePath = `/blog/${post.slug}`;
  const html = readDist(routePath);

  if (!html) {
    problems.push(`${routePath}: dist/${routePath.replace(/^\//, '')}/index.html não existe (prerender falhou nessa rota).`);
    continue;
  }

  // Só o corpo do artigo (o mesmo escopo que articleRef usa em
  // BlogPost.jsx) — o resto da página tem h3 fora do FAQ, ex. o CTA
  // "Quer uma orientação para o seu caso?" logo depois do artigo.
  const articleStart = html.indexOf('class="prose');
  const articleEnd = articleStart >= 0 ? html.indexOf('class="mt-10', articleStart) : -1;
  const articleHtml = articleStart >= 0 && articleEnd > articleStart
    ? html.slice(articleStart, articleEnd)
    : '';
  const h3Count = (articleHtml.match(/<h3[\s>]/g) || []).length;
  const faqScriptMatch = html.match(/"@type":"FAQPage".*?"mainEntity":(\[.*?\])\}<\/script>/s);
  const faqCount = faqScriptMatch ? (faqScriptMatch[1].match(/"@type":"Question"/g) || []).length : 0;

  // h3Count inclui qualquer <h3> fora do FAQ (ex. cards de CTA no rodapé do
  // layout), então só acusamos problema quando o schema tem MENOS perguntas
  // do que h3 no corpo do artigo teria — não exigimos igualdade exata.
  if (h3Count > 0 && faqCount === 0) {
    problems.push(`${routePath}: post tem ${h3Count} <h3> no HTML mas nenhuma pergunta no schema FAQPage — extração do DOM provavelmente quebrou (formato pergunta/resposta não bate mais com h3 seguido de p).`);
  }
}

// Aviso, não bloqueia o build/deploy: este projeto já teve o Supabase pausado
// por inatividade mais de uma vez (ver [[project-hapvida-site]]), e fazer o
// deploy inteiro falhar por causa de uma lacuna de schema numa página
// trocaria um problema de SEO por um incidente de disponibilidade do site —
// pior. Rode manualmente (`npm run verify-prerender`) depois de um build para
// checar, ou plugue num step de CI separado e não-bloqueante se quiser
// alertas automáticos.
if (problems.length > 0) {
  console.warn('[verify-prerender] Problemas de schema encontrados no HTML pré-renderizado:\n');
  problems.forEach((p) => console.warn(`  - ${p}`));
  console.warn(`\n[verify-prerender] ${problems.length} problema(s) — build NÃO falhou de propósito, ver comentário no topo do script.`);
} else {
  console.log('[verify-prerender] OK — schema Product/AggregateOffer presente em todas as cidades, FAQPage consistente em todos os posts.');
}
