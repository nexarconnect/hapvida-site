import { createClient } from '@supabase/supabase-js';
import { getUTMParams } from './utm';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// --- VALIDAÇÕES ---
export const validateName = (n) => String(n || '').trim().split(/\s+/).length >= 2;
export const validateWhatsApp = (p) =>
  /^\d{10,11}$/.test(String(p || '').replace(/\D/g, ''));

// --- DADOS ---

/**
 * Busca os preços "a partir de" exibidos na home.
 *
 * Filtra `city IS NULL` de propósito: `pricing_table` guarda dois tipos de
 * linha — as globais (city = null), que são o menor preço entre todas as
 * cidades, e as por cidade, gravadas por `scripts/sync-prices.js` para
 * consulta e uso futuro.
 *
 * Sem esse filtro, as linhas por cidade entram na mesma lista e o
 * PriceTablesSection — que deduplica por nome de plano pegando a PRIMEIRA
 * ocorrência — passaria a exibir o preço de uma cidade arbitrária no lugar do
 * "a partir de". Hoje isso não acontece só porque os upserts por cidade vêm
 * falhando (falta índice único em `plan_name, city`); no dia em que o índice
 * existir, o bug apareceria no site.
 */
export async function getPricingData() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('pricing_table')
    .select('*')
    .is('city', null);
  if (error) {
    console.error('Erro ao buscar preços:', error);
    return [];
  }
  return data || [];
}

/**
 * Busca os preços "Mix / Nosso Plano / Pleno" de uma cidade específica, para
 * as páginas /plano-hapvida-[cidade] (ver PlanoPorCidade.jsx). Ao contrário
 * de getPricingData(), aqui city NÃO é null de propósito.
 */
export async function getPricingByCity(city) {
  if (!supabase || !city) return [];
  const { data, error } = await supabase
    .from('pricing_table')
    .select('*')
    .eq('city', city);
  if (error) {
    console.error('Erro ao buscar preços por cidade:', error);
    return [];
  }
  return data || [];
}

/**
 * Busca unidades da rede própria filtradas por cidade
 */
export async function getNetworkUnits(city) {
  if (!supabase || !city) return [];

  const { data, error } = await supabase
    .from('network_units')
    .select('*')
    .eq('city', city)
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar unidades da rede:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca todas as unidades de uma lista de cidades de uma vez (ver
 * RedeUrgenciaEmergencia.jsx, RedePediatrica.jsx, RedeClinicas.jsx — filtram
 * o resultado no cliente por `specialties`, então não vale a pena uma query
 * por cidade).
 */
export async function getNetworkUnitsByCities(cities) {
  if (!supabase || !cities || cities.length === 0) return [];

  const { data, error } = await supabase
    .from('network_units')
    .select('*')
    .in('city', cities)
    .order('city', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar unidades da rede por cidades:', error);
    return [];
  }

  return data || [];
}

/**
 * Salva um novo lead no banco de dados
 * Compatível com o FormModal atual e com a tabela leads
 */
export async function saveLead(leadData) {
  if (!supabase) {
    return { success: true, source: 'local', id: null };
  }

  const normalizedPayload = {
    nome: String(leadData?.nome || '').trim(),
    whatsapp: String(leadData?.whatsapp || '').trim(),
    cidade: String(leadData?.cidade || '').trim(),
    numPessoas: Number.isFinite(Number(leadData?.numPessoas))
      ? Number(leadData.numPessoas)
      : 1,
    idades: Array.isArray(leadData?.idades)
      ? leadData.idades.map((age) => {
          const n = Number(age);
          return Number.isFinite(n) ? n : null;
        }).filter((age) => age !== null)
      : [],
    preferencia: String(leadData?.preferencia || '').trim(),
    email: String(leadData?.email || '').trim(),
    whatsappRaw: String(leadData?.whatsappRaw || '').trim(),
    plano: leadData?.plano ?? null,
    createdAt: new Date().toISOString(),
    status: 'novo',
    ...getUTMParams(),
  };

  console.log('SAVELEAD -> payload enviado:', normalizedPayload);

  const { data, error } = await supabase
    .from('leads')
    .insert([normalizedPayload])
    .select('id, nome, whatsapp, cidade, createdAt')
    .single();

  if (error) {
    console.error('SAVELEAD -> erro Supabase:', error);
    return {
      success: false,
      error: error.message,
      details: error.details || null,
      hint: error.hint || null,
      code: error.code || null,
    };
  }

  console.log('SAVELEAD -> retorno Supabase:', data);

  return {
    success: true,
    id: data?.id || null,
    data,
  };
}

// --- CRM DE LEADS ---

export const LEAD_STATUSES = ['novo', 'contatado', 'negociando', 'fechado', 'perdido'];

/**
 * Move um lead entre colunas do Kanban em /admin/crm. `lost_reason` só faz
 * sentido junto de status 'perdido' — nos outros casos gravamos null pra não
 * deixar motivo de perda "grudado" num lead que voltou a negociar.
 */
export async function updateLeadStatus(leadId, status, lostReason = null) {
  if (!supabase || !leadId) return { success: false, error: 'missing_supabase_or_id' };

  const { data, error } = await supabase
    .from('leads')
    .update({
      status,
      lost_reason: status === 'perdido' ? (lostReason || null) : null,
      last_contacted_at:
        status === 'novo' ? null : new Date().toISOString(),
    })
    .eq('id', leadId)
    .select('id, status, lost_reason, last_contacted_at')
    .single();

  if (error) {
    console.error('Erro ao atualizar status do lead:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// --- RASTREIO E ANALYTICS ---

/**
 * Grava o evento em `analytics_events` para alimentar o dashboard de
 * /admin/analytics. Fire-and-forget de propósito: uma falha aqui (ex. tabela
 * ainda não criada, rede instável) nunca pode quebrar o fluxo de conversão
 * do site, então erros só vão pro console, nunca propagam.
 */
export const trackAnalyticsEvent = (eventName, eventData = {}) => {
  console.log(`[Event]: ${eventName}`, eventData);

  if (!supabase) return;

  const { placement, ...rest } = eventData || {};

  supabase
    .from('analytics_events')
    .insert([
      {
        event_name: eventName,
        placement: placement || null,
        path: typeof window !== 'undefined' ? window.location.pathname : null,
        payload: rest,
      },
    ])
    .then(({ error }) => {
      if (error) console.error('Erro ao gravar analytics_events:', error);
    });
};

export const confirmWhatsAppClick = (leadData = {}) => {
  trackAnalyticsEvent('whatsapp_conversion_confirm', {
    ...leadData,
    timestamp: new Date().toISOString(),
  });
};