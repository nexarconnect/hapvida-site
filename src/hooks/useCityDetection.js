import { useState } from 'react';
import { getCityBySlug, getNearestCoveredCity, slugifyCity } from '../data/coveredCities';

function readCityFromQuery() {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get('cidade') || params.get('city');
  if (!raw) return null;

  return getCityBySlug(slugifyCity(raw));
}

/**
 * Cidade indicada por parâmetro explícito na URL (?cidade=bauru ou
 * ?city=bauru) — sinal de maior confiança porque é a própria campanha
 * dizendo a cidade, sem precisar de permissão nenhuma do visitante.
 * Lê de forma síncrona (lazy initializer) pra já vir pronto na primeira
 * renderização — sem isso, o redirect só aconteceria depois de um efeito,
 * dando um flash da Home antes de ir pra página da cidade.
 */
export function useCityFromQuery() {
  const [city] = useState(readCityFromQuery);
  return city;
}

/**
 * Pede a localização do navegador e resolve pra cidade coberta mais
 * próxima (ou null). SÓ chamar isso a partir de um clique do usuário —
 * pedir permissão de geolocalização sozinho ao carregar a página é uma
 * prática ruim (a maioria nega/ignora sem nem entender por quê, e alguns
 * navegadores nem exibem o prompt fora de um gesto do usuário).
 */
export function detectCityByGPS() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(getNearestCoveredCity(position.coords.latitude, position.coords.longitude));
      },
      () => resolve(null),
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
  });
}

/**
 * Mesma coisa, mas só resolve a localização se a permissão de
 * geolocalização já tiver sido concedida antes (em outra visita, ou por já
 * ter clicado no banner) — nunca dispara o prompt sozinho. Dá pra chamar
 * direto ao montar um componente, sem esperar clique nenhum.
 */
export async function detectCityIfAlreadyGranted() {
  if (!navigator.geolocation || !navigator.permissions?.query) return null;

  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    if (status.state !== 'granted') return null;
    return await detectCityByGPS();
  } catch {
    return null;
  }
}
