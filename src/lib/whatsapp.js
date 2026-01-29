export const generateWhatsAppURL = (phoneNumber = '5511999999999', message = '') => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre os planos de saúde Hapvida da NEXAR Corretora.';

export const LEAD_WHATSAPP_MESSAGE = (name) => `Olá! Sou ${name} e acabei de preencher o formulário. Gostaria de receber mais informações sobre os planos Hapvida.`;

export const NEXAR_WHATSAPP_NUMBER = '5511999999999'; // Replace with actual number