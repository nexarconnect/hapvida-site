import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Crown, ArrowRight, Check } from 'lucide-react';

const ProductsSection = ({ onOpenForm }) => {
  const products = [
    {
      icon: Building2,
      title: 'Nosso Plano',
      description: 'Custo-benefício excepcional com atendimento na rede própria Hapvida.',
      features: [
        'Hospitais próprios exclusivos',
        'Prontos atendimentos 24h',
        'Clínicas especializadas',
        'Exames e diagnósticos'
      ],
      highlight: 'Melhor Custo-Benefício',
      ctaText: 'Cotar Nosso Plano',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Plano Mix',
      description: 'Flexibilidade total: rede própria + rede credenciada para maior cobertura.',
      features: [
        'Rede própria completa',
        'Rede credenciada ampliada',
        'Mais opções de clínicas',
        'Cobertura nacional (urgência)'
      ],
      highlight: 'Mais Flexibilidade',
      ctaText: 'Cotar Plano Mix',
      color: 'orange'
    },
    {
      icon: Crown,
      title: 'Pleno',
      description: 'Cobertura premium com reembolso e livre escolha de médicos.',
      features: [
        'Livre escolha de médicos',
        'Reembolso de consultas',
        'Atendimento VIP',
        'Cobertura internacional'
      ],
      highlight: 'Cobertura Premium',
      ctaText: 'Cotar Pleno',
      color: 'blue'
    }
  ];

  return (
    <section id="produtos" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#0054a6] text-sm font-bold mb-4">
            NOSSOS PLANOS
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#0054a6]">
            Escolha o plano ideal para você
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Opções flexíveis que se adaptam às suas necessidades e ao seu bolso.
          </p>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Topo do Card */}
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${product.color === 'orange' ? 'bg-orange-100 text-[#f7941d]' : 'bg-blue-100 text-[#0054a6]'}`}>
                    <product.icon className="h-8 w-8" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${product.color === 'orange' ? 'bg-[#f7941d] text-white' : 'bg-[#0054a6] text-white'}`}>
                    {product.highlight}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {product.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 min-w-[20px]">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rodapé do Card (Botão) */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onOpenForm}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 group
                    ${product.color === 'orange' 
                      ? 'bg-[#f7941d] hover:bg-[#e08315] hover:shadow-orange-500/30' 
                      : 'bg-[#0054a6] hover:bg-[#003366] hover:shadow-blue-500/30'
                    }`}
                >
                  {product.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;