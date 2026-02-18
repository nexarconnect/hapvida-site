import React, { useState } from "react";
import logoHapvida from "../assets/logo-hapvida-branco-colorido.png";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onOpenForm }) {
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setIsPlansOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Marca: logo + texto */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoHapvida} alt="Hapvida" className="h-9 w-auto" />
            <div className="leading-tight">
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--hapvida-blue)" }}
              >
                NEXAR <span className="text-gray-700">Corretora</span>
              </div>
            </div>
          </Link>

          {/* Menu (desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/#home"
              className="text-gray-700 hover:text-[var(--hapvida-orange)] transition-colors duration-200 font-medium"
              onClick={handleNavClick}
            >
              Home
            </Link>

            {/* Planos (dropdown) */}
            <div className="relative">
              <button
                className="text-gray-700 hover:text-[var(--hapvida-orange)] transition-colors duration-200 font-medium inline-flex items-center gap-2"
                onClick={() => setIsPlansOpen((v) => !v)}
                aria-expanded={isPlansOpen}
                aria-haspopup="menu"
                type="button"
              >
                Planos <span className="text-gray-400">▾</span>
              </button>

              {isPlansOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden z-50"
                >
                  <Link
                    to="/#tabela-de-precos"
                    role="menuitem"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Plano Família
                  </Link>
                  <Link
                    to="/#tabela-de-precos"
                    role="menuitem"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Plano Individual
                  </Link>
                  <Link
                    to="/#tabela-de-precos"
                    role="menuitem"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Plano Empresa
                  </Link>
                  <Link
                    to="/#tabela-de-precos"
                    role="menuitem"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={handleNavClick}
                  >
                    Plano Odontológico
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/rede-credenciada"
              className="text-gray-700 hover:text-[var(--hapvida-orange)] transition-colors duration-200 font-medium"
              onClick={handleNavClick}
            >
              Rede credenciada
            </Link>

            <Link
              to="/#how-it-works"
              className="text-gray-700 hover:text-[var(--hapvida-orange)] transition-colors duration-200 font-medium"
              onClick={handleNavClick}
            >
              Como funciona
            </Link>

            <Link
              to="/#about"
              className="text-gray-700 hover:text-[var(--hapvida-orange)] transition-colors duration-200 font-medium"
              onClick={handleNavClick}
            >
              Sobre nós
            </Link>
          </nav>

          {/* CTA (desktop) - OTIMIZADO PARA CONVERSÃO */}
          <div className="hidden lg:flex items-center shrink-0 ml-6">
            <button
              type="button"
              onClick={onOpenForm}
              className="group relative h-12 px-8 rounded-full text-white font-bold text-sm shadow-lg overflow-hidden transition-all duration-300 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)', // Laranja Vibrante
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {/* Efeito de Brilho no Hover */}
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
              
              <span className="relative flex items-center gap-2">
                FAÇA UMA COTAÇÃO
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile (hamburguer) */}
          <button className="lg:hidden p-2" aria-label="Toggle menu" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-gray-700"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}