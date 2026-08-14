import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, MapPin, Calendar, ShieldCheck, Layers } from 'lucide-react';

import { COVERED_CITIES, slugifyCity } from '../data/coveredCities';
import { EXTENDED_FAQS } from '../data/faqs';
import { Navbar, Footer, ChatInteligente, CTAGroup, FinalCTA } from '../components';
import FAQSection from '../components/FAQ';
import SEO from '../components/SEO';
import { trackCTA } from '../lib/tracking';

const MODALIDADES = [
  {
    modalidade: 'Individual',
    entrada: 'R$ 144,05',
    planos: 'Nosso Médico, Nosso Plano, Pleno',
    destaque: 'Taxa de adesão R$ 35',
  },
  {
    modalidade: 'Super Simples (2-29 vidas)',
    entrada: 'R$ 94,42',
    planos: 'Nosso Médico, Nosso Plano',
    destaque: 'Carência de 60 dias',
  },
  {
    modalidade: 'PME (30-99 vidas)',
    entrada: 'Sob consulta',
    planos: 'Mix de planos',
    destaque: 'Isenção de carência',
  },
];

const FAIXAS_ETARIAS = [
  { faixa: '0-18', valor: 'R$ 157,29' },
  { faixa: '19-28', valor: 'R$ 163,58' },
  { faixa: '29-33', valor: 'R$ 188,12' },
  { faixa: '34-38', valor: 'R$ 216,34' },
  { faixa: '39-43', valor: 'R$ 251,30' },
  { faixa: '44-48', valor: 'R$ 387,00' },
  { faixa: '49-53', valor: 'R$ 592,11' },
  { faixa: '54-58', valor: 'R$ 665,95' },
  { faixa: '59+', valor: 'R$ 942,99' },
];

const COPARTICIPACAO = [
  { item: 'Consultas eletivas', percentual: '30%', limite: 'R$ 20 a R$ 30' },
  { item: 'Urgência e emergência', percentual: '30%', limite: 'R$ 55 a R$ 80' },
  { item: 'Exames simples', percentual: '30%', limite: 'R$ 15 a R$ 20' },
  { item: 'Exames complexos', percentual: '30%', limite: 'R$ 55 a R$ 100' },
  { item: 'Internação (coletivo)', percentual: 'N/A', limite: 'R$ 180' },
];

const FATORES_PRECO = [
  {
    titulo: 'Faixa etária',
    texto:
      'A ANS define 10 faixas etárias e limita o reajuste entre elas: o valor da última faixa (59 anos ou mais) não pode ultrapassar 6 vezes o valor da primeira (0 a 18 anos). Os maiores saltos costumam acontecer a partir dos 44 anos.',
  },
  {
    titulo: 'Modalidade de contratação',
    texto:
      'Individual, Super Simples (2 a 29 vidas) ou PME (30 vidas ou mais) têm regras e faixas de preço diferentes. A partir de 30 vidas, a operadora costuma isentar a carência para o grupo.',
  },
  {
    titulo: 'Cidade e rede disponível',
    texto:
      'O valor muda conforme a cidade, porque a rede própria e credenciada disponível localmente varia. Por isso a tabela por faixa etária desta página é ilustrativa: peça a cotação exata para a sua cidade.',
  },
  {
    titulo: 'Coparticipação',
    texto:
      'Planos com coparticipação cobram um valor adicional por procedimento utilizado (consulta, exame, internação), em troca de uma mensalidade menor. Quem usa pouco o plano tende a sair ganhando; quem usa com frequência, nem sempre.',
  },
  {
    titulo: 'Reajuste anual',
    texto:
      'Planos individuais seguem o índice máximo autorizado pela ANS todo mês de maio. Planos coletivos (Super Simples e PME) têm reajuste próprio, negociado com a operadora conforme o histórico de uso do grupo.',
  },
];

const CARENCIAS = [
  { servico: 'Urgência e emergência', prazo: '24 horas' },
  { servico: 'Consultas e exames simples', prazo: '30 dias' },
  { servico: 'Internações e cirurgias', prazo: '180 dias' },
  { servico: 'Parto a termo', prazo: '300 dias' },
  { servico: 'Doenças e lesões preexistentes', prazo: 'até 24 meses (cobertura parcial)' },
];

