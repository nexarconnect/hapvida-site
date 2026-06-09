// src/config/siteSettings.js

export const SITE_SETTINGS = {
  hapvida: {
    // Hero & Preços
    title: 'Plano de saúde Hapvida 2026',
    startingFromValue: import.meta.env.VITE_HAPVIDA_STARTING_FROM || 'R$ 75,70', 
    startingFromDisclaimer: '*Valores variam por município e perfil. Autorizada pela Hapvida.',
    heroSubtitle: 'Valores a partir de R$ 75,70', 
    heroMicrocopy: 'Leva menos de 1 minuto • Atendimento por consultor',
    
    // Formulário (Labels e Suporte)
    submitButtonLabel: 'SOLICITAR COTAÇÃO',
    availabilityNote: 'Validamos disponibilidade e valores para seu município',
    modalToggleSupport: 'Sem problema. O consultor confirma com você no WhatsApp.',
    
    // Success Modal (Pós-conversão)
    finalModalTitle: 'Formulário enviado com sucesso!',
    finalModalCountdownMessage: 'Você receberá sua cotação com um consultor em instantes.',
    finalModalSmallCopy: 'Você será direcionado para o WhatsApp.',
    finalModalButtonText: 'ENVIAR E RECEBER COTAÇÃO',
    
    // Placeholders
    placeholders: {
      name: 'Digite seu nome completo',
      whatsapp: '(00) 00000-0000',
      city: 'Sua cidade',
    }
  },
};