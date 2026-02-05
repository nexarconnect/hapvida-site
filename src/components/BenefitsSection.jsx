import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: <Shield className="w-8 h-8 text-[var(--hapvida-blue)]" />,
    title: "Rede Própria Completa",
    description: "Hospitais, clínicas e laboratórios exclusivos para garantir agilidade no seu atendimento."
  },
  {
    icon: <Zap className="w-8 h-8 text-[var(--hapvida-blue)]" />,
    title: "Atendimento Digital",
    description: "Agende consultas e exames direto pelo App. Tecnologia a serviço da sua saúde."
  },
  {
    icon: <Users className="w-8 h-8 text-[var(--hapvida-blue)]" />,
    title: "Planos Flexíveis",
    description: "Opções individuais, familiares e empresariais que cabem exatamente no seu bolso."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Hierarquia: Título Centralizado e Forte */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--hapvida-blue)] mb-4">
            A maior rede de saúde do Norte e Nordeste
          </h2>
          <p className="text-gray-600 text-lg">
            Combinamos infraestrutura moderna com os preços mais competitivos do mercado para cuidar de você.
          </p>
        </div>

        {/* Alinhamento: Grid de 3 colunas (Lei da Proximidade) */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;