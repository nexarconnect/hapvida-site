import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { WHATSAPP_NUMBER } from './constants';

// site_title/min_price/city_filter ficam '' por padrão de propósito: são
// overrides opcionais do admin. String vazia == "não sobrescrever" no código
// que consome (SEO.jsx, PlanosPorCidade.jsx) — só entram em uso quando a
// Amanda preencher algo em /admin/config. whatsapp_number é diferente: é
// crítico pro funil de lead, por isso cai no valor real hardcoded hoje.
const DEFAULT_CONFIG = {
  whatsapp_number: WHATSAPP_NUMBER,
  min_price: '',
  site_title: '',
  city_filter: '',
};

// Cache em módulo: uma única leitura por carregamento de página, disponível
// de forma síncrona (getSiteConfig) para código fora de componentes React
// (ex.: src/lib/whatsapp.js). Antes do primeiro loadSiteConfig() resolver,
// getSiteConfig() devolve os defaults acima — os mesmos valores que já
// estavam hardcoded no site, então nunca fica sem número/preço/título.
let cache = null;
let inflight = null;

export async function loadSiteConfig() {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    if (!supabase) {
      cache = DEFAULT_CONFIG;
      return cache;
    }
    const { data, error } = await supabase.from('config').select('*').eq('id', 1).single();
    if (error || !data) {
      cache = DEFAULT_CONFIG;
    } else {
      cache = {
        whatsapp_number: data.whatsapp_number || DEFAULT_CONFIG.whatsapp_number,
        min_price: data.min_price || DEFAULT_CONFIG.min_price,
        site_title: data.site_title || DEFAULT_CONFIG.site_title,
        city_filter: data.city_filter ?? DEFAULT_CONFIG.city_filter,
      };
    }
    return cache;
  })();

  return inflight;
}

export function getSiteConfig() {
  return cache || DEFAULT_CONFIG;
}

export function useSiteConfig() {
  const [config, setConfig] = useState(getSiteConfig());

  useEffect(() => {
    let mounted = true;
    loadSiteConfig().then((c) => {
      if (mounted) setConfig(c);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return config;
}
