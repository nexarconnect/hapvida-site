import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    planos: [
      { label: 'Plano Família', href: '#familia' },
      { label: 'Plano Empresa', href: '#empresa' },
      { label: 'Plano Individual', href: '#individual' },
      { label: 'Plano Odontológico', href: '#odontologico' },
    ],
    institucional: [
      { label: 'Sobre nós', href: '#sobre' },
      { label: 'Home', href: '#home' },
    ],
    legal: [
      { label: 'Políticas de Privacidade', href: '#privacidade' },
      { label: 'Termos de uso', href: '#termos' },
    ]
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
              NEXAR <span className="text-white">Corretora</span>
            </div>
            <p className="text-gray-400 mb-4">
              Especialistas em planos de saúde Hapvida. Conectando você ao melhor cuidado de saúde.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors" aria-label="LinkedIn">
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
                <span className="text-gray-400">(11) 99999-9999</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hapvida-blue)' }} />
                <span className="text-gray-400">contato@nexarcorretora.com.br</span>
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
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-400 hover:text-[var(--hapvida-blue)] transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;