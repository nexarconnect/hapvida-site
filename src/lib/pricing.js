import { supabase } from './supabase';

export async function getPricingData() {
  try {
    const { data, error } = await supabase.from('pricing_table').select('*');
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Erro ao buscar preços:', err);
    return [];
  }
}

export function calculateLowestPrices(rows) {
  const pricesByPlan = {};
  let absoluteMin = 75.70;

  rows.forEach(row => {
    const price = parseFloat(row.price);
    if (!pricesByPlan[row.plan_name] || price < pricesByPlan[row.plan_name]) {
      pricesByPlan[row.plan_name] = price;
    }
    if (price < absoluteMin) absoluteMin = price;
  });

  return { pricesByPlan, absoluteMin };
}

export const formatBRL = (val) => 
  new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);