import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ArrowRight, TrendingDown, Building2, Users } from 'lucide-react';

import { COVERED_CITIES, slugifyCity } from '../data/coveredCities';
import { EXTENDED_FAQS } from '../data/faqs';
import { Navbar, Footer, ChatInteligente } from '../components';
import FAQSection from '../components/FAQ';
import SEO from '../components/SEO';
import { useSiteConfig } from '../lib/siteConfig';

const POR_QUE_VARIA = [
  {
    icon: Building2,
    titulo: 'Rede disponível na cidade',
    texto:
      'O valor muda porque a rede própria e credenciada da Hapvida não é igual em todas as cidades. Onde há mais estrutura própria, o custo tende a ser menor.',
  },
  {
    icon: Users,
    titulo: 'Perfil de quem contrata na região',
    texto:
      'A sinistralidade média de cada cidade (o quanto os beneficiários usam o plano) entra no cálculo do valor cobrado ali.',
  },
  {
    icon: TrendingDown,
    titulo: 'Modalidade escolhida',
    texto:
      'Individual, Super Simples (2 a 29 vidas) ou PME (30 vidas ou mais) têm tabelas próprias, além da faixa etária de quem vai ser incluído no plano.',
  },
];

export default function PlanosPorCidade({ onOpenForm }) {
  const title = 'Plano Hapvida por Cidade 2026 | Interior de SP';
  const description =
    'Veja o plano de saúde Hapvida disponível na sua cidade no interior de SP: preços, rede de atendimento local e cotação pelo WhatsApp.';

  // city_filter (config de /admin/config): vazio mostra todas as cidades
  // atendidas (comportamento atual). Preenchido, mostra só as que batem
  // (case-insensitive, por substring do nome).
  const { city_filter } = useSiteConfig();
  const filteredCities = city_filter
    ? COVERED_CITIES.filter((city) =>
        city.name.toLowerCase().includes(city_filter.trim().toLowerCase())
      )
    : COVERED_CITIES;

  return (
    <div>
      <SEO
        path="/planos-hapvida-por-cidade"
        title={title}
        description={description}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Planos por Cidade', path: '/planos-hapvida-por-cidade' },
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
          <MapPin className="h-4 w-4 text-[#ff8200]" />
          Interior de São Paulo
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Plano Hapvida por cidade
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          A Nexar atende em todo o Brasil, onde a Hapvida está presente. Temos página com preços e
          rede detalhados para estas {filteredCities.length} cidades do interior de São Paulo.
        </p>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Por que o preço muda de uma cidade para outra?
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {POR_QUE_VARIA.map((item) => (
              <div key={item.titulo} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <item.icon className="h-6 w-6 text-[#ff8200]" />
                <h3 className="mt-3 font-black text-slate-900">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCities.map((city) => (
              <Link
                key={city.name}
                to={`/plano-hapvida/${slugifyCity(city.name)}`}
                className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#ff8200]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c] group-hover:bg-[#ff8200]/10 group-hover:text-[#ff8200]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900">{city.name}</h2>
                    <p className="text-xs text-slate-400">{city.state}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#ff8200]" />
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-black text-[#002b5c] md:text-2xl">
              Não encontrou a sua cidade?
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              A Nexar atende em todo o Brasil, em qualquer cidade onde a Hapvida tenha rede. Fale
              com um consultor pelo WhatsApp e confirme a disponibilidade e os valores para a sua
              região.
            </p>
            <button
              type="button"
              onClick={() => onOpenForm?.()}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#ff8200] px-8 py-4 font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e67600]"
            >
              Solicitar cotação
            </button>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={EXTENDED_FAQS.filter((item) => item.category === 'Rede de atendimento')}
        title="Perguntas sobre cidades e rede"
        subtitle="Disponibilidade, cobertura e como confirmar sua região."
      />

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
