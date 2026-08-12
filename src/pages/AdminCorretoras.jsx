import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import { Loader2, RefreshCw, ExternalLink, Search, Download, X } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

// Mesma paleta do dashboard de leads (src/pages/DashboardLeads.jsx), pra
// manter os dois painéis administrativos com a mesma identidade visual.
const CHART_COLORS = ['#002b5c', '#ff8200', '#0ea5e9', '#22c55e', '#a855f7', '#ef4444', '#eab308', '#14b8a6'];

// "nexar" é a própria corretora da Amanda (tabelaplanosaude.com.br), não uma
// concorrente — aparece nos gráficos/tabela como as demais, só destacada em
// verde, pra dar noção de onde ela está frente à concorrência.
const CORRETORA_PROPRIA = 'nexar';

const SECTIONS = [
  { key: 'preco', label: 'Preço de leads' },
  { key: 'anuncios', label: 'Anúncios' },
  { key: 'imas', label: 'Ímãs de leads' },
  { key: 'reputacao', label: 'Reputação' },
  { key: 'novidades', label: 'Novidades' },
  { key: 'responsaveis', label: 'Responsáveis (agência, designer, etc.)' },
];

function bibliotecasDeAds(corretora) {
  const nome = encodeURIComponent(corretora);
  return [
    { plataforma: 'Meta Ad Library', link: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&q=${nome}` },
    { plataforma: 'Google Ads Transparency', link: `https://adstransparency.google.com/?region=BR&search_type=advertiser&query=${nome}` },
  ];
}

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString('pt-BR');
  } catch {
    return value;
  }
}

function formatMes(m) {
  const [ano, mes] = String(m).slice(0, 10).split('-');
  const nomes = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return mes ? `${nomes[Number(mes) - 1]}/${ano.slice(2)}` : m;
}

// Campos vêm como "Título | URL||Título 2 | URL 2" — separa em itens e
// extrai o link quando existir, pra não jogar URL crua no meio do texto.
function parseField(value) {
  if (!value || value.trim().toLowerCase() === 'sem dados') return [];
  return value
    .split('||')
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((item) => {
      const urlMatch = item.match(/https?:\/\/\S+$/);
      const url = urlMatch ? urlMatch[0] : null;
      const label = url ? item.slice(0, urlMatch.index).replace(/\|\s*$/, '').trim() : item;
      return { label: label || url || item, url };
    });
}

function hasValue(v) {
  return !!v && v.trim().toLowerCase() !== 'sem dados';
}

function dimensoesPreenchidas(row) {
  return SECTIONS.filter((s) => hasValue(row[s.key])).length;
}

function hasAnyData(row) {
  return dimensoesPreenchidas(row) > 0;
}

function coletaStatus(row) {
  const filled = dimensoesPreenchidas(row);
  if (filled === 0) return { label: 'Sem dados', cls: 'bg-slate-100 text-slate-500' };
  if (filled === SECTIONS.length) return { label: 'Completa', cls: 'bg-green-100 text-green-700' };
  return { label: 'Parcial', cls: 'bg-amber-100 text-amber-700' };
}

// Heurística simples pra sinalizar reputação ruim a partir do texto livre
// coletado (não há campo estruturado de nota/reclamações).
function reputacaoFraca(texto) {
  const t = (texto || '').toLowerCase();
  return /não verificada|sem registro|0% resp|não responde|nota [0-5][^0-9]/.test(t);
}

// Score de prioridade: mais anúncios/ímãs = concorrente mais ativo (maior
// prioridade de vigiar); reputação fraca ou responsável não identificado
// somam pontos porque são lacunas de inteligência a resolver.
function score(row) {
  let s = 0;
  const a = row.qtd_anuncios || 0;
  const i = row.qtd_imas || 0;
  s += a === 0 ? 0 : a <= 3 ? 1 : a <= 8 ? 2 : 3;
  s += i === 0 ? 0 : i <= 2 ? 1 : i <= 5 ? 2 : 3;
  if (hasValue(row.reputacao) && reputacaoFraca(row.reputacao)) s += 1;
  if (!hasValue(row.responsaveis)) s += 1;
  return s;
}

