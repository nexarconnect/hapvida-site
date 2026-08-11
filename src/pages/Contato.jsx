import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Building2, ShieldCheck } from 'lucide-react';

import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';
import { trackCTA } from '../lib/tracking';
import { openWhatsApp } from '../lib/whatsapp';
import { useSiteConfig } from '../lib/siteConfig';

export default function Contato({ onOpenForm }) {
  const { whatsapp_number: WHATSAPP_NUMBER } = useSiteConfig();
  const handleFormClick = () => {
    trackCTA('solicitar_cotacao', 'contato_hero');
    onOpenForm();
  };

  const handleWhatsAppClick = () => {
    trackCTA('whatsapp_click', 'contato_hero');
    openWhatsApp({ placement: 'contato_hero' });
  };

  const title = 'Contato | NexAR Consultoria Hapvida';
  const description =
    'Fale com a NexAR pelo WhatsApp, e-mail ou formulário de cotação. Atendimento por consultor real para o plano de saúde Hapvida.';

  return (
    <div>
      <SEO
        path="/contato"
        title={title}
        description={description}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Contato', path: '/contato' },
        ]}
      />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <MessageCircle className="h-4 w-4 text-[#ff8200]" />
          Fale com a NexAR
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Contato
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Cotação gratuita e sem compromisso, com retorno de um consultor real em poucos minutos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={handleFormClick}
            className="rounded-2xl bg-[#ff8200] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#e67600] active:scale-95"
          >
            Solicitar cotação
          </button>
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </button>
        </div>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Canais de atendimento
          </h2>
          <p className="mt-4 text-slate-600">
            Escolha o canal que preferir. O formulário de cotação é o caminho mais rápido para
            receber os valores atualizados na sua cidade; o WhatsApp e o e-mail atendem qualquer
            outra dúvida, sobre planos, rede ou contratação.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left transition hover:bg-slate-100"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#ff8200] shadow-sm">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900">WhatsApp</h3>
                <p className="mt-1 text-sm text-slate-500">(14) 99123-5094</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#ff8200]">
                  Resposta mais rápida
                </p>
              </div>
            </button>

            <a
              href="mailto:nexarconnect@gmail.com"
              className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left transition hover:bg-slate-100"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#ff8200] shadow-sm">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900">E-mail</h3>
                <p className="mt-1 text-sm text-slate-500">nexarconnect@gmail.com</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Ideal para anexar documentos
                </p>
              </div>
            </a>

            <button
              type="button"
              onClick={handleFormClick}
              className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left transition hover:bg-slate-100 sm:col-span-2"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#ff8200] shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900">Formulário de cotação</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Nome, WhatsApp e cidade. Um consultor confirma valores e disponibilidade e entra
                  em contato.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Informações da empresa
          </h2>
          <div className="mt-8 grid gap-6 rounded-3xl border border-slate-100 bg-white p-8 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <div>
                <p className="font-black text-slate-900">NexAR Soluções em Saúde</p>
                <p className="text-sm text-slate-500">CNPJ: 10.157.791/0001-11</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <div>
                <p className="font-black text-slate-900">Interior de São Paulo</p>
                <p className="text-sm text-slate-500">Atendimento nacional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <div>
                <p className="font-black text-slate-900">Consultoria autorizada</p>
                <p className="text-sm text-slate-500">+22 anos de experiência no mercado</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-700 hover:text-[#002b5c]"
              >
                (14) 99123-5094
              </a>
            </div>
          </div>
        </div>
      </section>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
