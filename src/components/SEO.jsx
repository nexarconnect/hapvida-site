import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { BLOG_AUTHOR } from '../data/author';
import { WHATSAPP_NUMBER } from '../lib/constants';

const SITE_URL = 'https://tabelaplanosaude.com.br';
const SITE_NAME = 'Tabela Plano Saúde';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-hapvida-2026.jpg`;
const LOGO_URL = `${SITE_URL}/logo.png`;
const DEFAULT_TITLE = 'Plano de Saúde Hapvida 2026 | Cotação a partir de R$ 157,29';
const DEFAULT_DESCRIPTION =
  'Solicite sua cotação do Plano de Saúde Hapvida 2026 com valores a partir de R$ 157,29. Atendimento rápido no WhatsApp, consultor autorizado e sem compromisso.';

function normalizeDisplayPrice(price) {
  const raw = String(price ?? '157,29').trim();

  if (!raw) return '157,29';

  const cleaned = raw.replace(/[^\d,.-]/g, '');

  return cleaned.includes(',') ? cleaned : cleaned.replace('.', ',');
}

function normalizeSchemaPrice(price) {
  const raw = String(price ?? '157,29')
    .trim()
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');

  const numeric = Number(raw);

  return Number.isFinite(numeric) && numeric > 0 ? numeric.toFixed(2) : '157.29';
}

function buildCanonicalUrl(path) {
  if (!path || path === '/') return `${SITE_URL}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * SEO por página. Cada rota pública deve renderizar <SEO /> com pelo menos
 * title/description/path próprios — sem isso a página herda o <title>
 * estático do index.html (genérico, com preço desatualizado).
 */
export default function SEO({
  path = '/',
  title,
  description,
  price,
  faqItems = null,
  includeProductSchema = false,
  article = null,
  noindex = false,
  image = DEFAULT_OG_IMAGE,
  localBusiness = null,
  breadcrumbs = null,
}) {
  useEffect(() => {
    // Remove as tags estáticas de index.html (data-default) assim que a
    // página monta — o react-helmet-async não sabe que elas já existem e,
    // sem isso, injeta as suas ao lado, duplicando og:*/twitter:*/canonical.
    document.querySelectorAll('[data-default]').forEach((el) => el.remove());
  }, []);

  const displayPrice = normalizeDisplayPrice(price);
  const schemaPrice = normalizeSchemaPrice(price);

  const canonicalUrl = buildCanonicalUrl(path);
  const pageTitle = title || DEFAULT_TITLE;
  const description_ = description || DEFAULT_DESCRIPTION;

  const faqJsonLd = faqItems && faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  const productJsonLd = includeProductSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Plano de Saúde Hapvida 2026',
        description: description_,
        image,
        brand: {
          '@type': 'Brand',
          name: 'Hapvida',
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'BRL',
          price: schemaPrice,
          availability: 'https://schema.org/InStock',
        },
      }
    : null;

  const articleJsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: pageTitle,
        description: description_,
        image,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          '@type': 'Person',
          name: BLOG_AUTHOR.name,
          jobTitle: BLOG_AUTHOR.role,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: LOGO_URL,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      }
    : null;

  const localBusinessJsonLd = localBusiness
    ? {
        '@context': 'https://schema.org',
        '@type': 'InsuranceAgency',
        name: `Nexar - Consultoria Hapvida em ${localBusiness.city}`,
        description: description_,
        url: canonicalUrl,
        telephone: `+${WHATSAPP_NUMBER}`,
        areaServed: {
          '@type': 'City',
          name: localBusiness.city,
          containedInPlace: {
            '@type': 'State',
            name: localBusiness.state,
          },
        },
        parentOrganization: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      }
    : null;

  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: buildCanonicalUrl(crumb.path),
        })),
      }
    : null;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{pageTitle}</title>

      <meta name="description" content={description_} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description_} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description_} />
      <meta name="twitter:image" content={image} />

      {productJsonLd && (
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      )}
      {articleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
      {faqJsonLd && (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      )}
      {localBusinessJsonLd && (
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      )}
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
    </Helmet>
  );
}

export { DEFAULT_OG_IMAGE, SITE_URL, SITE_NAME };
