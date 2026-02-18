// src/config/siteSettings.js

export const SITE_SETTINGS = {
  hapvida: {
    // Para Vite, usamos import.meta.env em vez de process.env
    startingFromValue: import.meta.env.VITE_HAPVIDA_STARTING_FROM || 'R$ 75,70', 
    startingFromDisclaimer: '*Valores variam por município e perfil. Autorizada pela Hapvida.',
    heroSubtitle: 'Valores a partir de R$ 75,70', 
    heroMicrocopy: 'Leva menos de 1 minuto • Atendimento por consultor',
    finalModalSmallCopy: 'Você será direcionado para o WhatsApp.',
    finalModalButtonText: 'ENVIAR E RECEBER COTAÇÃO',
    finalModalTitle: 'Formulário enviado com sucesso!',
    finalModalCountdownMessage: 'Você receberá sua cotação com um consultor em instantes.',
  },
};