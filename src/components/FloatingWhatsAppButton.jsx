import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppURL, DEFAULT_WHATSAPP_MESSAGE, NEXAR_WHATSAPP_NUMBER } from '@/lib/whatsapp';

const FloatingWhatsAppButton = () => {
  const handleClick = () => {
    const url = generateWhatsAppURL(NEXAR_WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE);
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl text-white hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: 'var(--whatsapp-green)' }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: 'var(--whatsapp-green)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};

export default FloatingWhatsAppButton;