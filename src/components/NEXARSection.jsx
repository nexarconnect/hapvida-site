import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const NEXARSection = () => {
  const stats = [
    { icon: Award, value: '15+', label: 'Anos de experiência' },
    { icon: Users, value: '50.000+', label: 'Clientes atendidos' },
    { icon: TrendingUp, value: '98%', label: 'Satisfação dos clientes' },
    { icon: Shield, value: '100%', label: 'Compromisso com você' },
  ];

  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--hapvida-blue)' }}>
              NEXAR Corretora
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Somos uma corretora especializada em planos de saúde com mais de 15 anos de experiência no mercado. 
              Nossa missão é conectar você ao melhor plano de saúde que atenda suas necessidades, oferecendo 
              atendimento personalizado e as melhores condições do mercado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--hapvida-blue)' }}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--hapvida-blue)' }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-8 rounded-2xl shadow-lg"
            style={{ backgroundColor: 'var(--hapvida-gray-light)' }}
          >
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Na NEXAR Corretora, acreditamos que saúde é prioridade. Por isso, trabalhamos com as melhores 
              operadoras do mercado, como a Hapvida, para garantir que você e sua família tenham acesso a 
              serviços de saúde de qualidade com os melhores preços e condições. Nossa equipe está pronta 
              para ajudá-lo a encontrar o plano perfeito para suas necessidades.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NEXARSection;
