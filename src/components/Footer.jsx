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
import { useSiteConfig } from '../lib/siteConfig';
import { COVERED_CITIES, slugifyCity } from '../data/coveredCities';

export default function Footer({ onOpenForm }) {
  const currentYear = new Date().getFullYear();
  const { whatsapp_number: WHATSAPP_NUMBER } = useSiteConfig();

  const handleWhatsAppClick = () => {
    // Corrigido: alterado para trackCTA
    trackCTA('whatsapp_click', 'footer_contact', { canal: 'whatsapp' });
  };

  const handleBeneficiaryLinkClick = (portal) => {
    trackCTA('area_beneficiario_click', 'footer_beneficiario', { portal });
  };

  const handleCTAClick = () => {
    trackCTA('solicitar_cotacao', 'footer_main');
    onOpenForm();
  };

  const handleCityLinkClick = (cityName) => {
    trackCTA('footer_cidade_click', 'footer_cidades', { cidade: cityName });
  };

  return (
    <footer className="relative z-10 bg-[#002b5c] pb-12 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white uppercase">Nexar</h3>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/70">
                Consultoria especializada em planos de saúde <strong>Hapvida</strong>.
                Focada em transparência e agilidade para sua proteção.
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/corretorautorizadohapvida/' },
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61588052201763&sk=grid' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/nexarconnect/' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              <li><Link to="/sobre-o-grupo-hapvida" className="hover:text-white transition-colors">Sobre o Grupo Hapvida</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><button onClick={handleCTAClick} className="hover:text-white transition-colors">Solicitar Cotação</button></li>
              <li><Link to="/perguntas-frequentes" className="hover:text-white transition-colors">Dúvidas Frequentes</Link></li>
              <li><Link to="/rede-de-atendimento" className="hover:text-white transition-colors">Rede Credenciada</Link></li>
              <li><Link to="/rede-nacional" className="hover:text-white transition-colors">Rede Nacional</Link></li>
              <li><Link to="/planos-hapvida-por-cidade" className="hover:text-white transition-colors">Planos por Cidade</Link></li>
              <li><Link to="/tabela-de-preco-hapvida" className="hover:text-white transition-colors">Tabela de Preço</Link></li>
              <li><Link to="/plano-individual-hapvida" className="hover:text-white transition-colors">Plano Individual</Link></li>
              <li><Link to="/plano-empresarial-hapvida" className="hover:text-white transition-colors">Plano Empresarial</Link></li>
              <li><Link to="/plano-odontologico-hapvida" className="hover:text-white transition-colors">Plano Odontológico</Link></li>
              <li><Link to="/tipos-de-planos" className="hover:text-white transition-colors">Tipos de Plano</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Institucional</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link to="/politicas-privacidade" className="hover:text-white transition-colors">Privacidade e Segurança</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link></li>
            </ul>

            <h4 className="mb-6 mt-10 text-lg font-bold text-white">Área do Beneficiário</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li>
                <a
                  href="https://portal-beneficiario.hapvida.com.br/#tabs-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBeneficiaryLinkClick('portal_beneficiario')}
                  className="hover:text-white transition-colors"
                >
                  Portal do Beneficiário
                </a>
              </li>
              <li>
                <a
                  href="https://webhap.hapvida.com.br/pls/webhap/webNewBoletoEmpresa.Login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBeneficiaryLinkClick('2via_boleto_empresa')}
                  className="hover:text-white transition-colors"
                >
                  2ª Via de Boleto (Empresa)
                </a>
              </li>
              <li>
                <a
                  href="https://webhap.hapvida.com.br/pls/webhap/pk_carteira_provisoria.login_usuario_form"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBeneficiaryLinkClick('carteirinha_provisoria_titular')}
                  className="hover:text-white transition-colors"
                >
                  Carteirinha Provisória (Titular)
                </a>
              </li>
              <li>
                <a
                  href="https://webhap.hapvida.com.br/pls/webhap/pk_carteira_provisoria.login_empresa_form"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBeneficiaryLinkClick('carteirinha_provisoria_empresa')}
                  className="hover:text-white transition-colors"
                >
                  Carteirinha Provisória (Empresa)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Planos por Cidade</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              {COVERED_CITIES.map((city) => (
                <li key={city.name}>
                  <Link
                    to={`/plano-hapvida/${slugifyCity(city.name)}`}
                    onClick={() => handleCityLinkClick(city.name)}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
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
                  (11) 93289-4067
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#ff8200]" />
                <a href="mailto:contato@nexarconnect.com.br" className="hover:text-white transition-colors">
                  contato@nexarconnect.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[#ff8200]" />
                <span>• Atendimento Nacional</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center text-[11px] leading-relaxed text-blue-100/40">
            <p className="font-bold text-blue-100/60">
              AR SOLUÇÕES EM SAÚDE E PROMOÇÃO DE VENDAS LTDA, CNPJ: 10.157.791/0001-11
            </p>
            <p>
              Nexar Connect é uma consultoria de vendas autorizada e braço de promoção de vendas
              (CNAE 73.19-0-03) especializado em planos de saúde. Atuamos na intermediação
              comercial e consultoria técnica para a operadora Hapvida Assistência Médica.
            </p>
            <p>
              A responsabilidade técnica, civil e operacional pela prestação dos serviços
              médico-hospitalares e execução do plano de saúde é integral e exclusiva da
              operadora Hapvida, conforme normas da ANS.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="text-[11px] text-blue-100/40">© {currentYear} Todos os direitos reservados.</p>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[11px] text-blue-100/60">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Atendimento com segurança e suporte especializado
          </div>
        </div>
      </div>
    </footer>
  );
}