import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from '../assets/logo-hapvida-nexar-branco.png';
import logoColored from '../assets/logo-hapvida-nexar-colorido.png';

const DROPDOWNS = [
  {
    key: 'planos',
    label: 'Planos',
    items: [
      { label: 'Plano Individual', path: '/plano-individual-hapvida', description: 'Contratação por CPF' },
      { label: 'Plano Empresarial', path: '/plano-empresarial-hapvida', description: 'CNPJ, incluindo MEI' },
      { label: 'Plano Odontológico', path: '/plano-odontologico-hapvida', description: 'Saúde bucal Hapvida' },
      { label: 'Adesão (PME)', path: '/plano-hapvida-adesao', description: 'Por entidade de classe' },
      { label: 'Comparar todos os planos', path: '/tipos-de-planos', description: 'Mix, Nosso Plano, Pleno' },
      { label: 'Tabela de Preços', path: '/tabela-de-preco-hapvida', description: 'Valores por faixa etária' },
    ],
  },
  {
    key: 'rede',
    label: 'Rede de Atendimento',
    items: [
      { label: 'Visão Geral da Rede', path: '/rede-de-atendimento', description: 'Rede própria e credenciada' },
      { label: 'Rede Nacional', path: '/rede-nacional', description: 'Cobertura em todo o Brasil' },
      { label: 'Urgência e Emergência', path: '/rede-nacional/urgencia-e-emergencia', description: 'Pronto atendimento 24h' },
      { label: 'Rede Pediátrica', path: '/rede-nacional/rede-pediatrica', description: 'Atendimento infantil' },
      { label: 'Clínicas por Capital', path: '/rede-nacional/clinicas-por-capital', description: 'Unidades nas capitais' },
    ],
  },
];

const NAV_LINKS = [
  { label: 'Cidades Atendidas', path: '/planos-hapvida-por-cidade' },
  { label: 'Dúvidas', path: '/perguntas-frequentes' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
  };

  const linkClass = `text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
    isScrolled ? 'text-slate-600 hover:text-[#ff8200]' : 'text-white/80 hover:text-white'
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] flex h-16 items-center transition-all duration-500 md:h-20 ${
        isScrolled || isMobileMenuOpen
          ? 'border-b border-slate-200/50 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" onClick={closeAllMenus} className="flex items-center gap-3">
          <img
            src={isScrolled || isMobileMenuOpen ? logoColored : logoWhite}
            className="h-10 w-auto transition-all duration-300 md:h-14"
            alt="Hapvida - Nexar, representante de vendas autorizado da Hapvida"
          />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-10 md:flex">
          {DROPDOWNS.map((dropdown) => (
            <div key={dropdown.key} className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => (prev === dropdown.key ? null : dropdown.key))}
                className={`flex items-center gap-1.5 ${linkClass}`}
                aria-expanded={openDropdown === dropdown.key}
              >
                {dropdown.label}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${openDropdown === dropdown.key ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === dropdown.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
                  >
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeAllMenus}
                        className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-slate-50"
                      >
                        <span className="block text-sm font-bold text-slate-800">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.description}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {NAV_LINKS.map((item) => (
            <Link key={item.path} to={item.path} onClick={closeAllMenus} className={linkClass}>
              {item.label}
            </Link>
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
            className="absolute left-0 top-full max-h-[calc(100vh-4rem)] w-full overflow-y-auto border-b border-slate-100 bg-white px-6 py-5 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {DROPDOWNS.map((dropdown) => (
                <div key={dropdown.key}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileDropdown((prev) => (prev === dropdown.key ? null : dropdown.key))
                    }
                    className="flex w-full items-center justify-between text-left text-sm font-black uppercase tracking-[0.2em] text-slate-700"
                    aria-expanded={openMobileDropdown === dropdown.key}
                  >
                    {dropdown.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMobileDropdown === dropdown.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openMobileDropdown === dropdown.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 flex flex-col gap-3 border-l-2 border-slate-100 pl-4">
                          {dropdown.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={closeAllMenus}
                              className="text-left text-sm font-bold text-slate-600"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {NAV_LINKS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeAllMenus}
                  className="text-left text-sm font-black uppercase tracking-[0.2em] text-slate-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
