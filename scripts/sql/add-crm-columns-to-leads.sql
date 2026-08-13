-- Adiciona status de CRM e atribuição de campanha (UTM) à tabela leads.
--
-- Usado pelo Kanban em /admin/crm (status/lost_reason/last_contacted_at) e
-- pela quebra por origem de campanha em /admin/analytics (utm_*).
--
-- IMPORTANTE: rode este script ANTES de publicar o deploy que inclui as
-- mudanças de src/lib/supabase.js (saveLead/updateLeadStatus) — o insert de
-- lead passou a mandar a coluna "status" direto, e se ela não existir ainda
-- o INSERT inteiro falha (o lead não é salvo). Mesma ordem já usada nas
-- outras migrações manuais deste projeto (ver scripts/sql/*.sql).
--
-- Rode este script manualmente no SQL editor do Supabase (este projeto não
-- tem migrations automatizadas).

alter table public.leads
  add column if not exists status text not null default 'novo',
  add column if not exists lost_reason text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text;

-- Leads que já existiam antes desta coluna existir contam como "novo" pelo
-- default acima; sem isso o Kanban trataria valor nulo como coluna própria.
update public.leads set status = 'novo' where status is null;

alter table public.leads
  add constraint leads_status_check
  check (status in ('novo', 'contatado', 'negociando', 'fechado', 'perdido'));

create index if not exists leads_status_idx on public.leads (status);
