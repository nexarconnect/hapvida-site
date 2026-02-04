import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const HeroSection = ({ onOpenForm }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/imagens/hero-hapvida.webp" 
          alt="Hapvida Healthcare" 
          className="w-full h-full object-cover opacity-10" 
          loading="eager" 
          fetchpriority="high" 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* H1 Principal */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tabela de Preços Hapvida 2026: <br />
          <span className="text-green-600">Planos a partir de R$ 64,35</span> <br />
          para Bauru e Região
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cotação <strong>gratuita e sem compromisso</strong> com especialista local. 
          Compare valores, cobertura e carência para encontrar o plano ideal para você e sua família.
        </motion.p>

        {/* Bullets */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-semibold">🏥 Atendimento em Bauru e região</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-semibold">👥 Individual, Familiar e PME</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-semibold">🏥 Rede própria + credenciados</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-semibold">⚡ Carência reduzida</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors duration-300 shadow-lg">
            <Phone className="h-5 w-5" />
            📱 Cotar no WhatsApp Agora
          </button>
          <button 
            onClick={onOpenForm}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors duration-300"
          >
            📝 Preencher Formulário Rápido
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        <motion.p 
          className="text-sm text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          *Ao clicar, você será atendido por um consultor especializado.*
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;