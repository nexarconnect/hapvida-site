import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';

import { BLOG_POSTS } from '../data/blogPosts';
import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export default function BlogIndex({ onOpenForm }) {
  return (
    <div>
      <SEO
        path="/blog"
        title="Blog | Tabela Plano Saúde"
        description="Guias sobre carência, portabilidade e contratação do plano de saúde Hapvida para quem mora no interior de São Paulo."
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      <Navbar />

      <header className="flex flex-col items-center bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <h1 className="mx-auto max-w-2xl text-3xl font-black leading-tight text-white md:text-5xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Guias sobre carência, portabilidade e contratação do plano Hapvida.
        </p>
      </header>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          {BLOG_POSTS.length === 0 ? (
            <p className="text-center text-slate-500">Nenhum post publicado ainda.</p>
          ) : (
            <div className="space-y-6">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.meta.slug}
                  to={`/blog/${post.meta.slug}`}
                  className="block rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[#002b5c]">
                      {post.meta.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(post.meta.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{post.meta.title}</h2>
                  <p className="mt-3 text-slate-600">{post.meta.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wide text-[#ff8200]">
                    Ler artigo <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
