import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

import bannerMedicos from '../assets/banner_3_medicos.png';

const HeroSection = ({ onOpenForm }) => {
  return (
    <section id="home" className="relative min-h-[720px] lg:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerMedicos}
          alt="Equipe médica"
          className="w-full h-full object-contain bg-[var(--hapvida-blue)]"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(38, 82, 181, 0.86) 0%, rgba(48, 124, 191, 0.86) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Value proposition */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white lg:col-span-7"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full shadow-lg"
                style={{ backgroundColor: 'var(--hapvida-orange)' }}
              >
                <span className="font-bold text-sm lg:text-base">15% de desconto nas 3 primeiras parcelas</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Plano de saúde Hapvida
                <span className="block">
                  a partir de <span className="text-yellow-300">R$ 64,35</span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-4 text-base lg:text-lg text-white/90 max-w-xl">
                Cotação rápida, personalizada e sem compromisso. Descubra o melhor plano para você e sua família.
              </p>

              {/* Trust / disclaimer */}
              <p className="mt-3 text-sm text-white/75 italic max-w-xl">
                *Condições válidas para algumas cidades. Consulte disponibilidade com um especialista.
              </p>

              {/* Primary CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  onClick={onOpenForm}
                  className="px-8 py-6 text-base lg:text-lg font-bold bg-white text-[var(--hapvida-blue)] hover:bg-gray-100 transition-all duration-300 rounded-full shadow-lg"
                >
                  Fazer cotação agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <a
                  href="https://wa.me/5514991235094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full px-8 py-6 text-base lg:text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-[var(--hapvida-blue)] transition-all duration-300 rounded-full"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </Button>
                </a>

                <a href="tel:+5514991235094" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full px-8 py-6 text-base lg:text-lg font-bold border-2 border-white/70 text-white hover:bg-white hover:text-[var(--hapvida-blue)] transition-all duration-300 rounded-full"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Ligar agora
                  </Button>
                </a>
              </div>

              <p className="mt-3 text-sm text-white/80">
                Leva menos de 1 minuto. Dados tratados com segurança.
              </p>
            </motion.div>

            {/* Right: Compact conversion card */}
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
                <h2 className="text-xl lg:text-2xl font-bold text-white">
                  Receba sua cotação personalizada
                </h2>

                <p className="mt-2 text-white/90 text-sm lg:text-base">
                  Você fala com um consultor e recebe as melhores opções para o seu perfil.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-[var(--hapvida-orange)]" />
                    <span className="text-sm">Atendimento em todo o Brasil</span>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-[var(--hapvida-orange)]" />
                    <span className="text-sm">Planos sem carência (consulte condições)</span>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-[var(--hapvida-orange)]" />
                    <span className="text-sm">Descontos exclusivos online</span>
                  </div>
                </div>

                <Button
                  onClick={onOpenForm}
                  className="mt-6 w-full py-6 text-base font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: 'var(--hapvida-orange)' }}
                >
                  Quero minha cotação grátis
                </Button>

                <p className="mt-3 text-xs text-white/70 text-center">
                  Sem compromisso • Resposta rápida
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;