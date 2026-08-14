import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users2, ShieldCheck, Building2, Calendar } from 'lucide-react';

import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';

const ELEGIBILIDADE = [
  'Conselhos profissionais (ex: OAB, CRM, CREA) e suas entidades de classe',
  'Sindicatos e centrais sindicais',
  'Associações profissionais legalmente constituídas',
  'Cooperativas que reúnam associados de uma mesma categoria',
  'Caixas de assistência e fundações vinculadas a categorias profissionais',
  'Entidades estudantis, quando aplicável',
];

const COMPARATIVO = [
  {
    modalidade: 'Individual',
    quemContrata: 'Pessoa física (CPF)',
    preRequisito: 'Nenhum',
    reajuste: 'Teto definido pela ANS',
  },
  {
    modalidade: 'Adesão',
    quemContrata: 'Entidade de classe, em nome do associado',
    preRequisito: 'Filiação a entidade com convênio ativo',
    reajuste: 'Negociado entre a entidade e a operadora, sem teto da ANS',
  },
  {
    modalidade: 'Empresarial',
    quemContrata: 'Empresa ou MEI (CNPJ)',
    preRequisito: 'CNPJ ativo',
    reajuste: 'Negociado com a operadora, conforme sinistralidade do grupo',
  },
];

const CARENCIAS = [
  { servico: 'Urgência e emergência', prazo: '24 horas' },
  { servico: 'Consultas e exames simples', prazo: '30 dias' },
  { servico: 'Internações e cirurgias', prazo: '180 dias' },
  { servico: 'Parto a termo', prazo: '300 dias' },
  { servico: 'Doenças e lesões preexistentes', prazo: 'até 24 meses (cobertura parcial)' },
];

const FAQ_ITEMS = [
  {
    question: 'Qualquer pessoa pode contratar o plano por adesão?',
    answer:
      'Não. É preciso ser filiado a uma entidade de classe elegível (conselho profissional, sindicato, associação ou cooperativa) que tenha convênio ativo com a Hapvida. Sem esse acordo firmado entre a entidade e a operadora, não existe a via de adesão.',
  },
  {
    question: 'Preciso de CNPJ para contratar por adesão?',
    answer:
      'Não. O destaque dessa modalidade é justamente não exigir CNPJ nem vínculo empregatício, apenas a filiação à entidade conveniada.',
  },
  {
    question: 'O plano por adesão tem o mesmo reajuste do individual?',
    answer:
      'Não. O individual segue o teto de reajuste definido anualmente pela ANS. No adesão, assim como no empresarial, o percentual é o que foi negociado no contrato coletivo entre a entidade de classe e a operadora.',
  },
  {
    question: 'O plano por adesão tem carência?',
    answer:
      'Os prazos seguem a regra padrão da ANS (24h para urgência, 30 dias para consultas simples, 180 dias para internações, entre outros), salvo condição diferenciada negociada no contrato entre a entidade e a operadora.',
  },
  {
    question: 'Como eu confirmo se posso contratar?',
    answer:
      'Um consultor confirma, no momento da cotação, se a sua entidade de classe tem convênio ativo para essa modalidade e qual é o valor para a sua faixa etária e cidade.',
  },
];

