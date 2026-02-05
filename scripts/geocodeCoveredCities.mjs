import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: './.env.local' }); // corrigido para ./ (da raiz)

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidos no .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const geocodeCity = async (city, uf) => {
  try {
    // usa cidade + UF + Brasil pra mais precisão
    const query = `${city}, ${uf}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na API Nominatim: ${response.status}`);
    }

    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } else {
      throw new Error(`Nenhuma coordenada encontrada para: ${query}`);
    }
  } catch (error) {
    console.error(`Erro ao geocodificar ${city}, ${uf}:`, error.message);
    return null;
  }
};

const updateCityCoordinates = async (cityId, lat, lon) => {
  try {
    const { error } = await supabase
      .from('covered_cities')
      .update({ lat, lon })
      .eq('id', cityId);

    if (error) {
      throw new Error(`Erro no update do banco: ${error.message}`);
    }

    console.log(`[OK] Cidade/UF (id=${cityId}) -> lat=${lat}, lon=${lon}`);
  } catch (error) {
    console.error(`Erro ao atualizar id=${cityId}:`, error.message);
  }
};

const main = async () => {
  try {
    console.log('Iniciando geocodificação...');

    const { data: cities, error } = await supabase
      .from('covered_cities')
      .select('id, city, uf')
      .or('lat.is.null,lon.is.null')
      .eq('active', true);

    if (error) {
      throw new Error(`Erro na query do banco: ${error.message}`);
    }

    if (!cities || cities.length === 0) {
      console.log('Nenhuma cidade precisa de geocodificação.');
      return;
    }

    console.log(`Encontradas ${cities.length} cidades para geocodificar.`);

    for (const city of cities) {
      console.log(`Geocodificando: ${city.city}, ${city.uf} (id=${city.id})`);

      const coords = await geocodeCity(city.city, city.uf);
      if (coords) {
        await updateCityCoordinates(city.id, coords.lat, coords.lon);
      } else {
        console.log(`Pulando update para id=${city.id} (falha na geocodificação).`);
      }

      // rate limiting: 1 segundo entre requests
      await delay(1000);
    }

    console.log('Geocodificação concluída.');
  } catch (error) {
    console.error('Erro no processo principal:', error.message);
  }
};

main();