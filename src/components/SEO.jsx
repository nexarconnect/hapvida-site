import React from 'react';
import { Helmet } from 'react-helmet-async';

function normalizeDisplayPrice(price) {
  const raw = String(price ?? '75,70').trim();

  if (!raw) return '75,70';

  const cleaned = raw.replace(/[^\d,.-]/g, '');

  return cleaned.includes(',') ? cleaned : cleaned.replace('.', ',');
}

function normalizeSchemaPrice(price) {
  const raw = String(price ?? '75,70')
    .trim()
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');

  const numeric = Number(raw);

  return Number.isFinite(numeric) && numeric > 0 ? numeric.toFixed(2) : '75.70';
}

function removeTrailingSlash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export default function SEO({ price = '75,70' }) {
  const displayPrice = normalizeDisplayPrice(price);
  const schemaPrice = normalizeSchemaPrice(price);

  const baseUrl = removeTrailingSlash('https://tabelaplanosaude.com.br/');
  const canonicalUrl = `${baseUrl}/`;
  const siteName = 'Tabela Plano Saúde';
  const ogImage = `${baseUrl}/og-hapvida-2026.jpg`;
  const logoUrl = `${baseUrl}/logo.png`;

  const pageTitle = `Plano de Saúde Hapvida 2026 | Cotação a partir de R$ ${displayPrice}`;
  const description = `Solicite sua cotação do Plano de Saúde Hapvida 2026 com valores a partir de R$ ${displayPrice}. Atendimento rápido no WhatsApp, consultor autorizado e sem compromisso.`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como fazer a cotação do Plano Hapvida 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A cotação é feita online pelo WhatsApp. Um consultor autorizado valida a rede disponível na sua cidade e envia a tabela de preços atualizada.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quais os valores da Hapvida para 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Os valores variam conforme idade e região, com opções a partir de R$ ${displayPrice}.`
        }
      }
    ]
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Plano de Saúde Hapvida 2026',
    description,
    image: ogImage,
    brand: {
      '@type': 'Brand',
      name: 'Hapvida'
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'BRL',
      price: schemaPrice,
      availability: 'https://schema.org/InStock'
    }
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: canonicalUrl
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: canonicalUrl,
    logo: logoUrl
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{pageTitle}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
    </Helmet>
  );
}