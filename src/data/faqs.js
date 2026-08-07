// Fonte única das perguntas frequentes — usada pelo componente FAQ visível
// (Home e /perguntas-frequentes) e pelo schema FAQPage em SEO.jsx.
//
// FAQS: lista curta (6) para a Home — teaser, não a lista completa.
// EXTENDED_FAQS: lista completa para /perguntas-frequentes, com categoria
// para agrupamento visual. Sempre inclui as mesmas 6 da Home no início de
// suas respectivas categorias, para não ter respostas divergentes entre
// as duas páginas.
export const FAQS = [
  {
    question: 'O plano Hapvida tem carência?',
    answer:
      'Os prazos seguem a regra da ANS. Urgências em 24h, consultas e exames simples em 30 dias. Se você já tem um plano, avaliamos a redução total ou parcial das carências por portabilidade.'
  },
  {
    question: 'Como funciona a tabela de preços 2026?',
    answer:
      'Os valores a partir de R$ 157,29 são a referência inicial. A tabela oficial varia conforme a sua região, faixa etária e modalidade contratada. O consultor envia a cotação atualizada direto no WhatsApp.'
  },
  {
    question: 'Posso contratar com MEI ou CNPJ?',
    answer:
      'Sim. Planos empresariais costumam ter melhor custo-benefício para quem tem empresa ativa, inclusive MEI, conforme a regra comercial disponível para a região.'
  },
  {
    question: 'A rede atende na minha cidade?',
    answer:
      'A Hapvida possui ampla rede própria e credenciada. Durante o atendimento, validamos os hospitais, clínicas e laboratórios disponíveis para o seu município.'
  },
  {
    question: 'O plano odontológico está incluso?',
    answer:
      'Há opções com saúde e odonto combinados, dependendo da modalidade e da disponibilidade comercial. O consultor mostra as alternativas no momento da cotação.'
  },
  {
    question: 'Quanto tempo demora para receber a cotação?',
    answer:
      'O retorno é rápido. Após o envio dos dados, o atendimento segue pelo WhatsApp para confirmar informações e apresentar os valores disponíveis.'
  }
];

export const EXTENDED_FAQS = [
  // Carência
  {
    category: 'Carência',
    question: 'O plano Hapvida tem carência?',
    answer:
      'Os prazos seguem a regra da ANS. Urgências em 24h, consultas e exames simples em 30 dias. Se você já tem um plano, avaliamos a redução total ou parcial das carências por portabilidade.'
  },
  {
    category: 'Carência',
    question: 'Doença preexistente impede a contratação?',
    answer:
      'Não impede, mas precisa ser declarada corretamente no formulário de saúde. Omitir uma condição preexistente não elimina a carência, apenas cria risco de a operadora negar cobertura depois.'
  },
  {
    category: 'Carência',
    question: 'Posso migrar de outro plano sem cumprir carência de novo?',
    answer:
      'Em muitos casos sim, pela portabilidade de carências prevista pela ANS: quem já cumpriu os prazos no plano atual pode aproveitá-los ao migrar para a Hapvida, conforme os requisitos do seu contrato de origem.'
  },
  // Preços e contratação
  {
    category: 'Preços e contratação',
    question: 'Como funciona a tabela de preços 2026?',
    answer:
      'Os valores a partir de R$ 157,29 são a referência inicial. A tabela oficial varia conforme a sua região, faixa etária e modalidade contratada. O consultor envia a cotação atualizada direto no WhatsApp.'
  },
  {
    category: 'Preços e contratação',
    question: 'Posso contratar com MEI ou CNPJ?',
    answer:
      'Sim. Planos empresariais costumam ter melhor custo-benefício para quem tem empresa ativa, inclusive MEI, conforme a regra comercial disponível para a região.'
  },
  {
    category: 'Preços e contratação',
    question: 'O valor do plano aumenta todo ano?',
    answer:
      'Sim, há reajuste anual. No plano individual, o reajuste segue o teto definido pela ANS. No empresarial, é negociado com a operadora conforme a sinistralidade do grupo.'
  },
  {
    category: 'Preços e contratação',
    question: 'Que documentos preciso para contratar?',
    answer:
      'Para o individual, CPF e documentos pessoais dos dependentes, se houver. Para o empresarial, CNPJ ativo e documentos de cada beneficiário. O consultor confirma a lista exata para o seu caso.'
  },
  {
    category: 'Preços e contratação',
    question: 'Posso incluir cônjuge e filhos no meu plano?',
    answer:
      'Sim, na modalidade familiar. Cada dependente incluído tem sua própria contagem de carência a partir da data de inclusão no contrato.'
  },
  {
    category: 'Preços e contratação',
    question: 'Tem limite de idade para contratar?',
    answer:
      'Não há impedimento por idade avançada para contratar, mas o valor varia por faixa etária conforme a tabela da ANS. Um consultor confirma o valor exato para a sua idade.'
  },
  // Rede de atendimento
  {
    category: 'Rede de atendimento',
    question: 'A rede atende na minha cidade?',
    answer:
      'A Hapvida possui ampla rede própria e credenciada. Durante o atendimento, validamos os hospitais, clínicas e laboratórios disponíveis para o seu município.'
  },
  {
    category: 'Rede de atendimento',
    question: 'O plano cobre atendimento fora da minha cidade?',
    answer:
      'A cobertura contratada vale para a rede da sua região. Para atendimento em outras cidades ou estados, a disponibilidade depende do plano e deve ser confirmada com o consultor antes da viagem.'
  },
  {
    category: 'Rede de atendimento',
    question: 'Como funciona em caso de emergência?',
    answer:
      'Urgência e emergência têm carência reduzida (24 horas após a contratação) e podem ser atendidas na rede própria ou credenciada mais próxima, conforme a disponibilidade da sua cidade.'
  },
  {
    category: 'Rede de atendimento',
    question: 'O plano odontológico está incluso?',
    answer:
      'Há opções com saúde e odonto combinados, dependendo da modalidade e da disponibilidade comercial. O consultor mostra as alternativas no momento da cotação.'
  },
  // Pós-contratação
  {
    category: 'Pós-contratação',
    question: 'Quanto tempo demora para receber a cotação?',
    answer:
      'O retorno é rápido. Após o envio dos dados, o atendimento segue pelo WhatsApp para confirmar informações e apresentar os valores disponíveis.'
  },
  {
    category: 'Pós-contratação',
    question: 'O que é coparticipação e como funciona?',
    answer:
      'É um modelo em que você paga uma mensalidade menor e uma taxa adicional só quando usa determinados procedimentos (consultas, exames). Nem todos os planos têm essa opção; o consultor explica se ela está disponível na sua cotação.'
  },
  {
    category: 'Pós-contratação',
    question: 'Como cancelo o plano?',
    answer:
      'O cancelamento é feito diretamente com a operadora. Se a intenção for trocar de plano, o recomendado é confirmar a nova contratação (e a portabilidade de carências, se aplicável) antes de cancelar o atual, para não perder cobertura no meio do processo.'
  },
  {
    category: 'Pós-contratação',
    question: 'Este site é o site oficial da Hapvida?',
    answer:
      'Não. A Nexar é uma consultoria independente e autorizada a comercializar planos Hapvida: um canal de venda e suporte, não a operadora.'
  }
];
