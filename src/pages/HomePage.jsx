import React, { useState, useEffect, lazy, Suspense } from 'react';

import { getPricingData } from "../lib/supabase";
import { trackCTA } from "../lib/tracking";

import { Navbar, HeroSection, HapvidaNetworkStats, PriceTablesSection, NationalMap, NetworkSection, ChatInteligente, Footer } from '../components';
import SEO from '../components/SEO';
import { FAQS } from '../data/faqs';

const FAQ = lazy(() => import('../components/FAQ'));

export default function HomePage({ onOpenForm }) {
  const [pricing, setPricing] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <SEO
        path="/"
        title={`Plano de Saúde Hapvida 2026 | Cotação a partir de R$ ${formattedMinPrice}`}
        description={`Solicite sua cotação do Plano de Saúde Hapvida 2026 com valores a partir de R$ ${formattedMinPrice}. Atendimento rápido no WhatsApp, consultor autorizado e sem compromisso.`}
        price={formattedMinPrice}
        includeProductSchema
        faqItems={FAQS}
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
      <section id="network">
        <NetworkSection />
      </section>
      <Suspense fallback={<div className="py-12 text-center text-slate-400">Carregando FAQ...</div>}>
        <section id="faq">
          <FAQ />
        </section>
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