import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'O plano Hapvida tem carência?',
      answer:
        'Os prazos seguem a regra da ANS. Urgências em 24h, consultas e exames simples em 30 dias. Se você já tem um plano, avaliamos a redução total ou parcial das carências por portabilidade.'
    },
    {
      question: 'Como funciona a tabela de preços 2026?',
      answer:
        'Os valores a partir de R$ 157,29 são a referência inicial. A tabela oficial varia conforme a sua região, faixa etária e modalidade contratada. O consultor envia a cotação atualizada direto no WhatsApp.'
    },
    {
      question: 'Posso contratar com MEI ou CNPJ?',
      answer:
        'Sim. Planos empresariais costumam ter melhor custo-benefício para quem tem empresa ativa, inclusive MEI, conforme a regra comercial disponível para a região.'
    },
    {
      question: 'A rede atende na minha cidade?',
      answer:
        'A Hapvida possui ampla rede própria e credenciada. Durante o atendimento, validamos os hospitais, clínicas e laboratórios disponíveis para o seu município.'
    },
    {
      question: 'O plano odontológico está incluso?',
      answer:
        'Há opções com saúde e odonto combinados, dependendo da modalidade e da disponibilidade comercial. O consultor mostra as alternativas no momento da cotação.'
    },
    {
      question: 'Quanto tempo demora para receber a cotação?',
      answer:
        'O retorno é rápido. Após o envio dos dados, o atendimento segue pelo WhatsApp para confirmar informações e apresentar os valores disponíveis.'
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleWhatsAppClick = () => {
    openWhatsApp({ placement: 'faq_footer' });
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center md:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#002b5c]">
            <HelpCircle className="h-4 w-4" />
            Dúvidas Frequentes
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#002b5c] md:text-4xl">
            Tire suas dúvidas antes de contratar
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Veja os pontos mais importantes sobre carência, preços, modalidade e rede de atendimento.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50 md:px-7"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="pr-4 text-base font-bold leading-snug text-gray-800 md:text-lg">
                    {faq.question}
                  </span>

                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <ChevronDown
                      className={`h-5 w-5 text-[#002b5c] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-gray-600 md:px-7 md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-lg md:mt-14 md:p-10"
        >
          <h3 className="mb-2 text-xl font-bold text-[#002b5c] md:text-2xl">
            Ainda tem alguma dúvida específica?
          </h3>

          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            Fale com um consultor para validar valores, disponibilidade e rede credenciada para sua cidade.
          </p>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#1EBE5D] hover:shadow-xl active:scale-95 md:text-base"
          >
            <MessageCircle className="h-5 w-5" />
            CONVERSAR COM CONSULTOR
          </button>
        </motion.div>
      </div>
    </section>
  );
}