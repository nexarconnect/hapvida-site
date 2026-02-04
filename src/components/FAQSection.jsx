import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'O que é modelo verticalizado?',
      answer: 'O modelo verticalizado da Hapvida significa que a operadora possui e controla toda a cadeia de atendimento: desde os hospitais, clínicas, laboratórios até os centros de diagnóstico. Isso garante maior controle de qualidade, atendimento mais rápido e os melhores preços para os beneficiários.'
    },
    {
      question: 'Posso substituir meu plano atual pelo Hapvida?',
      answer: 'Sim! Através da portabilidade de carências, você pode migrar de outro plano de saúde para a Hapvida sem cumprir novas carências, desde que tenha cumprido as carências no plano anterior. O processo é simples e nossa equipe está pronta para ajudá-lo.'
    },
    {
      question: 'Qual é o tempo de carência?',
      answer: 'Os prazos de carência variam de acordo com o tipo de procedimento: 24h para urgências e emergências, 30 dias para consultas e exames simples, 180 dias para procedimentos mais complexos e 300 dias para partos. Com a portabilidade, você pode manter as carências já cumpridas em seu plano anterior.'
    },
    {
      question: 'Como funciona o Programa Qualivida?',
      answer: 'O Programa Qualivida é uma iniciativa de medicina preventiva que acompanha beneficiários com doenças crônicas (diabetes, hipertensão, etc.) de forma personalizada. Inclui consultas regulares, exames de acompanhamento, orientação nutricional e suporte multidisciplinar para melhorar sua qualidade de vida.'
    },
    {
      question: 'Quais cidades têm cobertura Hapvida?',
      answer: 'A Hapvida possui cobertura nas principais cidades do Brasil, especialmente nas regiões Norte, Nordeste, Sudeste e Centro-Oeste. Consulte nossa equipe para verificar a disponibilidade na sua cidade e conhecer a rede credenciada disponível.'
    },
    {
      question: 'Como funciona o reembolso no Plano Pleno?',
      answer: 'No Plano Pleno, você pode escolher qualquer médico ou hospital, mesmo fora da rede Hapvida. Após o atendimento, basta enviar os recibos e documentos necessários que a Hapvida fará o reembolso de acordo com a tabela de valores estabelecida no contrato.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Tire suas dúvidas sobre os planos Hapvida
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;