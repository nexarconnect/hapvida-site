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
];
