import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';

const ValueSection = ({ onOpenForm, onSuccess }) => {
  // Mantemos onSuccess por compatibilidade com o seu fluxo atual (SuccessModal).
  // Aqui a ação principal é abrir o FormModal (Funil Minhoca: CTA recorrente).
  return (
    <section id="cotacao" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Texto + prova */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--hapvida-blue)] leading-tight">
                Faça sua cotação com um consultor e receba as melhores opções para o seu perfil
              </h2>

              <p className="mt-4 text-gray-700 text-base lg:text-lg max-w-2xl">
                Em poucos passos, você compara valores, entende coberturas e escolhe o plano mais adequado para você ou sua família.
              </p>

              <div className="mt-8 grid gap-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--hapvida-blue)]" />
                  <span>Atendimento rápido, com orientação clara do início ao fim.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--hapvida-blue)]" />
                  <span>Valores e condições conforme faixa etária e região.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--hapvida-blue)]" />
                  <span>Sem compromisso: você só fecha se fizer sentido para você.</span>
                </div>
              </div>

              {/* CTA (Funil Minhoca) */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onOpenForm}
                  className="px-7 py-6 text-base sm:text-lg font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Solicitar cotação agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  className="px-7 py-6 text-base sm:text-lg font-bold border-2 border-[var(--hapvida-blue)] text-[var(--hapvida-blue)] hover:bg-[var(--hapvida-blue)] hover:text-white rounded-xl transition-all duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar agora
                  <p className="mt-3 text-xs text-gray-500">
  Atendimento em horário comercial.
</p>
                </Button>
              </div>

              <p className="mt-5 text-sm text-gray-500">
                Tempo médio: menos de 1 minuto para iniciar sua cotação.
              </p>
            </motion.div>

            {/* Card lateral (âncora visual + confiança) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900">
                  O que você recebe na cotação
                </h3>

                <div className="mt-4 space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-500" />
                    <span>Opções recomendadas para o seu perfil.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-500" />
                    <span>Comparação objetiva de custos e coberturas.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-500" />
                    <span>Orientação para escolher com segurança.</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    Preferência de contato: você escolhe WhatsApp ou ligação ao enviar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
