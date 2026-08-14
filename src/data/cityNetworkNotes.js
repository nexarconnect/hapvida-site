// Notas curtas de rede por cidade (expansão de 2026-08-13), escritas em texto
// original a partir do CSV de origem (scripts/data/cidades-expansao-2026-08.json,
// coluna "Rede assistencial"), não copiadas de nenhum concorrente.
//
// Propositalmente NÃO classifica cada unidade como "própria" ou "credenciada"
// — só nomeia uma unidade real que atende a região. Qual rede (própria ou
// credenciada) um beneficiário acessa depende do plano contratado, não da
// cidade (ver PlanoPorCidade.jsx, seção "Sobre a rede").
export const CITY_NETWORK_NOTES = {
  'São Paulo': 'unidades como o Hospital Salvalus',
  'São Bernardo do Campo': 'unidades como o Hospital São Bernardo',
  'Santo André': 'unidades como o Hospital Santo André',
  'Americana': 'unidades como o Hospital e Maternidade São Lucas',
  'Belo Horizonte': 'unidades como o Hospital Octaviano Neves',
  'Uberlândia': 'unidades como o Hospital e Maternidade Madrecor',
  'Uberaba': 'unidades como a ala hospitalar no MPHU',
  'Rio de Janeiro': 'unidades como o NotreCare Rio',
  'Salvador': 'unidades como o Hospital Teresa de Lisieux',
  'Feira de Santana': 'unidades como o Hospital e Maternidade Francisca de Sande',
  'Fortaleza': 'unidades como o Hospital Antônio Prudente',
  'Recife': 'unidades como o Hospital Advance',
  'Olinda': 'unidades como a Clínica Olinda',
  'João Pessoa': 'uma rede de unidades locais',
  'Campina Grande': 'unidades como o PA Campinense',
  'Natal': 'unidades como o Hospital Antônio Prudente',
  'Maceió': 'unidades como o Hospital e Maternidade Maceió',
  'Aracaju': 'unidades como o Hospital Gabriel Soares',
  'São Luís': 'unidades como o Hospital e Maternidade Guarás',
  'Teresina': 'unidades como o Hospital e Maternidade Rio Poty',
  'Belém': 'unidades como o Hospital e Maternidade Rio Mar',
  'Ananindeua': 'unidades locais com retaguarda hospitalar em Belém',
  'Manaus': 'unidades como o Hospital Rio Negro',
  'Goiânia': 'unidades como o Hospital Jardim América',
  'Anápolis': 'um pronto atendimento 24h e clínicas no Setor Central',
  'Brasília': 'unidades como o Hospital e Maternidade Brasiliense',
  'Campo Grande': 'unidades ambulatoriais locais, com hospital em construção',
  'Curitiba': 'unidades como a Maternidade Brígida',
  'Londrina': 'unidades como o Hospital Bela Suíça',
  'Maringá': 'unidades parceiras, incluindo o Hospital e Maternidade Maringá',
  'Joinville': 'unidades como o Hospital Geral Joinville',
  'Itajaí': 'unidades como o Centro Clínico Hapvida',
};
