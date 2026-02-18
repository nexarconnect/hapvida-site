import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Clock, Stethoscope, Activity } from 'lucide-react';

const NetworkSection = () => {
  const networkStats = [
    {
      icon: Building2,
      number: '88',
      label: 'Hospitais',
      bgColor: '#0054a6', // Azul Hapvida
      textColor: '#0054a6'
    },
    {
      icon: Clock,
      number: '77',
      label: 'Prontos atendimentos 24h',
      bgColor: '#f7941d', // Laranja (Destaque para urgência)
      textColor: '#f7941d'
    },
    {
      icon: Stethoscope,
      number: '352',
      label: 'Clínicas (HAPClínicas)',
      bgColor: '#0054a6', // Azul Hapvida
      textColor: '#0054a6'
    },
    {
      icon: Activity,
      number: '292',
      label: 'Centros de diagnóstico',
      bgColor: '#f7941d', // Laranja
      textColor: '#f7941d'
    }
  ];

  return (
    <section id="network" className="scroll-mt-24 py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#0054a6]">
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
              className="bg-gray-50 rounded-2xl p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Círculo do Ícone */}
              <div 
                className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full mb-4 shadow-md" 
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              
              {/* Número */}
              <div 
                className="text-4xl lg:text-5xl font-bold mb-3" 
                style={{ color: stat.textColor }}
              >
                {stat.number}
              </div>
              
              {/* Rótulo */}
              <div className="text-gray-700 font-semibold text-base lg:text-lg leading-tight">
                {stat.label}
              </div>
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
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
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