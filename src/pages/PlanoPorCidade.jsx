import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';

import { getCityBySlug } from '../data/coveredCities';
import { getPostBySlug } from '../data/blogPosts';
import { getPricingByCity, getNetworkUnits } from '../lib/supabase';
import { Navbar, PriceTablesSection, Footer, ChatInteligente, selectDisplayPlans } from '../components';
import SEO from '../components/SEO';
import NotFound from './NotFound';

function NetworkUnitCard({ unit }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
        <Building2 size={22} />
      </div>
      <div>
        <h3 className="font-black text-slate-900">{unit.name}</h3>
        {unit.address && (
          <p className="mt-1 text-sm text-slate-500">{unit.address}</p>
        )}
        {unit.map_link && (
          <a
            href={unit.map_link}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs font-black uppercase tracking-widest text-[#ff8200] hover:underline"
          >
            Abrir no mapa
          </a>
        )}
      </div>
    </div>
  );
}

export default function PlanoPorCidade({ onOpenForm }) {
  const { slug } = useParams();
  const city = getCityBySlug(slug);

  const [pricing, setPricing] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    let mounted = true;

    async function load() {
      setLoading(true);
      const [pricingData, unitsData] = await Promise.all([
        getPricingByCity(city.name),
        getNetworkUnits(city.name),
      ]);
      if (mounted) {
        setPricing(pricingData);
        setUnits(unitsData);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [city]);

  if (!city) {
    return <NotFound />;
  }

  const cityBlogPost = getPostBySlug(`plano-hapvida-${slug}`);

  const handleOpenForm = (planName) => {
    onOpenForm?.(planName);
  };

  const title = `Plano Hapvida em ${city.name} 2026 | Preços e Rede`;
  const description = `Tabela Hapvida 2026 em ${city.name} (${city.state}): planos e valores atualizados, rede local e cotação rápida pelo WhatsApp, sem compromisso.`;

  return (
    <div data-prerender-ready={loading ? undefined : 'true'}>
      <SEO
        path={`/plano-hapvida/${slug}`}
        title={title}
        description={description}
        localBusiness={{ city: city.name, state: city.state }}
        products={selectDisplayPlans(pricing)}
        productSchemaMode="aggregate"
        productName={`Plano de Saúde Hapvida em ${city.name}`}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Planos por Cidade', path: '/planos-hapvida-por-cidade' },
          { name: city.name, path: `/plano-hapvida/${slug}` },
        ]}
      />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <MapPin className="h-4 w-4 text-[#ff8200]" />
          {city.name}, {city.state}
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Tabela de Preços Hapvida em {city.name} - Planos 2026
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Valores atualizados para {city.name} e atendimento consultivo pelo WhatsApp, sem compromisso.
        </p>
      </header>

      {loading ? (
        <div className="py-24 text-center text-slate-400">Carregando preços de {city.name}...</div>
      ) : (
        <PriceTablesSection pricing={pricing} onOpenForm={handleOpenForm} city={city.name} />
      )}

      {units.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-center text-3xl font-black text-[#002b5c] md:text-4xl">
              Rede de atendimento em {city.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {units.map((unit) => (
                <NetworkUnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </div>
        </section>
      )}

      {cityBlogPost && (
        <section className="bg-white py-12 text-center">
          <div className="container mx-auto max-w-2xl px-6">
            <p className="text-slate-600">
              Quer entender preço, rede e carência com mais detalhe antes da cotação? Veja o guia sobre o{' '}
              <Link
                to={`/blog/${cityBlogPost.meta.slug}`}
                className="font-bold text-[#002b5c] underline"
              >
                plano Hapvida em {city.name}
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <ChatInteligente />
      <Footer onOpenForm={handleOpenForm} />
    </div>
  );
}
