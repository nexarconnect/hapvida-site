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


function log(msg) { console.log(`[deploy] ${msg}`); }
function warn(msg) { console.warn(`[deploy] ⚠️  ${msg}`); }
function ok(msg) { console.log(`[deploy] ✅ ${msg}`); }

// Backoff entre tentativas. 4 esperas = 5 tentativas no total, ~30s de teto
// por arquivo — suficiente para atravessar uma instabilidade de rede sem
// deixar o job pendurado se a Hostinger estiver realmente fora.
const RETRY_DELAYS_MS = [2000, 4000, 8000, 16000];

// Erros de conexão que valem retentar. Não inclui 4xx: token inválido ou
// caminho errado não melhoram com espera, e falhar rápido é melhor ali.
const RETRYABLE_NETWORK_CODES = new Set([
  'ETIMEDOUT',
  'ECONNRESET',
  'ECONNREFUSED',
  'ECONNABORTED',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'EAI_AGAIN',
  'EPIPE',
  'ERR_NETWORK',
]);

function isRetryable(err) {
  const status = err?.response?.status;

  // Houve resposta HTTP: só 408/429 e 5xx são transitórios.
  if (status) return status === 408 || status === 429 || status >= 500;

  // Sem resposta = falha de conexão. Quando o host tem IPv6 e IPv4, o Node
  // tenta os dois e agrega os erros em err.errors (foi o caso do ETIMEDOUT
  // no IPv4 junto do ENETUNREACH no IPv6), então checa as duas formas.
  const nested = Array.isArray(err?.errors) ? err.errors.map((e) => e?.code) : [];
  return [err?.code, ...nested].some((code) => code && RETRYABLE_NETWORK_CODES.has(code));
}

function describeError(err) {
  if (err?.response?.data) return JSON.stringify(err.response.data);
  if (err?.response?.status) return `HTTP ${err.response.status}`;
  return err?.message || String(err);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executa `fn`, retentando com backoff enquanto o erro for transitório.
 * Erro definitivo (4xx, token inválido) sobe na primeira ocorrência.
 */
async function withRetry(fn, label) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= RETRY_DELAYS_MS.length || !isRetryable(err)) throw err;

      const delay = RETRY_DELAYS_MS[attempt];
      warn(
        `${label}: ${describeError(err)} — nova tentativa ` +
        `(${attempt + 2}/${RETRY_DELAYS_MS.length + 1}) em ${delay / 1000}s`
      );
      await sleep(delay);
    }
  }
}

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
  if (!API_TOKEN) {
    throw new Error('variável HOSTINGER_API_TOKEN não definida.');
  }

  log(`Iniciando deploy de ${DIST_DIR} para ${DOMAIN}...`);

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Diretório dist/ não encontrado em ${DIST_DIR}. Rode "npm run build" antes.`);
  }

  const username = await withRetry(() => resolveUsername(DOMAIN), 'Resolver username');
  log(`Username resolvido: ${username}`);

  const credentials = await withRetry(
    () => fetchUploadCredentials(username, DOMAIN),
    'Obter credenciais de upload'
  );
  log('Credenciais de upload obtidas.');

  const files = listFilesRecursive(DIST_DIR);
  log(`${files.length} arquivos para enviar.`);

  let sent = 0;
  for (const file of files) {
    try {
      await withRetry(() => uploadFile(file, credentials), `Enviar ${file.relativePath}`);
      sent += 1;
      log(`  (${sent}/${files.length}) ${file.relativePath}`);
    } catch (err) {
      warn(`Falha ao enviar ${file.relativePath}: ${describeError(err)}`);
      // Aborta o deploy: seguir adiante publicaria dist/ pela metade, e um
      // site com HTML novo e assets antigos é pior que um deploy que falhou.
      throw err;
    }
  }

  ok(`Deploy concluído: ${sent}/${files.length} arquivos enviados.`);
}

// Só executa quando chamado direto (`node scripts/deploy-hostinger.js`).
// Sem esse guard, importar o arquivo para testar a lógica de retry dispararia
// um deploy de verdade.
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((err) => {
    console.error('[deploy] ERRO FATAL:', err?.response?.data || err.message || err);
    process.exit(1);
  });
}

export { withRetry, isRetryable, describeError, RETRY_DELAYS_MS };
