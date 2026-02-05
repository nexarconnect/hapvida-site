import React, { useEffect, useMemo, useState } from 'react';
import { supabase, isSupabaseConfigured, normalizeCityUF } from '../lib/supabase';

// =====================
// Helpers
// =====================
const haversineKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
};

const findNearestCoveredCity = (userLat, userLon, coveredCities) => {
  if (!coveredCities?.length) return null;

  let best = null;
  let bestDist = Infinity;

  for (const c of coveredCities) {
    // ✅ ignora cidades sem coordenadas válidas
    const lat = Number(c?.lat);
    const lon = Number(c?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;

    const d = haversineKm(userLat, userLon, lat, lon);
    if (!Number.isFinite(d)) continue;

    if (d < bestDist) {
      bestDist = d;
      best = { ...c, lat, lon, distanceKm: d };
    }
  }

  return best; // {city, uf, lat, lon, label, distanceKm}
};

const reverseGeocodeCityUF = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&zoom=10&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error('reverse geocode failed');
    const json = await res.json();

    const addr = json?.address || {};
    const city =
      addr.city ||
      addr.town ||
      addr.municipality ||
      addr.village ||
      addr.county ||
      '';
    const uf = addr.state_code || '';

    return { city, uf };
  } catch {
    return { city: '', uf: '' };
  }
};

