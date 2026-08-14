import { useEffect, useState } from 'react';
import { getNetworkUnits } from '../lib/supabase';

// A tabela network_units tem linhas duplicadas para a mesma unidade (mesmo
// nome + endereço) em algumas cidades — dedup defensivo aqui até a
// duplicidade ser limpa na fonte.
function dedupeUnits(units) {
  const seen = new Set();
  return (units || []).filter((unit) => {
    const key = `${unit.name}|${unit.address}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Busca única de unidades de rede por cidade, com dedup — usado por
// NetworkSection, RedeAtendimento (acordeão) e PlanoPorCidade, que antes
// faziam essa mesma busca de forma independente e inconsistente (só o
// acordeão deduplicava).
export function useNetworkUnits(city, { lazy = false } = {}) {
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(!lazy);

  useEffect(() => {
    if (lazy || !city) return;
    let mounted = true;
    setLoading(true);
    getNetworkUnits(city).then((data) => {
      if (mounted) {
        setUnits(dedupeUnits(data));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [city, lazy]);

  const load = async () => {
    if (!city) return;
    setLoading(true);
    const data = await getNetworkUnits(city);
    setUnits(dedupeUnits(data));
    setLoading(false);
  };

  return { units, loading, load };
}
