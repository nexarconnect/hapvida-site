import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const FinalCTA = ({ onOpenForm }) => {
  return (
    <section className="py-20 bg-[#004b8d] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Pronto para garantir seu plano com o melhor preço?
          </h2>

          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto opacity-90">
            Receba agora sua cotação personalizada 2026 com atendimento humano e sem compromisso.
          </p>

          {/* Botão Único com Shimmer e Hover */}
          <button
            type="button"
            onClick={onOpenForm}
            className="group relative inline-flex items-center justify-center gap-3 h-16 px-12 rounded-full bg-[#ff8200] hover:bg-[#ff9529] text-white font-black text-lg shadow-[0_20px_50px_rgba(255,130,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Efeito Shimmer */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
            
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>SOLICITAR COTAÇÃO</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Microcopy de Confiança */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-blue-200">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Dados protegidos (LGPD)
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Consultor oficial Hapvida
            </span>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          30%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}} />
    </section>
  );
};

export default FinalCTA;