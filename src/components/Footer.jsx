import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { trackCTA } from '../lib/tracking'; // Corrigido: removido trackContact
import { WHATSAPP_NUMBER } from '../lib/constants';

export default function Footer({ onOpenForm }) {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    // Corrigido: alterado para trackCTA
    trackCTA('whatsapp_click', 'footer_contact', { canal: 'whatsapp' });
  };

  const handleCTAClick = () => {
    trackCTA('solicitar_cotacao', 'footer_main');
    onOpenForm();
  };

  return (
    <footer className="relative z-10 bg-[#002b5c] pb-12 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white uppercase">Nexar</h3>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/70">
                Consultoria especializada em planos de saúde <strong>Hapvida</strong>.
                Focada em transparência e agilidade para sua proteção.
              </p>
            </div>

            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all hover:bg-[#ff8200]"
                >
                  <Icon className="h-5 w-5 text-blue-100 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Navegação</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link to="/" className="hover:text-white transition-colors">Página Inicial</Link></li>
              <li><Link to="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><button onClick={handleCTAClick} className="hover:text-white transition-colors">Solicitar Cotação</button></li>
              <li><Link to="/perguntas-frequentes" className="hover:text-white transition-colors">Dúvidas Frequentes</Link></li>
              <li><Link to="/rede-de-atendimento" className="hover:text-white transition-colors">Rede Credenciada</Link></li>
              <li><Link to="/planos-hapvida-por-cidade" className="hover:text-white transition-colors">Planos por Cidade</Link></li>
              <li><Link to="/plano-individual-hapvida" className="hover:text-white transition-colors">Plano Individual</Link></li>
              <li><Link to="/plano-empresarial-hapvida" className="hover:text-white transition-colors">Plano Empresarial</Link></li>
              <li><Link to="/tipos-de-planos" className="hover:text-white transition-colors">Tipos de Plano</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Institucional</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link to="/politicas-privacidade" className="hover:text-white transition-colors">Privacidade e Segurança</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Atendimento</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#ff8200]" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  onClick={handleWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (14) 99123-5094
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#ff8200]" />
                <a href="mailto:nexarconnect@gmail.com" className="hover:text-white transition-colors">
                  nexarconnect@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[#ff8200]" />
                <span>• Atendimento Nacional</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <div className="space-y-1 text-[11px] text-blue-100/40">
            <p>© {currentYear} NexAR Soluções em Saúde</p>
            <p>CNPJ: 10.157.791/0001-11 • Todos os direitos reservados.</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[11px] text-blue-100/60">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Atendimento com segurança e suporte especializado
          </div>
        </div>
      </div>
    </footer>
  );
}