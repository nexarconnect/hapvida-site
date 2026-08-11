import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Network,
  Award,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Smile,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

import { Navbar, Footer, ChatInteligente } from '../components';
import SEO from '../components/SEO';
import { trackCTA } from '../lib/tracking';
import { openWhatsApp } from '../lib/whatsapp';

const SOURCES = [
  { label: 'Sobre o Grupo', url: 'https://www2.hapvida.com.br/institucional/sobre-o-grupo' },
  { label: 'Nosso Modelo', url: 'https://www2.hapvida.com.br/institucional/nosso-modelo' },
  { label: 'Certificações e Prêmios', url: 'https://www2.hapvida.com.br/certificacoes-e-premios' },
  { label: 'Ética', url: 'https://www2.hapvida.com.br/etica' },
  { label: 'Qualitotal', url: 'https://www2.hapvida.com.br/institucional/qualitotal' },
  {
    label: 'Centro de Pesquisa Clínica Hapvida',
    url: 'https://www2.hapvida.com.br/institucional/centro-de-pesquisa-clinica-hapvida',
  },
  { label: '+odonto', url: 'https://www2.hapvida.com.br/maisodonto' },
];

const SECTIONS = [
  {
    id: 'sobre-o-grupo',
    icon: Building2,
    title: 'Sobre o Grupo Hapvida',
    body: [
      'A Hapvida é o maior ecossistema de saúde da América Latina, com mais de 80 anos de atuação no Brasil e um propósito declarado de cuidar da vida dos brasileiros.',
      'A operadora reúne hoje cerca de 15,9 milhões de beneficiários, atendidos por uma estrutura própria de 86 hospitais, 80 prontos socorros, 365 clínicas e 301 unidades de diagnóstico, além de mais de 28 mil médicos e 20 mil dentistas credenciados. O grupo emprega mais de 73 mil pessoas e conta com uma força de vendas de mais de 22 mil profissionais.',
      'A trajetória da empresa foi construída por meio de aquisições estratégicas, que resultaram numa rede integrada presente nas cinco regiões do país, com prontuário unificado e linhas de cuidado estruturadas para idosos, gestantes, obesidade, diabetes e doenças cardíacas.',
    ],
  },
  {
    id: 'nosso-modelo',
    icon: Network,
    title: 'Nosso Modelo',
    body: [
      'O modelo de negócio da Hapvida é verticalizado: hospitais, prontos atendimentos, clínicas e unidades de diagnóstico fazem parte da própria rede da operadora, hoje somando 85 hospitais, 77 prontos atendimentos, 347 clínicas e 294 unidades de diagnóstico distribuídos pelas cinco regiões do Brasil.',
      'Segundo a operadora, esse sistema integrado permite acompanhar de perto a jornada do paciente do início ao fim, com monitoramento e análise de dados, mantendo o histórico de saúde atualizado e acessível em qualquer unidade.',
      'O modelo se apoia em programas de medicina preventiva, acompanhamento personalizado para grupos prioritários como gestantes, idosos e pacientes crônicos, e recursos digitais como teleconsulta e histórico médico online, buscando unir escala, previsibilidade de custo e qualidade assistencial.',
    ],
  },
  {
    id: 'certificacoes-e-premios',
    icon: Award,
    title: 'Certificações e Prêmios',
    body: [
      'A Hapvida possui certificação NBR ISO 9001:2015, emitida pela Fundação Carlos Alberto Vanzolini, para o Sistema de Gestão da Qualidade das áreas de Ouvidoria, Regulatório e Telessaúde.',
      'Ao longo dos anos, a marca foi reconhecida em pesquisas como Top of Mind Anuário do Ceará (1º lugar em 2024, 2023, 2022 e 2020) e Marcas que eu Gosto, da Folha de Pernambuco, como plano de saúde preferido dos pernambucanos por 11 anos consecutivos (2019 a 2024). Também recebeu o Top of Mind iMarketing em Manaus e reconhecimento pelo Benchmarketing Saúde Bahia.',
      'Entre os prêmios individuais concedidos a executivos e profissionais do grupo estão o ASVB Personalidade de Vendas do Ano (2020), o CONAREC de Melhor Profissional de Relacionamento (2021) e o Health IT de Profissional Destaque de Tecnologia da Saúde (2021).',
    ],
  },
  {
    id: 'etica',
    icon: ShieldCheck,
    title: 'Ética e Compliance',
    body: [
      'A Hapvida mantém um departamento de Integridade e Compliance dedicado a promover conduta ética em toda a operação, com base em transparência, integridade, diversidade e respeito nas relações com todos os públicos.',
      'O Programa de Integridade e Compliance da operadora se apoia em oito pilares: comunicação contínua, educação e cultura, engajamento da liderança, prevenção e correção de desvios, análise de risco de terceiros, monitoramento contínuo, avaliação de conflito de interesses e atualização de políticas internas.',
      'Denúncias de conduta antiética podem ser feitas de forma confidencial e anônima pelo Canal Sentinela, administrado por empresa especializada independente, no site www.hapvida.com.br/canaldedenuncias ou pelo telefone 0800 591 5126.',
    ],
  },
  {
    id: 'qualitotal',
    icon: Stethoscope,
    title: 'Qualitotal',
    body: [
      'O Qualitotal é um programa de qualidade assistencial criado pela Lifeplace Hapvida em 2019, aplicável a qualquer instituição de saúde, com foco em padronização de processos, segurança do paciente e excelência no atendimento.',
      'O programa funciona por ciclos de auditoria que avaliam continuamente a qualidade do cuidado prestado, com duas certificações progressivas: Qualitotal Gold, para os padrões básicos, e Qualitotal Platinum, para excelência avançada em gestão e melhoria contínua.',
      'Em 2024, o manual do Qualitotal foi reconhecido pela ISQua (International Society for Quality in Health Care), e a Lifeplace Hapvida se tornou membro institucional da entidade para o biênio 2025-2026.',
    ],
  },
  {
    id: 'centro-de-pesquisa-clinica',
    icon: FlaskConical,
    title: 'Centro de Pesquisa Clínica Hapvida',
    body: [
      'O Centro de Pesquisa Clínica Hapvida é uma instituição dedicada à condução de estudos científicos sobre novos medicamentos, tratamentos e tecnologias em saúde, com o propósito declarado de oferecer pesquisa de excelência e saúde ao alcance de todos os brasileiros.',
      'A instituição atua em cinco frentes: captação de estudos clínicos junto à indústria farmacêutica global (Brasil, Estados Unidos, Europa e Ásia), recrutamento de voluntários em todo o país, condução operacional dos estudos com conformidade regulatória, análise de dados do mundo real (RWE) e parcerias com centros de pesquisa nacionais e internacionais.',
      'O centro fica na Rua São Vicente de Paulo, 463, Santa Cecília, São Paulo (SP), CEP 01229-010, e pode ser contatado pelo telefone (11) 3566-2832.',
    ],
  },
  {
    id: 'mais-odonto',
    icon: Smile,
    title: '+odonto',
    body: [
      'O Hapvida +odonto é o plano odontológico da Hapvida NotreDame Intermédica, com opções individuais, familiares e empresariais em todo o Brasil. Os planos pessoais partem de R$ 39,90 por mês e os planos empresariais, com contratação online, partem de R$ 18,61 por mês.',
      'A rede tem mais de 20 mil dentistas credenciados, com atendimento de urgência odontológica e central de atendimento disponíveis 24 horas por dia.',
      'Entre os recursos oferecidos estão cadastro por biometria facial na primeira consulta, aplicativo próprio para agendamento e gestão da conta, agendamento online, além do Clube de Vantagens, com mais de 300 parceiros com descontos em energia, farmácias, varejo e viagens, e a plataforma Cuidaê para compra de medicamentos e produtos de saúde.',
    ],
  },
];