const TABELA_FAQS = [
  {
    category: 'Tabela de preços',
    question: 'A tabela de preços 2026 é válida até quando?',
    answer: 'Os contratos da vigência atual valem para adesões feitas entre 01/07 e 30/09/2026, com o desconto da promoção Saúde Integral aplicado.',
  },
  {
    category: 'Tabela de preços',
    question: 'Preciso de CNPJ para contratar?',
    answer: 'No plano individual não é necessário. Já as modalidades coletivas, Super Simples e PME, exigem CNPJ ativo.',
  },
  {
    category: 'Tabela de preços',
    question: 'Qual é a carência das modalidades da tabela?',
    answer: 'Até 29 vidas (individual e Super Simples), a carência padrão é de 60 dias. A partir de 30 vidas (PME), há isenção de carência.',
  },
  {
    category: 'Tabela de preços',
    question: 'Já tenho plano de saúde. Consigo migrar sem cumprir carência de novo?',
    answer: 'Sim, pela portabilidade. Quem está no plano atual há dois anos ou mais (ou três, para cobertura parcial de doenças preexistentes) pode migrar para a Hapvida sem cumprir novas carências. O consultor confere se o seu caso se enquadra.',
  },
];

export default function TabelaDePrecoHapvida({ onOpenForm }) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTrackedView.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.body.scrollHeight * 0.5) {
        hasTrackedView.current = true;
        trackCTA('tabela_view', 'tabela_de_preco_hapvida', {});
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenForm = () => {
    trackCTA('simulacao_click', 'tabela_de_preco_hero');
    onOpenForm?.();
  };

  const handleCidadeClick = (cityName) => {
    trackCTA('tabela_cidade_click', 'tabela_de_preco_cidades', { cidade: cityName });
  };

  const title = 'Tabela de Preço Hapvida 2026: Valores por Idade e Cidade';
  const description =
    'Tabela de preço Hapvida 2026 atualizada: valores por faixa etária, planos individuais e empresariais a partir de R$ 94,42. Vigência 01/07 a 30/09/2026. Simule grátis.';

  return (
    <div>
      <SEO
        path="/tabela-de-preco-hapvida"
        title={title}
        description={description}
        faqItems={TABELA_FAQS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Tabela de Preço', path: '/tabela-de-preco-hapvida' },
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
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Tabela de Preço Hapvida 2026: Valores por Idade e Cidade
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          O preço do plano Hapvida não é único: muda conforme faixa etária, cidade, plano e
          modalidade. Esta página consolida a tabela oficial vigente de 01/07 a 30/09/2026, já com
          o desconto da promoção Saúde Integral.
        </p>
        <div className="mt-8">
          <CTAGroup onOpenForm={handleOpenForm} size="md" />
        </div>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Quanto custa em 2026?</h2>

          <div className="mt-8 space-y-4 md:hidden">
            {MODALIDADES.map((row) => (
              <div key={row.modalidade} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black text-slate-900">{row.modalidade}</span>
                  <span className="whitespace-nowrap font-black text-[#002b5c]">{row.entrada}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{row.planos}</p>
                <p className="mt-1 text-xs text-slate-500">{row.destaque}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th className="px-4 py-3 font-black">Modalidade</th>
                  <th className="px-4 py-3 font-black">Entrada (0-18)</th>
                  <th className="px-4 py-3 font-black">Planos</th>
                  <th className="px-4 py-3 font-black">Destaque</th>
                </tr>
              </thead>
              <tbody>
                {MODALIDADES.map((row) => (
                  <tr key={row.modalidade} className="border-b border-slate-100 bg-slate-50 even:bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.modalidade}</td>
                    <td className="px-4 py-3 text-slate-700">{row.entrada}</td>
                    <td className="px-4 py-3 text-slate-700">{row.planos}</td>
                    <td className="px-4 py-3 text-slate-500">{row.destaque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Valores Individual por faixa etária
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Exemplo ilustrativo: Ribeirão Preto, plano Nosso Médico. Consulte a cotação exata para
            a sua cidade e idade.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm md:hidden">
            {FAIXAS_ETARIAS.map((row, i) => (
              <div
                key={row.faixa}
                className={`flex items-center justify-between px-5 py-3 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
              >
                <span className="font-bold text-slate-900">{row.faixa} anos</span>
                <span className="font-black text-[#ff8200]">{row.valor}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[600px] border-collapse overflow-hidden rounded-2xl bg-white text-left text-sm">
              <thead>
                <tr className="bg-[#ff8200] text-white">
                  <th className="px-4 py-3 font-black">Faixa etária</th>
                  <th className="px-4 py-3 font-black">Valor</th>
                </tr>
              </thead>
              <tbody>
                {FAIXAS_ETARIAS.map((row) => (
                  <tr key={row.faixa} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.faixa}</td>
                    <td className="px-4 py-3 text-slate-700">{row.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <TrendingUp className="mx-auto h-8 w-8 text-[#ff8200]" />
          <h2 className="mt-4 text-2xl font-black text-[#002b5c] md:text-3xl">
            Por que o preço sobe com a idade?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            O reajuste por faixa etária segue a regra da ANS. Os maiores saltos acontecem entre 44
            e 48 anos (54%) e entre 49 e 53 anos (53%). Por isso, contratar mais cedo e planejar a
            faixa de entrada faz diferença no valor pago ao longo dos anos.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <Layers className="h-7 w-7 flex-shrink-0 text-[#ff8200]" />
            <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
              5 fatores que definem o seu preço
            </h2>
          </div>
          <div className="space-y-4">
            {FATORES_PRECO.map((item) => (
              <div key={item.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-black text-slate-900">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <Calendar className="h-7 w-7 flex-shrink-0 text-[#ff8200]" />
            <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
              Carência: quanto tempo até poder usar o plano
            </h2>
          </div>
          <p className="mb-6 text-sm text-slate-500">
            Prazos padrão definidos pela ANS. Quem já tem plano de saúde há dois anos ou mais pode
            pedir portabilidade e migrar para a Hapvida sem cumprir novas carências.
          </p>
          <div className="space-y-3 md:hidden">
            {CARENCIAS.map((row) => (
              <div key={row.servico} className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                <span className="font-bold text-slate-900">{row.servico}</span>
                <p className="mt-1 font-black text-[#002b5c]">{row.prazo}</p>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
            <p className="text-sm text-slate-600">
              Na modalidade PME (30 vidas ou mais), a carência costuma ser isenta para o grupo. Fale
              com o consultor para confirmar as condições vigentes para a sua cidade e modalidade.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Cidades atendidas (interior de SP)
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {COVERED_CITIES.map((city) => (
              <Link
                key={city.name}
                to={`/plano-hapvida/${slugifyCity(city.name)}`}
                onClick={() => handleCidadeClick(city.name)}
                className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#002b5c] hover:text-[#002b5c]"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#ff8200]" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Coparticipação</h2>

          <div className="mt-8 space-y-3 md:hidden">
            {COPARTICIPACAO.map((row) => (
              <div key={row.item} className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-900">{row.item}</span>
                  <span className="whitespace-nowrap font-black text-[#002b5c]">{row.percentual}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Limite: {row.limite}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th className="px-4 py-3 font-black">Procedimento</th>
                  <th className="px-4 py-3 font-black">Percentual</th>
                  <th className="px-4 py-3 font-black">Limite</th>
                </tr>
              </thead>
              <tbody>
                {COPARTICIPACAO.map((row) => (
                  <tr key={row.item} className="border-b border-slate-100 bg-slate-50 even:bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700">{row.percentual}</td>
                    <td className="px-4 py-3 text-slate-700">{row.limite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={[...TABELA_FAQS, ...EXTENDED_FAQS.filter((item) => item.category === 'Preços e contratação')]}
        title="Perguntas sobre a tabela de preços"
        subtitle="Vigência, carência e documentação para contratar."
      />

      <FinalCTA onOpenForm={handleOpenForm} />

      <ChatInteligente />
      <Footer onOpenForm={onOpenForm} />
    </div>
  );
}
