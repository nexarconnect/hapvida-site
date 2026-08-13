import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle2, XCircle, Loader2, ExternalLink } from 'lucide-react';

const GITHUB_RUNS_URL =
  'https://api.github.com/repos/nexarconnect/hapvida-site/actions/runs?per_page=1&status=completed';
const GITHUB_ACTIONS_URL = 'https://github.com/nexarconnect/hapvida-site/actions';
const SUPABASE_DASHBOARD_URL = 'https://supabase.com/dashboard/project/lnfwneozblwrfmqezeqr';

function formatRelative(dateStr) {
  if (!dateStr) return '-';
  const hours = (Date.now() - new Date(dateStr).getTime()) / 36e5;
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min atrás`;
  if (hours < 24) return `${Math.round(hours)}h atrás`;
  return `${Math.round(hours / 24)}d atrás`;
}

/**
 * Painel de saúde do site: Supabase pode pausar por inatividade (já
 * aconteceu mais de uma vez neste projeto) e o deploy pode falhar sem
 * ninguém notar até um cliente reclamar — este painel dá visibilidade sem
 * precisar checar o Supabase dashboard e o GitHub Actions manualmente.
 *
 * A chamada à API do GitHub é pública e sem token de propósito: o repo é
 * público, então isso funciona direto do navegador sem expor credencial
 * nenhuma no bundle do site.
 */
export default function SiteHealthPanel() {
  const [supabaseStatus, setSupabaseStatus] = useState('checking');
  const [supabaseLatency, setSupabaseLatency] = useState(null);
  const [deploy, setDeploy] = useState(null);
  const [deployStatus, setDeployStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;

    async function checkSupabase() {
      if (!supabase) {
        setSupabaseStatus('unconfigured');
        return;
      }
      const start = performance.now();
      try {
        const { error } = await supabase.from('config').select('id').limit(1);
        if (cancelled) return;
        setSupabaseLatency(Math.round(performance.now() - start));
        setSupabaseStatus(error ? 'down' : 'up');
      } catch {
        if (!cancelled) setSupabaseStatus('down');
      }
    }

    async function checkDeploy() {
      try {
        const res = await fetch(GITHUB_RUNS_URL);
        if (!res.ok) throw new Error('github api error');
        const data = await res.json();
        const run = data.workflow_runs?.[0];
        if (cancelled) return;
        if (!run) {
          setDeployStatus('unknown');
          return;
        }
        setDeploy(run);
        setDeployStatus(run.conclusion === 'success' ? 'up' : 'down');
      } catch {
        if (!cancelled) setDeployStatus('unknown');
      }
    }

    checkSupabase();
    checkDeploy();

    return () => { cancelled = true; };
  }, []);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <HealthCard
        title="Supabase"
        status={supabaseStatus}
        upLabel={supabaseLatency !== null ? `Operacional (${supabaseLatency}ms)` : 'Operacional'}
        downLabel="Indisponível — pode ter sido pausado por inatividade"
        checkingLabel="Verificando..."
        link={SUPABASE_DASHBOARD_URL}
        linkLabel="Abrir dashboard"
      />
      <HealthCard
        title="Último deploy"
        status={deployStatus}
        upLabel={deploy ? `Sucesso · ${formatRelative(deploy.updated_at)}` : 'Sucesso'}
        downLabel={deploy ? `Falhou · ${formatRelative(deploy.updated_at)}` : 'Último deploy falhou'}
        checkingLabel="Verificando..."
        link={deploy?.html_url || GITHUB_ACTIONS_URL}
        linkLabel="Ver no GitHub Actions"
      />
    </section>
  );
}

function HealthCard({ title, status, upLabel, downLabel, checkingLabel, link, linkLabel }) {
  const isChecking = status === 'checking';
  const isUp = status === 'up';
  const isUnknown = status === 'unknown' || status === 'unconfigured';

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {isChecking ? (
          <Loader2 size={20} className="animate-spin text-slate-300" />
        ) : isUp ? (
          <CheckCircle2 size={20} className="text-green-500" />
        ) : isUnknown ? (
          <CheckCircle2 size={20} className="text-slate-300" />
        ) : (
          <XCircle size={20} className="text-red-500" />
        )}
        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className={`text-xs ${isUp ? 'text-green-600' : isUnknown ? 'text-slate-400' : isChecking ? 'text-slate-400' : 'text-red-500'}`}>
            {isChecking ? checkingLabel : isUp ? upLabel : isUnknown ? 'Não foi possível verificar' : downLabel}
          </p>
        </div>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600"
        >
          {linkLabel}
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
