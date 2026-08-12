-- Adiciona a coluna "responsaveis" à tabela corretoras_monitoramento.
--
-- Guarda quem está por trás da marca/campanhas de cada corretora monitorada
-- (agência de tráfego pago, agência de marketing, designer, desenvolvedor
-- do site, etc.), no mesmo formato de string usado pelas outras colunas:
-- "Título | URL" por item, múltiplos itens separados por "||", ou o
-- literal "sem dados" quando nada foi encontrado.
--
-- Rode este script manualmente no SQL editor do Supabase (este projeto não
-- tem migrations automatizadas). Depois de rodar, scripts/sync-corretoras.js
-- já está pronto para popular a coluna a partir do JSON coletado.

alter table public.corretoras_monitoramento
  add column if not exists responsaveis text;
