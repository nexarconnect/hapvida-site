import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ExternalLink, Building2, ShieldCheck, CheckCircle2, Search } from 'lucide-react';

const REDE_DETALHADA = {
  'Bauru': {
    hospital: 'Hospital Bauru - Hapvida',
    endereco: 'Rua Agenor Meira, 11-27 - Centro',
    imagem: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Hospital+Bauru+Hapvida+Rua+Agenor+Meira+11-27'
  },
  'Ribeirão Preto': {
    hospital: 'Hospital São Francisco (GNDI)',
    endereco: 'Rua Bernardino de Campos, 912 - Centro',
    imagem: null,
    mapa: 'https://www.google.com/maps/search/?api=1&query=Hospital+Sao+Francisco+Ribeirao+Preto'
  }
};

export default function NetworkSection({ sharedCity }) {
  const [activeCity, setActiveCity] = useState(sharedCity || 'Bauru');
  const local = useMemo(() => REDE_DETALHADA[activeCity] || null, [activeCity]);

  return (
    <section id="network" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header com Seletor de Cidade */}
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-center lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#002b5c]">
              Rede Própria em <span className="text-[#ff8200]">{activeCity}</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Acesso direto às melhores unidades hospitalares da rede Hapvida NDI com tecnologia de ponta e atendimento especializado.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {Object.keys(REDE_DETALHADA).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all ${
                  activeCity === city 
                  ? 'bg-[#002b5c] text-white shadow-lg' 
                  : 'text-slate-400 hover:text-[#002b5c]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCity}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40"
            >
              {/* Visual da Unidade */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                {local?.imagem ? (
                  <img src={local.imagem} alt={local.hospital} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-300">
                    <Building2 size={64} strokeWidth={1} />
                    <span className="mt-2 text-[10px] font-black uppercase tracking-widest opacity-60">Unidade Hapvida NDI</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 rounded-full bg-[#002b5c] px-3 py-1 text-[10px] font-black uppercase text-white">
                  Rede Exclusiva
                </div>
              </div>

              {/* Info da Unidade */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-black text-[#002b5c] mb-2">{local?.hospital}</h4>
                  <div className="flex items-start gap-2 text-slate-500 mb-8">
                    <MapPin size={16} className="text-[#ff8200] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium leading-relaxed">{local?.endereco}</span>
                  </div>
                </div>
                <a 
                  href={local?.mapa} 
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