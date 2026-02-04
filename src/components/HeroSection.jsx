import React from 'react';  // Removido: useState (não precisa mais)
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
// Removido: import FormModal from '@/components/FormModal';

const HeroSection = ({ onOpenForm }) => {  // Mudança: prop onOpenForm em vez de onSuccess
  // Removido: const [isFormOpen, setIsFormOpen] = useState(false);
  // Removido: const handleSuccess = (name) => { onSuccess(name); };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Removido: <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSuccess={handleSuccess} /> */}

      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3"
          alt="Hapvida Healthcare"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(38, 82, 181, 0.9) 0%, rgba(48, 124, 191, 0.9) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Highlight Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 px-6 py-3 rounded-full shadow-lg"
                style={{ backgroundColor: 'var(--hapvida-orange)' }}
              >
                <p className="font-bold text-lg">15% de desconto nas 3 primeiras parcelas</p>
              </motion.div>

              {/* Main Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Plano de saúde Hapvida: PROMOÇÃO a Partir de{' '}
                <span className="text-yellow-300">R$ 64,35</span>
              </h1>

              {/* Warning Text */}
              <p className="text-lg text-white/90 italic mb-8">
                *Condições válidas para algumas cidades. Verifique com um dos nossos consultores
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onOpenForm}  // Mudança: chama a função do HomePage
                  className="px-8 py-6 text-lg font-bold bg-white text-[var(--hapvida-blue)] hover:bg-gray-100 hover:text-[var(--hapvida-blue)] transition-all duration-300 rounded-full shadow-lg"
                >
                  Fazer Cotação Agora
                </Button>
              </div>
            </motion.div>

            {/* Right Column - CTA Card (Replaces inline form) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Receba sua cotação personalizada!</h2>
              <p className="text-white/90 text-lg mb-8">
                Preencha o formulário rápido e descubra o plano ideal para você e sua família com os melhores preços do mercado.
              </p>
              
              <div className="space-y-4 mb-8 text-left max-w-sm mx-auto">
                <div className="flex items-center text-white">
                  <CheckCircle2 className="h-6 w-6 mr-3 text-[var(--hapvida-orange)]" />
                  <span>Atendimento em todo o Brasil</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle2 className="h-6 w-6 mr-3 text-[var(--hapvida-orange)]" />
                  <span>Planos sem carência (consulte condições)</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle2 className="h-6 w-6 mr-3 text-[var(--hapvida-orange)]" />
                  <span>Descontos exclusivos online</span>
                </div>
              </div>

              <Button
                onClick={onOpenForm}  // Mudança: chama a função do HomePage
                className="w-full py-8 text-xl font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                style={{ backgroundColor: 'var(--hapvida-orange)' }}
              >
                <span className="mr-2">QUERO MINHA COTAÇÃO GRÁTIS</span>
                <ArrowRight className="inline-block h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="mt-4 text-sm text-white/70">
                Leva menos de 1 minuto
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;