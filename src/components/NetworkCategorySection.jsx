import React, { useEffect, useState } from 'react';
import { MapPin, Building2, Siren, Stethoscope, FlaskConical, ScanLine, Baby } from 'lucide-react';
import { NETWORK_ONLY_CITIES, NETWORK_CITIES_BY_STATE } from '../data/coveredCities';
import { getNetworkUnitsByCities } from '../lib/supabase';

function parseSpecialties(unit) {
  if (Array.isArray(unit.specialties)) return unit.specialties;
  if (typeof unit.specialties === 'string') {
    try {
      const parsed = JSON.parse(unit.specialties);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// Tipo de unidade (primeiro item de specialties, ex. "Hospital",
// "Pronto Atendimento") -> ícone e cor do selo. Sem match, cai no genérico.
const TYPE_STYLE = {
  'Hospital': { Icon: Building2, badge: 'bg-blue-50 text-[#002b5c]' },
  'Hospital/Maternidade': { Icon: Baby, badge: 'bg-pink-50 text-pink-700' },
  'Pronto Atendimento': { Icon: Siren, badge: 'bg-red-50 text-red-700' },
  'Clínica': { Icon: Stethoscope, badge: 'bg-emerald-50 text-emerald-700' },
  'Clínica (digital)': { Icon: Stethoscope, badge: 'bg-emerald-50 text-emerald-700' },
  'Diagnóstico': { Icon: ScanLine, badge: 'bg-violet-50 text-violet-700' },
  'Laboratório': { Icon: FlaskConical, badge: 'bg-amber-50 text-amber-700' },
};
const DEFAULT_TYPE_STYLE = { Icon: Building2, badge: 'bg-slate-100 text-slate-600' };

/**
 * Seção reaproveitada pelas 3 páginas de categoria (urgência/emergência,
 * pediátrica, clínicas) — busca as unidades das cidades de
 * NETWORK_ONLY_CITIES de uma vez e filtra no cliente por `tags` (qualquer
 * uma bate, é OR). Agrupa por estado/cidade igual RedeEstado.jsx, mas só
 * mostra estado/cidade que realmente tem unidade na categoria — sem isso, a
 * página listaria estado vazio como se não tivesse rede na categoria (em vez
 * de simplesmente não aparecer).
 */
export default function NetworkCategorySection({ tags }) {
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getNetworkUnitsByCities(NETWORK_ONLY_CITIES.map((c) => c.name)).then((data) => {
      if (mounted) {
        setUnits(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-400">Carregando rede...</p>;
  }

  const matching = (units || []).filter((unit) => {
    const unitTags = parseSpecialties(unit);
    return tags.some((tag) => unitTags.includes(tag));
  });

  const groups = NETWORK_CITIES_BY_STATE.map((group) => {
    const citiesWithUnits = group.cities
      .map((city) => ({
        city,
        units: matching.filter((u) => u.city === city.name),
      }))
      .filter((entry) => entry.units.length > 0);
    return { ...group, citiesWithUnits };
  }).filter((group) => group.citiesWithUnits.length > 0);

  if (groups.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Nenhuma unidade dessa categoria confirmada ainda fora do interior de SP. Fale com um
        consultor para verificar disponibilidade na sua região.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.state}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-[#002b5c]">
            <MapPin className="h-5 w-5 text-[#ff8200]" />
            {group.stateName} <span className="text-slate-400">({group.state})</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.citiesWithUnits.map(({ city, units: cityUnits }) => (
              <div key={city.name} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <h3 className="border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-500">
                  {city.name}
                  <span className="ml-2 font-normal normal-case text-slate-400">
                    ({cityUnits.length} {cityUnits.length === 1 ? 'unidade' : 'unidades'})
                  </span>
                </h3>
                <ul className="divide-y divide-slate-100">
                  {cityUnits.map((unit) => {
                    const type = parseSpecialties(unit)[0];
                    const { Icon, badge } = TYPE_STYLE[type] || DEFAULT_TYPE_STYLE;
                    return (
                      <li key={unit.id} className="flex items-start gap-3 px-5 py-4">
                        <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${badge}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800">{unit.name}</p>
                          {unit.address && (
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{unit.address}</p>
                          )}
                          {type && (
                            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${badge}`}>
                              {type}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
