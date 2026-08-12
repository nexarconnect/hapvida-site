# monitor-corretoras (MCP Server)

Servidor MCP (Model Context Protocol) para monitoramento competitivo de
corretoras de planos de saúde: preço de leads, anúncios, materiais de
captação, reputação, novidades e descoberta de novos concorrentes.

Os dados são obtidos por busca pública via DuckDuckGo (`duckduckgo-search`),
sem necessidade de API key.

## Instalação

```bash
cd mcp
pip install -r requirements.txt
```

## Execução manual

```bash
python monitor_corretoras.py
```

## Configuração em um cliente MCP (Claude Desktop, etc.)

Adicione ao arquivo de configuração do cliente (ajuste o caminho absoluto
conforme seu sistema operacional):

```json
{
  "mcpServers": {
    "monitor-corretoras": {
      "command": "python",
      "args": ["/caminho/completo/para/hapvida-site/mcp/monitor_corretoras.py"]
    }
  }
}
```

No Windows, use barras duplas ou barras normais no caminho, por exemplo:
`"C:\\Users\\seu-usuario\\hapvida-site\\mcp\\monitor_corretoras.py"` ou
`"C:/Users/seu-usuario/hapvida-site/mcp/monitor_corretoras.py"`.

## Ferramentas disponíveis

| Ferramenta                  | Descrição                                                             |
| ---------------------------- | ---------------------------------------------------------------------- |
| `descobrir_concorrentes`     | Procura novos concorrentes no mercado por região/foco.                 |
| `sugerir_concorrentes_nicho` | Sugere concorrentes conhecidos por nicho/região.                       |
| `comparar_corretoras`        | Compara todas as corretoras cadastradas em uma dimensão.               |
| `relatorio_estruturado`      | Retorna relatório CSV completo de uma corretora.                       |
| `preco_leads`                | Pesquisa preço de leads de uma corretora.                              |
| `anuncios`                   | Pesquisa anúncios/ofertas de uma corretora.                            |
| `imas_de_leads`              | Pesquisa materiais de captação (simuladores, cotações).                |
| `reputacao`                  | Pesquisa reputação/reclamações de uma corretora.                       |
| `novidades`                  | Pesquisa notícias recentes de uma corretora.                           |
| `analisar_ofertas`           | Analisa ofertas de captação (taxa de adesão, carência, promoções).     |
| `guia_monitorar_anuncios`    | Guia de fontes gratuitas para monitorar anúncios reais.                |
| `tabela_precos_leads`        | Benchmarks de preço/conversão de leads.                                |
| `benchmark_conversao`        | Benchmarks de conversão em campanhas.                                  |
| `lista_corretoras`           | Lista as corretoras atualmente monitoradas.                            |

A lista de corretoras monitoradas é editada diretamente na constante
`CORRETORAS`, em `monitor_corretoras.py`.
