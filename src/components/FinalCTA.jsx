import React from 'react';
import { motion } from 'framer-motion';
import { Phone, FileText } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para garantir seu plano Hapvida com o melhor preço?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Clique no botão abaixo e receba <strong>agora</strong> a cotação personalizada para <strong>Bauru ou sua cidade no interior de SP</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors duration-300 shadow-lg">
              <Phone className="h-5 w-5" />
              📱 WhatsApp
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors duration-300">
              <FileText className="h-5 w-5" />
              📝 Formulário
            </button>
          </div>

          <p className="text-sm opacity-90">
            *Atendimento humano. Sem robôs. Sem compromisso. Dados protegidos pela LGPD.*
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;