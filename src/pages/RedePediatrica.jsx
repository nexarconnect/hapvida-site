import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkCategorySection from '../components/NetworkCategorySection';

export default function RedePediatrica() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        path="/rede-nacional/rede-pediatrica"
        title="Rede Pediátrica Hapvida | Hospitais e Maternidades | Nexar"
        description="Hospitais, maternidades e unidades com atendimento pediátrico da rede própria e credenciada Hapvida, nos estados atendidos pela Nexar fora do interior de SP."
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Rede de Atendimento', path: '/rede-de-atendimento' },
          { name: 'Rede por Estado', path: '/rede-nacional' },
          { name: 'Rede Pediátrica', path: '/rede-nacional/rede-pediatrica' },
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
          <Baby className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-slate-900">Rede Pediátrica Hapvida</h1>
        </div>
        <p className="mb-10 text-sm text-slate-500">
          Hospitais, maternidades e unidades com atendimento pediátrico da rede própria e
          credenciada Hapvida. Confirme a disponibilidade com um consultor antes de precisar do
          atendimento.
        </p>

        <div className="pb-16">
          <NetworkCategorySection tags={['Pediátrica', 'Maternidade']} />
        </div>
      </div>
    </main>
  );
}
