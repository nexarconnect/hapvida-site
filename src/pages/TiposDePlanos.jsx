import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCheck, Briefcase, Users, CheckCircle2 } from 'lucide-react';

import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';

const MODALIDADES = [
  {
    icon: UserCheck,
    nome: 'Individual',
    quem: 'Qualquer pessoa física, com ou sem CNPJ.',
    documentos: 'CPF e documentos pessoais dos dependentes, se houver.',
    reajuste: 'Segue o teto anual definido pela ANS.',
    destaque: 'Sem burocracia de empresa ou entidade.',
    link: '/plano-individual-hapvida',
    linkLabel: 'Ver plano individual',
  },
  {
    icon: Briefcase,
    nome: 'Empresarial',
    quem: 'Empresas e MEI com CNPJ ativo.',
    documentos: 'CNPJ e documentos pessoais de cada beneficiário incluído.',
    reajuste: 'Negociado com a operadora, conforme sinistralidade do grupo.',
    destaque: 'Condição comercial própria, às vezes mais vantajosa que a individual.',
    link: '/plano-empresarial-hapvida',
    linkLabel: 'Ver plano empresarial',
  },
  {
    icon: Users,
    nome: 'Adesão',
    quem: 'Quem é filiado a um sindicato, conselho profissional ou associação de classe conveniada.',
    documentos: 'Comprovante de vínculo com a entidade (sindicato, conselho ou associação) e documentos pessoais.',
    reajuste: 'Definido pelo contrato coletivo entre a entidade e a operadora.',
    destaque: 'Não precisa de CNPJ nem de vínculo empregatício, só de filiação à entidade.',
    link: null,
    linkLabel: null,
  },
];

export default function TiposDePlanos({ onOpenForm }) {
  const title = 'Tipos de Plano Hapvida 2026 | Individual, Empresarial e Adesão';
  const description =
    'Compare as modalidades de plano de saúde Hapvida: individual, empresarial (CNPJ/MEI) e adesão (sindicato ou associação de classe). Veja qual se aplica ao seu caso.';

  return (
    <div>
      <SEO path="/tipos-de-planos" title={title} description={description} />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Tipos de plano Hapvida
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Individual, empresarial ou adesão? Compare quem pode contratar cada modalidade antes de
          pedir sua cotação.
        </p>
      </header>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {MODALIDADES.map((modalidade) => {
              const Icon = modalidade.icon;
              return (
                <div
                  key={modalidade.nome}
                  className="flex flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">{modalidade.nome}</h2>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Quem pode contratar
                      </dt>
                      <dd className="mt-1 text-slate-600">{modalidade.quem}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Documentos
                      </dt>
                      <dd className="mt-1 text-slate-600">{modalidade.documentos}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Reajuste
                      </dt>
                      <dd className="mt-1 text-slate-600">{modalidade.reajuste}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-start gap-2 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-[#ff8200]" />
                    <span>{modalidade.destaque}</span>
                  </div>

                  {modalidade.link ? (
                    <Link
                      to={modalidade.link}
                      className="mt-8 rounded-2xl bg-[#002b5c] py-4 text-center text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#003b7d]"
                    >
                      {modalidade.linkLabel}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenForm?.('Adesão')}
                      className="mt-8 rounded-2xl bg-[#002b5c] py-4 text-center text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#003b7d]"
                    >
                      Consultar disponibilidade
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-black text-[#002b5c] md:text-2xl">
              Não sabe qual modalidade se aplica ao seu caso?
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Um consultor confirma qual opção faz mais sentido considerando seu perfil, cidade e
              se você tem CNPJ ou vínculo com alguma entidade de classe.
            </p>
            <button
              type="button"
              onClick={() => onOpenForm?.()}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#ff8200] px-8 py-4 font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e67600]"
            >
              Solicitar cotação
            </button>
          </div>
        </div>
      </section>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
