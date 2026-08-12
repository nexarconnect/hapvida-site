"""
Servidor MCP para monitoramento competitivo de corretoras de planos de saúde.

Pesquisa dados públicos (via DuckDuckGo) sobre preço de leads, anúncios,
materiais de captação (ímãs de leads), reputação e novidades de corretoras
concorrentes, além de descobrir novos concorrentes no mercado.

Uso:
    python monitor_corretoras.py
"""

from mcp.server.fastmcp import FastMCP
from duckduckgo_search import DDGS

mcp = FastMCP("Monitor de Corretoras de Saúde")

# Lista de corretoras — edite aqui
CORRETORAS = [
    # Concorrentes diretos (interior de SP)
    "lancers planos", "jc luz", "webplan",
    "arpe corretora", "fortplanos", "alc saude rp",
    "masterseg", "ccs corretor",
    # Concorrentes nacionais / outros nichos
    "jocross", "drv", "salut corretora",
    "sg corretora", "ssc corretora", "joov",
    "costa brasil saude", "qualicorp",
]

# ============================================================
# HELPER: busca e formata saída estruturada
# ============================================================

def _buscar(consulta: str, max: int = 5) -> list:
    try:
        with DDGS() as ddgs:
            return [f"{r['title']} | {r.get('href', '')}" for r in ddgs.text(consulta, max_results=max)]
    except Exception:
        return ["sem dados"]

def _linha_csv(corretora: str, dimensao: str, resultados: list) -> str:
    itens = "||".join(resultados[:3]) if resultados else "sem dados"
    return f"{corretora};{dimensao};{itens}"

# ============================================================
# DESCOBERTA ATIVA DE NOVOS CONCORRENTES
# ============================================================

@mcp.tool()
def descobrir_concorrentes(regiao: str = "Brasil", foco: str = "corretora de planos de saúde") -> str:
    """Procura ativamente NOVOS concorrentes no mercado.
    Parâmetros: regiao (ex: 'interior de São Paulo', 'Nordeste') e foco (tipo de empresa).
    Retorna: nome_corretora;fonte — pronto para adicionar à lista."""
    consultas = [
        f"maiores {foco} {regiao} lista",
        f"corretoras {foco} {regiao} 2026",
        f"melhores {foco} {regiao} ranking",
        f"{foco} digital {regiao} online",
    ]
    encontrados = set()
    with DDGS() as ddgs:
        for q in consultas:
            for r in ddgs.text(q, max_results=6):
                nome = r['title'].split('|')[0].strip()
                encontrados.add(f"{nome};{r.get('href','')}")
    return "nome_corretora;fonte\n" + "\n".join(list(encontrados)[:15])

@mcp.tool()
def sugerir_concorrentes_nicho() -> str:
    """Sugere concorrentes por nicho/região do setor de planos de saúde."""
    return (
        "Sugestões para adicionar à lista:\n"
        "- Lancers (Ribeirão Preto + Rio Preto, 5 estados) — líder digital regional\n"
        "- JC Luz (São José do Rio Preto)\n"
        "- WebPlan (Ribeirão Preto/Campinas)\n"
        "- FortPlanos (comparador online, 40+ operadoras)\n"
        "- Unimed Campinas (compra 100% online)\n"
        "- Qualicorp (administradora líder nacional)\n"
        "- Joov (plataforma 100% online)\n"
        "- Salut, SG, SSC (top 3 do ranking de corretoras de saúde)\n\n"
        "Dica: rode 'descobrir_concorrentes' com regiao='interior de São Paulo' "
        "para achar mais concorrentes regionais."
    )

# ============================================================
# COMPARAÇÃO LADO A LADO
# ============================================================

@mcp.tool()
def comparar_corretoras(dimensao: str = "preco") -> str:
    """Compara TODAS as corretoras em uma dimensão: preco | anuncios | imas | reputacao | novidades."""
    consultas = {
        "preco": lambda c: f"{c} lead plano de saúde preço custo",
        "anuncios": lambda c: f"{c} plano de saúde anúncio oferta promoção",
        "imas": lambda c: f"{c} plano de saúde simulador cotação material gratuito",
        "reputacao": lambda c: f"{c} corretora reclamações avaliação reclame aqui",
        "novidades": lambda c: f"{c} plano de saúde",
    }
    if dimensao not in consultas:
        return "Dimensão inválida. Use: preco | anuncios | imas | reputacao | novidades"
    linhas = []
    for c in CORRETORAS:
        res = _buscar(consultas[dimensao](c))
        linhas.append(_linha_csv(c, dimensao, res))
    return "corretora;dimensao;resultados\n" + "\n".join(linhas)

# ============================================================
# RELATÓRIO ESTRUTURADO POR CORRETORA
# ============================================================

