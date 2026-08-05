// ... imports e configs iniciais mantidos

const geocodeCity = async (city, uf) => {
  try {
    const query = `${city}, ${uf}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    // CRÍTICO: Nominatim EXIGE um User-Agent identificável para evitar bloqueio 403
    const response = await fetch(url, {
      headers: { 'User-Agent': 'HapvidaGeocodeApp/1.0 (contato@suaagencia.com.br)' }
    });

    if (!response.ok) throw new Error(`Erro API: ${response.status}`);

    const data = await response.json();
    return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
  } catch (error) {
    console.error(`❌ Falha em ${city}:`, error.message);
    return null;
  }
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
      // Log de progresso para controle de volume
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