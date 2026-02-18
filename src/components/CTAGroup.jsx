import React from 'react';

const CTAGroup = ({ onOpenForm, size = 'md' }) => {
  const WHATSAPP_LINK = 'https://wa.me/5514991235094';

  const sizeClasses = {
    sm: 'text-sm h-10 px-4',
    md: 'text-base h-12 px-5',
    lg: 'text-lg h-14 px-6',
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WhatsApp: primário (navy sólido, como referência) */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-base btn-primary-ref ${sizeClasses[size]}`}
        >
          <span>Falar no WhatsApp</span>
        </a>

        {/* Cotação online: secundário (outline vermelho/laranja, como referência) */}
        <button
          type="button"
          onClick={onOpenForm}
          className={`btn-base btn-secondary-ref ${sizeClasses[size]}`}
        >
          <span>Cotação online</span>
        </button>
      </div>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Atendimento humano • Você decide sem compromisso
      </p>
    </div>
  );
};

export default CTAGroup;