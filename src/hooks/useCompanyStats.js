import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useCompanyStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from('company_stats')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setStats(data || []);
      } catch (err) {
        console.error('Erro ao buscar stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading };
}