/**
 * deploy-hostinger.js
 * Publica o conteúdo de dist/ na Hostinger via API oficial (upload TUS por HTTPS),
 * substituindo o deploy por FTP — que passou a dar timeout a partir do runner do
 * GitHub Actions (FTP funciona normalmente de outras redes; provável bloqueio de
 * IP da Hostinger contra faixas de datacenter/CI).
 *
 * Uso:
 *   HOSTINGER_API_TOKEN=xxx node scripts/deploy-hostinger.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { Upload } from 'tus-js-client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_TOKEN = process.env.HOSTINGER_API_TOKEN;
const DOMAIN = process.env.HOSTINGER_DOMAIN || 'tabelaplanosaude.com.br';
const DIST_DIR = path.join(__dirname, '..', 'dist');
const BASE_URL = 'https://developers.hostinger.com';

if (!API_TOKEN) {
  console.error('[deploy] ERRO: variável HOSTINGER_API_TOKEN não definida.');
  process.exit(1);
}

function log(msg) { console.log(`[deploy] ${msg}`); }
function warn(msg) { console.warn(`[deploy] ⚠️  ${msg}`); }
function ok(msg) { console.log(`[deploy] ✅ ${msg}`); }

async function resolveUsername(domain) {
  const { data } = await axios.get(`${BASE_URL}/api/hosting/v1/websites`, {
    params: { domain },
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  const site = Array.isArray(data?.data) ? data.data[0] : null;
  if (!site?.username) {
    throw new Error(`Nenhum site/username encontrado para o domínio ${domain}`);
  }
  return site.username;
}

async function fetchUploadCredentials(username, domain) {
  const { data } = await axios.post(
    `${BASE_URL}/api/hosting/v1/files/upload-urls`,
    { username, domain },
    { headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' } }
  );
  // API retorna { url, auth_key, rest_auth_key }
  return {
    uploadUrl: data.url,
    authToken: data.auth_key,
    authRestToken: data.rest_auth_key,
  };
}

function listFilesRecursive(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(listFilesRecursive(fullPath, baseDir));
    } else {
      files.push({
        absolutePath: fullPath,
        relativePath: path.relative(baseDir, fullPath).split(path.sep).join('/'),
      });
    }
  }
  return files;
}

async function uploadFile({ absolutePath, relativePath }, { uploadUrl, authRestToken, authToken }) {
  const stats = fs.statSync(absolutePath);
  const cleanUploadUrl = uploadUrl.replace(/\/$/, '');
  const targetUrl = `${cleanUploadUrl}/${relativePath}?override=true`;

  const headers = {
    'X-Auth': authToken,
    'X-Auth-Rest': authRestToken,
    'upload-length': String(stats.size),
    'upload-offset': '0',
  };

  // Pre-upload: cria a sessão de upload no servidor
  await axios.post(targetUrl, '', {
    headers,
    timeout: 60000,
    validateStatus: (status) => status === 201,
  });

  // Envio dos bytes via protocolo TUS (resumable upload)
  await new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(absolutePath);
    const upload = new Upload(fileStream, {
      uploadUrl: targetUrl,
      uploadSize: stats.size,
      uploadDataDuringCreation: false,
      parallelUploads: 1,
      chunkSize: 10 * 1024 * 1024,
      retryDelays: [1000, 2000, 4000, 8000, 16000],
      headers,
      removeFingerprintOnSuccess: true,
      metadata: { filename: path.basename(relativePath) },
      onError: reject,
      onSuccess: resolve,
    });
    upload.start();
  });
}

async function main() {
  log(`Iniciando deploy de ${DIST_DIR} para ${DOMAIN}...`);

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Diretório dist/ não encontrado em ${DIST_DIR}. Rode "npm run build" antes.`);
  }

  const username = await resolveUsername(DOMAIN);
  log(`Username resolvido: ${username}`);

  const credentials = await fetchUploadCredentials(username, DOMAIN);
  log('Credenciais de upload obtidas.');

  const files = listFilesRecursive(DIST_DIR);
  log(`${files.length} arquivos para enviar.`);

  let sent = 0;
  for (const file of files) {
    try {
      await uploadFile(file, credentials);
      sent += 1;
      log(`  (${sent}/${files.length}) ${file.relativePath}`);
    } catch (err) {
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      warn(`Falha ao enviar ${file.relativePath}: ${detail}`);
      throw err;
    }
  }

  ok(`Deploy concluído: ${sent}/${files.length} arquivos enviados.`);
}

main().catch((err) => {
  console.error('[deploy] ERRO FATAL:', err?.response?.data || err.message || err);
  process.exit(1);
});
