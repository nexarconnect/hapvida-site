import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowLeft, ChevronDown, Building2 } from 'lucide-react';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components';
import { getNetworkStateBySlug, slugifyCity } from '../data/coveredCities';
import { getNetworkUnits } from '../lib/supabase';

function CityUnits({ city, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(false);
  const panelId = `rede-estado-${slugifyCity(city.name)}`;

  const loadUnits = async () => {
    setLoading(true);
    const data = await getNetworkUnits(city.name);
    // Mesma dedupe defensiva usada em RedeAtendimento.jsx — a tabela
    // network_units pode ter linha duplicada (mesmo nome + endereço).
    const seen = new Set();
    const deduped = (data || []).filter((unit) => {
      const key = `${unit.name}|${unit.address}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setUnits(deduped);
    setLoading(false);
  };

  // A primeira cidade de cada estado abre já expandida (defaultOpen) — sem
  // isso, o prerender (Puppeteer) captura a página com todo acordeão
  // fechado, e o HTML estático que o Google indexa não tem nenhum nome de
  // unidade, só os nomes das cidades. Com uma cidade sempre aberta, ao menos
  // essa unidade entra no HTML pré-renderizado de cada página de estado.
  useEffect(() => {
    if (defaultOpen) loadUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city.name]);

  const handleToggle = async () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next && units === null) {
      loadUnits();
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 flex-shrink-0 text-[#ff8200]" />
          <span className="font-black text-slate-900">{city.name}</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div id={panelId} className="border-t border-slate-100 px-6 pb-6 pt-4">
          {loading ? (
            <p className="text-sm text-slate-400">Carregando unidades de {city.name}...</p>
          ) : units && units.length > 0 ? (
            <ul className="space-y-3">
              {units.map((unit) => (
                <li key={unit.id} className="flex items-start gap-3 text-sm">
                  <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#002b5c]" />
                  <div>
                    <span className="font-bold text-slate-800">{unit.name}</span>
                    {unit.address && <span className="block text-slate-500">{unit.address}</span>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Um consultor confirma as unidades disponíveis em {city.name}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function RedeEstado({ onOpenForm }) {
  const { slug } = useParams();
  const group = getNetworkStateBySlug(slug);

  if (!group) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="px-4 pt-12 text-center">
          <p className="text-slate-600">Estado não encontrado.</p>
          <Link to="/rede-nacional" className="mt-4 inline-block text-[#ff8200] hover:underline">
            Voltar para Rede por Estado
          </Link>
        </div>
        <Footer onOpenForm={onOpenForm} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <SEO
        path={`/rede-nacional/${group.slug}`}
        title={
          group.stateName.length > 10
            ? `Rede Hapvida em ${group.stateName} | Unidades Credenciadas`
            : `Rede Hapvida em ${group.stateName} | Hospitais e Unidades Credenciadas`
        }
        description={`Consulte hospitais, clínicas e prontos-atendimentos da rede própria e credenciada Hapvida em ${group.stateName}: veja as cidades atendidas e fale com um consultor Nexar para confirmar disponibilidade.`}
        localBusiness={{ city: group.stateName, areaType: 'State' }}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Rede de Atendimento', path: '/rede-de-atendimento' },
          { name: 'Rede por Estado', path: '/rede-nacional' },
          { name: group.stateName, path: `/rede-nacional/${group.slug}` },
        ]}
      />

      <div className="container mx-auto max-w-6xl px-4 pt-12">
        <Link
          to="/rede-nacional"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Rede por Estado
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-[#002b5c]" />
          <h1 className="text-3xl font-black text-slate-900">
            Rede Hapvida em {group.stateName}
          </h1>
        </div>
        <p className="mb-10 text-sm text-slate-500">
          Todas as cidades atendidas pela rede própria e credenciada Hapvida em {group.stateName}.
          Preço e cotação ainda são confirmados direto com um consultor.
        </p>

        <div className="space-y-3 pb-16">
          {group.cities.map((city, index) => (
            <CityUnits key={city.name} city={city} defaultOpen={index === 0} />
          ))}
        </div>
      </div>

      <Footer onOpenForm={onOpenForm} />
    </main>
  );
}
