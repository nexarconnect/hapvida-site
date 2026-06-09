import { trackAnalyticsEvent } from './supabase';

const isBrowser = () => typeof window !== 'undefined';

export function trackCTA(eventName, placement = 'unknown', extraParams = {}) {
  if (!isBrowser()) return;
  const payload = { placement, url: window.location.href, ...extraParams };

  if (window.fbq) window.fbq('trackCustom', eventName, payload);
  if (window.gtag) window.gtag('event', eventName, payload);
  
  trackAnalyticsEvent(eventName, payload);
}

export function trackContact(type, placement = 'unknown', extraParams = {}) {
  trackCTA(`contact_${type}`, placement, extraParams);
}

export const tracking = {
  event: trackCTA,
  contact: trackContact,
  formStart: (p) => trackCTA('form_start', p),
  whatsappClick: (p, e = {}) => trackCTA('whatsapp_click', p, e),
  leadSubmit: (params = {}) => {
    if (!isBrowser()) return;
    const payload = { ...params, timestamp: new Date().toISOString() };
    if (window.fbq) window.fbq('track', 'Lead', payload);
    trackAnalyticsEvent('lead_conversion', payload);
  }
};