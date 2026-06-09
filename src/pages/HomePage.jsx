'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';

import { getPricingData } from "../lib/supabase";
import { trackCTA } from "../lib/tracking";

import { Navbar, HeroSection, HapvidaNetworkStats, PriceTablesSection, NationalMap, NetworkSection, ChatInteligente, Footer } from '../components';

const FAQ = lazy(() => import('../components/FAQ'));

export default function HomePage() {
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

  const openForm = () => {
    trackCTA('open_form');
    // Original logic to open form, e.g., scroll to contact section or open modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <section id="hero">
        <HeroSection onCTA={openForm} />
      </section>
      <section id="stats">
        <HapvidaNetworkStats />
      </section>
      <section id="pricing">
        {loading ? (
          <div>Carregando preços...</div>
        ) : (
          <PriceTablesSection pricing={pricing} minPrice={minPrice} />
        )}
      </section>
      <section id="map">
        <NationalMap />
      </section>
      <section id="network">
        <NetworkSection />
      </section>
      <Suspense fallback={<div>Carregando FAQ...</div>}>
        <section id="faq">
          <FAQ />
        </section>
      </Suspense>
      <section id="chat">
        <ChatInteligente />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}