export default function PlanoHapvidaAdesao({ onOpenForm }) {
  const title = 'Plano Hapvida por Adesão | Quem Pode Contratar';
  const description =
    'Entenda como funciona o plano de saúde Hapvida por adesão, quem pode contratar através de entidade de classe, e peça sua cotação.';

  return (
    <div>
      <SEO
        path="/plano-hapvida-adesao"
        title={title}
        description={description}
        noindex
        faqItems={FAQ_ITEMS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Plano por Adesão', path: '/plano-hapvida-adesao' },
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
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <Users2 className="h-4 w-4 text-[#ff8200]" />
          Contratação coletiva por entidade de classe
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Plano de Saúde Hapvida por Adesão
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Uma modalidade coletiva, contratada através de uma entidade de classe (sindicato,
          conselho profissional ou associação). Consulte se você tem direito e qual é o valor
          para o seu caso.
        </p>
      </header>

      {/* PLACEHOLDER — NÃO RENDERIZADO NO SITE (aviso só para quem edita o código).
          A Nexar ainda não confirmou se opera esta modalidade hoje, nem qual(is)
          entidade(s) de classe já têm convênio ativo confirmado. Não editar o
          conteúdo abaixo supondo confirmação; a prop `noindex` do <SEO> continua
          ativa até checar com a Amanda. Mesmo padrão de placeholder (documentado
          em comentário, não em texto visível ao visitante) usado em SobreNos.jsx. */}

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            O que é o plano por adesão
          </h2>
          <p className="mt-4 text-slate-600">
            É uma modalidade de contratação coletiva, diferente do plano individual (contratado
            direto por CPF) e do plano empresarial (contratado por uma empresa com CNPJ). Nele,
            quem intermedia o contrato é uma entidade de classe, como um sindicato, conselho
            profissional, associação ou cooperativa a que o beneficiário está vinculado.
          </p>
          <p className="mt-4 text-slate-600">
            Na prática, isso significa que a contratação depende de duas coisas: você precisar
            estar filiado a uma entidade elegível, e essa entidade ter um convênio ativo com a
            operadora Hapvida.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <Users2 size={22} />
              </div>
              <h3 className="font-black text-slate-900">Filiação de classe</h3>
              <p className="mt-2 text-sm text-slate-500">
                Precisa estar filiado a um conselho, sindicato, associação ou cooperativa elegível.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <Building2 size={22} />
              </div>
              <h3 className="font-black text-slate-900">Convênio com a operadora</h3>
              <p className="mt-2 text-sm text-slate-500">
                A entidade precisa ter convênio ativo firmado direto com a Hapvida.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-black text-slate-900">Elegibilidade confirmada</h3>
              <p className="mt-2 text-sm text-slate-500">
                A validação final é feita por um consultor no momento da cotação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Quem pode contratar
          </h2>
          <p className="mt-4 text-slate-600">
            De forma geral, a regulamentação da ANS (Resolução Normativa nº 557/2022) prevê a
            elegibilidade para plano por adesão a pessoas vinculadas a:
          </p>
          <ul className="mt-6 space-y-3">
            {ELEGIBILIDADE.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff8200]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Isso não confirma automaticamente sua elegibilidade. A entidade à qual você é filiado
            precisa ter convênio ativo com a Hapvida; sem esse acordo firmado, não existe a via de
            adesão, e a alternativa passa a ser individual ou empresarial. Essa validação é feita
            pelo consultor no momento da cotação.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Adesão, Individual ou Empresarial: qual é a diferença
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th className="px-4 py-3 font-black">Modalidade</th>
                  <th className="px-4 py-3 font-black">Quem contrata</th>
                  <th className="px-4 py-3 font-black">Pré-requisito</th>
                  <th className="px-4 py-3 font-black">Reajuste</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((row) => (
                  <tr key={row.modalidade} className="border-b border-slate-100 bg-slate-50 even:bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.modalidade}</td>
                    <td className="px-4 py-3 text-slate-700">{row.quemContrata}</td>
                    <td className="px-4 py-3 text-slate-700">{row.preRequisito}</td>
                    <td className="px-4 py-3 text-slate-500">{row.reajuste}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/plano-individual-hapvida"
              className="rounded-2xl border border-[#002b5c] px-6 py-3 text-sm font-black uppercase tracking-widest text-[#002b5c] transition hover:bg-[#002b5c] hover:text-white"
            >
              Ver plano individual
            </Link>
            <Link
              to="/plano-empresarial-hapvida"
              className="rounded-2xl border border-[#002b5c] px-6 py-3 text-sm font-black uppercase tracking-widest text-[#002b5c] transition hover:bg-[#002b5c] hover:text-white"
            >
              Ver plano empresarial
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Como funciona o preço e o reajuste
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            O valor varia conforme faixa etária, cidade e o contrato firmado entre a entidade de
            classe e a Hapvida. Diferente do plano individual, não existe teto de reajuste
            definido pela ANS: o percentual aplicado todo ano é o que foi negociado no contrato
            coletivo entre a entidade e a operadora. Peça a cotação para receber o valor exato
            para o seu caso.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <Calendar className="h-7 w-7 flex-shrink-0 text-[#ff8200]" />
            <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Carência</h2>
          </div>
          <p className="mb-6 text-sm text-slate-500">
            Prazos padrão definidos pela ANS, salvo condição diferenciada negociada pela entidade
            de classe.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th className="px-4 py-3 font-black">Serviço</th>
                  <th className="px-4 py-3 font-black">Carência</th>
                </tr>
              </thead>
              <tbody>
                {CARENCIAS.map((row) => (
                  <tr key={row.servico} className="border-b border-slate-100 bg-slate-50 even:bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.servico}</td>
                    <td className="px-4 py-3 text-slate-700">{row.prazo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Como contratar
          </h2>
          <ol className="space-y-4">
            {[
              'Confirme com um consultor se a sua entidade de classe tem convênio ativo para o plano por adesão.',
              'Envie os documentos pessoais e o comprovante de filiação à entidade (sindicato, conselho ou associação).',
              'Receba a cotação com o valor exato para a sua faixa etária e cidade.',
              'Assinatura e ativação, com acompanhamento do consultor depois da contratação.',
            ].map((step, index) => (
              <li key={step} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ff8200] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Perguntas sobre o plano por adesão
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="font-black text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Veja também o post{' '}
            <Link to="/blog/plano-hapvida-adesao-como-funciona" className="font-bold text-[#002b5c] underline">
              plano Hapvida por adesão: como funciona
            </Link>{' '}
            ou as{' '}
            <Link to="/perguntas-frequentes" className="font-bold text-[#002b5c] underline">
              perguntas frequentes completas
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[#002b5c] py-16 text-center text-white md:py-20">
        <div className="container mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Verifique se você pode contratar
          </h2>
          <p className="mt-4 text-blue-100">
            Um consultor confirma sua elegibilidade e o valor exato para o seu caso, sem
            compromisso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenForm?.()}
              className="rounded-2xl bg-[#ff8200] px-8 py-4 font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e67600]"
            >
              Verificar minha elegibilidade
            </button>
          </div>
        </div>
      </section>

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
