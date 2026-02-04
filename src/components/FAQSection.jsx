import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "A Hapvida atende bem no interior de SP?",
      answer: "Sim. A operadora tem hospitais próprios em cidades como Bauru, Marília e Ourinhos, além de ampla rede credenciada. Verificamos a qualidade do atendimento na sua região."
    },
    {
      question: "Quanto custa uma consulta com coparticipação?",
      answer: "Valores a partir de R$ 24,44 para consultas simples, dependendo do plano. Na cotação, mostramos a tabela completa de coparticipação."
    },
    {
      question: "Tem carência?",
      answer: "A Hapvida isenta carência para exames e consultas em casos de portabilidade ou migração de plano. Nossos consultores explicam as regras específicas."
    },
    {
      question: "Posso usar em todo o Brasil?",
      answer: "Sim. O plano Hapvida tem cobertura nacional, mas a rede é mais forte no Nordeste e interior de SP. Para viagens, consulte a rede credenciada no destino."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Perguntas frequentes sobre planos Hapvida
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;