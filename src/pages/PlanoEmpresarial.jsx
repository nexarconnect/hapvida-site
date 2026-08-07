import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, ShieldCheck, TrendingDown, Users2 } from 'lucide-react';

import { getPricingData } from '../lib/supabase';
import { Navbar, PriceTablesSection, HapvidaNetworkStats, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';

const FAQ_ITEMS = [
  {
    question: 'Posso contratar o plano empresarial sendo MEI?',
    answer:
      'Sim. MEI com CNPJ ativo pode contratar a modalidade empresarial, mesmo sozinho (sem outros funcionários), conforme as regras comerciais vigentes na sua região.',
  },
  {
    question: 'Quantas vidas são necessárias para contratar como empresa?',
    answer:
      'Varia conforme a operadora e a região. Um consultor confirma o número mínimo de vidas exigido para a sua cidade no momento da cotação.',
  },
  {
    question: 'O plano empresarial é mais barato que o individual?',
    answer:
      'Costuma ter condições comerciais diferentes das do plano individual, que podem ser mais vantajosas dependendo da região e do perfil da empresa. A comparação exata depende da cotação.',
  },
  {
    question: 'Que documentos são necessários?',
    answer:
      'CNPJ ativo e os documentos pessoais de cada beneficiário a ser incluído. A lista completa varia conforme o tempo de atividade da empresa e a quantidade de vidas.',
  },
];

export default function PlanoEmpresarial({ onOpenForm }) {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getPricingData();
        if (mounted) setPricing(data);
      } catch (error) {
        console.error('Erro ao carregar preços:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const title = 'Plano Empresarial Hapvida 2026 | CNPJ e MEI';
  const description =
    'Plano de saúde Hapvida empresarial para empresas e MEI com CNPJ ativo. Veja condições, documentos necessários e solicite uma cotação.';

  return (
    <div>
      <SEO path="/plano-empresarial-hapvida" title={title} description={description} faqItems={FAQ_ITEMS} />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <Briefcase className="h-4 w-4 text-[#ff8200]" />
          Empresas e MEI
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Plano Empresarial Hapvida
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Para empresas e MEI com CNPJ ativo, com condições comerciais próprias da modalidade
          empresarial.
        </p>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            O que é o plano empresarial
          </h2>
          <p className="mt-4 text-slate-600">
            É a modalidade voltada a pessoas jurídicas com CNPJ ativo, incluindo MEI. A condição
            comercial (valores, rede disponível e regras de carência) varia conforme a região e o
            perfil da empresa, por isso a cotação é sempre personalizada.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <Briefcase className="h-7 w-7 text-[#ff8200]" />
              <h3 className="mt-4 font-black text-slate-900">CNPJ ativo</h3>
              <p className="mt-2 text-sm text-slate-500">
                Empresas e MEI podem contratar, mesmo com poucos funcionários.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <TrendingDown className="h-7 w-7 text-[#ff8200]" />
              <h3 className="mt-4 font-black text-slate-900">Condição comercial própria</h3>
              <p className="mt-2 text-sm text-slate-500">
                Regras de valor e carência específicas para a modalidade empresarial.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <Users2 className="h-7 w-7 text-[#ff8200]" />
              <h3 className="mt-4 font-black text-slate-900">Inclui colaboradores</h3>
              <p className="mt-2 text-sm text-slate-500">
                Adicione beneficiários vinculados à empresa no mesmo contrato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-24 text-center text-slate-400">Carregando preços...</div>
      ) : (
        <PriceTablesSection pricing={pricing} onOpenForm={onOpenForm} />
      )}

      <HapvidaNetworkStats />

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-[#ff8200]" />
          <h2 className="mt-4 text-2xl font-black text-[#002b5c] md:text-3xl">
            Empresarial ou individual? Compare antes de decidir
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Nem sempre o empresarial é a opção mais vantajosa. Veja o comparativo completo entre
            as modalidades antes de pedir sua cotação.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/plano-individual-hapvida"
              className="rounded-2xl border border-[#002b5c] px-6 py-3 text-sm font-black uppercase tracking-widest text-[#002b5c] transition hover:bg-[#002b5c] hover:text-white"
            >
              Ver plano individual
            </Link>
            <Link
              to="/tipos-de-planos"
              className="rounded-2xl bg-[#ff8200] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#e67600]"
            >
              Comparar todas as modalidades
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Perguntas sobre o plano empresarial
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-100 bg-white p-6">
                <h3 className="font-black text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Quer entender melhor o MEI? Veja o post sobre{' '}
            <Link to="/blog/plano-hapvida-empresarial-mei" className="font-bold text-[#002b5c] underline">
              plano Hapvida empresarial e MEI
            </Link>
            .
          </p>
        </div>
      </section>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
