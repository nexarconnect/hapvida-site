import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({
  brand = { name: "NEXAR", sub: "Corretora", to: "/" },
  cta = { label: "Fazer cotação", to: "/cotacao" },
}) {
  const location = useLocation();
  const [openPlans, setOpenPlans] = useState(false);
  const plansRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!plansRef.current) return;
      if (!plansRef.current.contains(e.target)) setOpenPlans(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setOpenPlans(false);
  }, [location.pathname]);

  const itemBase =
    "text-sm font-medium text-gray-700 hover:text-[#0B2B5A] transition-colors";
  const itemActive = "text-sm font-semibold text-[#0B2B5A]";
  const active = (path) => (location.pathname === path ? itemActive : itemBase);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        {/* Logo (substitua pelo seu logo real quando quiser) */}
        <Link to={brand.to} className="flex items-center gap-3">
          {/* Se você tiver imagem:
              <img src={logoSrc} alt={brand.name} className="h-8 w-auto" />
           */}
          <div className="leading-tight">
            <div className="text-[#0B2B5A] font-extrabold text-lg">
              {brand.name}
            </div>
            {brand.sub ? (
              <div className="text-gray-500 text-xs -mt-1">{brand.sub}</div>
            ) : null}
          </div>
        </Link>

        {/* Menu (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={active("/")}>Início</Link>

          {/* Planos (dropdown) */}
          <div className="relative" ref={plansRef}>
            <button
              type="button"
              onClick={() => setOpenPlans((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#0B2B5A] transition-colors"
              aria-expanded={openPlans}
              aria-haspopup="menu"
            >
              Planos <span className="text-gray-400">▾</span>
            </button>

            {openPlans && (
              <div
                role="menu"
                className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50"
              >
                <Link to="/plano-familia" role="menuitem" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  Plano Família
                </Link>
                <Link to="/plano-individual" role="menuitem" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  Plano Individual
                </Link>
                <Link to="/plano-empresa" role="menuitem" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  Plano Empresa
                </Link>
                <Link to="/plano-odontologico" role="menuitem" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  Plano Odontológico
                </Link>
              </div>
            )}
          </div>

          <Link to="/rede-credenciada" className={active("/rede-credenciada")}>
            Rede credenciada
          </Link>

          <Link to="/como-funciona" className={active("/como-funciona")}>
            Como funciona
          </Link>

          <Link to="/sobre" className={active("/sobre")}>
            Sobre
          </Link>

          {/* Se você tiver FAQ na Home */}
          <a href="/#faq" className={itemBase}>
            Dúvidas
          </a>
        </div>

        {/* CTA (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={cta.to}
            className="px-4 py-2 rounded-xl bg-[#0B2B5A] text-white text-sm font-semibold hover:opacity-95 transition"
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile (deixo simples agora; se quiser eu monto completo) */}
        <div className="md:hidden">
          <Link
            to={cta.to}
            className="px-3 py-2 rounded-xl bg-[#0B2B5A] text-white text-sm font-semibold"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}