export default function SobreOGrupoHapvida({ onOpenForm }) {
  const handleFormClick = () => {
    trackCTA('solicitar_cotacao', 'sobre_o_grupo_hero');
    onOpenForm();
  };

  const handleWhatsAppClick = () => {
    trackCTA('whatsapp_click', 'sobre_o_grupo_hero');
    openWhatsApp({ placement: 'sobre_o_grupo_hero' });
  };

  const title = 'Sobre o Grupo Hapvida: Institucional, Modelo e Certificações';
  const description =
    'Conheça o Grupo Hapvida: história, modelo de rede própria, certificações e prêmios, ética e compliance, Qualitotal, Centro de Pesquisa Clínica e o plano odontológico +odonto.';

  return (
    <div>
      <SEO path="/sobre-o-grupo-hapvida" title={title} description={description} />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <Building2 className="h-4 w-4 text-[#ff8200]" />
          Institucional Hapvida
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          Sobre o Grupo Hapvida
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          O maior ecossistema de saúde da América Latina, com rede própria, programas de qualidade
          assistencial e mais de 80 anos de atuação no Brasil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={handleFormClick}
            className="rounded-2xl bg-[#ff8200] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#e67600] active:scale-95"
          >
            Solicitar cotação gratuita
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

      <nav className="border-b border-slate-100 bg-white px-6 py-4">
        <div className="container mx-auto flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="transition hover:text-[#002b5c]"
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      {SECTIONS.map((section, index) => {
        const Icon = section.icon;
        return (
          <section
            key={section.id}
            id={section.id}
            className={index % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-slate-50 py-16 md:py-20'}
          >
            <div className="container mx-auto max-w-4xl px-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#002b5c]">
                  <Icon className="h-5 w-5 text-[#ff8200]" />
                </span>
                <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">{section.title}</h2>
              </div>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-4 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        );
      })}

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Fontes e autoria</h2>
          <p className="mt-4 text-slate-600">
            As informações desta página foram retiradas do site institucional oficial do Grupo
            Hapvida, cuja autoria original pertence à Hapvida Assistência Médica S.A. Consulte as
            páginas originais abaixo:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SOURCES.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#002b5c] underline decoration-slate-300 underline-offset-4 hover:decoration-[#002b5c]"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Esta página é publicada pela NexAR, corretora autorizada Hapvida, com finalidade
            informativa. Para dados atualizados diretamente na fonte, visite{' '}
            <a
              href="https://www2.hapvida.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline"
            >
              www2.hapvida.com.br
            </a>
            . Saiba mais sobre a{' '}
            <Link to="/sobre-nos" className="font-bold text-[#002b5c] underline">
              NexAR
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[#002b5c] py-16 text-center text-white md:py-20">
        <div className="container mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Quer contratar um plano Hapvida?
          </h2>
          <p className="mt-4 text-blue-100">
            Cotação gratuita, com retorno em menos de um minuto pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleFormClick}
              className="rounded-2xl bg-[#ff8200] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#e67600] active:scale-95"
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
