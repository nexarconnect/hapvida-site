import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Zap,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { openWhatsApp } from '../lib/whatsapp';
import { trackCTA, trackLead } from '../lib/tracking';

// Helper seguro para recuperar dados do lead
function getLeadData() {
  try {
    const data = localStorage.getItem('last_lead_data');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export default function ThankYou() {
  const lead = useMemo(() => getLeadData(), []);
  
  const name = lead?.nome || lead?.name || '';
  const plan = lead?.preferencia || lead?.perfil || lead?.plano || '';
  const city = lead?.cidade || '';

  // Tracking de Conversão (Meta Pixel & GA4)
  useEffect(() => {
    trackLead(plan || 'Geral', city || 'Não detectada', 'thank_you_page');
    
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', { 
        content_name: plan, 
        content_category: 'Healthcare',
        city: city 
      });
    }
  }, [plan, city]);

  const handleWhatsApp = () => {
    trackCTA('whatsapp_priority_click', 'thank_you_page', { plan, city });
    
    openWhatsApp({
      nome: name || 'Cliente',
      cidade: city,
      plano: plan,
      origem: 'Obrigado_Premium'
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-8 md:p-16 text-center border border-slate-100"
      >
        {/* Badge de Segurança */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <Lock size={12} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Conexão Segura e Criptografada</span>
          </div>
        </div>

        {/* Ícone de Sucesso Premium */}
        <div className="relative flex justify-center mb-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="bg-[#25D366] p-6 rounded-full text-white shadow-[0_20px_40px_rgba(37,211,102,0.3)] relative z-10"
          >
            <CheckCircle2 size={56} strokeWidth={2.5} />
          </motion.div>
          <span className="absolute inset-0 bg-[#25D366] opacity-10 rounded-full animate-ping" />
        </div>

        {/* Copy Agressiva */}
        <h1 className="text-3xl md:text-4xl font-black text-[#002b5c] mb-4 tracking-tight">
          {name ? `${name.split(' ')[0]}, sua cotação prioritária foi gerada!` : 'Sua cotação prioritária foi gerada!'}
        </h1>
        
        <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed max-w-md mx-auto">
          {plan ? `Analisamos as melhores condições para o plano ${plan}.` : 'Analisamos as melhores condições para o seu perfil.'} 
          <span className="text-[#002b5c] font-bold"> Não espere na fila,</span> inicie seu atendimento agora.
        </p>

        {/* Grid de Autoridade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <Zap className="mx-auto text-[#ff8200] mb-2" size={24} fill="#ff8200" />
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
            <p className="text-sm font-bold text-[#002b5c]">Prioritário</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <Clock className="mx-auto text-[#002b5c] mb-2" size={24} />
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Espera</p>
            <p className="text-sm font-bold text-[#002b5c]">&lt; 60 segundos</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <ShieldCheck className="mx-auto text-[#25D366] mb-2" size={24} />
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Canal</p>
            <p className="text-sm font-bold text-[#002b5c]">Oficial</p>
          </div>
        </div>

        {/* Call to Action Principal */}
        <div className="space-y-6">
          <button
            onClick={handleWhatsApp}
            className="group relative w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.25em] shadow-[0_20px_40px_rgba(37,211,102,0.25)] hover:bg-[#20bd5a] hover:-translate-y-1 transition-all active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <MessageCircle size={22} fill="currentColor" />
              Receber Tabela no WhatsApp
            </div>
          </button>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-[#002b5c] transition-colors"
          >
            <ArrowLeft size={14} /> Voltar para o site
          </Link>
        </div>

        {/* Rodapé de Confiança */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] leading-tight">
            Hapvida Saúde • Atendimento Consultivo Premium 2026
          </p>
        </div>
      </motion.div>
    </section>
  );
}