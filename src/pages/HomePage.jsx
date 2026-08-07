import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getPricingData } from "../lib/supabase";
import { trackCTA } from "../lib/tracking";

import { Navbar, HeroSection, HapvidaNetworkStats, PriceTablesSection, NationalMap, NetworkSection, ChatInteligente, Footer, selectDisplayPlans } from '../components';
import SEO from '../components/SEO';
import { slugifyCity } from '../data/coveredCities';
import { useCityFromQuery } from '../hooks/useCityDetection';
import { FAQS } from '../data/faqs';

const FAQ = lazy(() => import('../components/FAQ'));

export default function HomePage({ onOpenForm }) {
  const [pricing, setPricing] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const routerLocation = useLocation();
  const queryCity = useCityFromQuery();

  useEffect(() => {
    async function loadPricingData() {
      try {
        const data = await getPricingData();
        setPricing(data);
        if (data && data.length > 0) {
          const minimumPrice = Math.min(...data.map(item => item.price || 0));
          setMinPrice(minimumPrice);
        }
      } catch (error) {
        console.error('Error loading pricing data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPricingData();
  }, []);

  const handleOpenForm = (planName) => {
    trackCTA('open_form', 'homepage', { plano: planName || null });
    onOpenForm?.(planName);
  };

  const formattedMinPrice = minPrice
    ? minPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    : '157,29';

  // ?cidade=bauru (ou utm de campanha apontando pra cidade) já manda direto
  // pra página com preço e rede reais daquela cidade — sem precisar escolher.
  if (queryCity) {
    return (
      <Navigate
        to={`/plano-hapvida/${slugifyCity(queryCity.name)}${routerLocation.search}`}
        replace
      />
    );
  }

  return (
    <div>
      <SEO
        path="/"
        title={`Plano de Saúde Hapvida 2026 | Cotação a partir de R$ ${formattedMinPrice}`}
        description={`Cotação do Plano de Saúde Hapvida 2026 a partir de R$ ${formattedMinPrice}. Atendimento rápido no WhatsApp com consultor autorizado, sem compromisso.`}
        products={selectDisplayPlans(pricing)}
        faqItems={FAQS}
        mainBusiness
      />
      <Navbar />
      <section id="hero">
        <HeroSection onOpenForm={handleOpenForm} minPrice={minPrice} />
      </section>
      <section id="stats">
        <HapvidaNetworkStats />
      </section>
      <section id="pricing">
        {loading ? (
          <div className="py-24 text-center text-slate-400">Carregando preços...</div>
        ) : (
          <PriceTablesSection pricing={pricing} minPrice={minPrice} onOpenForm={handleOpenForm} />
        )}
      </section>
      <section id="map">
        <NationalMap />
      </section>
      {/* NetworkSection e FAQ já têm id próprio ("network"/"faq") no
          <section> interno deles — sem wrapper com o mesmo id aqui, senão
          duplica (HTML inválido) e getElementById passa a pegar o wrapper
          vazio em vez do conteúdo real. */}
      <NetworkSection />
      <Suspense fallback={<div className="py-12 text-center text-slate-400">Carregando FAQ...</div>}>
        <FAQ />
      </Suspense>
      <section id="chat">
        <ChatInteligente />
      </section>
      <section id="contact">
        <Footer onOpenForm={handleOpenForm} />
      </section>
    </div>
  );
}