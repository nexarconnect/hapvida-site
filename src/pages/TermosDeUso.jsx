import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <SEO
        path="/termos-de-uso"
        title="Termos de Uso | Tabela Plano Saúde"
        description="Termos e condições de uso do site Tabela Plano Saúde, operado pela Nexar para comercialização de planos Hapvida."
        noindex
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Termos de Uso', path: '/termos-de-uso' },
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
            <FileText className="h-8 w-8 text-blue-900" />
            <h1 className="text-3xl font-bold text-slate-900">Termos de Uso</h1>
          </div>

          <p className="text-slate-600">Atualizado em 14 de março de 2026</p>
        </header>

        <section className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 leading-relaxed text-slate-700 shadow-sm">
          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              1. Sobre a Nexar
            </h2>
            <p>
              A Nexar atua na captação e atendimento de interessados em planos de
              saúde <strong>Hapvida</strong>, conectando o usuário a consultores
              autorizados para análise de perfil e cotação.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              2. Finalidade do Site
            </h2>
            <p>
              Este site coleta dados para solicitação de cotação e facilita o
              contato entre o usuário e consultores. O uso da plataforma não
              garante contratação automática ou disponibilidade universal dos
              produtos apresentados.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              3. Responsabilidade do Usuário
            </h2>
            <p>
              O usuário é responsável pela veracidade e integridade das
              informações fornecidas. Dados incorretos podem comprometer a
              precisão da cotação e a continuidade do atendimento.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              4. Valores e Disponibilidade
            </h2>
            <p>
              Valores, carências e rede credenciada podem variar conforme o
              município, idade e perfil de contratação. As informações finais
              devem ser confirmadas com o consultor no momento do atendimento.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              5. Atendimento via WhatsApp
            </h2>
            <p>
              Ao solicitar uma cotação, o usuário poderá ser redirecionado para
              atendimento via <strong>WhatsApp</strong> para validar informações
              e receber as opções compatíveis com seu perfil.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              6. Propriedade Intelectual
            </h2>
            <p>
              Os textos, elementos visuais e a estrutura desta página são
              protegidos. A reprodução ou modificação sem autorização prévia não
              é permitida.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h2 className="mb-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
              Contato e Suporte
            </h2>
            <p className="text-sm">
              WhatsApp: <strong>(14) 99123-5094</strong>
              <br />
              E-mail: <strong>nexarconnect@gmail.com</strong>
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#004b8d] text-white font-bold transition-all hover:opacity-90 active:scale-95"
            >
              Voltar para a Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}