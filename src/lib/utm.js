export function captureUTMs() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmData = {};
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  keys.forEach(key => {
    const value = params.get(key);
    if (value) utmData[key] = value;
  });

  if (Object.keys(utmData).length > 0) {
    localStorage.setItem('hapvida_utm_data', JSON.stringify(utmData));
    console.log('[UTM] Capturadas:', utmData);
  }
}

export function getStoredUTMs() {
  try {
    return JSON.parse(localStorage.getItem('hapvida_utm_data') || '{}');
  } catch {
    return {};
  }
}