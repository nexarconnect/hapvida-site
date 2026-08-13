import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import SiteHealthPanel from '../components/admin/SiteHealthPanel';
import { RefreshCw, Radio, Activity, MousePointerClick, TrendingUp, MapPin } from 'lucide-react';

const CHART_COLORS = ['#002b5c', '#ff8200', '#0ea5e9', '#22c55e', '#a855f7', '#ef4444', '#eab308', '#14b8a6'];

const EVENT_LABELS = {
  solicitar_cotacao: 'Solicitar cotação (clique)',
  abrir_formulario: 'Abrir formulário',
  open_form: 'Abrir formulário (home)',
  inicio_formulario: 'Início do formulário',
  whatsapp_click: 'Clique no WhatsApp',
  whatsapp_priority_click: 'WhatsApp prioritário (obrigado)',
  area_beneficiario_click: 'Área do beneficiário',
  selecionar_plano: 'Selecionar plano',
  compartilhar_post: 'Compartilhar post do blog',
  generate_lead: 'Lead gerado',
  lead_conversion: 'Lead gerado (log interno)',
  whatsapp_conversion_confirm: 'Confirmação de conversão WhatsApp',
};

function eventLabel(name) {
  return EVENT_LABELS[name] || name;
}

function formatDayLabel(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
}

function formatDateTime(value) {
  if (!value) return '-';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return '-';
  }
}

const RANGE_OPTIONS = [
  { label: '7 dias', days: 7 },
  { label: '14 dias', days: 14 },
  { label: '30 dias', days: 30 },
];

