import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';
import mapaBrasil from '../assets/mapabrasil.png';
import { COVERED_CITIES, slugifyCity } from '../data/coveredCities';

export default function NationalMap() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Texto */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-black text-[#002b5c] mb-6 leading-tight">
              Presença em todo o <br />
              <span className="text-[#ff8200]">território nacional</span>
            </h3>

            <p className="text-slate-500 text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Rede própria Hapvida em todo o Brasil. Atendemos com foco nas cidades
              abaixo, no interior de São Paulo.
            </p>

            <div className="mb-8 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              <div className="bg-slate-50 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl border border-slate-100 font-bold text-sm md:text-base text-[#002b5c] hover:bg-slate-100 transition-colors">
                +20 Estados
              </div>
              <div className="bg-slate-50 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl border border-slate-100 font-bold text-sm md:text-base text-[#002b5c] hover:bg-slate-100 transition-colors">
                {COVERED_CITIES.length} cidades atendidas
              </div>
            </div>

            <div className="text-left">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Onde atendemos
              </p>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {COVERED_CITIES.map((city) => (
                  <Link
                    key={city.name}
                    to={`/plano-hapvida/${slugifyCity(city.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#002b5c] transition-colors hover:bg-blue-100"
                  >
                    <CheckCircle2 size={12} className="text-[#ff8200]" />
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa/Visualização */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[640px] mx-auto">
              <img
                src={mapaBrasil}
                alt="Mapa do Brasil"
                className="w-full h-auto object-contain mx-auto drop-shadow-[0_8px_24px_rgba(0,43,92,0.10)]"
              />

              {/* Círculos decorativos */}
              <div className="absolute inset-0 rounded-full border border-blue-100 animate-ping opacity-20" />
              <div className="absolute inset-4 rounded-full border border-blue-50 animate-pulse opacity-40" />

              {/* Pin na região de atuação real (interior de SP) */}
              <div className="absolute right-[27%] top-[58%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={60} className="md:size-[80px] text-[#ff8200]" fill="#ff8200" />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-[#ff8200] -z-10"
                  />
                </div>
              </div>
              <p className="absolute right-[6%] top-[64%] text-[10px] font-black uppercase tracking-widest text-[#002b5c]">
                Interior de SP — nossa região
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
