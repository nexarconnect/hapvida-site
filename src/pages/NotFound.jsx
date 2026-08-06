import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { openWhatsApp } from '../lib/whatsapp';
import { trackCTA } from '../lib/tracking';

export default function NotFound() {
  const handleWhatsApp = () => {
    trackCTA('whatsapp_click', 'not_found_page', {});
    openWhatsApp({});
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
      <SEO
        path="/404"
        title="Página não encontrada | Tabela Plano Saúde"
        description="A página que você tentou acessar não existe ou foi movida."
        noindex
      />
      <div>
        <SearchX className="mx-auto mb-4 h-12 w-12 text-blue-900" />
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Página não encontrada</h1>
        <p className="mb-6 text-slate-600">
          O endereço acessado não existe ou foi movido. Confira o link, volte para a página inicial ou
          fale direto com um consultor.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#004b8d] px-8 font-bold text-white transition-all hover:opacity-90 active:scale-95"
          >
            Voltar para a Home
          </Link>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 font-bold text-white transition-all hover:opacity-90 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}
