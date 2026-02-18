// src/utils/track.js
export const trackCTA = ({ action, label }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'cta',
      event_label: label,
      custom_parameter_1: 'hapvida-2026',
    });
  }
};

export const trackFormSubmit = (data) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'lead',
      event_label: 'hapvida-form',
      value: 1,
    });
  }
};