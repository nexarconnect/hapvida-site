import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkCategorySection from '../components/NetworkCategorySection';

export default function RedeClinicas() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        path="/rede-nacional/clinicas-por-capital"
        title="Clínicas Hapvida por Capital | Nexar"
        description="Hapclínicas, centros clínicos, laboratórios e diagnóstico da rede própria Hapvida nas capitais atendidas pela Nexar fora do interior de SP."
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Rede de Atendimento', path: '/rede-de-atendimento' },
          { name: 'Rede por Estado', path: '/rede-nacional' },
          { name: 'Clínicas por Capital', path: '/rede-nacional/clinicas-por-capital' },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 pt-12">
        <Link
          to="/rede-nacional"
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Rede por Estado
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <Stethoscope className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Clínicas Hapvida por Capital</h1>
        </div>
        <p className="mb-10 text-sm text-slate-500">
          Hapclínicas, centros clínicos, laboratórios e unidades de diagnóstico da rede própria
          Hapvida nas capitais atendidas. Confirme a disponibilidade com um consultor.
        </p>

        <div className="pb-16">
          <NetworkCategorySection tags={['Clínica', 'Diagnóstico', 'Laboratório']} />
        </div>
      </div>
    </main>
  );
}
