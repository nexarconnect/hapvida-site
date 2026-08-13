const STORAGE_KEY = 'hapvida_utm_v1';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * Atribuição de primeiro toque: se a URL de entrada trouxer utm_*, grava uma
 * vez em sessionStorage e nunca mais sobrescreve nesta sessão — assim um
 * lead fechado depois de navegar por várias páginas internas (sem utm na
 * URL) ainda carrega a origem real da campanha que trouxe a pessoa.
 */
export function captureUTMParams() {
  if (typeof window === 'undefined') return;

  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const found = {};
    let hasAny = false;

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    });

    if (hasAny) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage indisponível (modo privado etc.) — atribuição fica em branco
  }
}

export function getUTMParams() {
  if (typeof window === 'undefined') return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
