import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCheck, ShieldCheck, TrendingUp, Users2 } from 'lucide-react';

import { getPricingData } from '../lib/supabase';
import { Navbar, PriceTablesSection, HapvidaNetworkStats, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';

const FAQ_ITEMS = [
  {
    question: 'Preciso ter CNPJ para contratar o plano individual?',
    answer:
      'Não. O plano individual é contratado direto por CPF, sem exigir empresa ativa. É a modalidade indicada para quem não tem MEI ou CNPJ, ou prefere não vincular o plano a uma empresa.',
  },
  {
    question: 'Posso incluir meus dependentes no plano individual?',
    answer:
      'Sim, na modalidade familiar. Cônjuge e filhos podem ser incluídos no mesmo contrato, cada um com sua própria carência conforme a data de inclusão.',
  },
  {
    question: 'O reajuste do plano individual é diferente do empresarial?',
    answer:
      'Sim. O plano individual segue o teto de reajuste anual definido pela ANS. Já o empresarial negocia o reajuste diretamente com a operadora, conforme sinistralidade do grupo.',
  },
  {
    question: 'O valor muda conforme a idade?',
    answer:
      'Sim, o plano individual usa faixas etárias definidas pela ANS. Quanto mais nova a faixa, menor tende a ser o valor. Um consultor confirma o valor exato para a sua idade e cidade.',
  },
];

export default function PlanoIndividual({ onOpenForm }) {
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

  const title = 'Plano Individual Hapvida 2026 | Preço e Como Contratar';
  const description =
    'Plano de saúde Hapvida individual: contratação por CPF, sem CNPJ. Veja preços, como incluir dependentes e a rede de atendimento disponível.';

  return (
    <div>
      <SEO
        path="/plano-individual-hapvida"
        title={title}
        description={description}
        faqItems={FAQ_ITEMS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Plano Individual', path: '/plano-individual-hapvida' },
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
          <UserCheck className="h-4 w-4 text-[#ff8200]" />
          Contratação por CPF
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Plano Individual Hapvida
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Sem CNPJ, sem burocracia de empresa. Contrate direto no seu nome, com a opção de incluir
          dependentes.
        </p>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            O que é o plano individual
          </h2>
          <p className="mt-4 text-slate-600">
            É a modalidade contratada diretamente por pessoa física (CPF), sem precisar de MEI ou
            CNPJ ativo. Pode incluir cônjuge e filhos como dependentes (plano familiar) e o
            reajuste anual segue o teto definido pela ANS, diferente do plano empresarial, que
            negocia reajuste com a operadora.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <UserCheck size={22} />
              </div>
              <h3 className="font-black text-slate-900">Sem CNPJ</h3>
              <p className="mt-2 text-sm text-slate-500">
                Contratação direto por CPF, sem precisar abrir empresa.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <Users2 size={22} />
              </div>
              <h3 className="font-black text-slate-900">Dependentes</h3>
              <p className="mt-2 text-sm text-slate-500">
                Inclua cônjuge e filhos no mesmo contrato (modalidade familiar).
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-black text-slate-900">Reajuste regulado</h3>
              <p className="mt-2 text-sm text-slate-500">
                Reajuste anual segue o teto definido pela ANS.
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
          <TrendingUp className="mx-auto h-8 w-8 text-[#ff8200]" />
          <h2 className="mt-4 text-2xl font-black text-[#002b5c] md:text-3xl">
            Individual ou empresarial? Compare antes de decidir
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Se você tem CNPJ ativo, inclusive MEI, o plano empresarial costuma ter condições
            comerciais diferentes. Veja o comparativo completo entre as modalidades.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/plano-empresarial-hapvida"
              className="rounded-2xl border border-[#002b5c] px-6 py-3 text-sm font-black uppercase tracking-widest text-[#002b5c] transition hover:bg-[#002b5c] hover:text-white"
            >
              Ver plano empresarial
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
            Perguntas sobre o plano individual
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
            Mais dúvidas? Veja as{' '}
            <Link to="/perguntas-frequentes" className="font-bold text-[#002b5c] underline">
              perguntas frequentes completas
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
