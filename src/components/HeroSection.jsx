import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

// Importe a imagem corretamente (ajuste o caminho se necessário)
import bannerMedicos from '../assets/banner_3_medicos.png';

const HeroSection = ({ onOpenForm }) => {
  
  // Variantes de animação (suaves)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="home" className="relative min-h-[720px] lg:min-h-[85vh] flex items-center overflow-hidden bg-[#0B2B5A]">
      
      {/* Background com Gradiente Azul Hapvida */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bannerMedicos}
          alt="Equipe médica Hapvida"
          className="w-full h-full object-cover lg:object-contain lg:object-right opacity-40 lg:opacity-100"
        />
        {/* Gradiente para garantir leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B5A] via-[#0B2B5A]/90 to-[#0B2B5A]/20 lg:to-transparent" />
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LADO ESQUERDO (Texto e Botões) */}
            <motion.div 
              className="text-white lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              
              {/* Badge de Desconto */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <span className="font-bold text-sm text-[#FFD700]">
                  15% de desconto nas 3 primeiras parcelas
                </span>
              </motion.div>

              {/* Título Principal */}
              <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
                Plano de saúde <span className="text-[#28A7E0]">Hapvida</span> 2026
              </motion.h1>
              
              {/* Subtítulo de Preço */}
              <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-white/90 mb-2">
                Valores a partir de <span className="text-[#FF4E05] font-bold text-2xl lg:text-3xl">R$ 75,70</span>*
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-sm text-white/70 mb-8 font-light">
                *Validamos disponibilidade e valores para sua cidade.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
                Cotação rápida e sem compromisso. Atendimento humanizado com consultor especialista.
              </motion.p>

              {/* GRUPO DE BOTÕES */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 max-w-lg relative z-50">
                
                {/* Botão WhatsApp (Verde) */}
                <a
                  href="https://wa.me/5514991886868?text=Ol%C3%A1!%20Estou%20na%20p%C3%A1gina%20inicial%20do%20site%20e%20gostaria%20de%20falar%20com%20um%20consultor%20agora."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-8 h-14 text-lg font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </a>

                {/* Botão Cotação (Laranja Sólido) */}
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="flex items-center justify-center px-8 h-14 text-lg font-bold text-white bg-[#FF4E05] hover:bg-[#E04000] rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 cursor-pointer relative z-50"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Cotação Online
                </button>
              </motion.div>

              <motion.p variants={fadeInUp} className="mt-6 text-xs text-white/60 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                Leva menos de 1 minuto • Dados tratados com segurança
              </motion.p>
            </motion.div>

            {/* LADO DIREITO (Card de Benefícios) */}
            <motion.div 
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">
                  O que você recebe
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Um consultor autorizado te orienta e envia as melhores opções para a sua cidade.
                </p>

                <ul className="space-y-4">
                  {[
                    "Cotação conforme seu perfil", 
                    "Opções com e sem coparticipação", 
                    "Rede credenciada completa", 
                    "Atendimento rápido via WhatsApp"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-[#FF4E05] p-1 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/90 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;