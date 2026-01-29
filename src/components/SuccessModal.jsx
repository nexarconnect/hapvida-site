import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateWhatsAppURL, LEAD_WHATSAPP_MESSAGE, NEXAR_WHATSAPP_NUMBER } from '@/lib/whatsapp';

const SuccessModal = ({ isOpen, onClose, userName }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          redirectToWhatsApp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const redirectToWhatsApp = () => {
    const message = LEAD_WHATSAPP_MESSAGE(userName || 'Cliente');
    const url = generateWhatsAppURL(NEXAR_WHATSAPP_NUMBER, message);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div 
              className="p-8 text-center text-white relative"
              style={{
                background: 'linear-gradient(135deg, var(--hapvida-blue) 0%, var(--hapvida-blue-light) 100%)'
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
              >
                <CheckCircle className="h-12 w-12" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-2">Parabéns!</h2>
              <p className="text-lg">Seus dados foram recebidos</p>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg mb-6">
                Você será redirecionado para WhatsApp em
              </p>

              <motion.div
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-bold mb-6"
                style={{ color: 'var(--hapvida-blue)' }}
              >
                {countdown}
              </motion.div>

              <p className="text-gray-600 mb-6">
                Um dos nossos consultores entrará em contato com você em breve!
              </p>

              <Button
                onClick={redirectToWhatsApp}
                className="w-full py-6 text-lg font-bold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: 'var(--hapvida-blue)' }}
              >
                Ir para WhatsApp agora
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
