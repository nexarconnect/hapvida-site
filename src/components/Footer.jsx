import React from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORTADO PARA LINKS INTERNOS
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import logoHapvida from "../assets/logo-hapvida-branco.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    planos: [
      { label: 'Plano Família', href: '#tabela-de-precos' }, // <-- AJUSTADO PARA ID CORRETO
      { label: 'Plano Empresa', href: '#tabela-de-precos' },
      { label: 'Plano Individual', href: '#tabela-de-precos' },
      { label: 'Plano Odontológico', href: '#tabela-de-precos' },
    ],
    institucional: [
      { label: 'Sobre nós', href: '#about' },
      { label: 'Home', href: '#home' },
    ],
    legal: [
      { label: 'Políticas de Privacidade', to: '/politicas-privacidade' }, // <-- MUDADO PARA LINK INTERNO
      { label: 'Termos de uso', to: '/termos-de-uso' }, // <-- MUDADO PARA LINK INTERNO
    ]
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="about" className="scroll-mt-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
<div>
  <div className="flex items-center gap-3 mb-4">
    <img
      src={logoHapvida}
      alt="Hapvida"
      className="h-8 md:h-9 w-auto"
      loading="lazy"
    />

    <div className="leading-tight">
      <div
        className="text-1xl font-bold"
        style={{ color: "var(--hapvida-blue)" }}
      >
       <span className="text-white">NEXAR</span>
      </div>
    </div>
  </div>

  <p className="text-gray-400 mb-4">
    Especialistas em planos de saúde Hapvida. Conectando você ao melhor cuidado
    de saúde.
  </p>

  <div className="flex space-x-4">
    <a
      href="#"
      className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors"
      aria-label="Facebook"
    >
      <Facebook className="h-5 w-5" />
    </a>

    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors"
      aria-label="Instagram"
    >
      <Instagram className="h-5 w-5" />
    </a>

    <a
      href="#"
      className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors"
      aria-label="LinkedIn"
    >
      <Linkedin className="h-5 w-5" />
    </a>
  </div>
</div>

          {/* Planos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Planos</h3>
            <ul className="space-y-2">
              {footerLinks.planos.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-lg font-bold mb-4">Institucional</h3>
            <ul className="space-y-2">
              {footerLinks.institucional.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} />
                <span className="text-gray-400">(14) 99123-5094</span> {/* <-- TELEFONE CORRIGIDO */}
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} />
                <span className="text-gray-400">nexarconnect@gmail.com</span> {/* <-- EMAIL CORRIGIDO */}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} NEXAR Corretora. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link, index) => (
                <li key={index} className="list-none"> {/* <-- MUDADO PARA <li> PARA CONSISTÊNCIA */}
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;