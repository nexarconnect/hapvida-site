import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import CityLogsTable from '../components/admin/CityLogsTable';
import { Search, Download, MessageCircle, RefreshCw } from 'lucide-react';

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return '-';
  }
}

function buildWhatsAppUrl(lead) {
  const number = String(lead.whatsappRaw || lead.whatsapp || '').replace(/\D/g, '');
  if (!number) return null;
  const lines = [
    `Olá ${lead.nome || ''}! Aqui é o consultor da Hapvida.`,
    '',
    `Recebi sua solicitação de cotação${lead.plano ? ` para o plano *${lead.plano}*` : ''}.`,
    lead.cidade ? `📍 Cidade: ${lead.cidade}` : null,
    lead.preferencia ? `🎯 Preferência: ${lead.preferencia}` : null,
    '',
    'Posso te enviar os valores agora. É um bom momento?',
  ].filter(Boolean);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function exportCSV(leads) {
  const headers = ['Nome', 'WhatsApp', 'E-mail', 'Cidade', 'Plano', 'Preferência', 'Pessoas', 'Data'];
  const rows = leads.map((l) => [
    l.nome || '',
    l.whatsapp || '',
    l.email || '',
    l.cidade || '',
    l.plano || '',
    l.preferencia || '',
    l.numPessoas || '',
    formatDate(l.created_at),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_hapvida_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DashboardLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.nome, l.whatsapp, l.email, l.cidade, l.plano, l.preferencia]
        .some((v) => String(v || '').toLowerCase().includes(q))
    );
  }, [leads, search]);

  const summary = useMemo(() => {
    const total = leads.length;
    const today = new Date().toLocaleDateString('pt-BR');
    const todayCount = leads.filter((l) =>
      l.created_at && new Date(l.created_at).toLocaleDateString('pt-BR') === today
    ).length;
    const withEmail = leads.filter((l) => !!l.email).length;
    return { total, todayCount, withEmail };
  }, [leads]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-slate-800">Gestão de Leads</h1>
              <p className="text-sm text-slate-500">Leads capturados pelo formulário e pelo chat.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => exportCSV(filtered)}
                disabled={filtered.length === 0}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
              >
                <Download size={15} />
                Exportar CSV
              </button>
              <button
                onClick={() => fetchLeads(true)}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl bg-[#002b5c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b7d] disabled:opacity-60"
              >
                <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
                Atualizar
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Total de leads" value={summary.total} color="text-slate-800" />
            <StatCard label="Leads hoje" value={summary.todayCount} color="text-green-600" />
            <StatCard label="Com e-mail" value={summary.withEmail} color="text-blue-600" />
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, cidade, plano..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10"
                />
              </div>
              {search && (
                <span className="text-sm text-slate-500">
                  {filtered.length} de {leads.length} leads
                </span>
              )}
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
                <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-blue-200 border-t-[#002b5c]" />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        {['Nome', 'WhatsApp', 'E-mail', 'Cidade', 'Plano', 'Preferência', 'Pessoas', 'Data', 'Contato'].map((h) => (
                          <th key={h} className="p-4 font-semibold text-slate-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-400">
                            {search ? 'Nenhum lead encontrado para essa busca.' : 'Nenhum lead recebido ainda.'}
                          </td>
                        </tr>
                      ) : (
                        filtered.map((lead) => {
                          const waUrl = buildWhatsAppUrl(lead);
                          return (
                            <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="p-4 font-medium text-slate-800 whitespace-nowrap">{lead.nome || '-'}</td>
                              <td className="p-4 text-slate-600 whitespace-nowrap">{lead.whatsapp || '-'}</td>
                              <td className="p-4 text-slate-600 max-w-[180px] truncate">{lead.email || '-'}</td>
                              <td className="p-4 text-slate-600 whitespace-nowrap">{lead.cidade || '-'}</td>
                              <td className="p-4 text-slate-600 whitespace-nowrap">
                                {lead.plano ? (
                                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                    {lead.plano}
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="p-4 text-slate-600 whitespace-nowrap max-w-[140px] truncate">
                                {lead.preferencia || '-'}
                              </td>
                              <td className="p-4 text-center text-slate-600">{lead.numPessoas || '-'}</td>
                              <td className="p-4 text-xs text-slate-400 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                              <td className="p-4">
                                {waUrl ? (
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-600"
                                  >
                                    <MessageCircle size={13} />
                                    WhatsApp
                                  </a>
                                ) : (
                                  <span className="text-xs text-slate-300">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Logs de validação de cidade</h2>
              <p className="text-sm text-slate-500">Entradas que o chat não conseguiu validar automaticamente.</p>
            </div>
            <CityLogsTable />
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
