import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Award,
  Building2,
  Users2,
  Mail,
  Phone,
} from 'lucide-react';

import { getPricingData } from '../lib/supabase';
import { Navbar, PriceTablesSection, Footer, ChatInteligente } from '../components';
import FAQSection from '../components/FAQ';
import SEO from '../components/SEO';
import { trackCTA } from '../lib/tracking';
import { openWhatsApp } from '../lib/whatsapp';
import { COVERED_CITIES } from '../data/coveredCities';

const FAQ_ITEMS = [
  {
    question: 'O plano Hapvida cobre cidades do interior de São Paulo?',
    answer:
      'Sim. A Hapvida NDI atua no interior de São Paulo com rede própria e credenciada, incluindo Bauru, Ribeirão Preto, Franca, Marília, São Carlos, Araraquara, Lins, Piracicaba, Sertãozinho, Limeira, Barretos, Pirassununga e São José dos Campos. O tipo de rede disponível varia por cidade, por isso a NexAR confirma o que está disponível antes de indicar qualquer plano.',
  },
  {
    question: 'Quanto custa o plano Hapvida no interior de SP?',
    answer:
      'O valor final varia conforme a faixa etária, a modalidade e a cidade. A cotação com o valor exato para a sua região é gratuita e sai em menos de um minuto pelo WhatsApp.',
  },
  {
    question: 'Qual a diferença entre os planos Mix, Nosso Plano e Pleno?',
    answer:
      'O Mix é a opção com menor mensalidade, pela rede própria e credenciada Hapvida. O Nosso Plano tem o melhor custo-benefício do portfólio, também com rede própria e credenciada. O Pleno oferece a cobertura mais completa e mais conforto no uso. Os três estão disponíveis nas modalidades individual, familiar, MEI e empresarial.',
  },
  {
    question: 'Posso contratar o plano Hapvida sendo MEI?',
    answer:
      'Sim. MEI com CNPJ ativo pode contratar o plano empresarial Hapvida, que costuma ter condições diferentes do plano individual, inclusive em relação à carência. A NexAR compara as duas modalidades antes de qualquer indicação.',
  },
  {
    question: 'O plano Hapvida tem carência?',
    answer:
      'Sim, com prazos que variam conforme o tipo de atendimento: urgências e emergências têm cobertura em até 24 horas, consultas e exames simples em 30 dias, internações e cirurgias em 180 dias, e doenças preexistentes podem levar até 24 meses. A carência pode ser reduzida por portabilidade de outro plano ou por contratação empresarial.',
  },
  {
    question: 'Qual a diferença entre contratar direto na Hapvida e por uma corretora autorizada?',
    answer:
      'O valor do plano é o mesmo nos dois casos. A diferença é o atendimento: ao contratar pela NexAR, você tem um consultor que confirma a rede disponível na sua cidade, compara os planos para o seu perfil e continua disponível depois da contratação. O custo da consultoria é pago pela Hapvida via comissão, sem acréscimo para o cliente.',
  },
  {
    question: 'A NexAR atende fora do interior de São Paulo?',
    answer:
      'O atendimento presencial e com maior especialização é focado no interior paulista. Para cidades de outros estados onde a Hapvida NDI opera, o atendimento acontece de forma remota, pelo WhatsApp.',
  },
];

