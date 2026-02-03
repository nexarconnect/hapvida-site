import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

export const generateWhatsAppURL = (phoneNumber = '5514991235094', message = '') => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre os planos de saúde Hapvida.';

export const LEAD_WHATSAPP_MESSAGE = (name) => `Olá! Sou ${name} e acabei de preencher o formulário. Gostaria de receber mais informações sobre os planos Hapvida.`;

export const NEXAR_WHATSAPP_NUMBER = '5514991235094'; // Atualizado

// NOVO: Tracking de conversão (GA4 + Pixel)
export function trackWhatsAppClick({ placement = "unknown" } = {}) {
  // GA4
  ReactGA.event({
    category: "engagement",
    action: "whatsapp_click",
    label: placement,
  });

  // Meta Pixel
  ReactPixel.track("Lead", { placement });
}

/**
 * NOVO: Abre WhatsApp e registra conversão automaticamente.
 * Útil para botões que chamam via onClick.
 */
export function openWhatsApp({
  placement = "unknown",
  message = DEFAULT_WHATSAPP_MESSAGE,
  phoneNumber = NEXAR_WHATSAPP_NUMBER,
} = {}) {
  trackWhatsAppClick({ placement });
  const url = generateWhatsAppURL(phoneNumber, message);
  window.open(url, "_blank", "noopener,noreferrer");
}