import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smile, CheckCircle2 } from 'lucide-react';

import { Navbar, Footer, ChatInteligente, CTAGroup, FinalCTA } from '../components';
import FAQSection from '../components/FAQ';
import SEO from '../components/SEO';
import { trackCTA } from '../lib/tracking';

const PLANOS_ODONTO = [
  {
    plano: 'Odonto Premium (471.904/14-2)',
    normal: 'R$ 75,84',
    promo: 'R$ 14,87',
  },
  {
    plano: 'Odonto Premium Nacional',
    normal: 'R$ 78,87',
    promo: 'R$ 23,25',
  },
  {
    plano: 'Odonto Proteção (471.906/14-9)',
    normal: 'Não informado',
    promo: 'R$ 0,00',
  },
];

const INCLUSOS = [
  'Consultas e avaliações',
  'Limpeza e prevenção',
  'Restaurações',
  'Extrações',
  'Atendimento de urgência',
  'Raio-X (conforme o plano contratado)',
];

const ODONTO_FAQS = [
  {
    category: 'Odontológico',
    question: 'O plano odontológico Hapvida tem carência?',
    answer: 'Sim, os prazos seguem o padrão da ANS, com carências reduzidas para urgência.',
  },
  {
    category: 'Odontológico',
    question: 'Posso contratar só o plano odontológico, sem o médico?',
    answer: 'Sim. É um contrato separado do plano médico, mas o maior desconto (até 80%) vale só para quem já tem ou está contratando o plano médico junto.',
  },
  {
    category: 'Odontológico',
    question: 'A rede odontológica é nacional?',
    answer: 'Sim, a rede de atendimento odontológico é nacional, com clínicas credenciadas em todo o país.',
  },
];

export default function PlanoOdontologico({ onOpenForm }) {
  const handleOpenForm = () => {
    trackCTA('simulacao_click', 'plano_odontologico_hero', { type: 'odonto' });
    onOpenForm?.();
  };

  const handleWhatsAppClick = () => {
    trackCTA('whatsapp_click', 'plano_odontologico_cta', { type: 'odonto' });
  };

  const title = 'Plano Odontológico Hapvida: Preço a partir de R$ 14,87/mês';
  const description =
    'Plano odontológico Hapvida com até 80% de desconto ao contratar plano médico: Odonto Premium R$ 14,87. Rede nacional. Simule grátis até 30/09/2026.';

  return (
    <div>
      <SEO
        path="/plano-odontologico-hapvida"
        title={title}
        description={description}
        faqItems={ODONTO_FAQS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Plano Odontológico', path: '/plano-odontologico-hapvida' },
        ]}
      />
      <Navbar />

      <header className="flex flex-col items-center bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <Smile className="h-4 w-4 text-[#ff8200]" />
          Odonto Hapvida
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Plano Odontológico Hapvida
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Um sorriso saudável é o cartão de visitas. Ao contratar o plano médico Hapvida, o
          odontológico sai com desconto de até 80%: prevenção acessível.
        </p>
        <div className="mt-8">
          <CTAGroup onOpenForm={handleOpenForm} size="md" />
        </div>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Quanto custa?</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th className="px-4 py-3 font-black">Plano</th>
                  <th className="px-4 py-3 font-black">Normal</th>
                  <th className="px-4 py-3 font-black">Promo com plano médico</th>
                </tr>
              </thead>
              <tbody>
                {PLANOS_ODONTO.map((row) => (
                  <tr key={row.plano} className="border-b border-slate-100 bg-slate-50 even:bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.plano}</td>
                    <td className="px-4 py-3 text-slate-700">{row.normal}</td>
                    <td className="px-4 py-3 font-bold text-[#ff8200]">{row.promo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Taxa de adesão: R$ 20,00 na contratação coletiva ou R$ 35,00 na contratação individual.
            O plano odontológico é um contrato separado do plano médico.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">O que está incluído</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {INCLUSOS.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#ff8200]" />
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Para empresas, o Odonto Proteção Total opera em regime misto, combinando cobertura
            básica com procedimentos adicionais conforme a modalidade contratada.
          </p>
        </div>
      </section>

      <FAQSection
        faqs={ODONTO_FAQS}
        title="Perguntas sobre o plano odontológico"
        subtitle="Carência, contratação e rede de atendimento."
      />

      <section className="bg-white py-12 text-center">
        <div className="container mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Leve o odonto por R$ 14,87 ao contratar seu plano médico
          </h2>
          <div className="mt-8 flex justify-center">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                handleWhatsAppClick();
                handleOpenForm();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#1EBE5D] hover:shadow-xl active:scale-95 md:text-base"
            >
              Falar com um consultor
            </a>
          </div>
        </div>
      </section>

      <FinalCTA onOpenForm={handleOpenForm} />

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
