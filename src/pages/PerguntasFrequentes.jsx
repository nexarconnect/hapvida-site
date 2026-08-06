import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";
import FAQSection from "../components/FAQ";
import SEO from "../components/SEO";
import { FAQS } from "../data/faqs";

export default function PerguntasFrequentes() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        path="/perguntas-frequentes"
        title="Perguntas Frequentes | Plano Hapvida 2026"
        description="Tire suas dúvidas sobre carência, preços, modalidades e rede de atendimento do plano de saúde Hapvida 2026."
        faqItems={FAQS}
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

      <FAQSection />
    </main>
  );
}
