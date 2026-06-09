export function buildWhatsAppMessage(data = {}) {
  const { nome, whatsapp, cidade, perfil, numPessoas, preferencia, idades, email } = data;
  
  return [
    'Olá! Quero receber uma cotação do plano Hapvida.',
    '',
    `👤 *Nome:* ${nome}`,
    `📱 *WhatsApp:* ${whatsapp}`,
    `📧 *E-mail:* ${email || 'Não informado'}`,
    `📍 *Cidade:* ${cidade}`,
    `📦 *Perfil:* ${perfil}`,
    `👥 *Pessoas:* ${numPessoas}`,
    `🎯 *Preferência:* ${preferencia}`,
    `🎂 *Idades:* ${Array.isArray(idades) ? idades.join(', ') : idades}`
  ].join('\n');
}

export function openWhatsAppLead(data = {}) {
  const phone = '551491235094';
  const message = buildWhatsAppMessage(data);
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Alias para evitar erro de import
export const openWhatsApp = openWhatsAppLead;