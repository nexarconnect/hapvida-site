import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../assets/logo-hapvida-branco.png';
import logoColored from '../assets/logo-hapvida-branco-colorido.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const plansRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPlansOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (plansRef.current && !plansRef.current.contains(event.target)) {
        setIsPlansOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsPlansOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeAllMenus();

    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 350);
      return;
    }

    setTimeout(scrollToElement, 50);
  };

  const navItems = [
    { label: 'Tabelas', id: 'pricing' },
    { label: 'Rede', id: 'network' },
    { label: 'Dúvidas', id: 'faq' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] flex h-16 items-center transition-all duration-500 md:h-20 ${
        isScrolled
          ? 'border-b border-slate-200/50 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" onClick={closeAllMenus} className="flex items-center gap-3">
          <img
            src={isScrolled || isMobileMenuOpen ? logoColored : logoWhite}
            className="h-10 w-auto transition-all duration-300 md:h-10"
            alt="Logo Hapvida"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                isScrolled
                  ? 'text-slate-600 hover:text-[#ff8200]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`md:hidden ${isScrolled ? 'text-slate-800' : 'text-white'}`}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-full border-b border-slate-100 bg-white px-6 py-5 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm font-black uppercase tracking-[0.2em] text-slate-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}