/**
 * geocodeCoveredCities.mjs
 * Preenche lat/lon das cidades atendidas (public.covered_cities) usando o
 * Nominatim (OpenStreetMap). Roda manualmente, server-side, com service_role
 * (mesmo padrão de scripts/sync-prices.js) — não depende de policy pública
 * de UPDATE na tabela.
 *
 * Uso:
 *   node scripts/geocodeCoveredCities.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_service_role;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('As variáveis VITE_SUPABASE_URL e SUPABASE_service_role são obrigatórias (defina-as no ambiente antes de rodar o script).');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const geocodeCity = async (city, uf) => {
  try {
    const query = `${city}, ${uf}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    // CRÍTICO: Nominatim EXIGE um User-Agent identificável para evitar bloqueio 403
    const response = await fetch(url, {
      headers: { 'User-Agent': 'HapvidaGeocodeApp/1.0 (nexarconnect@gmail.com)' },
    });

    if (!response.ok) throw new Error(`Erro API: ${response.status}`);

    const data = await response.json();
    return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
  } catch (error) {
    console.error(`❌ Falha em ${city}:`, error.message);
    return null;
  }
};

const updateCityCoordinates = async (id, lat, lon) => {
  const { error } = await supabase
    .from('covered_cities')
    .update({ lat, lon })
    .eq('id', id);

  if (error) console.error(`❌ Erro ao gravar cidade id=${id}:`, error.message);
};

const main = async () => {
  try {
    console.log('🚀 Iniciando geocodificação...');

    const { data: cities, error } = await supabase
      .from('covered_cities')
      .select('id, city, uf')
      .or('lat.is.null,lon.is.null')
      .eq('active', true);

    if (error) throw error;
    if (!cities?.length) return console.log('✅ Tudo atualizado.');

    console.log(`📍 ${cities.length} cidades pendentes.`);

    for (let i = 0; i < cities.length; i++) {
      const { id, city, uf } = cities[i];
      console.log(`[${i + 1}/${cities.length}] Processando: ${city}-${uf}`);

      const coords = await geocodeCity(city, uf);
      if (coords) {
        await updateCityCoordinates(id, coords.lat, coords.lon);
      }

      await delay(1000); // Mantém 1s para evitar banimento de IP
    }

    console.log('🏁 Processo concluído.');
  } catch (error) {
    console.error('💥 Erro fatal:', error.message);
  }
};

main();
