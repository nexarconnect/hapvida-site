import React from 'react';
import { motion } from 'framer-motion';
import { Building, Clock, Stethoscope, Activity } from 'lucide-react';

const NetworkSection = () => {
  const networkStats = [
    {
      icon: Building,
      number: '88',
      label: 'Hospitais',
      color: 'var(--hapvida-blue)'
    },
    {
      icon: Clock,
      number: '77',
      label: 'Prontos atendimentos 24h',
      color: 'var(--hapvida-blue-light)'
    },
    {
      icon: Stethoscope,
      number: '352',
      label: 'Clínicas (HAPClínicas)',
      color: 'var(--hapvida-blue)'
    },
    {
      icon: Activity,
      number: '292',
      label: 'Centros de diagnóstico',
      color: 'var(--hapvida-blue-light)'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
            Rede própria Hapvida
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Uma das maiores redes de saúde do Brasil à sua disposição
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {networkStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: stat.color }}>
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-3" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Com a Hapvida, você tem acesso a uma das maiores redes próprias de saúde do país, 
            garantindo qualidade, agilidade e comodidade em todos os atendimentos. 
            Nossa estrutura completa está pronta para cuidar de você e sua família.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkSection;
