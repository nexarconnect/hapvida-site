import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Layers, RefreshCw } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Programa Qualivida',
      description: 'Medicina preventiva com foco na sua saúde e bem-estar. Acompanhamento personalizado para doenças crônicas, programas de prevenção e cuidados integrados para toda a família.',
      features: ['Acompanhamento contínuo', 'Medicina preventiva', 'Programas de saúde']
    },
    {
      icon: Layers,
      title: 'Modelo Verticalizado',
      description: 'Controle total da cadeia de saúde, desde hospitais próprios até centros de diagnóstico. Isso garante qualidade, agilidade e os melhores preços para você.',
      features: ['Rede própria completa', 'Atendimento rápido', 'Melhor custo-benefício']
    },
    {
      icon: RefreshCw,
      title: 'Portabilidade de Carências',
      description: 'Já possui outro plano de saúde? Com a portabilidade, você pode migrar para a Hapvida sem cumprir novas carências, mantendo seus direitos adquiridos.',
      features: ['Sem novas carências', 'Processo simplificado', 'Migração rápida']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
            Benefícios exclusivos
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Vantagens que fazem a diferença no seu dia a dia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'var(--hapvida-blue)' }}>
                <benefit.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>

              <ul className="space-y-2">
                {benefit.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;