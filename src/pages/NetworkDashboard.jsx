import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function NetworkDashboard() {
  const [units, setUnits] = useState([]);

  const loadUnits = async () => {
    const { data } = await supabase
      .from('network_units')
      .select('*')
      .order('city', { ascending: true });
    setUnits(data || []);
  };

  useEffect(() => {
    loadUnits();

    // Escuta mudanças no banco em tempo real
    const channel = supabase
      .channel('network-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'network_units' }, loadUnits)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Rede Sincronizada ({units.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit, i) => (
          <div key={i} className="p-4 border border-slate-100 rounded-2xl">
            <h3 className="font-bold text-blue-600">{unit.name}</h3>
            <p className="text-sm text-slate-500">{unit.address}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{unit.city}</span>
          </div>
        ))}
      </div>
    </div>
  );
}