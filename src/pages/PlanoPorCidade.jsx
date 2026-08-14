import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Building, Users, ShieldCheck } from 'lucide-react';

import { getCityBySlug } from '../data/coveredCities';
import { CITY_NETWORK_NOTES } from '../data/cityNetworkNotes';
import { getPostBySlug } from '../data/blogPosts';
import { getPricingByCity } from '../lib/supabase';
import { useNetworkUnits } from '../hooks/useNetworkUnits';
import { Navbar, PriceTablesSection, Footer, ChatInteligente, selectDisplayPlans } from '../components';
import NetworkUnitCard from '../components/NetworkUnitCard';
import SEO from '../components/SEO';
import NotFound from './NotFound';

export default function PlanoPorCidade({ onOpenForm }) {
  const { slug } = useParams();
  const city = getCityBySlug(slug);

  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const { units } = useNetworkUnits(city?.name);

  useEffect(() => {
    if (!city) return;

    let mounted = true;

    async function load() {
      setLoading(true);
      const pricingData = await getPricingByCity(city.name);
      if (mounted) {
        setPricing(pricingData);
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

      <header className="flex flex-col items-center bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
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

      {CITY_NETWORK_NOTES[city.name] && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#002b5c]">
                <ShieldCheck size={14} className="text-[#ff8200]" />
                Rede hospitalar
              </div>
              <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
                Sobre a rede em {city.name}
              </h2>
              <p className="mt-3 text-slate-600">
                A Hapvida atende por <strong className="text-[#002b5c]">duas redes hospitalares</strong>{' '}
                nacionais. Qual delas você acessa em {city.name} <em>depende do plano contratado</em>, não
                é igual para todos.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                  <Building2 size={22} />
                </div>
                <div className="text-3xl font-black text-[#002b5c]">86</div>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                  Hospitais próprios
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Sob gestão direta da Hapvida, com prontuário integrado.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                  <Building size={22} />
                </div>
                <div className="text-3xl font-black text-[#002b5c]">123</div>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                  Hospitais credenciados
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Rede parceira que completa a cobertura por região.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                  <Users size={22} />
                </div>
                <div className="text-3xl font-black text-[#002b5c]">15,9 mi</div>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                  Beneficiários
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Em todo o Brasil, nas cinco regiões do país.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-[#002b5c] p-8 text-center text-white md:p-10">
              <p className="text-blue-100">
                Na região de <strong className="text-white">{city.name}</strong>,{' '}
                {CITY_NETWORK_NOTES[city.name]} fazem parte do atendimento. Um consultor confirma{' '}
                <strong className="text-white">exatamente o que o seu plano libera</strong> antes de
                qualquer assinatura.
              </p>
            </div>
          </div>
        </section>
      )}

      {units && units.length > 0 && (
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
