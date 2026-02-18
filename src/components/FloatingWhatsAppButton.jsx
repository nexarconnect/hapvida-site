import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsappButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Só mostra depois de rolar 200px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Fecha o balãozinho de texto depois de 10s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // MENSAGEM OTIMIZADA:
  // "👋 Olá! Estou navegando no site agora e gostaria de falar com um consultor sobre o planos de saúde."
  const whatsappMessage = "Ol%C3%A1!%20Estou%20navegando%20no%20site%20agora%20e%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20o%20Hapvida.";
  const whatsappNumber = "5514991235094";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Balão de Texto (Tooltip) */}
      {showTooltip && (
        <div className="relative bg-white text-gray-800 px-4 py-3 rounded-xl shadow-xl border border-gray-100 max-w-[200px] animate-bounce-slow origin-bottom-right">
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 text-gray-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-medium leading-tight">
            👋 Olá! Posso te ajudar?
          </p>
          {/* Triângulo do balão */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
        </div>
      )}

      {/* Botão Principal */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: '#25D366', // Verde Oficial
        }}
        onMouseEnter={(e) => {
          setShowTooltip(true);
          e.currentTarget.style.backgroundColor = '#128C7E'; // Verde Escuro Oficial (Hover)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#25D366'; // Volta para o Verde Oficial
        }}
      >
        {/* Onda de Pulso (Pulse Effect) */}
        <span className="absolute inset-0 rounded-full opacity-75 animate-ping duration-[2000ms]" style={{ backgroundColor: '#25D366' }}></span>
        
        <MessageCircle className="w-8 h-8 relative z-10 fill-white text-white" />
        
        {/* Status Online (Bolinha Verde) */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full z-20"></span>
      </a>
    </div>
  );
};

export default FloatingWhatsappButton;