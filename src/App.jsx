import React, { useState } from 'react';

import HeroSection from '@/components/HeroSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import PlanTypes from '@/components/PlanTypes';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

import FormModal from '@/components/FormModal';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleFormSuccess = (nome) => {
    console.log(`Lead enviado com sucesso: ${nome}`);
  };

  return (
    <>
      <main>
        <HeroSection onOpenForm={openForm} />
        <WhyChooseUs />
        <HowItWorks />
        <PlanTypes onOpenForm={openForm} />
        <FAQSection />
        <FinalCTA onOpenForm={openForm} />
      </main>

      <FloatingWhatsAppButton />

      <FormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}