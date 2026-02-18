import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
  const title = 'Plano de Saúde Hapvida 2026 | Cotação Rápida no WhatsApp';
  const description =
    'Cotação rápida do Plano de Saúde Hapvida 2026. Fale com um consultor autorizado no WhatsApp e receba opções para sua cidade — sem compromisso. Método espelho: entendemos seu perfil e apresentamos as melhores opções Hapvida com clareza.';

  // Mantemos placeholder por enquanto (você troca no final)
  const siteUrl = 'https://www.seudominio.com.br/';
  const ogImage = `${siteUrl}og-hapvida-2026.jpg`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como fazer a cotação do Plano Hapvida 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Você pode solicitar a cotação pelo WhatsApp. Um consultor autorizado valida disponibilidade e envia as opções para sua cidade, seguindo o método espelho da Hapvida.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quais são os valores do Plano Hapvida 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os valores variam por idade, cidade e tipo de plano. Existem opções a partir de R$ 149,90* (sujeito à disponibilidade e regras comerciais).',
        },
      },
      {
        '@type': 'Question',
        name: 'Tem plano com e sem coparticipação?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Você pode escolher opções com ou sem coparticipação, conforme seu perfil e a disponibilidade do produto na sua região.',
        },
      },
      {
        '@type': 'Question',
        name: 'A contratação é sem compromisso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. A cotação é sem compromisso. Você recebe as opções e decide se quer contratar.',
        },
      },
      {
        '@type': 'Question',
        name: 'A Hapvida tem rede credenciada na minha cidade?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A rede varia por município e produto. Na cotação, validamos a rede e cobertura disponíveis para sua região.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo demora para receber a cotação?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Normalmente o retorno é rápido pelo WhatsApp, com as opções adequadas ao seu perfil e município.',
        },
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

    

      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>
  );
}
