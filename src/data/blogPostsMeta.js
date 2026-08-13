// Metadados dos posts do blog — array simples (mesmo padrão de
// COVERED_CITIES), de propósito: precisa ser importável tanto pelo browser
// (BlogIndex/BlogPost) quanto por scripts Node puros (generate-sitemap.js,
// via publicRoutes.js), então fica livre de JSX ou de import.meta.glob.
//
// O corpo de cada post (JSX) mora em src/blog/posts/<slug>.jsx — o registro
// que junta os dois (src/data/blogPosts.js) só roda no browser/build.
//
// Adicionar um post: 1) acrescentar aqui, 2) criar src/blog/posts/<slug>.jsx.
export const BLOG_POSTS_META = [
  {
    slug: 'hapvida-vale-a-pena-interior-sp',
    title: 'Plano Hapvida vale a pena no interior de SP?',
    description:
      'Plano Hapvida vale a pena no interior de SP? Veja o que pesa no preço, na rede e na carência, e peça a cotação da sua cidade.',
    category: 'Guia',
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    excerpt:
      'Preço baixo só compensa se a rede atender perto de casa. Veja os três pontos que decidem se o plano Hapvida vale a pena na sua cidade do interior de SP.',
  },
  {
    slug: 'portabilidade-para-hapvida',
    title: 'Portabilidade para o Plano Hapvida: como funciona',
    description:
      'Como migrar de outro plano de saúde para a Hapvida aproveitando as carências já cumpridas, segundo as regras da ANS.',
    category: 'Portabilidade',
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    excerpt:
      'Quem já tem plano de saúde não precisa recomeçar as carências do zero para migrar para a Hapvida. Entenda como funciona a portabilidade e quando ela compensa.',
  },
  {
    slug: 'carencia-plano-hapvida',
    title: 'Carência no Plano Hapvida: o que muda e como reduzir',
    description:
      'Prazos de carência do plano Hapvida para urgências, consultas e exames, e os caminhos para reduzir ou eliminar esse período.',
    category: 'Carência',
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    excerpt:
      'Carência é a dúvida mais comum de quem está pesquisando plano de saúde. Veja os prazos que se aplicam ao plano Hapvida e como portabilidade ou contratação empresarial podem reduzi-los.',
  },
  {
    slug: 'plano-hapvida-empresarial-mei',
    title: 'Plano Hapvida Empresarial e MEI: como contratar',
    description:
      'Como funciona a contratação do plano de saúde Hapvida para empresas e MEI: documentação e diferenças em relação ao plano individual.',
    category: 'Empresarial',
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    excerpt:
      'Ter empresa ativa, incluindo MEI, costuma abrir acesso a condições diferentes das do plano individual. Veja o que considerar antes de contratar um plano Hapvida empresarial.',
  },
  {
    slug: 'rede-de-atendimento-hapvida-como-funciona',
    title: 'Rede de Atendimento Hapvida: como funciona',
    description:
      'Rede de atendimento Hapvida: rede própria x credenciada, urgência 24h e cotação para confirmar o que existe na sua cidade.',
    category: 'Rede',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Rede própria e rede credenciada não são a mesma coisa, e essa diferença muda o que existe perto de você. Veja como funciona a rede Hapvida e como confirmar o que atende na sua cidade.',
  },
  {
    slug: 'coparticipacao-plano-de-saude-explicada',
    title: 'Coparticipação no plano de saúde: como funciona',
    description:
      'Coparticipação no plano de saúde: o que é, quando compensa e cotação para comparar com o plano sem coparticipação.',
    category: 'Contratação',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Coparticipação não é boa nem ruim por si só: depende de como você usa o plano. Entenda o modelo e quando ele compensa antes de contratar.',
  },
  {
    slug: 'plano-hapvida-bauru',
    title: 'Plano Hapvida em Bauru: preço e rede',
    description:
      'Plano Hapvida em Bauru: como funciona o preço, a rede de atendimento e a carência. Peça a cotação com os valores da sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Quanto custa o plano Hapvida em Bauru? Veja o que define o preço, como funciona a rede local e como confirmar o valor exato para a sua idade.',
  },
  {
    slug: 'plano-hapvida-ribeirao-preto',
    title: 'Plano Hapvida em Ribeirão Preto: preço e rede',
    description:
      'Plano Hapvida em Ribeirão Preto: preço, rede de atendimento e carência. Cotação com os valores confirmados para a sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'O plano Hapvida em Ribeirão Preto varia por idade e modalidade. Veja como funciona a rede local e como pedir a cotação com o valor certo.',
  },
  {
    slug: 'plano-hapvida-franca',
    title: 'Plano Hapvida em Franca: preço e rede',
    description:
      'Plano Hapvida em Franca: entenda o preço, a rede de atendimento e a carência. Peça a cotação para confirmar o valor da sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'O plano Hapvida cabe no bolso em Franca? Veja o que define o preço, a rede local e como confirmar o valor exato para o seu perfil.',
  },
  {
    slug: 'plano-hapvida-sao-jose-dos-campos',
    title: 'Plano Hapvida em São José dos Campos: preço e rede',
    description:
      'Plano Hapvida em São José dos Campos: preço, rede de atendimento e carência. Cotação com o valor confirmado para o seu perfil.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Quanto custa o plano Hapvida em São José dos Campos? Veja como funciona o preço, a rede local e a carência antes de pedir a cotação.',
  },
  {
    slug: 'plano-hapvida-sertaozinho',
    title: 'Plano Hapvida em Sertãozinho: preço e rede',
    description:
      'Plano Hapvida em Sertãozinho: preço, rede de atendimento e carência. Peça a cotação e confirme o valor da sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'O plano Hapvida em Sertãozinho varia por idade e modalidade. Veja como funciona a rede local e como confirmar o valor certo.',
  },
  {
    slug: 'plano-hapvida-lins',
    title: 'Plano Hapvida em Lins: preço e rede',
    description:
      'Plano Hapvida em Lins: como funciona o preço, a rede de atendimento local e a carência. Cotação com valor confirmado.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'A consultoria Nexar atende em Lins com suporte local. Veja como funciona o preço do plano Hapvida e a rede de atendimento na cidade.',
  },
  {
    slug: 'plano-hapvida-araraquara',
    title: 'Plano Hapvida em Araraquara: preço e rede',
    description:
      'Plano Hapvida em Araraquara: preço, rede de atendimento e carência. Peça a cotação para confirmar o valor da sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'O plano Hapvida costuma chamar atenção pelo preço em Araraquara. Veja como funciona a rede local e como confirmar o valor exato.',
  },
  {
    slug: 'plano-hapvida-limeira',
    title: 'Plano Hapvida em Limeira: preço e rede',
    description:
      'Plano Hapvida em Limeira: preço, rede de atendimento e carência. Cotação com o valor confirmado para o seu perfil.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Quanto custa o plano Hapvida em Limeira? Veja o que define o preço, a rede local e como pedir a cotação com o valor certo.',
  },
  {
    slug: 'plano-hapvida-barretos',
    title: 'Plano Hapvida em Barretos: preço e rede',
    description:
      'Plano Hapvida em Barretos: preço, rede de atendimento local e carência. Peça a cotação e confirme o valor exato.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Tabelas nacionais não refletem o preço real em Barretos. Veja como funciona a rede local e como confirmar o valor com um consultor.',
  },
  {
    slug: 'plano-hapvida-pirassununga',
    title: 'Plano Hapvida em Pirassununga: preço e rede',
    description:
      'Plano Hapvida em Pirassununga: preço, rede de atendimento e carência. Cotação com o valor confirmado para a sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Quem pesquisa o plano Hapvida em Pirassununga costuma priorizar cobertura robusta. Veja como funciona o preço e a rede local.',
  },
  {
    slug: 'plano-hapvida-marilia',
    title: 'Plano Hapvida em Marília: preço e rede',
    description:
      'Plano Hapvida em Marília: preço, rede de atendimento e carência. Peça a cotação para confirmar o valor do seu perfil.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'O plano Hapvida se posiciona pela cobertura completa em Marília. Veja como funciona o preço e a rede local antes de contratar.',
  },
  {
    slug: 'plano-hapvida-sao-carlos',
    title: 'Plano Hapvida em São Carlos: preço e rede',
    description:
      'Plano Hapvida em São Carlos: preço, rede de atendimento e carência. Cotação com o valor confirmado para a sua idade.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Quem pesquisa o plano Hapvida em São Carlos costuma priorizar cobertura robusta. Veja como funciona o preço e a rede local.',
  },
  {
    slug: 'plano-hapvida-piracicaba',
    title: 'Plano Hapvida em Piracicaba: preço e rede',
    description:
      'Plano Hapvida em Piracicaba: preço, rede de atendimento e carência. Peça a cotação e confirme o valor do seu perfil.',
    category: 'Cidades',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Piracicaba fecha a lista das cidades atendidas pela Nexar. Veja como funciona o preço do plano Hapvida e a rede local.',
  },
  {
    slug: 'tecnologia-plano-hapvida-app-teleconsulta',
    title: 'Tecnologia do plano Hapvida: app e teleconsulta',
    description:
      'Tecnologia do plano Hapvida: app com agendamento de consultas e exames, resultados e teleconsulta. Veja como funciona e peça sua cotação.',
    category: 'Guia',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Marcar consulta, ver exame e falar com médico por vídeo: veja o que o app e o portal do beneficiário Hapvida resolvem sem sair de casa.',
  },
  {
    slug: 'coparticipacao-hapvida-modelos-parcial-total',
    title: 'Coparticipação no plano Hapvida: parcial ou total',
    description:
      'Coparticipação no plano Hapvida: modelos parcial, total e sem coparticipação, e o que confirmar por escrito antes de assinar.',
    category: 'Contratação',
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    excerpt:
      'Parcial, total ou sem coparticipação: veja os modelos comuns do mercado e por que a condição do seu contrato precisa ser confirmada por escrito, não estimada por tabela genérica.',
  },
  {
    slug: 'plano-hapvida-familiar-dependentes',
    title: 'Plano de saúde familiar Hapvida: preço e dependentes',
    description:
      'Plano de saúde familiar Hapvida: como incluir cônjuge e filhos, o que muda no preço e na carência. Peça a cotação com o valor da sua família.',
    category: 'Contratação',
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    excerpt:
      'O preço da família não é uma mensalidade multiplicada: cada beneficiário entra pela própria faixa etária. Veja o que muda no valor, na carência de cada dependente e nos documentos.',
  },
  {
    slug: 'reajuste-plano-hapvida-como-funciona',
    title: 'Reajuste do Plano Hapvida: como funciona',
    description:
      'Reajuste do plano Hapvida: como funciona em cada modalidade e como confirmar o valor atualizado na sua cotação.',
    category: 'Contratação',
    publishedAt: '2026-08-11',
    updatedAt: '2026-08-11',
    excerpt:
      'O plano de saúde reajusta todo ano, mas o motivo e o percentual mudam conforme a modalidade contratada. Veja como funciona o reajuste no individual, empresarial e adesão, e o que fazer se ele pesar no orçamento.',
  },
  {
    slug: 'cancelamento-plano-hapvida-como-funciona',
    title: 'Cancelamento do Plano Hapvida: como fazer',
    description:
      'Cancelamento do plano Hapvida: como funciona, como não ficar sem cobertura na troca e quando vale pedir uma nova cotação antes de decidir.',
    category: 'Contratação',
    publishedAt: '2026-08-12',
    updatedAt: '2026-08-12',
    excerpt:
      'Cancelar sem planejamento é o jeito mais fácil de ficar descoberto por alguns dias ou perder carência já cumprida à toa. Veja a ordem certa dos passos antes de formalizar o pedido junto à operadora.',
  },
  {
    slug: 'plano-hapvida-e-bom',
    title: 'Plano Hapvida é bom? 4 critérios antes de contratar',
    description:
      'Plano Hapvida é bom? Veja os 4 critérios que decidem — rede, carência, custo e uso — e peça a cotação com o preço da sua cidade.',
    category: 'Guia',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    excerpt:
      'Plano bom no abstrato não existe: existe plano que resolve o seu caso. Veja os quatro critérios que decidem isso — e em quais situações o Hapvida não é a melhor escolha.',
  },
  {
    slug: 'tabela-precos-hapvida-2026',
    title: 'Tabela de Preços Hapvida 2026: como funciona',
    description:
      'Tabela de preços Hapvida 2026: veja como o valor é montado — idade, cidade e modalidade — e peça a cotação atualizada para o seu perfil.',
    category: 'Preços',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    excerpt:
      'Tabela de preços Hapvida não é um documento fechado: o valor se monta a partir da sua idade, da sua cidade e do plano escolhido. Veja como funciona antes de comparar números soltos.',
  },
];
