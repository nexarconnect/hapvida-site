"""
Servidor MCP para monitoramento de corretoras parceiras Hapvida.

Expõe ferramentas para cadastrar, consultar e monitorar o status de
corretoras (ativa, inadimplente, em análise, bloqueada), permitindo que
um assistente de IA (Claude, etc.) consulte e atualize esses dados via
protocolo MCP (Model Context Protocol).

Uso:
    python monitor_corretoras.py

Os dados são persistidos em `corretoras.json`, no mesmo diretório deste
script.
"""

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from mcp.server.fastmcp import FastMCP

DATA_FILE = Path(__file__).parent / "corretoras.json"

StatusCorretora = Literal["ativa", "em_analise", "inadimplente", "bloqueada"]

mcp = FastMCP("monitor-corretoras")


def _carregar_dados() -> dict:
    if not DATA_FILE.exists():
        return {"corretoras": []}
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def _salvar_dados(dados: dict) -> None:
    DATA_FILE.write_text(
        json.dumps(dados, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def _agora() -> str:
    return datetime.now(timezone.utc).isoformat()


def _buscar_corretora(dados: dict, codigo: str) -> dict | None:
    return next((c for c in dados["corretoras"] if c["codigo"] == codigo), None)


@mcp.tool()
def listar_corretoras(status: StatusCorretora | None = None) -> list[dict]:
    """Lista as corretoras cadastradas, opcionalmente filtrando por status."""
    dados = _carregar_dados()
    corretoras = dados["corretoras"]
    if status:
        corretoras = [c for c in corretoras if c["status"] == status]
    return corretoras


@mcp.tool()
def obter_corretora(codigo: str) -> dict:
    """Retorna os detalhes de uma corretora pelo código."""
    dados = _carregar_dados()
    corretora = _buscar_corretora(dados, codigo)
    if corretora is None:
        raise ValueError(f"Corretora '{codigo}' não encontrada.")
    return corretora


@mcp.tool()
def cadastrar_corretora(
    codigo: str,
    nome: str,
    cidade: str,
    estado: str,
    status: StatusCorretora = "em_analise",
) -> dict:
    """Cadastra uma nova corretora parceira para monitoramento."""
    dados = _carregar_dados()
    if _buscar_corretora(dados, codigo) is not None:
        raise ValueError(f"Corretora '{codigo}' já cadastrada.")

    corretora = {
        "codigo": codigo,
        "nome": nome,
        "cidade": cidade,
        "estado": estado,
        "status": status,
        "criado_em": _agora(),
        "atualizado_em": _agora(),
        "historico": [{"status": status, "em": _agora()}],
    }
    dados["corretoras"].append(corretora)
    _salvar_dados(dados)
    return corretora


@mcp.tool()
def atualizar_status_corretora(codigo: str, status: StatusCorretora) -> dict:
    """Atualiza o status de uma corretora (ativa, em_analise, inadimplente, bloqueada)."""
    dados = _carregar_dados()
    corretora = _buscar_corretora(dados, codigo)
    if corretora is None:
        raise ValueError(f"Corretora '{codigo}' não encontrada.")

    corretora["status"] = status
    corretora["atualizado_em"] = _agora()
    corretora["historico"].append({"status": status, "em": _agora()})
    _salvar_dados(dados)
    return corretora


@mcp.tool()
def listar_alertas() -> list[dict]:
    """Lista corretoras que exigem atenção (inadimplentes ou bloqueadas)."""
    dados = _carregar_dados()
    return [
        c for c in dados["corretoras"] if c["status"] in ("inadimplente", "bloqueada")
    ]


@mcp.tool()
def resumo_status() -> dict[str, int]:
    """Retorna a contagem de corretoras por status."""
    dados = _carregar_dados()
    resumo: dict[str, int] = {}
    for c in dados["corretoras"]:
        resumo[c["status"]] = resumo.get(c["status"], 0) + 1
    return resumo


if __name__ == "__main__":
    mcp.run()
