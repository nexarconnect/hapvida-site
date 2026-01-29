import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import FormModal from '@/components/FormModal';

const ValueSection = ({ onSuccess }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSuccess = (name) => {
    onSuccess(name);
  };

  return (
    <section id="cotacao" className="py-16 bg-gray-50">
      <FormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={handleSuccess}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
              Plano de saúde Hapvida 2026
            </h2>
            <p className="text-3xl font-bold text-gray-800 mb-4">
              Valores a partir de <span className="text-[var(--hapvida-orange)]">R$ 64,35</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-700">
              <CheckCircle2 className="text-[var(--hapvida-blue)]" />
              <p>Receba as PROMOÇÕES ao solicitar sua cotação (em menos de 1 minuto)</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Não perca tempo! Garanta seu desconto especial hoje.
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Nossa equipe de especialistas está pronta para apresentar a melhor opção para o seu perfil e o da sua família. Clique abaixo e inicie seu atendimento.
            </p>

            <Button
              onClick={() => setIsFormOpen(true)}
              className="w-full md:w-auto px-12 py-6 text-xl font-bold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              style={{ backgroundColor: 'var(--hapvida-orange)' }}
            >
              <span className="mr-3">SOLICITAR COTAÇÃO GRÁTIS</span>
              <ArrowRight className="inline-block h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Sem compromisso
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Dados seguros
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Atendimento humanizado
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;