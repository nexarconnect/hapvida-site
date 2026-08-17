import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function PoliticasPrivacidade() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <SEO
        path="/politicas-privacidade"
        title="Política de Privacidade | Tabela Plano Saúde"
        description="Como a Nexar coleta, usa e protege seus dados pessoais ao solicitar uma cotação do plano de saúde Hapvida, conforme a LGPD."
        noindex
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Política de Privacidade', path: '/politicas-privacidade' },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-10">
          <Link
            to="/"
            className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Home
          </Link>

          <div className="mb-2 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-blue-900" />
            <h1 className="text-3xl font-bold text-slate-900">
              Privacidade e Segurança
            </h1>
          </div>

          <p className="text-slate-600">Atualizado em 14 de março de 2026</p>
        </header>

        <section className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 leading-relaxed text-slate-700 shadow-sm">
          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              1. Transparência Nexar
            </h2>
            <p>
              A Nexar é uma plataforma especializada em planos de saúde{" "}
              <strong>Hapvida</strong>. Coletamos seus dados exclusivamente para
              facilitar sua cotação e conectar você a um consultor autorizado.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              2. Quais dados coletamos?
            </h2>
            <p>Para gerar sua cotação personalizada, solicitamos:</p>

            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>
                <strong>Identificação:</strong> Nome completo para o registro da
                proposta.
              </li>
              <li>
                <strong>Contato:</strong> WhatsApp para envio da tabela de
                preços.
              </li>
              <li>
                <strong>Perfil:</strong> Cidade, número de vidas e idades,
                essenciais para o cálculo da mensalidade.
              </li>
              <li>
                <strong>Navegação:</strong> Localização aproximada (IP) para
                validar a rede de atendimento na sua região.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              3. Uso de Tecnologias (Cookies)
            </h2>
            <p>
              Utilizamos <strong>Google Analytics 4</strong> e{" "}
              <strong>Meta Pixel</strong> para medir o desempenho do site e
              garantir que nossos anúncios cheguem às pessoas certas. Esses
              dados são processados de forma segura e nos ajudam a melhorar sua
              experiência.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              4. Com quem compartilhamos?
            </h2>
            <p>
              Seus dados são compartilhados <strong>apenas</strong> com
              consultores oficiais da Hapvida responsáveis pelo seu atendimento.
              Não vendemos bases de dados para terceiros.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              5. Seus Direitos (LGPD)
            </h2>
            <p>
              Você tem total controle sobre seus dados. A qualquer momento, pode
              solicitar a correção ou exclusão definitiva das suas informações
              enviando um e-mail para{" "}
              <strong>contato@nexarconnect.com.br</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-1 text-sm font-medium text-slate-900">
              Dúvidas sobre seus dados?
            </p>
            <p className="text-sm">WhatsApp: (11) 93289-4067</p>
          </div>
        </section>
      </div>
    </main>
  );
}