import React from 'react';
import { Building2 } from 'lucide-react';

// Card único de unidade de rede — usado em RedeAtendimento (acordeão) e
// PlanoPorCidade, que antes tinham cada um sua própria versão desse card.
export default function NetworkUnitCard({ unit }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
        <Building2 size={22} />
      </div>
      <div>
        <h3 className="font-black text-slate-900">{unit.name}</h3>
        {unit.address && (
          <p className="mt-1 text-sm text-slate-500">{unit.address}</p>
        )}
        {unit.map_link && (
          <a
            href={unit.map_link}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs font-black uppercase tracking-widest text-[#ff8200] hover:underline"
          >
            Abrir no mapa
          </a>
        )}
      </div>
    </div>
  );
}
