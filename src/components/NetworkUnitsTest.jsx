import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function NetworkUnitsTest() {
  const [units, setUnits] = useState([]);
  const [status, setStatus] = useState('Carregando...');

  async function loadUnits() {
    if (!supabase) {
      setStatus('Supabase não configurado.');
      return;
    }

    const { data, error } = await supabase
      .from('network_units')
      .select('id, name, address, city, specialties, is_active')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      setStatus(`Erro: ${error.message}`);
      return;
    }

    setUnits(data || []);
    setStatus(`Total de unidades: ${data?.length || 0}`);
  }

  useEffect(() => {
    loadUnits();

    if (!supabase) return;

    const channel = supabase
      .channel('network-units-test')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network_units'
        },
        () => {
          loadUnits();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Teste de Unidades</h2>
      <p className="mb-4 text-sm text-gray-600">{status}</p>

      <div className="grid gap-4">
        {units.map((unit) => (
          <div key={unit.id} className="border rounded-xl p-4">
            <h3 className="font-semibold">{unit.name}</h3>
            <p>{unit.address}</p>
            <p>{unit.city}</p>
            <p className="text-sm text-gray-600">{unit.specialties}</p>
          </div>
        ))}
      </div>
    </div>
  );
}