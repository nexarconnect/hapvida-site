import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  MessageCircle,
  Zap
} from 'lucide-react';
import { trackCTA } from '../lib/tracking';

function parsePrice(value) {
  if (typeof value === 'number') return value;

  if (typeof value === 'string') {
    const normalized = value.replace(/\./g, '').replace(',', '.');
    const numeric = Number(normalized);
    return Number.isNaN(numeric) ? 0 : numeric;
  }

  return 0;
}

function formatPrice(value) {
  const numeric = parsePrice(value);

  if (numeric <= 0) return 'Sob consulta';

  return numeric.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getPlanName(item, index) {
  return item?.plan_name || item?.name || item?.titulo || `Plano ${index + 1}`;
}

function normalizeName(name) {
  return String(name || '').trim().toLowerCase();
}

function getPlanContent(planName) {
  const normalized = normalizeName(planName);

  if (normalized.includes('mix')) {
    return {
      badge: 'Mais econômico',
      bullets: [
        'Menor valor de entrada',
        'Rede própria Hapvida',
        'Ideal para economizar'
      ]
    };
  }

  if (normalized.includes('nosso plano')) {
    return {
      badge: 'Mais vendido',
      bullets: [
        'Melhor custo-benefício',
        'Boa rede de atendimento',
        'Escolha equilibrada'
      ]
    };
  }

  if (normalized.includes('pleno')) {
    return {
      badge: 'Mais completo',
      bullets: [
        'Cobertura mais robusta',
        'Mais conforto no uso',
        'Ideal para mais segurança'
      ]
    };
  }

  return {
    badge: 'Plano disponível',
    bullets: [
      'Cotação personalizada',
      'Atendimento consultivo',
      'Condição conforme perfil'
    ]
  };
}

function PlanCard({ item, index, onOpenForm, isFeatured, city }) {
  const planName = getPlanName(item, index);
  const price = formatPrice(item?.price);
  const content = getPlanContent(planName);

  const handleSelect = () => {
    trackCTA('selecionar_plano', 'price_table_card', {
      plano: planName,
      preco: item?.price ?? null,
      cidade: city || null,
      destaque: isFeatured
    });

    if (window.fbq) {
      window.fbq('trackCustom', 'SelecionarPlano', {
        plan_name: planName,
        price: item?.price ?? null,
        city: city || null
      });
    }

    if (window.gtag) {
      window.gtag('event', 'select_plan', {
        plan_name: planName,
        value: parsePrice(item?.price),
        currency: 'BRL',
        city: city || null
      });
    }

    if (typeof onOpenForm === 'function') {
      onOpenForm(planName);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`relative flex h-full flex-col rounded-[2rem] border p-6 transition-all hover:-translate-y-1 hover:shadow-2xl ${
        isFeatured
          ? 'border-[#ff8200] bg-white shadow-xl ring-1 ring-[#ff8200]/20'
          : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#ff8200] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
          <Zap size={12} fill="white" />
          Mais procurado
        </div>
      )}

      <div className="mb-5">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#002b5c]">
          {content.badge}
        </div>

        <h3 className="text-2xl font-black text-slate-900">{planName}</h3>
      </div>

      <div className="mb-6 rounded-3xl bg-slate-50 p-5">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          A partir de
        </span>

        <div className="mt-1 flex items-baseline gap-1">
          {price === 'Sob consulta' ? (
            <span className="text-4xl font-black text-[#002b5c] md:text-5xl">
              {price}
            </span>
          ) : (
            <>
              <span className="text-lg font-bold text-slate-700">R$</span>
              <span className="text-5xl font-black tracking-tighter text-[#002b5c] md:text-6xl">
                {price}
              </span>
            </>
          )}
        </div>

        <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
          Valor pode variar por idade e cidade.
        </p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {content.bullets.map((text) => (
          <li
            key={text}
            className="flex items-start gap-3 text-sm font-semibold text-slate-700"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 flex-shrink-0 text-[#ff8200]"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelect}
        className={`w-full rounded-2xl py-5 text-sm font-black uppercase tracking-widest transition-all ${
          isFeatured
            ? 'bg-[#ff8200] text-white hover:bg-[#ff9529]'
            : 'bg-[#002b5c] text-white hover:bg-[#003b7d]'
        }`}
      >
        Solicitar cotação
      </button>
    </motion.div>
  );
}

function LoadingCard() {
  return (
    <div className="h-[460px] animate-pulse rounded-[2rem] bg-slate-100" />
  );
}

export default function PriceTablesSection({
  pricing = [],
  isLoading = false,
  onOpenForm,
  city = ''
}) {
  const finalPricing = useMemo(() => {
    const allowedPlans = ['mix', 'nosso plano', 'pleno'];
    const unique = new Map();

    pricing.forEach((plan) => {
      const rawName = getPlanName(plan, 0);
      const normalized = normalizeName(rawName);

      const isAllowed = allowedPlans.some((allowed) =>
        normalized.includes(allowed)
      );

      if (!isAllowed) return;

      if (!unique.has(normalized)) {
        unique.set(normalized, plan);
      }
    });

    return Array.from(unique.values()).sort(
      (a, b) => parsePrice(a?.price) - parsePrice(b?.price)
    );
  }, [pricing]);

  const title = city
    ? `Compare os planos disponíveis em ${city}`
    : 'Compare os planos disponíveis para o seu perfil';

  const subtitle = city
    ? `Veja os valores iniciais para ${city} e escolha a opção que faz mais sentido para seu momento.`
    : 'Veja os valores iniciais e escolha a opção que faz mais sentido para seu momento.';

  const handleGeneralCTA = () => {
    trackCTA('abrir_formulario', 'price_tables_section_geral', {
      cidade: city || null
    });

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        origin: 'price_tables_section_geral',
        city: city || null
      });
    }

    if (typeof onOpenForm === 'function') {
      onOpenForm('Cotação geral');
    }
  };

  return (
    <section id="precos" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#002b5c]">
            <ShieldCheck size={14} className="text-[#ff8200]" />
            Tabela atualizada 2026
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {subtitle}
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : finalPricing.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {finalPricing.map((item, index) => (
                <PlanCard
                  key={item?.id || `${getPlanName(item, index)}-${index}`}
                  item={item}
                  index={index}
                  isFeatured={index === 1}
                  onOpenForm={onOpenForm}
                  city={city}
                />
              ))}
            </div>

            <div className="mt-16 rounded-[2.5rem] bg-slate-50 p-10 text-center md:p-14">
              <h3 className="text-3xl font-black text-slate-900">
                Quer receber uma indicação mais certeira?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Fale com um consultor e receba uma cotação personalizada com base
                na sua idade, cidade e objetivo de uso.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  Resposta rápida
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  Atendimento humano
                </div>
              </div>

              <button
                onClick={handleGeneralCTA}
                className="mt-10 rounded-2xl bg-[#ff8200] px-10 py-5 text-base font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 hover:bg-[#ff9529]"
              >
                Solicitar minha cotação
              </button>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-50 p-10 text-center">
            <h3 className="text-2xl font-black text-slate-900">
              Não foi possível carregar os planos agora
            </h3>

            <p className="mt-4 text-slate-600">
              Você ainda pode solicitar uma cotação e receber atendimento rápido.
            </p>

            <button
              onClick={handleGeneralCTA}
              className="mt-8 rounded-2xl bg-[#ff8200] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-[#ff9529]"
            >
              Solicitar cotação
            </button>
          </div>
        )}
      </div>
    </section>
  );
}