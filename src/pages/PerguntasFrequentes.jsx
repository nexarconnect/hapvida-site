import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";
import FAQSection from "../components/FAQ";
import SEO from "../components/SEO";
import { EXTENDED_FAQS } from "../data/faqs";
import { Navbar, Footer } from "../components";

export default function PerguntasFrequentes({ onOpenForm }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <SEO
        path="/perguntas-frequentes"
        title="Perguntas Frequentes | Plano Hapvida 2026"
        description="Tire suas dúvidas sobre carência, preços, modalidades, rede de atendimento, coparticipação e cancelamento do plano de saúde Hapvida 2026."
        faqItems={EXTENDED_FAQS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Perguntas Frequentes', path: '/perguntas-frequentes' },
        ]}
      />

      <div className="container mx-auto max-w-3xl px-4 pt-12">
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Perguntas Frequentes</h1>
        </div>
      </div>

      <FAQSection
        faqs={EXTENDED_FAQS}
        title="Todas as perguntas sobre o plano Hapvida"
        subtitle="Organizadas por tema: carência, preços, rede de atendimento e pós-contratação."
      />

      <Footer onOpenForm={onOpenForm} />
    </main>
  );
}
