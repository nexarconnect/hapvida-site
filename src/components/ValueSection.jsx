import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Heart, Shield } from 'lucide-react';

const ValueSection = ({ onOpenForm }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Por que escolher o Hapvida?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Mais de 20 milhões de vidas atendidas em todo o Brasil. 
              Planos completos com cobertura nacional e atendimento de qualidade.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cobertura Nacional</h3>
              <p className="text-gray-600">
                Rede credenciada em todo o território brasileiro com mais de 6.000 pontos de atendimento.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Atendimento Humanizado</h3>
              <p className="text-gray-600">
                Equipe médica especializada e tecnologia avançada para cuidar da sua saúde com carinho.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Segurança e Confiança</h3>
              <p className="text-gray-600">
                Mais de 40 anos de experiência no mercado, com milhões de clientes satisfeitos.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Pronto para cuidar da sua saúde?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Receba uma cotação personalizada e descubra todas as vantagens dos planos Hapvida.
              Atendimento rápido e sem compromisso.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center text-gray-700">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                <span>Planos a partir de R$ 64,35</span>
              </div>
              <div className="flex items-center justify-center text-gray-700">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                <span>Sem carência (consulte condições)</span>
              </div>
              <div className="flex items-center justify-center text-gray-700">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                <span>Descontos exclusivos online</span>
              </div>
            </div>

            <Button
              onClick={onOpenForm}
              className="px-12 py-6 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Cotação Gratuita
            </Button>

            <p className="mt-4 text-sm text-gray-500">
              Leva menos de 1 minuto • Sem compromisso
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
