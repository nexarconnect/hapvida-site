import { useState, useEffect, useMemo } from 'react';
import { Trash2, Eye, MessageCircle } from 'lucide-react';

export default function DashboardLeads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const leadHistory = JSON.parse(localStorage.getItem('leadHistory') || '[]');
    const sorted = leadHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setLeads(sorted);
  }, []);

  const deleteLead = (id) => {
    const confirmed = window.confirm('Deseja realmente excluir este lead?');
    if (!confirmed) return;

    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem('leadHistory', JSON.stringify(updated));
  };

  const getPlanLabel = (lead) => {
    return lead.necessity || lead.planType || 'Não informado';
  };

  const getAgesLabel = (lead) => {
    if (lead.agesPending) return 'Pendente no WhatsApp';
    if (Array.isArray(lead.ages) && lead.ages.length > 0) return lead.ages.join(', ');
    if (lead.age) return lead.age;
    return 'Não informado';
  };

  const getPeopleLabel = (lead) => {
    if (lead.peopleCount) return `${lead.peopleCount} pessoa(s)`;
    return '—';
  };

  const filteredLeads = useMemo(() => {
    if (filter === 'all') return leads;
    return leads.filter((l) => getPlanLabel(l) === filter);
  }, [filter, leads]);

  const totalIndividual = leads.filter((l) => getPlanLabel(l) === 'Plano Individual').length;
  const totalFamiliar = leads.filter((l) => getPlanLabel(l) === 'Plano Familiar').length;
  const totalEmpresarial = leads.filter((l) => getPlanLabel(l) === 'Plano Empresarial').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004b8d] mb-8">
          Dashboard de Leads
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'Plano Individual', 'Plano Familiar', 'Plano Empresarial'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === f
                  ? 'bg-[#004b8d] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#004b8d]'
              }`}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#004b8d] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">WhatsApp</th>
                <th className="px-6 py-4 text-left">Plano</th>
                <th className="px-6 py-4 text-left">Pessoas</th>
                <th className="px-6 py-4 text-left">Idades</th>
                <th className="px-6 py-4 text-left">Data</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, idx) => (
                <tr
                  key={lead.id}
                  className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {lead.name || 'Sem nome'}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <a
                      href={`https://wa.me/${String(lead.phone || '').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {lead.phone || 'Não informado'}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{getPlanLabel(lead)}</td>
                  <td className="px-6 py-4 text-gray-700">{getPeopleLabel(lead)}</td>
                  <td className="px-6 py-4 text-gray-700">{getAgesLabel(lead)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {lead.timestamp
                      ? new Date(lead.timestamp).toLocaleDateString('pt-BR')
                      : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/${String(lead.phone || '').replace(/\D/g, '')}`,
                            '_blank'
                          )
                        }
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        title="Abrir WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Excluir lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Nenhum lead encontrado para este filtro.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-[#004b8d] text-white p-6 rounded-2xl">
            <p className="text-sm opacity-90">Total de Leads</p>
            <p className="text-3xl font-bold">{leads.length}</p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-2xl">
            <p className="text-sm opacity-90">Individuais</p>
            <p className="text-3xl font-bold">{totalIndividual}</p>
          </div>

          <div className="bg-violet-500 text-white p-6 rounded-2xl">
            <p className="text-sm opacity-90">Familiares</p>
            <p className="text-3xl font-bold">{totalFamiliar}</p>
          </div>

          <div className="bg-emerald-500 text-white p-6 rounded-2xl">
            <p className="text-sm opacity-90">Empresariais</p>
            <p className="text-3xl font-bold">{totalEmpresarial}</p>
          </div>
        </div>
      </div>
    </div>
  );
}