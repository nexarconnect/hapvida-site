import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ExternalLink, Building2, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { COVERED_CITIES, NETWORK_ONLY_CITIES } from '../data/coveredCities';
import { getNetworkUnits } from '../lib/supabase';
import { detectCityIfAlreadyGranted } from '../hooks/useCityDetection';

const DEFAULT_CITY = 'São Paulo';

export default function NetworkSection({ sharedCity }) {
  const [activeCity, setActiveCity] = useState(sharedCity || DEFAULT_CITY);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoDetected, setAutoDetected] = useState(false);

  // Se veio uma cidade de fora (prop), ela manda.
  useEffect(() => {
    if (sharedCity) setActiveCity(sharedCity);
  }, [sharedCity]);

  // Sem cidade vinda de fora: tenta a localização silenciosamente, só se a
  // permissão já tiver sido concedida antes (não pede nada novo aqui).
  useEffect(() => {
    if (sharedCity || autoDetected) return;

    let mounted = true;
    detectCityIfAlreadyGranted().then((city) => {
      if (mounted && city) {
        setActiveCity(city.name);
        setAutoDetected(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, [sharedCity, autoDetected]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // Limpa a unidade da cidade anterior de imediato — sem isso, `featured`
    // fica com o dado antigo até a busca da cidade nova terminar, e o selo
    // "Rede Exclusiva"/nome da unidade errada pode aparecer colado na cidade
    // nova por um instante.
    setUnits([]);

    getNetworkUnits(activeCity).then((data) => {
      if (mounted) {
        setUnits(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeCity]);

  const featured = useMemo(() => units[0] || null, [units]);
  // Só existe registro em `network_units` pra cidade que teve unidade própria
  // confirmada (ver getNetworkUnits) — sem isso, nem o rótulo "Rede Própria"
  // nem o selo "Rede Exclusiva" podem ser afirmados pra essa cidade.
  const hasConfirmedUnit = !loading && !!featured;

  return (
    <section id="network" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header com Seletor de Cidade */}
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-center lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#002b5c]">
              {hasConfirmedUnit ? 'Rede Própria em' : 'Rede de Atendimento em'}{' '}
              <span className="text-[#ff8200]">{activeCity}</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Rede própria e credenciada Hapvida NDI, com tecnologia de ponta e atendimento
              especializado. O tipo de rede disponível varia por cidade; um consultor confirma as
              unidades antes da contratação.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3 text-sm font-bold text-[#002b5c] outline-none transition-colors hover:bg-slate-100 focus:border-[#002b5c]/30"
            >
              {!COVERED_CITIES.some((city) => city.name === activeCity) &&
                !NETWORK_ONLY_CITIES.some((city) => city.name === activeCity) && (
                  <option value={activeCity}>{activeCity}</option>
                )}
              <optgroup label="Interior de São Paulo">
                {COVERED_CITIES.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Rede Hapvida em outras regiões">
                {NETWORK_ONLY_CITIES.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#002b5c]/50"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Sem mode="wait": o card novo monta na hora, com o dado já
              correto pra cidade atual, em vez de esperar a saída do card
              antigo terminar pra só então atualizar. */}
          <AnimatePresence>
            <motion.div
              key={activeCity}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40"
            >
              {/* Visual da Unidade */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                {featured?.image_url ? (
                  <img src={featured.image_url} alt={featured.name || 'Unidade Hapvida'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-300">
                    <Building2 size={64} strokeWidth={1} />
                    <span className="mt-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                      {hasConfirmedUnit ? 'Unidade Hapvida NDI' : 'Consulte disponibilidade'}
                    </span>
                  </div>
                )}
                {hasConfirmedUnit && (
                  <div className="absolute top-4 left-4 rounded-full bg-[#002b5c] px-3 py-1 text-[10px] font-black uppercase text-white">
                    Rede Exclusiva
                  </div>
                )}
              </div>

              {/* Info da Unidade */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  {loading ? (
                    <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />
                  ) : featured ? (
                    <h4 className="text-xl font-black text-[#002b5c] mb-2">{featured.name}</h4>
                  ) : (
                    <h4 className="text-xl font-black text-[#002b5c] mb-2">
                      Consulte a rede em {activeCity}
                    </h4>
                  )}
                  <div className="flex items-start gap-2 text-slate-500 mb-8">
                    <MapPin size={16} className="text-[#ff8200] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium leading-relaxed">
                      {featured?.address || 'Um consultor confirma as unidades disponíveis na sua região.'}
                    </span>
                  </div>
                </div>
                <a
                  href={featured?.map_link || `https://www.google.com/maps/search/?api=1&query=Hapvida+${encodeURIComponent(activeCity)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#f8fafc] hover:bg-blue-50 text-[#002b5c] font-black text-[11px] uppercase tracking-[0.15em] rounded-2xl transition-all border border-slate-100"
                >
                  Abrir no GPS <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Coluna de Benefícios (Equilíbrio de Grid) */}
          <div className="flex flex-col gap-4">
            {[
              { title: "Atendimento Ágil", desc: "Sistemas integrados para reduzir o tempo de espera.", icon: ShieldCheck },
              { title: "Tecnologia de Ponta", desc: "Equipamentos modernos para diagnósticos precisos.", icon: CheckCircle2 },
              { title: "Corpo Clínico", desc: "Especialistas qualificados em diversas áreas médicas.", icon: CheckCircle2 },
              { title: "Gestão Integrada", desc: "Sua ficha médica disponível em toda a rede própria.", icon: Building2 }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-6 rounded-[2rem] border border-slate-50 bg-slate-50/50 transition-colors hover:bg-slate-50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#ff8200] shadow-sm">
                  <item.icon size={24} />
                </div>
                <div>
                  <h5 className="font-black text-[#002b5c] text-sm uppercase tracking-wide">{item.title}</h5>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
