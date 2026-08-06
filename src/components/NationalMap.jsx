import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import mapaBrasil from '../assets/mapabrasil.png';

export default function NationalMap() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Texto */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-black text-[#002b5c] mb-6 leading-tight">
              Rede própria em <br />
              <span className="text-[#ff8200]">mais de 20 estados</span>
            </h3>
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
