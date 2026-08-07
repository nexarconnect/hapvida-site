import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft, ChevronDown, Building2 } from "lucide-react";
import NetworkSection from "../components/NetworkSection";
import SEO from "../components/SEO";
import { COVERED_CITIES, slugifyCity } from "../data/coveredCities";
import { getNetworkUnits } from "../lib/supabase";

function CityAccordionItem({ city }) {
  const [isOpen, setIsOpen] = useState(false);
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next && units === null) {
      setLoading(true);
      const data = await getNetworkUnits(city.name);
      // A tabela network_units tem linhas duplicadas para a mesma unidade
      // (mesmo nome + endereço) em algumas cidades — dedup defensivo aqui
      // até a duplicidade ser limpa na fonte.
      const seen = new Set();
      const deduped = (data || []).filter((unit) => {
        const key = `${unit.name}|${unit.address}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setUnits(deduped);
      setLoading(false);
    }
  };

  const panelId = `rede-cidade-${slugifyCity(city.name)}`;

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
          <span className="font-black text-slate-900">
            {city.name}, {city.state}
          </span>
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
                    {unit.address && (
                      <span className="block text-slate-500">{unit.address}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Um consultor confirma as unidades disponíveis em {city.name}.
            </p>
          )}
          <Link
            to={`/plano-hapvida/${slugifyCity(city.name)}`}
            className="mt-4 inline-block text-xs font-black uppercase tracking-widest text-[#ff8200] hover:underline"
          >
            Ver preços em {city.name}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function RedeAtendimento() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        path="/rede-de-atendimento"
        title="Rede de Atendimento e Hospitais Credenciados Hapvida 2026"
        description="Consulte hospitais, clínicas e prontos-atendimentos da rede própria e credenciada Hapvida por cidade no interior de SP."
      />

      <div className="container mx-auto max-w-6xl px-4 pt-12">
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Rede de Atendimento</h1>
        </div>
      </div>

      <NetworkSection />

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-2 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Hospitais e clínicas por cidade
          </h2>
          <p className="mb-10 text-center text-sm text-slate-500">
            Clique na sua cidade para ver as unidades disponíveis.
          </p>

          <div className="space-y-3">
            {COVERED_CITIES.map((city) => (
              <CityAccordionItem key={city.name} city={city} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
