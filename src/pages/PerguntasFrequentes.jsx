import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft, ShieldCheck, Clock3, MessageCircleQuestion } from "lucide-react";
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

      <header className="flex flex-col items-center bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <HelpCircle className="h-4 w-4 text-[#ff8200]" />
          Central de Ajuda
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Perguntas Frequentes
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Respostas <strong className="text-white">claras e diretas</strong> sobre carência, preços,
          modalidades e rede de atendimento do plano Hapvida.
        </p>
      </header>

      <section className="bg-white py-10">
        <div className="container mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
              <Clock3 size={22} />
            </div>
            <h3 className="mt-3 font-black text-slate-900">Carência</h3>
            <p className="mt-1 text-sm text-slate-500">Prazos por tipo de atendimento, explicados sem letra miúda.</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
              <ShieldCheck size={22} />
            </div>
            <h3 className="mt-3 font-black text-slate-900">Rede e modalidades</h3>
            <p className="mt-1 text-sm text-slate-500">Diferenças entre individual, familiar, MEI e empresarial.</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
              <MessageCircleQuestion size={22} />
            </div>
            <h3 className="mt-3 font-black text-slate-900">Ainda com dúvida?</h3>
            <p className="mt-1 text-sm text-slate-500">Um consultor confirma o seu caso específico pelo WhatsApp.</p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={EXTENDED_FAQS}
        title="Todas as perguntas sobre o plano Hapvida"
        subtitle="Organizadas por tema: carência, preços, rede de atendimento e pós-contratação."
      />

      <Footer onOpenForm={onOpenForm} />
    </main>
  );
}
