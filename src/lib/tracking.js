import { trackAnalyticsEvent } from './supabase';

const isBrowser = () => typeof window !== 'undefined';

export function trackCTA(eventName, placement = 'unknown', extraParams = {}) {
  if (!isBrowser()) return;

  const payload = {
    placement,
    url: window.location.href,
    ...extraParams
  };

  if (window.fbq) window.fbq('trackCustom', eventName, payload);
  if (window.gtag) window.gtag('event', eventName, payload);

  try {
    trackAnalyticsEvent(eventName, payload);
  } catch (e) {
    console.error('Erro no tracking:', e);
  }
}

export function trackFormStart(placement = 'unknown', extraParams = {}) {
  trackCTA('inicio_formulario', placement, extraParams);
}

export function trackLead(planName = null, city = null, origin = 'unknown') {
  if (!isBrowser()) return;

  const payload = {
    plan_name: planName,
    city,
    origin,
    timestamp: new Date().toISOString()
  };

  if (window.fbq) window.fbq('track', 'Lead', payload);
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'BRL',
      plan_name: planName,
      city,
      origin
    });
  }

  try {
    trackAnalyticsEvent('lead_conversion', payload);
  } catch {
    // falha de tracking não pode quebrar o fluxo de conversão
  }
}

export const tracking = {
  event: trackCTA,
  formStart: trackFormStart,
  lead: trackLead
};