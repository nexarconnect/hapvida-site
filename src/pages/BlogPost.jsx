import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, MessageCircle } from 'lucide-react';

import { getPostBySlug } from '../data/blogPosts';
import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';
import NotFound from './NotFound';

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export default function BlogPost({ onOpenForm }) {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const { meta, Body } = post;

  const handleOpenForm = () => {
    onOpenForm?.('Cotação via blog');
  };

  return (
    <div>
      <SEO
        path={`/blog/${meta.slug}`}
        title={`${meta.title} | Blog`}
        description={meta.description}
        article={{ publishedAt: meta.publishedAt, updatedAt: meta.updatedAt }}
      />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-white md:py-20">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-200">
            <span className="rounded-full bg-white/10 px-3 py-1">{meta.category}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(meta.publishedAt)}
            </span>
          </div>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">{meta.title}</h1>
        </div>
      </header>

      <article className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#002b5c] prose-a:text-[#ff8200] prose-a:font-bold">
            <Body />
          </div>

          <div className="mt-14 rounded-[2rem] bg-slate-50 p-8 text-center md:p-10">
            <h3 className="text-2xl font-black text-slate-900">
              Quer uma orientação para o seu caso?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Fale com um consultor autorizado Hapvida e receba uma cotação sem compromisso pelo WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleOpenForm}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#ff8200] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#ff9529]"
            >
              <MessageCircle className="h-4 w-4" />
              Solicitar cotação
            </button>
          </div>
        </div>
      </article>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
