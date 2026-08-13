import { useEffect, useMemo, useState } from 'react';
import { supabase, updateLeadStatus, LEAD_STATUSES } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import { MessageCircle, RefreshCw, Radio, AlertTriangle, X } from 'lucide-react';

const COLUMN_LABELS = {
  novo: 'Novo',
  contatado: 'Contatado',
  negociando: 'Negociando',
  fechado: 'Fechado',
  perdido: 'Perdido',
};

const COLUMN_COLORS = {
  novo: 'border-t-slate-400',
  contatado: 'border-t-blue-500',
  negociando: 'border-t-[#ff8200]',
  fechado: 'border-t-green-500',
  perdido: 'border-t-red-400',
};

// Lead "novo" sem contato depois desse tempo acende o alerta amarelo no card.
const STALE_HOURS = 3;

function hoursSince(dateStr) {
  if (!dateStr) return Infinity;
  return (Date.now() - new Date(dateStr).getTime()) / 36e5;
}

function formatRelative(dateStr) {
  if (!dateStr) return '-';
  const h = hoursSince(dateStr);
  if (h < 1) return `${Math.max(1, Math.round(h * 60))} min atrás`;
  if (h < 24) return `${Math.round(h)}h atrás`;
  return `${Math.round(h / 24)}d atrás`;
}

function buildWhatsAppUrl(lead) {
  const number = String(lead.whatsappRaw || lead.whatsapp || '').replace(/\D/g, '');
  if (!number) return null;
  const lines = [
    `Olá ${lead.nome || ''}! Aqui é o consultor da Hapvida.`,
    '',
    `Recebi sua solicitação de cotação${lead.plano ? ` para o plano *${lead.plano}*` : ''}.`,
    lead.cidade ? `📍 Cidade: ${lead.cidade}` : null,
    '',
    'Posso te enviar os valores agora. É um bom momento?',
  ].filter(Boolean);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function AdminCRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [live, setLive] = useState(false);
  const [lostModalLead, setLostModalLead] = useState(null);
  const [lostReason, setLostReason] = useState('');

  const fetchLeads = async (quiet = false) => {
    if (!supabase) { setLoading(false); return; }
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setLeads(data || []);
      setLastUpdated(new Date());
    } else {
      console.error('Erro ao buscar leads para o CRM:', error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    const channel = supabase
      .channel('crm-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchLeads(true))
      .subscribe((status) => setLive(status === 'SUBSCRIBED'));
    const interval = setInterval(() => fetchLeads(true), 30000);
    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const columns = useMemo(() => {
    const map = Object.fromEntries(LEAD_STATUSES.map((s) => [s, []]));
    leads.forEach((lead) => {
      const status = LEAD_STATUSES.includes(lead.status) ? lead.status : 'novo';
      map[status].push(lead);
    });
    return map;
  }, [leads]);

  const staleCount = useMemo(
    () => (columns.novo || []).filter((l) => hoursSince(l.created_at) >= STALE_HOURS).length,
    [columns]
  );

  const handleMove = async (lead, newStatus) => {
    if (newStatus === 'perdido') {
      setLostModalLead(lead);
      setLostReason('');
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l)));
    await updateLeadStatus(lead.id, newStatus);
  };

  const confirmLostReason = async () => {
    if (!lostModalLead) return;
    const lead = lostModalLead;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: 'perdido', lost_reason: lostReason } : l)));
    await updateLeadStatus(lead.id, 'perdido', lostReason);
    setLostModalLead(null);
    setLostReason('');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-[1400px] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-slate-800">CRM de Leads</h1>
              <p className="text-sm text-slate-500">Arraste o funil movendo o status de cada lead.</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Radio size={11} className={live ? 'text-green-500' : 'text-slate-300'} />
                {live ? 'Atualização em tempo real ativa' : 'Atualizando automaticamente a cada 30s'}
                {lastUpdated && ` · última atualização às ${lastUpdated.toLocaleTimeString('pt-BR')}`}
              </p>
            </div>
            <button
              onClick={() => fetchLeads(true)}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-xl bg-[#002b5c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b7d] disabled:opacity-60"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              Atualizar
            </button>
          </div>

          {staleCount > 0 && (
            <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <AlertTriangle size={16} />
              <strong>{staleCount}</strong> lead{staleCount > 1 ? 's' : ''} sem contato há mais de {STALE_HOURS}h.
            </div>
          )}

          {loading ? (
            <div className="py-24 text-center text-slate-400">Carregando...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-4 sm:grid-cols-2 lg:grid-cols-5">
              {LEAD_STATUSES.map((status) => (
                <div
                  key={status}
                  className={`flex min-w-[240px] flex-col rounded-2xl border-t-4 bg-slate-100/60 ${COLUMN_COLORS[status]}`}
                >
                  <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <h3 className="text-sm font-bold text-slate-700">{COLUMN_LABELS[status]}</h3>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-500 shadow-sm">
                      {columns[status]?.length || 0}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-2 pb-3">
                    {(columns[status] || []).map((lead) => {
                      const stale = status === 'novo' && hoursSince(lead.created_at) >= STALE_HOURS;
                      const waUrl = buildWhatsAppUrl(lead);
                      return (
                        <div
                          key={lead.id}
                          className={`rounded-xl border bg-white p-3 shadow-sm ${stale ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-slate-800">{lead.nome || 'Sem nome'}</p>
                            {stale && <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />}
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500">{lead.cidade || 'Cidade não informada'}</p>
                          {lead.plano && (
                            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              {lead.plano}
                            </span>
                          )}
                          {lead.utm_source && (
                            <span className="ml-1 mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                              {lead.utm_source}{lead.utm_medium ? `/${lead.utm_medium}` : ''}
                            </span>
                          )}
                          {status === 'perdido' && lead.lost_reason && (
                            <p className="mt-1.5 rounded-lg bg-red-50 px-2 py-1 text-[11px] text-red-600">
                              {lead.lost_reason}
                            </p>
                          )}
                          <p className="mt-2 text-[11px] text-slate-400">{formatRelative(lead.created_at)}</p>

                          <div className="mt-3 flex items-center gap-1.5">
                            {waUrl && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-700 hover:bg-green-100"
                              >
                                <MessageCircle size={12} />
                                WhatsApp
                              </a>
                            )}
                            <select
                              value={status}
                              onChange={(e) => handleMove(lead, e.target.value)}
                              className="ml-auto rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-[11px] text-slate-600"
                            >
                              {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>{COLUMN_LABELS[s]}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                    {(columns[status] || []).length === 0 && (
                      <p className="px-2 py-6 text-center text-xs text-slate-400">Vazio</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {lostModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Motivo da perda</h3>
              <button onClick={() => setLostModalLead(null)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <p className="mb-3 text-xs text-slate-500">Lead: {lostModalLead.nome}</p>
            <textarea
              value={lostReason}
              onChange={(e) => setLostReason(e.target.value)}
              rows={3}
              placeholder="Ex.: preço, já tinha outro plano, não respondeu..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-700"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => setLostModalLead(null)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLostReason}
                className="rounded-xl bg-[#002b5c] px-3 py-1.5 text-xs font-semibold text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
