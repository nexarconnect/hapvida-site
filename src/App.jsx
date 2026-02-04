import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ValueSection from './components/ValueSection';
import NEXARSection from './components/NEXARSection';
import ProductsSection from './components/ProductsSection';
import NetworkSection from './components/NetworkSection';
import BenefitsSection from './components/BenefitsSection';
import PriceTablesSection from './components/PriceTablesSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import SuccessModal from './components/SuccessModal';
import FormModal from './components/FormModal';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSuccess = (name) => {
    setUserName(name);
    setIsFormOpen(false); // Fecha o formulário
    setIsSuccessOpen(true); // Abre o modal de sucesso (com redirect WhatsApp)
  };

  return (
    <>
      <Helmet>
        <title>Plano de Saúde Hapvida - NEXAR Corretora | A partir de R$ 64,35</title>
        <meta name="description" content="Planos de saúde Hapvida com 15% de desconto nas 3 primeiras parcelas. Valores a partir de R$ 64,35. Faça sua cotação grátis com a NEXAR Corretora." />
      </Helmet>

      {/* Passa onOpenForm para todos os componentes que têm botões */}
      <Header onOpenForm={() => setIsFormOpen(true)} />
      <HeroSection onOpenForm={() => setIsFormOpen(true)} />
      <ValueSection onOpenForm={() => setIsFormOpen(true)} />
      <NEXARSection />
      <ProductsSection />
      <NetworkSection />
      <BenefitsSection />
      <PriceTablesSection />
      <FAQSection />
      <Footer />
      <FloatingWhatsAppButton />

      {/* Modais centralizados (único lugar) */}
      <FormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={handleSuccess}
      />
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        userName={userName}
      />
    </>
  );
}

export default App;
