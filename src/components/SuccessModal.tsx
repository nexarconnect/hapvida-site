import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

type LeadData = {
  nome?: string;
  whatsapp?: string;
  whatsappRaw?: string;
  cidade?: string;
  email?: string;
  plano?: string | null;
  preferencia?: string;
  numPessoas?: string | number;
  idades?: string[] | number[] | string;
  savedInSupabase?: boolean;
  id?: string;
};

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  leadData: LeadData | null;
};

function formatIdades(idades?: string[] | number[] | string): string {
  if (Array.isArray(idades)) return idades.map(String).join(', ');
  return String(idades || '').trim();
}

function buildWhatsAppUrl(leadData: LeadData | null): string {
  const phone = '5514991235094';

  const nome = String(leadData?.nome || '').trim();
  const cidade = String(leadData?.cidade || '').trim();
  const email = String(leadData?.email || '').trim();
  const plano = String(leadData?.plano || '').trim();
  const preferencia = String(leadData?.preferencia || '').trim();
  const numPessoas = String(leadData?.numPessoas || '').trim();
  const idades = formatIdades(leadData?.idades);

  const lines = [
    'Olá! Quero receber minha cotação.',
    '',
    nome ? `*Nome:* ${nome}` : null,
    cidade ? `*Cidade:* ${cidade}` : null,
    email ? `*E-mail:* ${email}` : null,
    plano ? `*Plano:* ${plano}` : null,
    preferencia ? `*Preferência:* ${preferencia}` : null,
    numPessoas ? `*Nº de pessoas:* ${numPessoas}` : null,
    idades ? `*Idades:* ${idades}` : null,
    '',
    'Pode me ajudar com os próximos passos?',
  ].filter(Boolean);

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function SuccessModal({ isOpen, onClose, leadData }: SuccessModalProps) {
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const openedRef = useRef(false);

  const whatsappUrl = buildWhatsAppUrl(leadData);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      openedRef.current = false;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setCountdown(3);
    openedRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          if (!openedRef.current && whatsappUrl) {
            openedRef.current = true;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, whatsappUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[2rem] border border-white/30 bg-white p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-desc"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <MessageCircle size={30} />
              </div>
            </div>

            <h3 id="success-title" className="text-center text-2xl font-black text-[#002b5c]">
              Formulário enviado com sucesso!
            </h3>

            <p id="success-desc" className="mt-3 text-center text-sm text-slate-600">
              Você receberá sua cotação com um consultor em instantes.
            </p>

            <p className="mt-4 text-center text-sm font-medium text-slate-700">
              Você será direcionado para o WhatsApp em {countdown}s.
            </p>

            <button
              type="button"
              onClick={() => {
                if (whatsappUrl) window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                onClose();
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#20c55a] focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              ABRIR WHATSAPP AGORA
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Seus dados estão seguros.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}