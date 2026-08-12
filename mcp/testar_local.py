"""
Script de teste local para o servidor "Monitor de Corretoras de Saúde".

Roda algumas ferramentas do monitor_corretoras.py diretamente (sem precisar
de um cliente MCP como Claude Desktop), útil para validar rapidamente se a
busca real (via DuckDuckGo) está funcionando na sua rede.

Uso:
    cd mcp
    pip install "mcp[cli]" duckduckgo-search
    python testar_local.py
"""

import monitor_corretoras as m

print("=== lista_corretoras ===")
print(m.lista_corretoras())

print("\n=== tabela_precos_leads (referência fixa, não usa rede) ===")
print(m.tabela_precos_leads())

print("\n=== preco_leads('lancers planos') — usa rede real ===")
print(m.preco_leads("lancers planos"))

print("\n=== anuncios('qualicorp') — usa rede real ===")
print(m.anuncios("qualicorp"))

print("\n=== reputacao('webplan') — usa rede real ===")
print(m.reputacao("webplan"))

print(
    "\nSe as três últimas ferramentas retornarem 'sem dados' em vez de "
    "resultados reais, verifique sua conexão com a internet ou aumente o "
    "timeout/retentativas da busca."
)
