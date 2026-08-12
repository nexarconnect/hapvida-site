import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_service_role);

// corretora: nome usado como chave pra casar com registros já existentes na
// tabela (pesquisados manualmente antes) — quando bate, só atualizamos os
// campos cadastrais novos, sem tocar em preco/anuncios/imas/reputacao/
// novidades/responsaveis já coletados. matchExistente é o nome como está
// hoje em corretoras_monitoramento; null significa que é entrada nova.
const ROWS = [
  { corretora: 'V4 Company S.A.', matchExistente: null, natureza: 'Agência de marketing digital', anuncios: '~800', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR05912651403595087873?region=BR', obs: 'Não é corretora' },
  { corretora: 'P9 Digital Comunicação Online Ltda', matchExistente: null, natureza: 'Agência de mídia digital', anuncios: '20', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR11019657892688035841?region=BR', obs: 'Não é corretora' },
  { corretora: 'Leads2B S/A', matchExistente: null, natureza: 'Plataforma de geração/venda de leads', anuncios: '~400', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR08802452614642925569?region=BR', obs: 'Possível origem de leads de planos de saúde' },
  { corretora: 'Linda Siria R C Serviços de Planos de Saúde Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '2', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR09098156637616603137?region=BR', obs: 'Entidade solicitada para adicionar' },
  { corretora: 'Qualicorp Consultoria e Corretora de Seguros S/A', matchExistente: 'qualicorp', natureza: 'Corretora de planos de saúde', anuncios: '~800', cnpj: '11.992.680/0001-93', endereco: 'Av. Paulista, 1106, São Paulo/SP', site: 'compre.qualicorp.com.br', telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR08630374904547508225?region=BR', obs: 'Sinal mais forte; tabela preços 2026, simulação online, canal do cliente' },
  { corretora: 'A2M Corretora de Seguros Ltda', matchExistente: null, natureza: 'Corretora de seguros (Hapvida/NDI)', anuncios: 'n/d', cnpj: '29.402.845/0001-95', endereco: 'Rua Abílio Soares 568, Paraíso, São Paulo/SP, CEP 04005-002', site: 'andreiaseguros.com.br', telefone: '(11) 7651-7051', instagram: null, link: 'https://adstransparency.google.com/advertiser/AR15362465051281719297?region=BR', obs: 'Filial = Andreia Machado Seguros' },
  { corretora: 'ASF Saúde (contratesaudeonline.com.br)', matchExistente: null, natureza: 'Corretora monomarca Hapvida', anuncios: 'n/d', cnpj: '50.289.319/0001-57', endereco: null, site: 'contratesaudeonline.com.br', telefone: null, instagram: null, link: null, obs: 'Certificação Diamante Hapvida; foco empresarial' },
  { corretora: 'DRV Corretora (Doutores em Vendas)', matchExistente: 'drv', natureza: 'Corretora monomarca Hapvida', anuncios: 'n/d', cnpj: '21.888.220/0001-73', endereco: 'Matriz Fortaleza/CE', site: 'drvcorretora.com.br', telefone: null, instagram: 'https://br.linkedin.com/company/drv-doutores-em-vendas', link: null, obs: 'Certificação Safira Hapvida (2026.1), campeã de vendas do Brasil' },
  { corretora: 'HAPPLAN Corretora de Seguros e Plano de Saúde Ltda', matchExistente: null, natureza: 'Corretora de seguros e planos de saúde', anuncios: '9', cnpj: '47.163.067/0001-00', endereco: 'Av. Cel. Virgílio Távora 1002, Loja 01, Itaitinga/CE', site: 'happlansaudeteresina.com.br', telefone: '(85) 8851-9582', instagram: 'https://www.instagram.com/happlan/', link: 'https://adstransparency.google.com/advertiser/AR18206906571550621697?region=BR', obs: 'Foco Hapvida Norte/Nordeste' },
  { corretora: 'Salud Planos de Saúde - Corretora de Seguros Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '2', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR18294191525459918849?region=BR', obs: 'Concorrente direta' },
  { corretora: '62.472.199 Otávio Albino da Silva', matchExistente: null, natureza: 'Corretor autônomo (PF/MEI)', anuncios: '2', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR14682572071922302977?region=BR', obs: 'Possível corretor de planos de saúde' },
  { corretora: 'Proasa Saúde', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '15', cnpj: '02.752.923/0001-25', endereco: 'SGA/SUL Qd 611, Av. L-3 Sul, Asa Sul, Brasília/DF', site: 'proasasaude.com.br', telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR09019670130371592193?region=BR', obs: 'Forte em vídeo; associação privada' },
  { corretora: 'Zelaris Consultoria de Saúde, Seguros e Benefícios Ltda', matchExistente: null, natureza: 'Consultoria/corretora de saúde e benefícios', anuncios: '72', cnpj: '27.881.710/0001-24', endereco: 'Av. Barão de Itapura 1518, Loja 1, Botafogo, Campinas/SP, CEP 13020-432', site: 'zelaris.com.br', telefone: '(19) 33...', instagram: null, link: 'https://adstransparency.google.com/advertiser/AR00360568216805703681?region=BR', obs: 'Multimarcas: Amil, Bradesco, SulAmérica, Unimed, NotreDame, etc.' },
  { corretora: 'Blue Light Corretora de Planos de Saúde Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '65', cnpj: '31.437.507/0001-30', endereco: 'Matriz RJ; filial Rua Sete de Abril 374, República, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR09173331132370911233?region=BR', obs: 'Reclamações no Reclame Aqui (propaganda enganosa)' },
  { corretora: 'Ampla Planos de Saúde Ltda', matchExistente: null, natureza: 'OPERADORA (ANS 42272-0)', anuncios: '~60', cnpj: '41.077.489/0001-87', endereco: 'Sede RJ; filial Alameda Rio Negro 500, Alphaville, Barueri/SP', site: 'amplasaude.com', telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR00884366012860858369?region=BR', obs: 'É operadora, não corretora' },
  { corretora: 'Planos de Saúde Senior Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '57', cnpj: '31.280.841/0001-23', endereco: 'Av. Afonso Pena 1967, Loja, Campo Grande/MS', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR16001305058188722177?region=BR', obs: 'Razão: Seguros SC Planos de Saúde Senior' },
  { corretora: 'S.A Benefícios Saúde Integradora Ltda', matchExistente: null, natureza: 'Corretora/integradora de planos de saúde', anuncios: '7', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR16734190787155197953?region=BR', obs: 'Concorrente direta' },
  { corretora: 'Lancers Administradora de Benefícios de Saúde Ltda', matchExistente: 'lancers planos', natureza: 'Administradora de benefícios de saúde', anuncios: '~79', cnpj: '17.827.384/0001-13', endereco: 'Rua Paschoal Bardaro 2055, Jardim Botânico, Ribeirão Preto/SP, CEP 14021-655', site: 'lancers.com.br', telefone: '0800 943 3331 / (16) 3771-1800', instagram: 'https://br.linkedin.com/company/lancersadministradora', link: 'https://adstransparency.google.com/search?region=BR&query=beneficio+saude', obs: 'Atua em 5 estados, 20 operadoras' },
  { corretora: 'DNA Care - Gestão de Benefícios e Saúde Ltda', matchExistente: null, natureza: 'Gestora de benefícios e saúde', anuncios: '~12', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=beneficio+saude', obs: 'Concorrente direta' },
  { corretora: 'Royal Saúde e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de saúde e benefícios', anuncios: '~10', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=beneficio+saude', obs: 'Concorrente direta' },
  { corretora: 'Prosper Saúde e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de saúde e benefícios', anuncios: '~7', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=beneficio+saude', obs: 'Concorrente direta' },
  { corretora: 'A. Gergen Corretora de Seguro Saúde Ltda', matchExistente: null, natureza: 'Corretora de seguros e saúde', anuncios: '~69', cnpj: '23.639.471/0001-40', endereco: 'Rua Coronel Vicente 340, Andar 02, Centro, Canoas/RS, CEP 92310-430', site: 'agergen.com.br', telefone: '(51) 2165-4488', instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'EPP; planos de saúde, dental e seguro saúde' },
  { corretora: 'Pilon Vida e Saúde Corretora de Seguros Ltda', matchExistente: null, natureza: 'Corretora de seguros e saúde', anuncios: '~47', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'New Plus Corretora de Seguros e Saúde Ltda', matchExistente: null, natureza: 'Corretora de seguros e saúde', anuncios: '~34', cnpj: '27.808.016/0001-81', endereco: 'Av. Ajarani, 491, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Global Corretora de Planos de Saúde Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '~21', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Top1000 Corretora de Plano de Saúde e Seguros Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde e seguros', anuncios: '~20', cnpj: '11.131.644/0001-35', endereco: 'SCS Quadra 06, Brasília/DF', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Brascare Saúde e Corretora de Seguros SS Ltda', matchExistente: null, natureza: 'Corretora de seguros e saúde', anuncios: '~18', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Concept Seg Corretora de Planos de Saúde EIRELI', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '~17', cnpj: '31.134.261/0001-28', endereco: 'Av. Paulista, 171, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'CM Corretora em Planos de Saúde Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde', anuncios: '~14', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Lion Corretora de Seguros e Planos de Saúde Ltda', matchExistente: null, natureza: 'Corretora de seguros e planos de saúde', anuncios: '~13', cnpj: '34.294.813/0001-53', endereco: 'Rua Quarenta, 8, Volta Redonda/RJ', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=corretora+saude', obs: 'Concorrente direta' },
  { corretora: 'Hapvida Assistência Médica S.A.', matchExistente: null, natureza: 'OPERADORA de planos de saúde', anuncios: '~1', cnpj: '44.649.812/0001-38', endereco: 'Fortaleza/CE', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=hapvida', obs: 'Operadora de referência, não concorrente' },
  { corretora: 'Integra Vita Gestão de Benefícios e Corretora de Seguros Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~35', cnpj: '10.913.869/0001-80', endereco: 'Rua Dr. Ramos de Azevedo, 159, Guarulhos/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Stark Sieg Consultoria e Corretora de Seguros e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~12', cnpj: '27.782.880/0001-51', endereco: 'Rua João Adolfo, 118, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Nudge Corretora de Seguros e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~9', cnpj: '56.966.859/0001-04', endereco: 'Rua Indiana, 437, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'AllBenefits Gestora de Benefícios e Corretora de Seguros de Vida Ltda', matchExistente: null, natureza: 'Gestora de benefícios e corretora', anuncios: '~8', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Interweg Corretora de Seguros e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~5', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Pillastri Corretora de Seguros e Gestão de Benefícios Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~4', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Fluyra Consultoria em Benefícios e Corretora de Seguros Ltda', matchExistente: null, natureza: 'Consultoria em benefícios e corretora', anuncios: '~4', cnpj: '62.385.397/0001-34', endereco: 'Rua Tuiuti, 718, São Paulo/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Ousi Corretora de Benefícios e Seguros Ltda', matchExistente: null, natureza: 'Corretora de benefícios e seguros', anuncios: '~3', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Heaolu Corretora e Administradora de Benefícios Ltda', matchExistente: null, natureza: 'Corretora e administradora de benefícios', anuncios: '~3', cnpj: '22.064.768/0001-61', endereco: 'Rua Pedro Alvim, 55-A, Atibaia/SP', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Stimus Benefícios e Corretora Ltda', matchExistente: null, natureza: 'Corretora de benefícios', anuncios: '~2', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Volponi Corretora de Seguros e Benefícios Ltda', matchExistente: null, natureza: 'Corretora de seguros e benefícios', anuncios: '~2', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/search?region=BR&query=Beneficios+Corretora', obs: 'Concorrente direta' },
  { corretora: 'Inova Empreendimentos e Participações Ltda (tabelaplanodesaude.com.br)', matchExistente: null, natureza: 'Corretora multioperadora de planos de saúde', anuncios: 'n/d', cnpj: '20.444.262/0001-52', endereco: 'Rua Barão de Itapetininga, 140, Andar 10, Sala 104, República, São Paulo/SP', site: 'tabelaplanodesaude.com.br', telefone: '(11) 5242-3342', instagram: null, link: null, obs: 'SUSEP 10.0669547 (Mônica Serra Silva) — ATENÇÃO: domínio quase idêntico ao nosso' },
  { corretora: 'Hapvendas Conceito Corretora Ltda', matchExistente: null, natureza: 'Corretora de planos de saúde (foco Hapvida)', anuncios: '5', cnpj: '07.739.274/0001-46', endereco: 'Av. João Lopes Galvão 52, Lagoa Nova/RN', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR16849466678587686913?region=BR', obs: 'Médio/Grande porte; foco Hapvida no RN' },
  { corretora: 'Webplan Corretora de Seguros Ltda', matchExistente: 'webplan', natureza: 'Corretora de planos de saúde', anuncios: 'n/d', cnpj: '22.729.507/0001-13', endereco: 'Av. São Luís 50, Conj 62E, Edifício Itália, República, São Paulo/SP', site: 'webplansaude.com', telefone: '(11) 4116-5378', instagram: 'https://www.linkedin.com/company/webplan-corretora-de-seguros', link: null, obs: '+10 anos; B2B agronegócio e profissionais' },
  { corretora: 'Masterseg Corretora', matchExistente: 'masterseg', natureza: 'Corretora de planos de saúde', anuncios: 'n/d', cnpj: '24.846.122/0001-61', endereco: 'Av. Anita Garibaldi 964, Cabral, Curitiba/PR', site: 'mastersaudeleads.com.br', telefone: null, instagram: null, link: null, obs: 'Confirmar se a de Curitiba é a do site de leads' },
  { corretora: 'Salut Corretora', matchExistente: 'salut corretora', natureza: 'Corretora de planos de saúde', anuncios: 'n/d', cnpj: null, endereco: null, site: 'saludcorretora.com.br', telefone: null, instagram: null, link: null, obs: 'Confirmar entidade exata (há Salute/Salud distintas)' },
  { corretora: 'SG Corretora', matchExistente: 'sg corretora', natureza: 'Corretora de planos de saúde', anuncios: 'n/d', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: null, obs: 'Reputação: Reclame Aqui e QuemConfia (2 CNPJs)' },
  { corretora: 'SSC Corretora', matchExistente: 'ssc corretora', natureza: 'Corretora de planos de saúde', anuncios: 'n/d', cnpj: null, endereco: null, site: null, telefone: null, instagram: null, link: null, obs: 'Reputação: presença genérica no Reclame Aqui' },
  { corretora: 'Aguiar Corretora de Seguros Ltda', matchExistente: null, natureza: 'Corretora de seguros (inclui planos de saúde)', anuncios: '5', cnpj: '48.739.229/0001-79', endereco: 'Av. das Américas, 14600, Rio de Janeiro/RJ', site: null, telefone: null, instagram: null, link: 'https://adstransparency.google.com/advertiser/AR03799519419424571393?region=BR', obs: 'Concorrente direta' },
];

function parseAnuncios(v) {
  if (!v || v.trim().toLowerCase() === 'n/d') return null;
  const n = parseInt(v.replace('~', '').trim(), 10);
  return Number.isNaN(n) ? null : n;
}

function nn(v) {
  return v && v.trim().toLowerCase() !== 'n/d' ? v.trim() : null;
}

const now = new Date().toISOString();
let inserted = 0;
let updated = 0;
const erros = [];

for (const r of ROWS) {
  const camposNovos = {
    natureza: nn(r.natureza),
    cnpj: nn(r.cnpj),
    endereco: nn(r.endereco),
    site: nn(r.site),
    telefone: nn(r.telefone),
    instagram: nn(r.instagram),
    google_ads_transparency_link: r.link || null,
    anuncios_ativos_estimado: parseAnuncios(r.anuncios),
    observacoes: nn(r.obs),
    updated_at: now,
  };

  if (r.matchExistente) {
    const { error } = await supabase
      .from('corretoras_monitoramento')
      .update(camposNovos)
      .eq('corretora', r.matchExistente);
    if (error) erros.push({ corretora: r.corretora, error: error.message });
    else updated++;
  } else {
    const { error } = await supabase
      .from('corretoras_monitoramento')
      .insert({
        corretora: r.corretora,
        preco: 'sem dados',
        anuncios: r.link ? `Google Ads Transparency Center | ${r.link}` : 'sem dados',
        imas: 'sem dados',
        reputacao: 'sem dados',
        novidades: 'sem dados',
        responsaveis: 'sem dados',
        qtd_anuncios: r.link ? 1 : 0,
        qtd_imas: 0,
        ...camposNovos,
      });
    if (error) erros.push({ corretora: r.corretora, error: error.message });
    else inserted++;
  }
}

console.log(`Inseridas: ${inserted}`);
console.log(`Atualizadas: ${updated}`);
if (erros.length) {
  console.log(`Erros (${erros.length}):`);
  erros.forEach((e) => console.log(` - ${e.corretora}: ${e.error}`));
}
