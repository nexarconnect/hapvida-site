# Painel Monitor de Corretoras (local, standalone)

Ferramenta separada do site React — **não é servida em tabelaplanosaude.com.br**.
É um serviço FastAPI + dashboard.html estático que roda só localmente, na sua
máquina, e faz buscas ao vivo no DuckDuckGo sobre as corretoras concorrentes
(preço de leads, anúncios, ímãs de leads, reputação, novidades), além de links
diretos para a Meta Ad Library e o Google Ads Transparency Center.

Não confundir com `mcp/monitor_corretoras.py` (servidor MCP usado pelo Claude
dentro das sessões) nem com a página `/admin/corretoras` do site (que lê da
tabela `corretoras_monitoramento` do Supabase). São três caminhos diferentes
pro mesmo tipo de dado — este aqui é o único com gráficos e exportação CSV.

## Rodar

```bash
pip install -r requirements.txt
python server.py
```

Abre em http://localhost:8000.

## Como ler os selos de "Situação"

- **com resultado** — a busca rodou e achou algo.
- **sem dados** — a busca rodou e genuinamente não achou nada específico da
  corretora.
- **busca bloqueada** — o DuckDuckGo recusou a chamada (limite de
  requisições). *Não* significa ausência de dado — o `server.py` já tenta de
  novo 3x com espera crescente antes de marcar como bloqueada, mas em lotes
  grandes (17 corretoras × 5 dimensões = 85 buscas) ainda pode sobrar alguma.
  Se aparecer um aviso amarelo no topo do painel com bloqueios, rode de novo
  mais tarde ou filtre por uma corretora só.

## Ruído esperado

A busca é uma pesquisa genérica por nome — corretoras com nomes comuns
(webplan, drv, joov, nexar...) trazem resultados de empresas homônimas de
outros setores junto com o que interessa. Confira o link antes de confiar no
título.

## Corretora própria

"nexar" está na lista marcada como a própria corretora da Amanda (não
concorrente) — aparece destacada em verde na tabela e com a tag "(sua)".