// =====================
// Component
// =====================
export default function PriceTablesSection() {
  const [loading, setLoading] = useState(true);
  const [autoCityStatus, setAutoCityStatus] = useState('idle'); // idle | detected | failed

  // cities: [{city, uf, lat, lon, label}]
  const [cities, setCities] = useState([]);

  // selectedKey = "Cidade__UF"
  const [selectedKey, setSelectedKey] = useState('');

  const selectedCityObj = useMemo(() => {
    const [city = '', uf = ''] = (selectedKey || '').split('__');
    return { city, uf };
  }, [selectedKey]);

  const [priceData, setPriceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCities = async () => {
    try {
      if (!isSupabaseConfigured()) {
        const mock = [
          {
            city: 'São Paulo',
            uf: 'SP',
            lat: -23.55052,
            lon: -46.633308,
            label: 'São Paulo(SP)',
          },
        ];
        setCities(mock);
        return mock;
      }

      const { data, error } = await supabase
        .from('covered_cities')
        .select('city, uf, lat, lon')
        .eq('active', true)
        .order('city');

      if (error) throw error;

      const map = new Map();
      (data || []).forEach((row) => {
        const { city: cityN, uf: ufN } = normalizeCityUF(row.city, row.uf);
        const key = `${cityN}__${ufN}`;

        if (!map.has(key)) {
          map.set(key, {
            city: cityN,
            uf: ufN,
            lat: row.lat,
            lon: row.lon,
            label: ufN ? `${cityN}(${ufN})` : cityN,
          });
        }
      });

      const uniqueCities = Array.from(map.values());

      console.log('[CITIES] (covered) amostra:', uniqueCities.slice(0, 10));
      setCities(uniqueCities);

      return uniqueCities;
    } catch (err) {
      console.error('Error fetching covered cities:', err);
      setCities([]);
      return [];
    }
  };

  const fetchPriceData = async (city, uf) => {
    try {
      setErrorMessage('');

      if (!isSupabaseConfigured()) {
        setPriceData([]);
        return [];
      }

      const { city: cityN, uf: ufN } = normalizeCityUF(city, uf);

      const { data, error } = await supabase
        .from('price_tables')
        .select('*')
        .eq('city', cityN)
        .eq('uf', ufN);

      if (error) {
        console.error('Erro ao buscar preços:', error);
        setErrorMessage('Erro ao buscar preços. Tente novamente.');
        setPriceData([]);
        return [];
      }

      setPriceData(data || []);
      return data || [];
    } catch (err) {
      console.error('Erro inesperado:', err);
      setErrorMessage('Erro inesperado. Tente novamente.');
      setPriceData([]);
      return [];
    }
  };

  const handleCityChange = async (newKey) => {
    setSelectedKey(newKey);

    const [city = '', uf = ''] = (newKey || '').split('__');
    setLoading(true);
    await fetchPriceData(city, uf);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);

      const availableCities = await fetchCities();

      // ✅ fallback: primeira cidade com coordenadas válidas
      const firstWithCoords = (availableCities || []).find((c) => {
        const lat = Number(c?.lat);
        const lon = Number(c?.lon);
        return Number.isFinite(lat) && Number.isFinite(lon);
      });

      const hardFallbackKey = firstWithCoords
        ? `${firstWithCoords.city}__${firstWithCoords.uf}`
        : (availableCities?.[0]
            ? `${availableCities[0].city}__${availableCities[0].uf}`
            : 'São Paulo__SP');

      if (mounted) setSelectedKey(hardFallbackKey);

      if (!navigator.geolocation) {
        if (mounted) {
          console.log('[GPS] navegador sem geolocation');
          setAutoCityStatus('failed');
          const [city, uf] = hardFallbackKey.split('__');
          await fetchPriceData(city, uf);
          setLoading(false);
        }
        return;
      }

      console.log('[GPS] isSecureContext:', window.isSecureContext);
      console.log('[GPS] geolocation disponível?', !!navigator.geolocation);

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          console.log('[GPS] coords:', { userLat, userLon });

          try {
            const { city, uf } = await reverseGeocodeCityUF(userLat, userLon);
            console.log('[GPS] detectado (reverse):', { city, uf });

            const nearest = findNearestCoveredCity(userLat, userLon, availableCities);

            console.log(
              '[COVERED] mais proxima:',
              nearest
                ? {
                    city: nearest.city,
                    uf: nearest.uf,
                    distanceKm: Number(nearest.distanceKm.toFixed(1)),
                  }
                : null
            );

            const finalKey = nearest ? `${nearest.city}__${nearest.uf}` : hardFallbackKey;

            if (!mounted) return;

            setSelectedKey(finalKey);
            setAutoCityStatus(nearest ? 'detected' : 'failed');

            const [finalCity, finalUf] = finalKey.split('__');
            await fetchPriceData(finalCity, finalUf);
          } catch (e) {
            console.error('[GPS] erro no fluxo:', e);

            if (!mounted) return;

            setAutoCityStatus('failed');
            setSelectedKey(hardFallbackKey);

            const [city, uf] = hardFallbackKey.split('__');
            await fetchPriceData(city, uf);
          } finally {
            if (mounted) setLoading(false);
          }
        },
        async (err) => {
          console.error('[GPS] getCurrentPosition ERROR:', err);

          if (!mounted) return;

          setAutoCityStatus('failed');
          setSelectedKey(hardFallbackKey);

          const [city, uf] = hardFallbackKey.split('__');
          await fetchPriceData(city, uf);

          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 }
      );
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="tabela-de-precos" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tabela de Preços</h2>
          <p className="text-gray-600 mt-2">
            Selecione uma cidade atendida. Se a localização estiver habilitada, escolhemos a cidade
            atendida mais próxima automaticamente.
          </p>

          {autoCityStatus === 'detected' && (
            <p className="text-sm text-gray-500 mt-2">Localização aplicada automaticamente.</p>
          )}
          {autoCityStatus === 'failed' && (
            <p className="text-sm text-gray-500 mt-2">
              Não foi possível detectar sua localização. Selecione uma cidade.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade atendida</label>
          <select
            value={selectedKey}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold focus:outline-none focus:border-[var(--hapvida-blue)] transition-all"
          >
            {cities.length > 0 ? (
              cities.map((c) => (
                <option key={`${c.city}-${c.uf}`} value={`${c.city}__${c.uf}`}>
                  {c.label}
                </option>
              ))
            ) : (
              <option value="São Paulo__SP">São Paulo(SP)</option>
            )}
          </select>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <div className="py-10 text-gray-600">Carregando...</div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Faixa etária</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Amb. Total</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Amb. Parcial</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Enferm. Total</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Enferm. Parcial</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">PJ</th>
                </tr>
              </thead>
              <tbody>
                {priceData?.length ? (
                  priceData.map((row) => (
                    <tr key={`${row.city}-${row.uf}-${row.age_range}`} className="border-t">
                      <td className="px-4 py-3 text-gray-900">{row.age_range}</td>
                      <td className="px-4 py-3 text-gray-700">{row.ambulatorial_total}</td>
                      <td className="px-4 py-3 text-gray-700">{row.ambulatorial_partial}</td>
                      <td className="px-4 py-3 text-gray-700">{row.enfermaria_total}</td>
                      <td className="px-4 py-3 text-gray-700">{row.enfermaria_partial}</td>
                      <td className="px-4 py-3 text-gray-700">{row.pj_value}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t">
                    <td className="px-4 py-6 text-gray-600" colSpan={6}>
                      Nenhuma tabela de preço encontrada para essa cidade.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}