export default function AdminAnalytics() {
  const [events, setEvents] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [live, setLive] = useState(false);
  const [rangeDays, setRangeDays] = useState(14);
  const [tableFilter, setTableFilter] = useState('');
  const [tableEventFilter, setTableEventFilter] = useState('todos');
  const [tableUnavailable, setTableUnavailable] = useState(false);

  const fetchData = async (quiet = false) => {
    if (!supabase) { setLoading(false); return; }
    if (!quiet) setLoading(true);
    else setRefreshing(true);

    const since = new Date();
    since.setDate(since.getDate() - 30);

    const [eventsResult, leadsResult] = await Promise.all([
      supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: false })
        .limit(2000),
      supabase.from('leads').select('id', { count: 'exact', head: true }),
    ]);

    if (eventsResult.error) {
      // Tabela ainda não existe até a Amanda rodar a migração no SQL Editor
      // do Supabase — mostra estado vazio orientando em vez de quebrar a tela.
      setTableUnavailable(true);
      setEvents([]);
    } else {
      setTableUnavailable(false);
      setEvents(eventsResult.data || []);
    }

    if (!leadsResult.error) setLeadsCount(leadsResult.count || 0);

    setLastUpdated(new Date());
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    const channel = supabase
      .channel('analytics-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'analytics_events' }, () => {
        fetchData(true);
      })
      .subscribe((status) => setLive(status === 'SUBSCRIBED'));

    const interval = setInterval(() => fetchData(true), 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const rangeEvents = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    cutoff.setHours(0, 0, 0, 0);
    return events.filter((e) => e.created_at && new Date(e.created_at) >= cutoff);
  }, [events, rangeDays]);

  const timelineData = useMemo(() => {
    const counts = new Map();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = rangeDays - 1; i >= 0; i -= 1) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      counts.set(d.toDateString(), { date: d, total: 0 });
    }

    rangeEvents.forEach((e) => {
      if (!e.created_at) return;
      const d = new Date(e.created_at);
      d.setHours(0, 0, 0, 0);
      const key = d.toDateString();
      if (counts.has(key)) counts.get(key).total += 1;
    });

    return Array.from(counts.values()).map(({ date, total }) => ({
      label: formatDayLabel(date),
      total,
    }));
  }, [rangeEvents, rangeDays]);

  const byEventType = useMemo(() => {
    const map = new Map();
    rangeEvents.forEach((e) => {
      const key = eventLabel(e.event_name);
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [rangeEvents]);

  const byPlacement = useMemo(() => {
    const map = new Map();
    rangeEvents.forEach((e) => {
      const key = e.placement || 'Não informado';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [rangeEvents]);

  const funnel = useMemo(() => {
    const count = (names) => rangeEvents.filter((e) => names.includes(e.event_name)).length;
    const cliquesCotacao = count(['solicitar_cotacao']);
    const formsAbertos = count(['abrir_formulario', 'open_form', 'inicio_formulario']);
    const leadsGerados = count(['generate_lead', 'lead_conversion']);
    return [
      { step: 'Clicou em "Solicitar cotação"', value: cliquesCotacao },
      { step: 'Abriu o formulário', value: formsAbertos },
      { step: 'Virou lead', value: leadsGerados },
    ];
  }, [rangeEvents]);

  const conversionRate = useMemo(() => {
    const cliques = funnel[0]?.value || 0;
    const leads = funnel[2]?.value || 0;
    if (!cliques) return null;
    return ((leads / cliques) * 100).toFixed(1);
  }, [funnel]);

  // As chamadas de trackCTA/trackLead pelo site nunca padronizaram as chaves
  // do payload (cidade vs city, plano vs plan_name) — normaliza aqui em vez
  // de sair corrigindo dezenas de call sites espalhados.
  const funnelByDimension = useMemo(() => {
    const extractCity = (e) => e.payload?.cidade || e.payload?.city || null;
    const extractPlan = (e) => e.payload?.plano || e.payload?.plan_name || e.payload?.plan || null;

    const build = (extractor) => {
      const map = new Map();
      rangeEvents.forEach((e) => {
        const key = extractor(e);
        if (!key) return;
        if (!map.has(key)) map.set(key, { cliques: 0, formularios: 0, leads: 0 });
        const bucket = map.get(key);
        if (e.event_name === 'solicitar_cotacao' || e.event_name === 'selecionar_plano') bucket.cliques += 1;
        if (['abrir_formulario', 'open_form', 'inicio_formulario'].includes(e.event_name)) bucket.formularios += 1;
        if (['generate_lead', 'lead_conversion'].includes(e.event_name)) bucket.leads += 1;
      });
      return Array.from(map.entries())
        .map(([name, stats]) => ({ name, ...stats, total: stats.cliques + stats.formularios + stats.leads }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);
    };

    return { byCity: build(extractCity), byPlan: build(extractPlan) };
  }, [rangeEvents]);

  const filteredTable = useMemo(() => {
    let list = events;
    if (tableEventFilter !== 'todos') {
      list = list.filter((e) => e.event_name === tableEventFilter);
    }
    const q = tableFilter.trim().toLowerCase();
    if (!q) return list.slice(0, 200);
    return list
      .filter((e) =>
        [e.event_name, e.placement, e.path, JSON.stringify(e.payload || {})]
          .some((v) => String(v || '').toLowerCase().includes(q))
      )
      .slice(0, 200);
  }, [events, tableFilter, tableEventFilter]);

  const eventNameOptions = useMemo(() => {
    const set = new Set(events.map((e) => e.event_name));
    return Array.from(set).sort();
  }, [events]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-slate-800">Analytics do site</h1>
              <p className="text-sm text-slate-500">
                Todos os eventos de rastreamento (GA4, Meta Pixel e log interno) num só lugar.
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Radio size={11} className={live ? 'text-green-500' : 'text-slate-300'} />
                {live ? 'Atualização em tempo real ativa' : 'Atualizando automaticamente a cada 30s'}
                {lastUpdated && ` · última atualização às ${lastUpdated.toLocaleTimeString('pt-BR')}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.days}
                    onClick={() => setRangeDays(opt.days)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      rangeDays === opt.days ? 'bg-[#002b5c] text-white' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl bg-[#002b5c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b7d] disabled:opacity-60"
              >
                <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
                Atualizar
              </button>
            </div>
          </div>

          <SiteHealthPanel />

          {tableUnavailable && !loading && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <p className="font-semibold">A tabela <code>analytics_events</code> ainda não existe no Supabase.</p>
              <p className="mt-1">
                Rode o script <code>scripts/sql/create-analytics-events.sql</code> no SQL Editor do Supabase
                para começar a coletar os eventos e ver os dados aqui.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              icon={Activity}
              label={`Eventos (${rangeDays}d)`}
              value={rangeEvents.length}
              color="text-slate-800"
            />
            <StatCard
              icon={MousePointerClick}
              label="Cliques em cotação"
              value={funnel[0]?.value ?? 0}
              color="text-blue-600"
            />
            <StatCard
              icon={TrendingUp}
              label="Taxa clique → lead"
              value={conversionRate !== null ? `${conversionRate}%` : '—'}
              color="text-green-600"
            />
            <StatCard icon={MapPin} label="Total de leads (geral)" value={leadsCount} color="text-[#ff8200]" />
          </div>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Eventos por dia</h3>
              {rangeEvents.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#002b5c" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#002b5c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="total" name="Eventos" stroke="#002b5c" strokeWidth={2} fill="url(#eventsGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Funil de conversão</h3>
              {funnel.every((f) => f.value === 0) ? (
                <EmptyChart />
              ) : (
                <ul className="space-y-3">
                  {funnel.map((step, index) => {
                    const max = funnel[0]?.value || 1;
                    const pct = Math.round((step.value / max) * 100);
                    return (
                      <li key={step.step}>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>{step.step}</span>
                          <span className="font-bold text-slate-800">{step.value}</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Top eventos</h3>
              {byEventType.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={byEventType} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={140}
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="count" name="Eventos" fill="#ff8200" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">Onde os cliques acontecem (placement)</h3>
              {byPlacement.length === 0 ? (
                <EmptyChart />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={byPlacement}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {byPlacement.map((_, index) => (
                          <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <ul className="flex flex-col justify-center space-y-1.5">
                    {byPlacement.map((item, index) => (
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
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Funil por cidade e por plano</h2>
              <p className="text-sm text-slate-500">
                Onde cada etapa do funil trava — cidade/plano que clica muito mas não vira lead merece atenção.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <FunnelDimensionTable title="Por cidade" rows={funnelByDimension.byCity} />
              <FunnelDimensionTable title="Por plano" rows={funnelByDimension.byPlan} />
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Log de eventos</h2>
                <p className="text-sm text-slate-500">Últimos 30 dias, até 200 registros por filtro.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={tableEventFilter}
                  onChange={(e) => setTableEventFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                >
                  <option value="todos">Todos os eventos</option>
                  {eventNameOptions.map((name) => (
                    <option key={name} value={name}>{eventLabel(name)}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                  placeholder="Buscar em placement, path ou payload..."
                  className="w-64 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="max-h-[420px] overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Quando</th>
                      <th className="px-4 py-3">Evento</th>
                      <th className="px-4 py-3">Placement</th>
                      <th className="px-4 py-3">Página</th>
                      <th className="px-4 py-3">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Carregando...</td></tr>
                    ) : filteredTable.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Nenhum evento encontrado.</td></tr>
                    ) : (
                      filteredTable.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">{formatDateTime(e.created_at)}</td>
                          <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-slate-800">{eventLabel(e.event_name)}</td>
                          <td className="whitespace-nowrap px-4 py-2.5 text-slate-600">{e.placement || '-'}</td>
                          <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">{e.path || '-'}</td>
                          <td className="max-w-xs truncate px-4 py-2.5 text-xs text-slate-400" title={JSON.stringify(e.payload)}>
                            {e.payload && Object.keys(e.payload).length > 0 ? JSON.stringify(e.payload) : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function FunnelDimensionTable({ title, rows }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">{title}</h3>
      {rows.length === 0 ? (
        <EmptyChart />
      ) : (
        <table className="w-full text-left text-xs">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-2 font-medium">Nome</th>
              <th className="pb-2 font-medium">Cliques</th>
              <th className="pb-2 font-medium">Formulário</th>
              <th className="pb-2 font-medium">Leads</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="py-2 font-semibold text-slate-800">{row.name}</td>
                <td className="py-2 text-slate-600">{row.cliques}</td>
                <td className="py-2 text-slate-600">{row.formularios}</td>
                <td className="py-2 font-bold text-green-600">{row.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {Icon && <Icon size={15} className="text-slate-400" />}
        {label}
      </div>
      <p className={`mt-2 text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
