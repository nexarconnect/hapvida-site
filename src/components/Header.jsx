import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoHapvida from '../assets/logo-hapvida-branco-colorido.png';

export default function Header({ onOpenForm, onOpenConsultorOnline }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isMobilePlansOpen, setIsMobilePlansOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const plansRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPlansOpen(false);
    setIsMobilePlansOpen(false);
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
    setIsMobilePlansOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeAllMenus();

    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 350);
      return;
    }

    setTimeout(scrollToElement, 50);
  };

  const handleOpenForm = () => {
    if (typeof onOpenForm === 'function') {
      onOpenForm();
    }
  };

  const handleOpenConsultorOnline = () => {
    closeAllMenus();

    if (typeof onOpenConsultorOnline === 'function') {
      onOpenConsultorOnline();
      return;
    }

    if (typeof onOpenForm === 'function') {
      onOpenForm();
    }
  };

  const planLinks = [
    { label: 'Plano Individual', id: 'plan-types' },
    { label: 'Plano Familiar', id: 'plan-types' },
    { label: 'Plano Empresarial', id: 'plan-types' },
  ];

  return (
    <header
      className={`sticky top-0 z-[990] w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-gray-100 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:h-28">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={closeAllMenus}>
          <img src={logoHapvida} alt="Hapvida" className="h-10 w-auto" />
          <div className="hidden leading-tight sm:block">
            <span className="block text-xl font-black text-[#002b5c]">NEXAR</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Corretora
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className="font-bold text-gray-700 transition-colors hover:text-[#ff8200]"
            onClick={closeAllMenus}
          >
            Home
          </Link>

          <div className="relative" ref={plansRef}>
            <button
              type="button"
              onClick={() => setIsPlansOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 font-bold text-gray-700 transition-colors hover:text-[#ff8200]"
            >
              Planos
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isPlansOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isPlansOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                {planLinks.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#ff8200]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('produtos')}
            className="font-bold text-gray-700 transition-colors hover:text-[#ff8200]"
          >
            Produtos
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('tabela-de-precos')}
            className="font-bold text-gray-700 transition-colors hover:text-[#ff8200]"
          >
            Preços
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              closeAllMenus();
              handleOpenForm();
            }}
            className="hidden rounded-full bg-[#ff8200] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-100 transition-all hover:bg-[#ff9529] md:block"
          >
            Consultor online
          </button>

          <button
            type="button"
            onClick={handleOpenForm}
            className="hidden rounded-full border border-[#ff8200] bg-white px-8 py-3.5 text-xs font-black uppercase tracking-widest text-[#ff8200] transition-all hover:bg-orange-50 md:block"
          >
            Solicitar Cotação
          </button>

          <button
            type="button"
            className="p-2 text-[#002b5c] lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 top-24 w-full border-b border-gray-100 bg-white p-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-lg font-black text-[#002b5c]" onClick={closeAllMenus}>
              Home
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setIsMobilePlansOpen((prev) => !prev)}
                className="flex w-full items-center justify-between border-b border-gray-100 pb-2 text-lg font-black text-[#002b5c]"
              >
                Planos
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isMobilePlansOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobilePlansOpen && (
                <div className="ml-4 mt-4 flex flex-col gap-4 border-l-2 border-gray-100 pl-4">
                  {planLinks.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="text-left font-medium text-gray-600"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('produtos')}
              className="border-b border-gray-100 pb-2 text-left text-lg font-black text-[#002b5c]"
            >
              Produtos
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('tabela-de-precos')}
              className="border-b border-gray-100 pb-2 text-left text-lg font-black text-[#002b5c]"
            >
              Preços
            </button>

            <button
              type="button"
              onClick={() => {
                closeAllMenus();
                handleOpenForm();
              }}
              className="w-full rounded-2xl bg-[#ff8200] py-4 font-black uppercase tracking-widest text-white"
            >
              Consultor online
            </button>

            <button
              type="button"
              onClick={() => {
                closeAllMenus();
                handleOpenForm();
              }}
              className="w-full rounded-2xl border border-[#ff8200] py-4 font-black uppercase tracking-widest text-[#ff8200]"
            >
              Solicitar Cotação
            </button>
          </div>
        </div>
      )}
    </header>
  );
}