import { WHATSAPP_NUMBER } from './constants';

export function buildWhatsAppMessage(data = {}) {
  const { nome, whatsapp, cidade, perfil, numPessoas, preferencia, idades, email } = data;

  // Cada linha só entra se o dado existir — chamadas com contexto parcial
  // (ex.: botão do FAQ, página 404) não devem virar "undefined" na mensagem
  // que o cliente vê no WhatsApp.
  const lines = ['Olá! Quero receber uma cotação do plano Hapvida.', ''];

  if (nome) lines.push(`👤 *Nome:* ${nome}`);
  if (whatsapp) lines.push(`📱 *WhatsApp:* ${whatsapp}`);
  if (email) lines.push(`📧 *E-mail:* ${email}`);
  if (cidade) lines.push(`📍 *Cidade:* ${cidade}`);
  if (perfil) lines.push(`📦 *Perfil:* ${perfil}`);
  if (numPessoas) lines.push(`👥 *Pessoas:* ${numPessoas}`);
  if (preferencia) lines.push(`🎯 *Preferência:* ${preferencia}`);
  if (idades && (!Array.isArray(idades) || idades.length > 0)) {
    lines.push(`🎂 *Idades:* ${Array.isArray(idades) ? idades.join(', ') : idades}`);
  }

  return lines.join('\n');
}

export function openWhatsAppLead(data = {}) {
  const phone = WHATSAPP_NUMBER;
  const message = buildWhatsAppMessage(data);
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Alias para evitar erro de import
export const openWhatsApp = openWhatsAppLead;