@mcp.tool()
def relatorio_estruturado(corretora: str = "") -> str:
    """Retorna TODOS os dados de uma corretora em CSV completo."""
    alvo = corretora or CORRETORAS[0]
    campos = {
        "preco": f"{alvo} lead plano de saúde preço custo",
        "anuncios": f"{alvo} plano de saúde anúncio oferta promoção",
        "imas": f"{alvo} plano de saúde simulador cotação material gratuito",
        "reputacao": f"{alvo} corretora reclamações avaliação",
        "novidades": f"{alvo} plano de saúde notícia",
    }
    valores = []
    for campo, consulta in campos.items():
        res = _buscar(consulta, max=3)
        valores.append("||".join(res[:2]) if res else "sem dados")
    return f"corretora;preco;anuncios;imas;reputacao;novidades\n{alvo};" + ";".join(valores)

# ============================================================
# FERRAMENTAS INDIVIDUAIS
# ============================================================

@mcp.tool()
def preco_leads(corretora: str = "") -> str:
    alvo = corretora or CORRETORAS[0]
    res = _buscar(f"{alvo} lead plano de saúde preço custo")
    return f"corretora;preco;fonte\n{alvo};" + "||".join(res[:3])

@mcp.tool()
def anuncios(corretora: str = "") -> str:
    alvo = corretora or CORRETORAS[0]
    res = _buscar(f"{alvo} plano de saúde anúncio oferta promoção")
    return f"corretora;anuncio;link\n{alvo};" + "||".join(res[:3])

@mcp.tool()
def imas_de_leads(corretora: str = "") -> str:
    alvo = corretora or CORRETORAS[0]
    res = _buscar(f"{alvo} plano de saúde simulador cotação material gratuito")
    return f"corretora;ima;fonte\n{alvo};" + "||".join(res[:3])

@mcp.tool()
def reputacao(corretora: str = "") -> str:
    alvo = corretora or CORRETORAS[0]
    res = _buscar(f"{alvo} corretora reclamações avaliação reclame aqui")
    return f"corretora;reclamacao;fonte\n{alvo};" + "||".join(res[:3])

@mcp.tool()
def novidades(corretora: str = "") -> str:
    alvo = corretora or CORRETORAS[0]
    with DDGS() as ddgs:
        res = [f"{r['title']} | {r.get('url','')}" for r in ddgs.news(f"{alvo} plano de saúde", max_results=3)]
    return f"corretora;noticia;link\n{alvo};" + "||".join(res)

# ============================================================
# ANÁLISE DE OFERTAS (foco em promoção/captação)
# ============================================================

@mcp.tool()
def analisar_ofertas(corretora: str = "") -> str:
    """Analisa as ofertas de captação da corretora: taxa de adesão, carência, promoções.
    Retorna CSV: corretora;oferta;detalhe"""
    alvo = corretora or CORRETORAS[0]
    consultas = [
        f"{alvo} taxa de adesão zero sem carência",
        f"{alvo} plano de saúde promoção desconto",
        f"{alvo} mude sem carência portabilidade",
    ]
    linhas = []
    with DDGS() as ddgs:
        for q in consultas:
            for r in ddgs.text(q, max_results=3):
                linhas.append(f"{alvo};{r['title']};{r.get('href','')}")
    if not linhas:
        return f"corretora;oferta;detalhe\n{alvo};sem dados;"
    return "corretora;oferta;detalhe\n" + "\n".join(linhas[:9])

# ============================================================
# GUIA DE MONITORAMENTO DE ANÚNCIOS
# ============================================================

@mcp.tool()
def guia_monitorar_anuncios() -> str:
    """Guia de como monitorar anúncios reais dos concorrentes (fontes gratuitas)."""
    return (
        "Como ver anúncios reais dos concorrentes (gratuito):\n"
        "1. Meta Ad Library (facebook.com/ads/library): digite o nome da corretora, "
        "país Brasil, veja anúncios ativos em FB/IG/Messenger\n"
        "2. Google Ads Transparency Center (adstransparency.google.com): anúncios ativos no Google\n"
        "3. AdsLibrary.ai: histórico de anúncios de marcas\n\n"
        "O que observar: ofertas (taxa zero, sem carência), CTAs, landing pages, "
        "frequência de troca de criativos (fadiga de anúncio)"
    )

# ============================================================
# BENCHMARKS + GESTÃO
# ============================================================

@mcp.tool()
def tabela_precos_leads() -> str:
    return (
        "tipo_lead;preco;conversao\n"
        "comprado;R$ 20-35;2-3%\n"
        "proprio_google_ads;R$ 12-25;5-7%\n"
        "cac_comprado;R$ 667-1750;-\n"
        "tendencia;leads mais caros em 2026;-"
    )

@mcp.tool()
def benchmark_conversao() -> str:
    return (
        "metrica;valor\n"
        "conversao_google_ads_busca;5-7%\n"
        "ctr_medio_google_ads;6,64%\n"
        "cpc_medio;US$ 5,42\n"
        "resposta_rapida_5min;9x mais conversao\n"
        "corretores_sem_crm_perdem_leads;87%\n"
        "crm_vs_planilha;3,5x mais conversao"
    )

@mcp.tool()
def lista_corretoras() -> str:
    return "\n".join(f"- {c}" for c in CORRETORAS)


if __name__ == "__main__":
    mcp.run()
