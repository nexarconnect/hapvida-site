import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import { Loader2, RefreshCw, ExternalLink, Search } from 'lucide-react';

const SECTIONS = [
  { key: 'preco', label: 'Preço de leads' },
  { key: 'anuncios', label: 'Anúncios' },
  { key: 'imas', label: 'Ímãs de leads' },
  { key: 'reputacao', label: 'Reputação' },
  { key: 'novidades', label: 'Novidades' },
];

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString('pt-BR');
  } catch {
    return value;
  }
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

function hasAnyData(row) {
  return SECTIONS.some((s) => parseField(row[s.key]).length > 0);
}

export default function AdminCorretoras() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadData = async () => {
    if (!supabase) {
      setError('Supabase não configurado.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('corretoras_monitoramento')
      .select('*')
      .order('corretora', { ascending: true });

    if (err) {
      console.error('Erro ao buscar corretoras monitoradas:', err);
      setError('Não foi possível carregar os dados. A tabela corretoras_monitoramento existe no Supabase?');
      setRows([]);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) => r.corretora?.toLowerCase().includes(term));
  }, [rows, search]);

  const summary = useMemo(() => {
    const total = rows.length;
    const comDados = rows.filter(hasAnyData).length;
    const lastUpdate = rows.reduce((max, r) => {
      if (!r.updated_at) return max;
      return !max || new Date(r.updated_at) > new Date(max) ? r.updated_at : max;
    }, null);
    return { total, comDados, semDados: total - comDados, lastUpdate };
  }, [rows]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Corretoras monitoradas</h1>
              <p className="text-sm text-slate-500">
                Preço de leads, anúncios, ímãs de leads, reputação e novidades das corretoras concorrentes.
              </p>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 self-start rounded-xl bg-[#002b5c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b7d] disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Recarregar
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Corretoras cadastradas</p>
              <p className="mt-1 text-2xl font-black text-slate-800">{summary.total}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Com algum dado coletado</p>
              <p className="mt-1 text-2xl font-black text-green-600">{summary.comDados}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Última atualização</p>
              <p className="mt-1 text-lg font-bold text-slate-800">{formatDate(summary.lastUpdate)}</p>
            </div>
          </div>

          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar corretora..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10"
            />
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
          ) : filteredRows.length === 0 && !error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              Nenhuma corretora encontrada.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRows.map((row) => (
                <CorretoraCard key={row.corretora} row={row} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CorretoraCard({ row }) {
  const withData = hasAnyData(row);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold capitalize text-slate-800">{row.corretora}</h2>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              withData ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {withData ? 'Dados coletados' : 'Sem dados ainda'}
          </span>
          <span className="text-xs text-slate-400">Atualizado {formatDate(row.updated_at)}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SECTIONS.map((section) => {
          const items = parseField(row[section.key]);
          return (
            <div key={section.key}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {section.label}
              </p>
              {items.length === 0 ? (
                <p className="text-sm text-slate-400">Sem dados</p>
              ) : (
                <ul className="space-y-1">
                  {items.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-700">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                        >
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
  );
}
