import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock3, MessageCircle, ShieldCheck } from 'lucide-react';
import { trackCTA } from '../lib/tracking';
import bannerImg from '../assets/banner-hero.png';

export default function HeroSection({
  onOpenForm,
  city,
  minPrice = '157,29',
}) {
  const formattedPrice =
    typeof minPrice === 'number'
      ? minPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : minPrice || '157,29';

  const handleOpenForm = () => {
    trackCTA('solicitar_cotacao', 'hero_main', {
      city: city || null,
    });

    onOpenForm?.();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#002b5c]">
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Plano de saúde Hapvida 2026"
          width={1920}
          height={1080}
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center md:object-[right_22%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002b5c] via-[#002b5c]/92 to-[#002b5c]/35 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[92vh] w-full items-center px-6 py-14 md:py-20 lg:min-h-screen">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="mb-5 mt-4 flex flex-wrap items-center gap-2 md:mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff8200]/25 bg-[#ff8200]/10 px-4 py-2 backdrop-blur-md">
                <Zap className="h-3.5 w-3.5 text-[#ff8200]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff8200]">
                  Tabela 2026
                </span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-black leading-[1.04] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] sm:text-5xl md:text-[3.7rem] lg:text-[4.8rem]">
              Plano de saúde <br />
              <span className="text-[#ff8200]">Hapvida 2026</span>
            </h1>

            <p className="mb-8 max-w-xl text-base font-medium leading-relaxed text-blue-100/90 md:text-lg">
              Veja valores e opções para o seu perfil.
            </p>

            <div className="mb-8">
              <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/70">
               a partir de *
              </p>
              <div className="flex flex-wrap items-end gap-2">
                <span className="pb-2 text-xl font-bold text-white md:text-2xl">R$</span>
                <span className="text-[2.9rem] font-black tracking-tighter text-[#ffffff] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[4.9rem]">
                {formattedPrice}
              </span>
              </div>
              <p className="mt-2 text-xs font-medium text-blue-100/60">
                Tabela atualizada e revisada em 13/08/2026
              </p>
            </div>

            <div className="mb-10 flex flex-col items-start gap-2.5">
              <button
                onClick={handleOpenForm}
                className="w-full rounded-2xl bg-[#ff8200] px-7 py-4.5 text-base font-black text-white shadow-2xl transition-all duration-300 ease-out hover:bg-[#ff9529] hover:scale-[1.03] hover:shadow-[#ff8200]/50 active:scale-[0.97] active:shadow-[#ff8200]/30 sm:w-auto sm:px-9 sm:text-lg motion-safe:animate-[float_3s_ease-in-out_infinite]"
              >
                SOLICITAR COTAÇÃO
              </button>

              <p className="flex items-center gap-1.5 text-xs font-normal text-white/50">
                <Clock3 className="h-3 w-3" />
                Atendimento por consultor • Vagas por região sujeitas a disponibilidade
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid max-w-2xl gap-3 sm:grid-cols-3"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/12"
              >
                <MessageCircle className="h-4.5 w-4.5 text-[#ff8200]" />
                <span className="text-[13px] font-semibold text-white">WhatsApp direto</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/12"
              >
                <ShieldCheck className="h-4.5 w-4.5 text-[#ff8200]" />
                <span className="text-[13px] font-semibold text-white">Consultor oficial</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/12"
              >
                <Zap className="h-4.5 w-4.5 text-[#ff8200]" />
                <span className="text-[13px] font-semibold text-white">Cotação na hora</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}