export default function SobreNos({ onOpenForm }) {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getPricingData();
        if (mounted) setPricing(data);
      } catch (error) {
        console.error('Erro ao carregar preços:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleFormClick = () => {
    trackCTA('solicitar_cotacao', 'sobre_nos_hero');
    onOpenForm();
  };

  const handleWhatsAppClick = () => {
    trackCTA('whatsapp_click', 'sobre_nos_hero');
    openWhatsApp({ placement: 'sobre_nos_hero' });
  };

  const title = 'NexAR: Corretora Hapvida Autorizada no Interior de SP';
  const description =
    'Consultoria autorizada Hapvida com foco no interior de São Paulo. Cotação gratuita, atendimento por consultor real e suporte antes e depois da contratação.';

  return (
    <div>
      <SEO
        path="/sobre-nos"
        title={title}
        description={description}
        faqItems={FAQ_ITEMS}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Sobre Nós', path: '/sobre-nos' },
        ]}
      />
      <Navbar />

      <header className="bg-[#002b5c] px-6 py-16 text-center text-white md:py-20">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
          <Award className="h-4 w-4 text-[#ff8200]" />
          Consultoria Autorizada Hapvida
        </div>
        <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          NexAR: Consultoria Autorizada Hapvida no Interior de São Paulo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          A NexAR é uma consultoria autorizada especializada em planos de saúde Hapvida para quem
          mora no interior de São Paulo, com mais de 22 anos de experiência no mercado de seguros
          e saúde suplementar.
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

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Por que escolher a NexAR para contratar o plano Hapvida
          </h2>
          <p className="mt-4 text-slate-600">
            Contratar pelo site da operadora parece simples, mas quem já tentou sabe: é fácil
            escolher um plano que não cobre a cidade que você precisa, que tem carência maior do
            que o necessário, ou que custa mais por causa da faixa etária.
          </p>
          <p className="mt-4 text-slate-600">
            A NexAR existe para resolver esse problema. Antes de indicar qualquer plano, o
            consultor confirma a rede disponível na sua cidade, as opções de carência e qual
            modalidade faz mais sentido para o seu perfil. A cotação é gratuita e o atendimento é
            feito por uma pessoa real, não por robô.
          </p>
          <p className="mt-4 text-slate-600">
            Na prática, você não paga nada a mais por contratar com a NexAR. A consultoria é
            remunerada pela Hapvida via comissão, sem custo adicional para o cliente.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-black text-slate-900">+22 anos de experiência</h3>
              <p className="mt-2 text-sm text-slate-500">
                Atuação no mercado de seguros e saúde suplementar.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <MapPin size={22} />
              </div>
              <h3 className="font-black text-slate-900">Foco no interior de SP</h3>
              <p className="mt-2 text-sm text-slate-500">
                Atendimento prioritário nas principais cidades da região.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c]">
                <Users2 size={22} />
              </div>
              <h3 className="font-black text-slate-900">Consultor real</h3>
              <p className="mt-2 text-sm text-slate-500">
                Sem bot e sem script genérico em nenhuma etapa do atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Corretora autorizada Hapvida com foco no interior paulista
          </h2>
          <p className="mt-4 text-slate-600">
            A NexAR é representante comercial autorizada da Hapvida Assistência Médica S.A. (ANS
            nº 368.253) e trabalha com o portfólio completo da operadora disponível para São
            Paulo, nas modalidades individual, familiar, MEI e empresarial.
          </p>
          <p className="mt-4 text-slate-600">
            A NexAR é corretora autorizada, não é a operadora. A cobertura assistencial e o
            atendimento médico são de responsabilidade exclusiva da Hapvida Assistência Médica
            S.A.
          </p>

          {/* PLACEHOLDER — NÃO RENDERIZADO NO SITE (aviso só para quem edita o código).
              Substituir pelos dados reais do responsável antes de publicar essa seção
              (nome completo, cargo, tempo de atuação e uma foto real, não stock). Até
              lá, o bloco fica oculto para não expor "[NOME COMPLETO]" a visitantes. */}
        </div>
      </section>

      {loading ? (
        <div className="py-24 text-center text-slate-400">Carregando preços...</div>
      ) : (
        <PriceTablesSection pricing={pricing} onOpenForm={onOpenForm} />
      )}

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">Onde a NexAR atende</h2>
          <p className="mt-4 text-slate-600">
            Nossa atuação é focada no interior de São Paulo, com atendimento presencial e online
            nas seguintes cidades:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {COVERED_CITIES.map((city) => (
              <span
                key={city.name}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700"
              >
                {city.name}, {city.state}
              </span>
            ))}
          </div>
          <p className="mt-6 text-slate-600">
            Para cidades de outros estados onde a Hapvida NDI opera, o atendimento é feito de
            forma remota, pelo WhatsApp. Veja o detalhe da{' '}
            <Link to="/rede-de-atendimento" className="font-bold text-[#002b5c] underline">
              rede de atendimento por cidade
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-black text-[#002b5c] md:text-3xl">
            Como funciona a contratação
          </h2>
          <p className="mt-4 text-slate-600">
            Você solicita a cotação pelo site ou pelo WhatsApp. Um consultor entra em contato,
            confirma a rede disponível na sua cidade, apresenta as opções dentro do seu orçamento e
            responde qualquer dúvida antes de você assinar qualquer coisa.
          </p>
          <p className="mt-4 text-slate-600">
            A assinatura é digital e o cartão do plano chega por e-mail. O consultor continua
            disponível para dúvidas sobre carência, uso da rede e qualquer situação que apareça
            depois da contratação.
          </p>
          <p className="mt-4 text-slate-600">
            Conheça também os{' '}
            <Link to="/tipos-de-planos" className="font-bold text-[#002b5c] underline">
              tipos de plano disponíveis
            </Link>{' '}
            ou veja os{' '}
            <Link to="/planos-hapvida-por-cidade" className="font-bold text-[#002b5c] underline">
              planos por cidade
            </Link>
            .
          </p>
        </div>
      </section>

      <FAQSection
        faqs={FAQ_ITEMS}
        title="Dúvidas frequentes sobre o plano Hapvida no interior de SP"
        subtitle="Cobertura, preço, MEI, carência e a diferença entre contratar direto ou por corretora."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-black text-[#002b5c] md:text-3xl">
            Informações da empresa
          </h2>
          <div className="mt-8 grid gap-6 rounded-3xl border border-slate-100 bg-slate-50 p-8 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <div>
                <p className="font-black text-slate-900">AR Soluções em Saúde e Promoção de Vendas LTDA</p>
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
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <a
                href="https://wa.me/5511932894067"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-700 hover:text-[#002b5c]"
              >
                (11) 93289-4067
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff8200]" />
              <a
                href="mailto:contato@nexarconnect.com.br"
                className="text-sm font-bold text-slate-700 hover:text-[#002b5c]"
              >
                contato@nexarconnect.com.br
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            A NexAR é representante comercial autorizada da Hapvida Assistência Médica S.A. e atua
            como intermediária na comercialização de planos de saúde. A NexAR não é a operadora
            Hapvida. A contratação, a cobertura assistencial e o atendimento médico são de
            responsabilidade exclusiva da operadora. A NexAR é remunerada via comissões pagas pela
            Hapvida, sem custo adicional para o contratante.
          </p>
        </div>
      </section>

      <section className="bg-[#002b5c] py-16 text-center text-white md:py-20">
        <div className="container mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Pronto para encontrar o plano certo para você?
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
