import React from 'react';
import WelcomeMessage from '../components/WelcomeMessage';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import NetworkSection from '../components/NetworkSection';
import ValueSection from '../components/ValueSection';
import PlanTypes from '../components/PlanTypes';
import FAQSection from '../components/FAQSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const HomePage = ({ onOpenForm }) => {
  return (
    <div className="min-h-screen bg-white">
      <WelcomeMessage />
      <Header onOpenForm={onOpenForm} />

      <main>
        <HeroSection onOpenForm={onOpenForm} />
        <BenefitsSection />
        <NetworkSection />
        <ValueSection onOpenForm={onOpenForm} />
        <PlanTypes />
        <FAQSection />
        <FinalCTA onOpenForm={onOpenForm} />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;