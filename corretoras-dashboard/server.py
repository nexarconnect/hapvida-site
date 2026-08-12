import os
import random
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import Optional
from duckduckgo_search import DDGS
import uvicorn

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI(title="Monitor de Corretoras API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "nexar" é a própria corretora da Amanda (tabelaplanosaude.com.br), não um
# concorrente — fica marcada para o painel poder destacá-la na comparação.
CORRETORA_PROPRIA = "nexar"

CORRETORAS = [
    "nexar", "lancers planos", "jc luz", "webplan", "arpe corretora",
    "fortplanos", "alc saude rp", "masterseg", "ccs corretor",
    "jocross", "drv", "salut corretora", "sg corretora",
    "ssc corretora", "joov", "costa brasil saude", "qualicorp",
]

DIMENSOES = {
    "preco": lambda c: f"{c} lead plano de saúde preço custo",
    "anuncios": lambda c: f"{c} plano de saúde anúncio oferta promoção",
    "imas": lambda c: f"{c} plano de saúde simulador cotação material gratuito",
    "reputacao": lambda c: f"{c} corretora reclamações avaliação reclame aqui",
    "novidades": lambda c: f"{c} plano de saúde",
}

def buscar(consulta: str, max: int = 3, tentativas: int = 3) -> dict:
    """Busca no DuckDuckGo distinguindo os três casos possíveis.

    Retorna {"status": ..., "titulos": [...]} onde status é:
      "ok"        — a busca rodou e trouxe resultados
      "vazio"     — a busca rodou e genuinamente não achou nada
      "bloqueado" — a busca falhou (rate limit / rede), NÃO é ausência de dado

    A distinção importa: engolir a exceção como "sem dados" faz o painel
    afirmar que a corretora não tem presença pública quando na verdade a
    busca só foi barrada. Em lote (17 corretoras x 5 dimensões) o DuckDuckGo
    bloqueia a maioria das chamadas, então isso não é caso raro.
    """
    erro = None
    for tentativa in range(tentativas):
        try:
            with DDGS() as ddgs:
                titulos = [r["title"] for r in ddgs.text(consulta, max_results=max)]
            return {"status": "ok" if titulos else "vazio", "titulos": titulos}
        except Exception as e:  # rate limit, timeout, mudança de layout etc.
            erro = e
            # Espera crescente com jitter antes de tentar de novo; sem isso as
            # chamadas em lote batem no limite do DuckDuckGo quase todas.
            time.sleep((2 ** tentativa) + random.uniform(0, 1))
    print(f"[busca bloqueada] {consulta!r}: {type(erro).__name__}: {erro}")
    return {"status": "bloqueado", "titulos": []}


def _linha(corretora: str, dimensao: str, res: dict) -> dict:
    if res["status"] == "ok":
        resultados = "||".join(res["titulos"][:3])
    elif res["status"] == "vazio":
        resultados = "sem dados"
    else:
        resultados = "busca bloqueada"
    return {
        "corretora": corretora,
        "dimensao": dimensao,
        "status": res["status"],
        "propria": corretora == CORRETORA_PROPRIA,
        "resultados": resultados,
    }

@app.get("/")
def raiz():
    return FileResponse(os.path.join(BASE_DIR, "dashboard.html"))

@app.get("/api/corretoras")
def listar_corretoras():
    return {"corretoras": CORRETORAS, "propria": CORRETORA_PROPRIA}

@app.get("/api/dados")
def obter_dados(corretora: Optional[str] = None, dimensao: Optional[str] = None):
    alvos = [corretora] if corretora else CORRETORAS
    dims = [dimensao] if dimensao else list(DIMENSOES.keys())
    resultados = []
    for c in alvos:
        for d in dims:
            if d not in DIMENSOES:
                continue
            resultados.append(_linha(c, d, buscar(DIMENSOES[d](c))))
    return {"dados": resultados}

def buscar_links(consulta: str, max: int = 4, tentativas: int = 3) -> dict:
    """Igual a buscar(), mas devolve título + href. Mesmo contrato de status."""
    erro = None
    for tentativa in range(tentativas):
        try:
            with DDGS() as ddgs:
                itens = [
                    {"titulo": r["title"], "link": r.get("href", "")}
                    for r in ddgs.text(consulta, max_results=max)
                ]
            return {"status": "ok" if itens else "vazio", "itens": itens}
        except Exception as e:
            erro = e
            time.sleep((2 ** tentativa) + random.uniform(0, 1))
    print(f"[busca bloqueada] {consulta!r}: {type(erro).__name__}: {erro}")
    return {"status": "bloqueado", "itens": []}


@app.get("/api/campanhas")
def campanhas(corretora: str = ""):
    """Links das campanhas online da corretora."""
    alvo = corretora or CORRETORAS[0]
    consultas = [
        f"{alvo} plano de saúde oferta landing page",
        f"{alvo} cotação online link",
        f"{alvo} promoção página",
    ]
    linhas = []
    bloqueadas = 0
    for q in consultas:
        res = buscar_links(q)
        if res["status"] == "bloqueado":
            bloqueadas += 1
            continue
        for item in res["itens"]:
            if item["link"].startswith("http"):
                linhas.append({
                    "corretora": alvo,
                    "campanha": item["titulo"],
                    "link": item["link"],
                })
    return {
        "dados": linhas[:12],
        "consultas_bloqueadas": bloqueadas,
        "total_consultas": len(consultas),
    }

@app.get("/api/bibliotecas")
def bibliotecas(corretora: str = ""):
    """Links diretos de busca nas bibliotecas de ads."""
    alvo = corretora or CORRETORAS[0]
    nome = alvo.replace(" ", "+")
    return {
        "dados": [
            {"plataforma": "Meta Ad Library",
             "link": f"https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&q={nome}"},
            {"plataforma": "Google Ads Transparency",
             "link": f"https://adstransparency.google.com/?region=BR&search_type=advertiser&query={nome}"},
        ]
    }

@app.get("/api/responsaveis")
def responsaveis(corretora: str = ""):
    """Quem faz o marketing da corretora (agência, designer, tráfego)."""
    alvo = corretora or CORRETORAS[0]
    consultas = [
        f"{alvo} agência de marketing digital",
        f"{alvo} tráfego pago agência",
        f"{alvo} case de sucesso marketing",
    ]
    linhas = []
    bloqueadas = 0
    for q in consultas:
        res = buscar_links(q, max=5)
        if res["status"] == "bloqueado":
            bloqueadas += 1
            continue
        for item in res["itens"]:
            linhas.append({"corretora": alvo, "papel": "marketing",
                           "nome": item["titulo"], "fonte": item["link"]})
    return {
        "dados": linhas[:12],
        "consultas_bloqueadas": bloqueadas,
        "total_consultas": len(consultas),
    }

@app.get("/api/descobrir")
def descobrir(regiao: str = "Brasil", foco: str = "corretora de planos de saúde"):
    consultas = [
        f"maiores {foco} {regiao} lista",
        f"corretoras {foco} {regiao} 2026",
        f"melhores {foco} {regiao} ranking",
    ]
    encontrados = set()
    bloqueadas = 0
    for q in consultas:
        res = buscar_links(q, max=6)
        if res["status"] == "bloqueado":
            bloqueadas += 1
            continue
        for item in res["itens"]:
            encontrados.add(item["titulo"].split("|")[0].strip())
    return {
        "concorrentes": list(encontrados)[:15],
        "consultas_bloqueadas": bloqueadas,
        "total_consultas": len(consultas),
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
