import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import NetworkSection from "../components/NetworkSection";
import SEO from "../components/SEO";

export default function RedeAtendimento() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        path="/rede-de-atendimento"
        title="Rede de Atendimento Hapvida 2026 | Hospitais e Clínicas"
        description="Consulte hospitais, clínicas e prontos-atendimentos da rede própria e credenciada Hapvida na sua região."
      />

      <div className="container mx-auto max-w-6xl px-4 pt-12">
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Rede de Atendimento</h1>
        </div>
      </div>

      <NetworkSection />
    </main>
  );
}
