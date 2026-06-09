import { useEffect } from 'react';

export function useUTMParams() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const utms = {
      source: params.get('utm_source') || 'direct',
      campaign: params.get('utm_campaign') || 'organic',
      medium: params.get('utm_medium') || 'direct',
      content: params.get('utm_content') || '',
      term: params.get('utm_term') || '',
      timestamp: new Date().toISOString()
    };

    // Salva no localStorage para usar depois
    localStorage.setItem('hapvida_utm_data', JSON.stringify(utms));
    
    console.log('🎯 UTMs capturadas:', utms.source, utms.campaign);
  }, []);
}