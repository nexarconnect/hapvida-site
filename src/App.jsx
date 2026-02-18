import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PlansSection from "./components/PlansSection"; // <--- NOVO COMPONENTE UNIFICADO
import NetworkSection from "./components/NetworkSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";
import FloatingWhatsappButton from "./components/FloatingWhatsappButton";

// Pages
import RedeCredenciada from "./pages/RedeCredenciada";
import PoliticasPrivacidade from "./pages/PoliticasPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") return;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      <ScrollToHash />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onOpenForm={openForm} />
              <HeroSection onOpenForm={openForm} />
              
              {/* Seção de Planos Unificada */}
              <PlansSection onOpenForm={openForm} />
              
              <NetworkSection />
              <FAQSection />
              <Footer />
              
              <FormModal isOpen={isFormOpen} onClose={closeForm} />
            </>
          }
        />
        
        <Route
          path="/rede-credenciada"
          element={
            <>
              <Header onOpenForm={openForm} />
              <RedeCredenciada />
              <Footer />
              <FormModal isOpen={isFormOpen} onClose={closeForm} />
            </>
          }
        />
        
        <Route
          path="/politicas-privacidade"
          element={
            <>
              <Header onOpenForm={openForm} />
              <PoliticasPrivacidade />
              <Footer />
              <FormModal isOpen={isFormOpen} onClose={closeForm} />
            </>
          }
        />
        
        <Route
          path="/termos-de-uso"
          element={
            <>
              <Header onOpenForm={openForm} />
              <TermosDeUso />
              <Footer />
              <FormModal isOpen={isFormOpen} onClose={closeForm} />
            </>
          }
        />
      </Routes>

      <FloatingWhatsappButton />
    </>
  );
}