import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <SEO
        path="/aviso-legal"
        title="Aviso Legal | Tabela Plano Saúde"
        description="Informações sobre a consultoria Nexar, atualização de valores, uso de marca e limitação de responsabilidade na comercialização de planos Hapvida."
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
            <AlertTriangle className="h-8 w-8 text-blue-900" />
            <h1 className="text-3xl font-bold text-slate-900">Aviso Legal</h1>
          </div>

          <p className="text-slate-600">Atualizado em 14 de março de 2026</p>
        </header>

        <section className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 leading-relaxed text-slate-700 shadow-sm">
          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              1. Natureza da Consultoria
            </h2>
            <p>
              Este site é operado pela <strong>Nexar</strong>, uma consultoria
              independente e autorizada para a comercialização de planos de
              saúde <strong>Hapvida</strong>. Não somos o site oficial da
              operadora, mas sim um canal de vendas e suporte comercial.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              2. Atualização de Valores
            </h2>
            <p>
              Os valores mencionados de <strong>R$ 157,29</strong> e demais
              tabelas de preços são estimativas baseadas nas tabelas vigentes e
              podem sofrer alterações sem aviso prévio pela operadora. A
              confirmação final do valor depende da idade, município e perfil de
              contratação.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              3. Marcas e Logotipos
            </h2>
            <p>
              O logotipo e a marca <strong>Hapvida</strong> são de propriedade
              exclusiva da <strong>Hapvida Assistência Médica</strong>. O uso
              neste site tem finalidade meramente informativa e de identificação
              do produto comercializado.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              4. Limitação de Responsabilidade
            </h2>
            <p>
              A Nexar não se responsabiliza por decisões tomadas pelo usuário
              sem a devida consultoria técnica. A contratação de um plano de
              saúde envolve regras de carência e elegibilidade que devem ser
              validadas individualmente com o consultor.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              5. LGPD e Proteção de Dados
            </h2>
            <p>
              Ao preencher nossos formulários, você autoriza o contato de um
              consultor especializado para fins comerciais. Seus dados são
              protegidos conforme a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <p className="mb-1 font-bold text-slate-900">Nexar Connect</p>
            <p>CNPJ: 10.157.791/0001-11</p>
            <p>Razão Social: AR Soluções em Saúde</p>
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#004b8d] text-white font-bold transition-all hover:opacity-90 active:scale-95"
            >
              Entendi e desejo continuar
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}