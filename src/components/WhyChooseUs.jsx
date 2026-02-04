import React from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Especialistas em Hapvida para o Interior de SP
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Somos uma corretora <strong>autorizada</strong> com foco em Bauru e região. 
            Conhecemos as particularidades da rede Hapvida no interior paulista e ajudamos você a escolher o plano com o <strong>melhor custo-benefício</strong>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold mb-4">Rede Local Conhecida</h3>
            <p className="text-gray-600">Sabemos quais hospitais e clínicas da Hapvida atendem bem em sua cidade.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-4">Economia Garantida</h3>
            <p className="text-gray-600">Comparamos todas as faixas etárias e modalidades para você pagar menos.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-4">Suporte Pós-Venda</h3>
            <p className="text-gray-600">Ajudamos com agendamentos, dúvidas sobre coparticipação e utilização do plano.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;