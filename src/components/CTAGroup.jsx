import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const CTAGroup = ({ onOpenForm, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm h-10 px-6 gap-2',
    md: 'text-base h-14 px-10 gap-3',
    lg: 'text-lg h-16 px-12 gap-3',
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        type="button"
        onClick={onOpenForm}
        className={`
          relative overflow-hidden w-full sm:w-auto flex items-center justify-center 
          rounded-full font-extrabold text-white transition-all duration-300 ease-out
          bg-[#ff8200] hover:bg-[#ff9529]
          hover:scale-[1.05] hover:shadow-[0_10px_40px_-10px_rgba(255,130,0,0.5)]
          active:scale-95 ${sizeClasses[size]}
        `}
      >
        {/* Efeito Brilho (Shimmer) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
        
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="tracking-tight">SOLICITAR COTAÇÃO</span>
        <ArrowRight className="w-5 h-5 opacity-70" />
      </button>

      <p className="text-center text-xs sm:text-sm text-gray-500 font-medium flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        Atendimento humano via WhatsApp
      </p>

      {/* Adicione este estilo global ou no seu arquivo CSS principal */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          30%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}} />
    </div>
  );
};

export default CTAGroup;