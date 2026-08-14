import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SECTION_SELECTOR = 'section[id], main > section, article, header';

function getSections() {
  return Array.from(document.querySelectorAll(SECTION_SELECTOR)).filter(
    (el) => el.offsetHeight > 80
  );
}

export default function ScrollNav() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(pct);
      setVisible(window.scrollY > 400);
      setAtBottom(pct > 0.985);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    const sections = getSections();
    const current = window.scrollY + 120;
    const next = sections.find((el) => el.offsetTop > current);
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  const circumference = 2 * Math.PI * 15;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-[900] flex flex-col items-center gap-1.5"
        >
          {!atBottom && (
            <button
              type="button"
              onClick={scrollToNextSection}
              aria-label="Próxima seção"
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-[#002b5c]"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
          >
            <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="stroke-slate-200"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="stroke-[#002b5c]"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
              />
            </svg>
            <ChevronUp className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-[#002b5c]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
