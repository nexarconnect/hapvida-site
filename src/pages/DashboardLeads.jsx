import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import CityLogsTable from '../components/admin/CityLogsTable';
import { Search, Download, MessageCircle, RefreshCw, MapPin, X, Radio } from 'lucide-react';

const CHART_COLORS = ['#002b5c', '#ff8200', '#0ea5e9', '#22c55e', '#a855f7', '#ef4444', '#eab308', '#14b8a6'];

function formatDayLabel(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
}

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
  const [cityFilter, setCityFilter] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [live, setLive] = useState(false);

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
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  // Mantém os gráficos e a tabela atualizados automaticamente: assina mudanças
  // em tempo real na tabela `leads` e, como rede de segurança (ex: WebSocket
  // caindo), também faz polling a cada 30s.
  useEffect(() => {
    if (!supabase) return undefined;

    const channel = supabase
      .channel('leads-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads(true);
      })
      .subscribe((status) => setLive(status === 'SUBSCRIBED'));

    const interval = setInterval(() => fetchLeads(true), 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = leads;
    if (cityFilter) {
      list = list.filter((l) => String(l.cidade || '').trim() === cityFilter);
    }
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((l) =>
      [l.nome, l.whatsapp, l.email, l.cidade, l.plano, l.preferencia]
        .some((v) => String(v || '').toLowerCase().includes(q))
    );
  }, [leads, search, cityFilter]);

  const cityStats = useMemo(() => {
    const map = new Map();
    leads.forEach((l) => {
      const city = String(l.cidade || '').trim() || 'Não informado';
      map.set(city, (map.get(city) || 0) + 1);
    });
    const maxCount = Math.max(1, ...map.values());
    return Array.from(map.entries())
      .map(([city, count]) => ({ city, count, pct: Math.round((count / maxCount) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const timelineData = useMemo(() => {
    const days = 14;
    const counts = new Map();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      counts.set(d.toDateString(), { date: d, total: 0 });
    }

    leads.forEach((l) => {
      if (!l.created_at) return;
      const d = new Date(l.created_at);
      d.setHours(0, 0, 0, 0);
      const key = d.toDateString();
      if (counts.has(key)) counts.get(key).total += 1;
    });

    return Array.from(counts.values()).map(({ date, total }) => ({
      label: formatDayLabel(date),
      total,
    }));
  }, [leads]);

  const topCitiesChart = useMemo(
    () => cityStats.slice(0, 8).map(({ city, count }) => ({ city, count })),
    [cityStats]
  );

  const preferenceChart = useMemo(() => {
    const map = new Map();
    leads.forEach((l) => {
      const pref = String(l.preferencia || '').trim() || 'Não informado';
      map.set(pref, (map.get(pref) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

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
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Radio size={11} className={live ? 'text-green-500' : 'text-slate-300'} />
                {live ? 'Atualização em tempo real ativa' : 'Atualizando automaticamente a cada 30s'}
                {lastUpdated && ` · última atualização às ${lastUpdated.toLocaleTimeString('pt-BR')}`}
              </p>
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

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Leads nos últimos 14 dias</h3>
              {leads.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#002b5c" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#002b5c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="total" name="Leads" stroke="#002b5c" strokeWidth={2} fill="url(#leadsGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Preferência dos leads</h3>
              {preferenceChart.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={preferenceChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {preferenceChart.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <ul className="mt-2 space-y-1">
                {preferenceChart.map((item, index) => (
                  <li key={item.name} className="flex items-center gap-2 text-xs text-slate-600">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="truncate">{item.name}</span>
                    <span className="ml-auto font-semibold text-slate-800">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Top cidades por volume de leads</h3>
              {topCitiesChart.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topCitiesChart}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="city" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="count" name="Leads" fill="#ff8200" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Leads por localização</h2>
              <p className="text-sm text-slate-500">Clique em uma cidade para filtrar a tabela abaixo.</p>
            </div>
            {cityStats.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
                Nenhuma localização registrada ainda.
              </div>
            ) : (
              <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
                {cityStats.map(({ city, count, pct }) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setCityFilter(cityFilter === city ? null : city)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      cityFilter === city
                        ? 'border-[#002b5c] bg-blue-50'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin size={16} className="shrink-0 text-[#002b5c]" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-slate-700">{city}</span>
                        <span className="shrink-0 text-sm font-bold text-slate-800">{count}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-[#ff8200]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-4">
              {cityFilter && (
                <span className="flex items-center gap-2 rounded-full bg-[#002b5c] px-3 py-1.5 text-xs font-semibold text-white">
                  <MapPin size={12} />
                  {cityFilter}
                  <button type="button" onClick={() => setCityFilter(null)} aria-label="Remover filtro de cidade">
                    <X size={12} />
                  </button>
                </span>
              )}
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
              {(search || cityFilter) && (
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

function EmptyChart() {
  return (
    <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">
      Sem dados suficientes ainda.
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
