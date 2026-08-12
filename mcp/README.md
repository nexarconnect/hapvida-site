# monitor-corretoras (MCP Server)

Servidor MCP (Model Context Protocol) para cadastro e monitoramento de
corretoras parceiras: status de vendas, adimplência e situação cadastral.

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
| `listar_corretoras`          | Lista corretoras cadastradas, com filtro opcional por status.          |
| `obter_corretora`            | Retorna os detalhes de uma corretora pelo código.                      |
| `cadastrar_corretora`        | Cadastra uma nova corretora para monitoramento.                        |
| `atualizar_status_corretora` | Atualiza o status (`ativa`, `em_analise`, `inadimplente`, `bloqueada`). |
| `listar_alertas`             | Lista corretoras inadimplentes ou bloqueadas.                          |
| `resumo_status`              | Retorna a contagem de corretoras por status.                           |

Os dados são persistidos em `corretoras.json`, no mesmo diretório.
