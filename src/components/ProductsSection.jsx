import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Crown } from 'lucide-react';

const ProductsSection = () => {
  const products = [
    {
      icon: Building2,
      title: 'Nosso Plano',
      description: 'Custo-benefício excepcional com atendimento na rede própria Hapvida',
      features: [
        'Hospitais próprios',
        'Prontos atendimentos 24h',
        'Clínicas especializadas',
        'Exames e diagnósticos'
      ],
      highlight: 'Melhor custo-benefício'
    },
    {
      icon: Users,
      title: 'Plano Mix',
      description: 'Flexibilidade com rede própria + rede credenciada para maior cobertura',
      features: [
        'Rede própria completa',
        'Rede credenciada ampliada',
        'Mais opções de atendimento',
        'Cobertura nacional'
      ],
      highlight: 'Maior flexibilidade'
    },
    {
      icon: Crown,
      title: 'Pleno',
      description: 'Cobertura premium com reembolso para atendimentos fora da rede',
      features: [
        'Livre escolha de médicos',
        'Reembolso de consultas',
        'Atendimento VIP',
        'Cobertura internacional'
      ],
      highlight: 'Cobertura premium'
    }
  ];

  return (
    <section id="produtos" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
            Conheça nossos planos
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades e da sua família
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'var(--hapvida-blue)' }}>
                  <product.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="mb-4 inline-block px-4 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: 'var(--hapvida-orange)' }}>
                  {product.highlight}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
