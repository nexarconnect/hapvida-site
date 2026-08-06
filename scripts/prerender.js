/**
 * prerender.js
 * Roda depois de `vite build`. Sobe dist/ localmente, visita cada rota
 * pública com Chromium headless (Puppeteer) e grava o HTML já renderizado
 * de volta em dist/<rota>/index.html — assim buscadores e bots que não
 * executam JS (preview de link do WhatsApp, por exemplo) veem o conteúdo
 * real, não uma casca vazia de SPA.
 *
 * O app continua um SPA normal depois disso: o HTML salvo inclui os mesmos
 * <script type="module"> do build, então o React re-hidrata normalmente
 * assim que o navegador carrega a página.
 *
 * Se o Chromium não conseguir iniciar (ambiente sem as dependências do
 * sistema, por exemplo), o script avisa e sai com sucesso — o build nunca
 * quebra por causa do prerender. Rode `npm run build:no-prerender` se quiser
 * pular essa etapa de propósito.
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { PUBLIC_ROUTES } from '../src/data/publicRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PORT = 4321;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

// Serve dist/ imitando o public/.htaccess de produção: arquivo real se
// existir, senão cai para index.html (fallback de SPA).
function startStaticServer(rootDir, port) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const requestedPath = path.normalize(path.join(rootDir, urlPath));

    if (!requestedPath.startsWith(rootDir)) {
      res.writeHead(403);
      res.end();
      return;
    }

    fs.stat(requestedPath, (err, stat) => {
      if (!err && stat.isFile()) return serveFile(requestedPath, res);

      if (!err && stat.isDirectory()) {
        const indexPath = path.join(requestedPath, 'index.html');
        if (fs.existsSync(indexPath)) return serveFile(indexPath, res);
      }

      serveFile(path.join(rootDir, 'index.html'), res);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, () => resolve(server));
  });
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

function outputPathFor(routePath) {
  if (routePath === '/') return path.join(DIST_DIR, 'index.html');
  const trimmed = routePath.replace(/^\//, '');
  return path.join(DIST_DIR, trimmed, 'index.html');
}

async function main() {
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('[prerender] dist/ não encontrado. Rode "vite build" antes deste script.');
    process.exitCode = 1;
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // Margem maior que o padrão (30s): na primeira execução em uma máquina
      // (verificação do Gatekeeper no macOS, ou cold start em CI), o
      // Chromium pode demorar mais para subir.
      timeout: 60000,
    });
  } catch (err) {
    console.warn('[prerender] Não foi possível iniciar o Chromium — build segue sem pré-renderização.');
    console.warn(`[prerender] Motivo: ${err.message}`);
    return;
  }

  const server = await startStaticServer(DIST_DIR, PORT);

  try {
    const page = await browser.newPage();
    // Viewport bem alto: componentes com animação "whileInView" (Framer
    // Motion) só ficam visíveis quando entram na tela. Sem isso, a maior
    // parte do conteúdo seria capturada com opacity:0.
    await page.setViewport({ width: 1280, height: 20000 });

    for (const route of PUBLIC_ROUTES) {
      const url = `http://localhost:${PORT}${route.path}`;

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {});
        // Pequena folga para o React assentar depois do networkidle0
        // (ex.: setState que dispara após a resposta do Supabase).
        await new Promise((resolve) => setTimeout(resolve, 400));

        const html = await page.content();
        const outPath = outputPathFor(route.path);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html, 'utf8');
        console.log(`[prerender] ${route.path} → ${path.relative(DIST_DIR, outPath)}`);
      } catch (routeErr) {
        console.warn(`[prerender] Falhou em ${route.path}, mantendo o HTML do build para essa rota. Motivo: ${routeErr.message}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.warn('[prerender] Erro inesperado — build segue com o dist/ já gerado pelo vite build, sem pré-renderização.');
  console.warn(err);
});
