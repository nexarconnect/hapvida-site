import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building } from 'lucide-react';

const PlanTypes = () => {
  const plans = [
    {
      icon: <User className="h-8 w-8" />,
      title: "👤 Plano Individual",
      description: "Ideal para quem busca autonomia e quer cobertura completa.",
      indication: "Indicado para: profissionais autônomos, jovens adultos."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "👨‍👩‍👧‍👦 Plano Familiar",
      description: "Melhor custo por vida. Cobre cônjuge e filhos até 21 anos (ou 24 se estudante).",
      indication: "Indicado para: famílias que querem segurança com economia."
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "🏢 Plano Empresarial (PME)",
      description: "Redução de custo para empresas com 2 a 99 vidas.",
      indication: "Indicado para: donos de negócio, microempresários."
    }
  ];

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
            Qual plano Hapvida é ideal para você?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-green-600 mb-6">
                {plan.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-sm text-gray-500 italic">{plan.indication}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          *A disponibilidade e valores variam por cidade. Nossos consultores verificam as opções exatas para seu município.*
        </motion.div>
      </div>
    </section>
  );
};

export default PlanTypes;