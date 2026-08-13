import requests
import argparse
import logging
import json
import sys
from typing import List, Dict, Any

# Configuração do logging para salvar em migrate.log
logging.basicConfig(filename='migrate.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Função para obter credenciais (chaves API para nuvem e local)
def get_credentials() -> tuple[str, str]:
    # Solicita as chaves API do usuário
    cloud_api_key = input('Digite a chave API do n8n Cloud: ').strip()
    local_api_key = input('Digite a chave API da instância local (localhost:5678): ').strip()
    return cloud_api_key, local_api_key

# Função para listar todos os workflows da nuvem com paginação
def list_cloud_workflows(cloud_api_key: str, base_url: str = 'https://api.n8n.io') -> List[Dict[str, Any]]:
    workflows = []
    skip = 0
    limit = 50  # Limite por página, ajuste se necessário
    headers = {'X-N8N-API-KEY': cloud_api_key}
    
    while True:
        params = {'skip': skip, 'limit': limit}
        response = requests.get(f'{base_url}/rest/workflows', headers=headers, params=params)
        if response.status_code == 401:
            logging.error('Erro 401: Credenciais inválidas para n8n Cloud.')
            raise ValueError('Credenciais inválidas para n8n Cloud.')
        elif response.status_code != 200:
            logging.error(f'Erro ao listar workflows: {response.status_code} - {response.text}')
            raise RuntimeError(f'Erro ao listar workflows: {response.status_code}')
        
        data = response.json()
        workflows.extend(data.get('data', []))
        if len(data.get('data', [])) < limit:
            break
        skip += limit
    
    logging.info(f'Encontrados {len(workflows)} workflows na nuvem.')
    return workflows

# Função para exportar um workflow da nuvem
def export_workflow(workflow_id: str, cloud_api_key: str, base_url: str = 'https://api.n8n.io') -> Dict[str, Any]:
    headers = {'X-N8N-API-KEY': cloud_api_key}
    response = requests.get(f'{base_url}/rest/workflows/{workflow_id}', headers=headers)
    if response.status_code == 401:
        logging.error('Erro 401: Credenciais inválidas para n8n Cloud.')
        raise ValueError('Credenciais inválidas para n8n Cloud.')
    elif response.status_code == 404:
        logging.error(f'Erro 404: Workflow {workflow_id} não encontrado na nuvem.')
        raise ValueError(f'Workflow {workflow_id} não encontrado.')
    elif response.status_code != 200:
        logging.error(f'Erro ao exportar workflow {workflow_id}: {response.status_code} - {response.text}')
        raise RuntimeError(f'Erro ao exportar workflow {workflow_id}: {response.status_code}')
    
    logging.info(f'Workflow {workflow_id} exportado com sucesso.')
    return response.json()

# Função para importar um workflow para a instância local
def import_workflow(workflow_data: Dict[str, Any], local_api_key: str, local_url: str = 'http://localhost:5678') -> bool:
    headers = {'X-N8N-API-KEY': local_api_key, 'Content-Type': 'application/json'}
    # Remove campos que podem causar conflito, como id
    workflow_to_import = {k: v for k, v in workflow_data.items() if k not in ['id', 'createdAt', 'updatedAt']}
    response = requests.post(f'{local_url}/rest/workflows', headers=headers, data=json.dumps(workflow_to_import))
    if response.status_code == 401:
        logging.error('Erro 401: Credenciais inválidas para instância local.')
        raise ValueError('Credenciais inválidas para instância local.')
    elif response.status_code != 200:
        logging.error(f'Erro ao importar workflow: {response.status_code} - {response.text}')
        return False
    
    logging.info(f'Workflow {workflow_data.get("name", "Desconhecido")} importado com sucesso.')
    return True

# Função principal com argparse para --dry-run
def main():
    parser = argparse.ArgumentParser(description='Migrar workflows do n8n Cloud para instância local.')
    parser.add_argument('--dry-run', action='store_true', help='Executar em modo dry-run (apenas listar, não migrar).')
    args = parser.parse_args()
    
    try:
        # Obter credenciais
        cloud_api_key, local_api_key = get_credentials()
        
        # Listar workflows da nuvem
        workflows = list_cloud_workflows(cloud_api_key)
        
        if args.dry_run:
            print(f'Modo dry-run: {len(workflows)} workflows encontrados.')
            logging.info(f'Dry-run: {len(workflows)} workflows listados.')
            return
        
        # Migrar workflows
        migrated_count = 0
        for wf in workflows:
            try:
                wf_data = export_workflow(wf['id'], cloud_api_key)
                if import_workflow(wf_data, local_api_key):
                    migrated_count += 1
            except Exception as e:
                logging.error(f'Erro ao migrar workflow {wf["id"]}: {str(e)}')
        
        print(f'Migração concluída: {migrated_count} de {len(workflows)} workflows migrados com sucesso.')
        logging.info(f'Migração concluída: {migrated_count} workflows migrados.')
    
    except Exception as e:
        logging.error(f'Erro geral: {str(e)}')
        print(f'Erro: {str(e)}')
        sys.exit(1)

if __name__ == '__main__':
    main()