function prioridade(row) {
  const s = score(row);
  if (s >= 6) return { label: 'Alta', cls: 'bg-red-100 text-red-700', v: 3 };
  if (s >= 3) return { label: 'Média', cls: 'bg-amber-100 text-amber-700', v: 2 };
  return { label: 'Baixa', cls: 'bg-green-100 text-green-700', v: 1 };
}

export default function AdminCorretoras() {
  const [rows, setRows] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [fAnuncios, setFAnuncios] = useState('all');
  const [fReputacao, setFReputacao] = useState('all');
  const [fResponsavel, setFResponsavel] = useState('all');
  const [fColeta, setFColeta] = useState('all');
  const [fPrioridade, setFPrioridade] = useState('all');
  const [sortKey, setSortKey] = useState('corretora');
  const [sortDir, setSortDir] = useState('asc');
  const [detalhe, setDetalhe] = useState(null);

  const loadData = async () => {
    if (!supabase) {
      setError('Supabase não configurado.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    const [{ data, error: err }, { data: hist }] = await Promise.all([
      supabase.from('corretoras_monitoramento').select('*').order('corretora', { ascending: true }),
      supabase.from('historico_anuncios').select('corretora_id, mes, anuncios').order('mes', { ascending: true }),
    ]);

    if (err) {
      console.error('Erro ao buscar corretoras monitoradas:', err);
      setError('Não foi possível carregar os dados. A tabela corretoras_monitoramento existe no Supabase?');
      setRows([]);
    } else {
      setRows(data || []);
      setHistorico(hist || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const clearFilters = () => {
    setSearch('');
    setFAnuncios('all');
    setFReputacao('all');
    setFResponsavel('all');
    setFColeta('all');
    setFPrioridade('all');
  };

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (term && !r.corretora?.toLowerCase().includes(term)) return false;
      const a = r.qtd_anuncios || 0;
      if (fAnuncios === '0' && a !== 0) return false;
      if (fAnuncios === '1-5' && !(a >= 1 && a <= 5)) return false;
      if (fAnuncios === '6-10' && !(a >= 6 && a <= 10)) return false;
      if (fAnuncios === '10+' && a <= 10) return false;
      if (fReputacao === 'com' && !hasValue(r.reputacao)) return false;
      if (fReputacao === 'sem' && hasValue(r.reputacao)) return false;
      if (fResponsavel === 'com' && !hasValue(r.responsaveis)) return false;
      if (fResponsavel === 'sem' && hasValue(r.responsaveis)) return false;
      const cs = coletaStatus(r).label;
      if (fColeta === 'completa' && cs !== 'Completa') return false;
      if (fColeta === 'parcial' && cs !== 'Parcial') return false;
      if (fColeta === 'sem' && cs !== 'Sem dados') return false;
      const pr = prioridade(r).label;
      if (fPrioridade === 'alta' && pr !== 'Alta') return false;
      if (fPrioridade === 'media' && pr !== 'Média') return false;
      if (fPrioridade === 'baixa' && pr !== 'Baixa') return false;
      return true;
    });
  }, [rows, search, fAnuncios, fReputacao, fResponsavel, fColeta, fPrioridade]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      let va = a[sortKey];
      let vb = b[sortKey];
      if (sortKey === 'updated_at') {
        va = va ? new Date(va).getTime() : -1;
        vb = vb ? new Date(vb).getTime() : -1;
      } else if (sortKey === 'qtd_anuncios' || sortKey === 'qtd_imas') {
        va = va ?? -1;
        vb = vb ?? -1;
      } else {
        va = (va || '').toString().toLowerCase();
        vb = (vb || '').toString().toLowerCase();
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const summary = useMemo(() => {
    const total = rows.length;
    const comAnuncios = rows.filter((r) => (r.qtd_anuncios || 0) > 0).length;
    const totalAnuncios = rows.reduce((s, r) => s + (r.qtd_anuncios || 0), 0);
    const totalImas = rows.reduce((s, r) => s + (r.qtd_imas || 0), 0);
    const comReputacao = rows.filter((r) => hasValue(r.reputacao)).length;
    const prioridadeAlta = rows.filter((r) => prioridade(r).v === 3).length;
    const lastUpdate = rows.reduce((max, r) => {
      if (!r.updated_at) return max;
      return !max || new Date(r.updated_at) > new Date(max) ? r.updated_at : max;
    }, null);
    return { total, comAnuncios, totalAnuncios, totalImas, comReputacao, prioridadeAlta, lastUpdate };
  }, [rows]);

  const topAnuncios = useMemo(
    () => [...rows].sort((a, b) => (b.qtd_anuncios || 0) - (a.qtd_anuncios || 0)).slice(0, 10),
    [rows]
  );
  const topImas = useMemo(
    () => [...rows].sort((a, b) => (b.qtd_imas || 0) - (a.qtd_imas || 0)).slice(0, 10),
    [rows]
  );

  const reputacaoChart = useMemo(() => ([
    { name: 'Com dado de reputação', value: rows.filter((r) => hasValue(r.reputacao)).length },
    { name: 'Sem dado ainda', value: rows.filter((r) => !hasValue(r.reputacao)).length },
  ]), [rows]);

  const responsavelChart = useMemo(() => ([
    { name: 'Com responsável identificado', value: rows.filter((r) => hasValue(r.responsaveis)).length },
    { name: 'Sem responsável identificado', value: rows.filter((r) => !hasValue(r.responsaveis)).length },
  ]), [rows]);

  const coletaChart = useMemo(() => {
    const porStatus = { Completa: 0, Parcial: 0, 'Sem dados': 0 };
    rows.forEach((r) => { porStatus[coletaStatus(r).label] += 1; });
    return Object.entries(porStatus).map(([name, value]) => ({ name, value }));
  }, [rows]);

  // Tendência mensal de anúncios das 5 corretoras com mais histórico
  // acumulado — vem de historico_anuncios, populado por snapshot_anuncios()
  // no início de cada mês.
  const tendencia = useMemo(() => {
    if (!historico.length) return null;
    const porCorretora = {};
    historico.forEach((h) => { (porCorretora[h.corretora_id] = porCorretora[h.corretora_id] || []).push(h); });
    const nomeDe = (id) => rows.find((r) => r.id === id)?.corretora || `#${id}`;
    const top = Object.entries(porCorretora)
      .map(([id, arr]) => ({ id: Number(id), total: arr.reduce((s, h) => s + (h.anuncios || 0), 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
    const series = top.map((t) => nomeDe(t.id));
    const meses = [...new Set(historico.map((h) => h.mes))].sort();
    const data = meses.map((mes) => {
      const ponto = { mes: formatMes(mes) };
      top.forEach((t) => {
        const h = (porCorretora[t.id] || []).find((x) => x.mes === mes);
        ponto[nomeDe(t.id)] = h ? h.anuncios : 0;
      });
      return ponto;
    });
    return { data, series };
  }, [historico, rows]);

  const exportarCSV = () => {
    if (!sortedRows.length) return;
    const cols = ['corretora', 'qtd_anuncios', 'qtd_imas', 'prioridade', 'coleta', ...SECTIONS.map((s) => s.key), 'updated_at'];
    const linhas = [cols.join(';')].concat(
      sortedRows.map((r) => {
        const vals = { ...r, prioridade: prioridade(r).label, coleta: coletaStatus(r).label };
        return cols.map((c) => String(vals[c] ?? '').replace(/;/g, ',').replace(/\n/g, ' ')).join(';');
      })
    );
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'corretoras-monitoradas.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const sortArrow = (key) => (sortKey === key ? (sortDir === 'asc' ? '▲' : '▼') : '↕');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Corretoras monitoradas</h1>
              <p className="text-sm text-slate-500">
                Preço de leads, anúncios, ímãs de leads, reputação, novidades e responsáveis (agência de tráfego, designer etc.) das corretoras concorrentes.
                {summary.lastUpdate && <> Atualizado em {formatDate(summary.lastUpdate)}.</>}
              </p>
            </div>
            <div className="flex gap-2 self-start">
              <button
                onClick={exportarCSV}
                disabled={loading || !sortedRows.length}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <Download size={16} />
                Exportar CSV
              </button>
              <button
                onClick={loadData}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#002b5c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b7d] disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                Recarregar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Corretoras', value: summary.total, sub: 'monitoradas' },
              { label: 'Com anúncios', value: summary.comAnuncios, sub: summary.total ? `${Math.round((summary.comAnuncios / summary.total) * 100)}% da base` : '—' },
              { label: 'Total de anúncios', value: summary.totalAnuncios, sub: 'soma da base' },
              { label: 'Total de ímãs', value: summary.totalImas, sub: 'landing pages' },
              { label: 'Com reputação', value: summary.comReputacao, sub: 'Reclame Aqui' },
              { label: 'Prioridade alta', value: summary.prioridadeAlta, sub: 'atacar primeiro' },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{k.sub}</p>
                <p className="mt-1 text-2xl font-black text-slate-800">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </div>
            ))}
          </div>

          {rows.length > 0 && (
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Top corretoras por anúncios</h3>
                <ResponsiveContainer width="100%" height={Math.max(220, topAnuncios.length * 26)}>
                  <BarChart data={topAnuncios} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="corretora" width={110} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="qtd_anuncios" name="Anúncios" fill="#0ea5e9" radius={[0, 6, 6, 0]}>
                      {topAnuncios.map((entry) => (
                        <Cell key={entry.corretora} fill={entry.corretora === CORRETORA_PROPRIA ? '#22c55e' : '#0ea5e9'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Top corretoras por ímãs de leads</h3>
                <ResponsiveContainer width="100%" height={Math.max(220, topImas.length * 26)}>
                  <BarChart data={topImas} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="corretora" width={110} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="qtd_imas" name="Ímãs de leads" fill="#a855f7" radius={[0, 6, 6, 0]}>
                      {topImas.map((entry) => (
                        <Cell key={entry.corretora} fill={entry.corretora === CORRETORA_PROPRIA ? '#22c55e' : '#a855f7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Reputação (Reclame Aqui)</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={reputacaoChart} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75} paddingAngle={2}>
                      {reputacaoChart.map((_, index) => (
                        <Cell key={index} fill={index === 0 ? '#002b5c' : '#cbd5e1'} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <DonutLegend data={reputacaoChart} colors={['#002b5c', '#cbd5e1']} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Responsáveis por marketing</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={responsavelChart} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75} paddingAngle={2}>
                      {responsavelChart.map((_, index) => (
                        <Cell key={index} fill={index === 0 ? '#22c55e' : '#cbd5e1'} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <DonutLegend data={responsavelChart} colors={['#22c55e', '#cbd5e1']} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Status da coleta</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={coletaChart} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75} paddingAngle={2}>
                      {coletaChart.map((entry, index) => (
                        <Cell key={entry.name} fill={['#22c55e', '#f59e0b', '#cbd5e1'][index]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <DonutLegend data={coletaChart} colors={['#22c55e', '#f59e0b', '#cbd5e1']} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">📈 Tendência de anúncios (mensal)</h3>
                {!tendencia ? (
                  <div className="flex h-44 items-center justify-center text-center text-xs text-slate-400">
                    Sem histórico ainda — roda no início de cada mês via <code className="mx-1">select snapshot_anuncios();</code>.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={tendencia.data} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      {tendencia.series.map((nome, i) => (
                        <Line key={nome} type="monotone" dataKey={nome} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar corretora..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-800 outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10"
              />
            </div>
            <select value={fAnuncios} onChange={(e) => setFAnuncios(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#002b5c]">
              <option value="all">Anúncios: Todos</option>
              <option value="0">Sem anúncios</option>
              <option value="1-5">1–5</option>
              <option value="6-10">6–10</option>
              <option value="10+">10+</option>
            </select>
            <select value={fReputacao} onChange={(e) => setFReputacao(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#002b5c]">
              <option value="all">Reputação: Todas</option>
              <option value="com">Com dado</option>
              <option value="sem">Sem dado</option>
            </select>
            <select value={fResponsavel} onChange={(e) => setFResponsavel(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#002b5c]">
              <option value="all">Responsável: Todos</option>
              <option value="com">Com responsável</option>
              <option value="sem">Sem responsável</option>
            </select>
            <select value={fColeta} onChange={(e) => setFColeta(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#002b5c]">
              <option value="all">Coleta: Todas</option>
              <option value="completa">Completa</option>
              <option value="parcial">Parcial</option>
              <option value="sem">Sem dados</option>
            </select>
            <select value={fPrioridade} onChange={(e) => setFPrioridade(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#002b5c]">
              <option value="all">Prioridade: Todas</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            <button onClick={clearFilters} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              ✕ Limpar
            </button>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={28} className="animate-spin text-blue-900" />
            </div>
          ) : sortedRows.length === 0 && !error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              Nenhuma corretora encontrada para os filtros atuais.
              <button onClick={clearFilters} className="mx-auto mt-4 block rounded-xl bg-[#002b5c] px-4 py-2 text-sm font-semibold text-white">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th onClick={() => toggleSort('corretora')} className="cursor-pointer select-none px-4 py-3 text-left font-semibold">Corretora <span className="text-xs opacity-60">{sortArrow('corretora')}</span></th>
                      <th className="px-4 py-3 text-left font-semibold">Prioridade</th>
                      <th onClick={() => toggleSort('qtd_anuncios')} className="cursor-pointer select-none px-4 py-3 text-right font-semibold">Anúncios <span className="text-xs opacity-60">{sortArrow('qtd_anuncios')}</span></th>
                      <th onClick={() => toggleSort('qtd_imas')} className="cursor-pointer select-none px-4 py-3 text-right font-semibold">Ímãs <span className="text-xs opacity-60">{sortArrow('qtd_imas')}</span></th>
                      <th className="px-4 py-3 text-left font-semibold">Reputação</th>
                      <th className="px-4 py-3 text-left font-semibold">Responsáveis</th>
                      <th className="px-4 py-3 text-left font-semibold">Coleta</th>
                      <th onClick={() => toggleSort('updated_at')} className="cursor-pointer select-none px-4 py-3 text-right font-semibold">Atualizado <span className="text-xs opacity-60">{sortArrow('updated_at')}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRows.map((row) => {
                      const p = prioridade(row);
                      const c = coletaStatus(row);
                      const propria = row.corretora === CORRETORA_PROPRIA;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setDetalhe(row)}
                          className={`cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 ${propria ? 'bg-green-50/60' : ''}`}
                        >
                          <td className="px-4 py-3 font-medium capitalize text-slate-800">
                            {row.corretora}
                            {propria && <span className="ml-2 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">Sua corretora</span>}
                          </td>
                          <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${p.cls}`}>{p.label}</span></td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.qtd_anuncios ?? '—'}</td>
                          <td className="px-4 py-3 text-right text-slate-700">{row.qtd_imas ?? '—'}</td>
                          <td className="max-w-[200px] truncate px-4 py-3 text-xs text-slate-500" title={hasValue(row.reputacao) ? row.reputacao : ''}>{hasValue(row.reputacao) ? row.reputacao : '—'}</td>
                          <td className="max-w-[160px] truncate px-4 py-3 text-xs text-slate-500" title={hasValue(row.responsaveis) ? row.responsaveis : ''}>{hasValue(row.responsaveis) ? row.responsaveis : '—'}</td>
                          <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${c.cls}`}>{c.label}</span></td>
                          <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-400">{formatDate(row.updated_at)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                Exibindo {sortedRows.length} de {rows.length} corretoras.
              </div>
            </div>
          )}
        </div>
      </main>

      {detalhe && <DetalheModal row={detalhe} onClose={() => setDetalhe(null)} />}
    </div>
  );
}

function DonutLegend({ data, colors }) {
  return (
    <ul className="mt-2 space-y-1">
      {data.map((item, index) => (
        <li key={item.name} className="flex items-center gap-2 text-xs text-slate-600">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: colors[index] }} />
          <span className="truncate">{item.name}</span>
          <span className="ml-auto font-semibold text-slate-800">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

function DetalheModal({ row, onClose }) {
  const propria = row.corretora === CORRETORA_PROPRIA;
  const p = prioridade(row);
  const c = coletaStatus(row);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative mx-auto mt-10 mb-10 max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 flex items-start justify-between rounded-t-2xl border-b border-slate-200 bg-white p-5">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold capitalize text-slate-800">
              {row.corretora}
              {propria && <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Sua corretora</span>}
            </h2>
            <p className="text-xs text-slate-500">
              <span className={`mr-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.cls}`}>{p.label}</span>
              <span className={`mr-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.cls}`}>{c.label}</span>
              Atualizado em {formatDate(row.updated_at)}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {!propria && (
            <div className="flex flex-wrap gap-3 border-b border-slate-100 pb-4 text-xs">
              {bibliotecasDeAds(row.corretora).map((b) => (
                <a key={b.plataforma} href={b.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline">
                  Ver no {b.plataforma}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-400">Anúncios / Ímãs</p><p className="font-medium">{row.qtd_anuncios ?? '—'} / {row.qtd_imas ?? '—'}</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-400">Preço de leads</p><p className="font-medium">{hasValue(row.preco) ? row.preco : '—'}</p></div>
          </div>

          {(row.natureza || row.cnpj || row.endereco || row.site || row.telefone || row.instagram || row.anuncios_ativos_estimado != null || row.google_ads_transparency_link || row.observacoes) && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Dados cadastrais</p>
              <div className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                {row.natureza && <div><span className="text-xs text-slate-400">Natureza: </span>{row.natureza}</div>}
                {row.cnpj && <div><span className="text-xs text-slate-400">CNPJ: </span>{row.cnpj}</div>}
                {row.telefone && <div><span className="text-xs text-slate-400">Telefone: </span>{row.telefone}</div>}
                {row.anuncios_ativos_estimado != null && <div><span className="text-xs text-slate-400">Anúncios ativos (estimado): </span>{row.anuncios_ativos_estimado}</div>}
                {row.endereco && <div className="sm:col-span-2"><span className="text-xs text-slate-400">Endereço: </span>{row.endereco}</div>}
                {row.site && (
                  <div>
                    <span className="text-xs text-slate-400">Site: </span>
                    <a href={row.site.startsWith('http') ? row.site : `https://${row.site}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{row.site}</a>
                  </div>
                )}
                {row.instagram && (
                  <div>
                    <span className="text-xs text-slate-400">Instagram/Redes: </span>
                    {row.instagram.startsWith('http') ? (
                      <a href={row.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Ver perfil</a>
                    ) : row.instagram}
                  </div>
                )}
                {row.google_ads_transparency_link && (
                  <div className="sm:col-span-2">
                    <a href={row.google_ads_transparency_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-700 hover:underline">
                      Ver no Google Ads Transparency Center
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
                {row.observacoes && <div className="sm:col-span-2 text-slate-600">{row.observacoes}</div>}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {SECTIONS.map((section) => {
              const items = parseField(row[section.key]);
              return (
                <div key={section.key}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{section.label}</p>
                  {items.length === 0 ? (
                    <p className="text-sm text-slate-400">Sem dados</p>
                  ) : (
                    <ul className="space-y-1">
                      {items.map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-700">
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-700 hover:underline">
                              {item.label || item.url}
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            item.label
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
