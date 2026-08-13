import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, ArrowRight, Siren, Baby, Stethoscope } from 'lucide-react';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components';
import { NETWORK_CITIES_BY_STATE } from '../data/coveredCities';

const CATEGORY_LINKS = [
  { to: '/rede-nacional/urgencia-e-emergencia', label: 'Urgência e Emergência', Icon: Siren },
  { to: '/rede-nacional/rede-pediatrica', label: 'Rede Pediátrica', Icon: Baby },
  { to: '/rede-nacional/clinicas-por-capital', label: 'Clínicas por Capital', Icon: Stethoscope },
];

export default function RedeNacional({ onOpenForm }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <SEO
        path="/rede-nacional"
        title="Rede Hapvida por Estado 2026 | Hospitais e Unidades Fora de SP"
        description="Consulte hospitais, clínicas e prontos-atendimentos da rede própria e credenciada Hapvida nos estados fora do interior de São Paulo. Veja as cidades atendidas em cada estado e fale com um consultor Nexar."
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Rede de Atendimento', path: '/rede-de-atendimento' },
          { name: 'Rede por Estado', path: '/rede-nacional' },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 pt-12">
        <Link
          to="/rede-de-atendimento"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Rede de Atendimento
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Rede Hapvida por estado</h1>
        </div>
        <p className="mb-10 text-sm text-slate-500">
          Rede própria e credenciada Hapvida nos estados fora de São Paulo. Escolha um estado para
          ver todas as cidades atendidas e as unidades de cada uma. Preço e cotação para essas
          regiões ainda são confirmados direto com um consultor.
        </p>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {CATEGORY_LINKS.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-[#ff8200]/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c] group-hover:bg-[#ff8200]/10 group-hover:text-[#ff8200]">
                <Icon size={20} />
              </div>
              <span className="font-black text-sm text-slate-900">{label}</span>
            </Link>
          ))}
        </div>

        <h2 className="mb-4 text-lg font-black text-[#002b5c]">Ou veja por estado</h2>
        <div className="grid gap-4 pb-16 sm:grid-cols-2">
          {NETWORK_CITIES_BY_STATE.map((group) => (
            <Link
              key={group.state}
              to={`/rede-nacional/${group.slug}`}
              className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#ff8200]/40 hover:shadow-md"
            >
              <div>
                <h2 className="font-black text-slate-900">
                  {group.stateName} <span className="text-slate-400">({group.state})</span>
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {group.cities.length} {group.cities.length === 1 ? 'cidade atendida' : 'cidades atendidas'}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#ff8200]" />
            </Link>
          ))}
        </div>
      </div>

      <Footer onOpenForm={onOpenForm} />
    </main>
  );
}
