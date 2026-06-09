import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import CityLogsTable from '../components/admin/CityLogsTable';

function formatDate(value) {
  if (!value) return '-';

  try {
    return new Date(value).toLocaleDateString('pt-BR');
  } catch {
    return '-';
  }
}

export default function DashboardLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setLeads(data || []);
      }

      setLoading(false);
    }

    fetchLeads();
  }, []);

  const summary = useMemo(() => {
    const total = leads.length;

    const today = new Date().toLocaleDateString('pt-BR');
    const todayCount = leads.filter((lead) => {
      if (!lead.created_at) return false;
      return new Date(lead.created_at).toLocaleDateString('pt-BR') === today;
    }).length;

    const withEmail = leads.filter((lead) => !!lead.email).length;

    return {
      total,
      todayCount,
      withEmail
    };
  }, [leads]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-800">
              Gestão de Leads
            </h1>
            <p className="text-sm text-slate-500">
              Visualize seus leads e acompanhe erros de validação de cidade.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total de leads</p>
              <p className="mt-2 text-3xl font-black text-slate-800">
                {summary.total}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Leads hoje</p>
              <p className="mt-2 text-3xl font-black text-green-600">
                {summary.todayCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Com e-mail</p>
              <p className="mt-2 text-3xl font-black text-blue-600">
                {summary.withEmail}
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Leads recebidos
              </h2>
              <p className="text-sm text-slate-500">
                Últimos registros enviados pelo formulário e pelo chat.
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-500">Carregando...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        <th className="p-4 font-semibold text-slate-700">
                          Nome
                        </th>
                        <th className="p-4 font-semibold text-slate-700">
                          WhatsApp
                        </th>
                        <th className="p-4 font-semibold text-slate-700">
                          E-mail
                        </th>
                        <th className="p-4 font-semibold text-slate-700">
                          Cidade
                        </th>
                        <th className="p-4 font-semibold text-slate-700">
                          Data
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-6 text-center text-slate-500"
                          >
                            Nenhum lead encontrado.
                          </td>
                        </tr>
                      ) : (
                        leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="p-4 text-slate-700">
                              {lead.nome || '-'}
                            </td>

                            <td className="p-4 text-slate-700">
                              {lead.whatsapp || '-'}
                            </td>

                            <td className="p-4 text-slate-700">
                              {lead.email || '-'}
                            </td>

                            <td className="p-4 text-slate-700">
                              {lead.cidade || '-'}
                            </td>

                            <td className="p-4 text-sm text-slate-400">
                              {formatDate(lead.created_at)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Logs de erro de cidade
              </h2>
              <p className="text-sm text-slate-500">
                Entradas que o chat não conseguiu validar automaticamente.
              </p>
            </div>

            <CityLogsTable />
          </section>
        </div>
      </main>
    </div>
  );
}