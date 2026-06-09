import React, { useEffect, useMemo, useState } from 'react';

function formatDate(value) {
  if (!value) return '-';

  try {
    return new Date(value).toLocaleString('pt-BR');
  } catch {
    return value;
  }
}

function getErrorLabel(type) {
  switch (type) {
    case 'not_found':
      return 'Cidade não encontrada';
    case 'user_rejected':
      return 'Usuário rejeitou confirmação';
    default:
      return type || '-';
  }
}

function getBadgeClasses(type) {
  switch (type) {
    case 'not_found':
      return 'bg-red-100 text-red-700';
    case 'user_rejected':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export default function CityLogsTable() {
  const [logs, setLogs] = useState([]);

  const loadLogs = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('city_logs') || '[]');
      setLogs(Array.isArray(saved) ? saved.slice().reverse() : []);
    } catch (error) {
      console.error('Erro ao carregar city_logs:', error);
      setLogs([]);
    }
  };

  useEffect(() => {
    loadLogs();

    const handleStorage = (event) => {
      if (event.key === 'city_logs') {
        loadLogs();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const summary = useMemo(() => {
    const total = logs.length;
    const notFound = logs.filter((item) => item.type === 'not_found').length;
    const rejected = logs.filter((item) => item.type === 'user_rejected').length;

    return {
      total,
      notFound,
      rejected
    };
  }, [logs]);

  const clearLogs = () => {
    localStorage.removeItem('city_logs');
    setLogs([]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Logs de erro de cidade
            </h2>
            <p className="text-sm text-slate-500">
              Entradas que a validação automática não conseguiu confirmar.
            </p>
          </div>

          <button
            type="button"
            onClick={clearLogs}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Limpar logs
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total de logs</p>
          <p className="mt-1 text-2xl font-black text-slate-800">
            {summary.total}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Cidade não encontrada</p>
          <p className="mt-1 text-2xl font-black text-red-600">
            {summary.notFound}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Confirmação rejeitada</p>
          <p className="mt-1 text-2xl font-black text-yellow-600">
            {summary.rejected}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-semibold">Entrada</th>
                <th className="px-4 py-3 font-semibold">Erro</th>
                <th className="px-4 py-3 font-semibold">Tentativas</th>
                <th className="px-4 py-3 font-semibold">Origem</th>
                <th className="px-4 py-3 font-semibold">Data</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    Nenhum log encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr
                    key={`${log.timestamp || 'log'}-${index}`}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {log.input || '-'}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(
                          log.type
                        )}`}
                      >
                        {getErrorLabel(log.type)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {log.attempts ?? 0}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {log.source || 'chat'}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {formatDate(log.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}