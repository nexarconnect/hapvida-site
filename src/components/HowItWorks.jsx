import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="h-8 w-8" />,
      title: "Você informa",
      description: "idade, cidade e quantas vidas (individual ou familiar)"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Nossos consultores",
      description: "cruzam com as melhores opções Hapvida disponíveis"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Você recebe",
      description: "a proposta detalhada no WhatsApp ou e-mail"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sua cotação em 3 minutos, sem sair de casa
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg">
            Quero Economizar Agora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;