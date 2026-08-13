-- Cria a tabela analytics_events, que alimenta o dashboard /admin/analytics.
--
-- Hoje trackAnalyticsEvent() (src/lib/supabase.js) já chama fbq/gtag no
-- cliente, mas não grava nada em lugar nenhum — os eventos somem depois do
-- fbq/gtag disparar, então não dá pra ver histórico nem cruzar com o funil
-- de leads dentro do próprio admin. Esta tabela passa a guardar cada clique
-- rastreado (solicitar_cotacao, whatsapp_click, area_beneficiario_click,
-- selecionar_plano, generate_lead, etc.) para consulta e gráficos.
--
-- Rode este script manualmente no SQL editor do Supabase (este projeto não
-- tem migrations automatizadas). Depois de rodar, o código já está pronto
-- para gravar e o /admin/analytics já está pronto pra ler.

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_name text not null,
  placement text,
  path text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_name_idx
  on public.analytics_events (event_name);

alter table public.analytics_events enable row level security;

-- O site público grava eventos usando a chave anon (mesmo padrão da tabela
-- leads) — só INSERT, nunca leitura.
create policy "analytics_events_public_insert"
  on public.analytics_events
  for insert
  to anon
  with check (true);

-- Só o admin autenticado (login em /login) pode ler os eventos.
create policy "analytics_events_authenticated_select"
  on public.analytics_events
  for select
  to authenticated
  using (true);
