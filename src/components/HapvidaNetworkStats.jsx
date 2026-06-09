import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { hapvidaStats } from '../data/hapvidaNetworkStats';
import CountUpNumber from './CountUpNumber';

export default function HapvidaNetworkStats() {
  return (
    <section className="py-16 md:py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#002b5c] text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={14} className="text-[#ff8200]" />
            {hapvidaStats.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#002b5c]">{hapvidaStats.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hapvidaStats.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon size={28} className="text-[#ff8200] mb-6" />
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#002b5c]">
                    <CountUpNumber value={item.value} />
                  </span>
                  <span className="text-2xl font-black text-[#ff8200]">{item.suffix}</span>
                </div>
                <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}