import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, X, Loader2 } from 'lucide-react';
import { slugifyCity } from '../data/coveredCities';
import { detectCityByGPS, dismissCityBanner } from '../hooks/useCityDetection';
import { trackCTA } from '../lib/tracking';

export default function CityDetectBanner({ onDismiss }) {
  const [status, setStatus] = useState('idle'); // idle | loading | not-found
  const navigate = useNavigate();

  const handleClick = async () => {
    setStatus('loading');
    trackCTA('city_detect_click', 'home_banner', {});

    const city = await detectCityByGPS();

    if (city) {
      trackCTA('city_detect_success', 'home_banner', { cidade: city.name });
      navigate(`/plano-hapvida/${slugifyCity(city.name)}`);
    } else {
      trackCTA('city_detect_not_found', 'home_banner', {});
      setStatus('not-found');
    }
  };

  const handleDismiss = () => {
    dismissCityBanner();
    onDismiss?.();
  };

  return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 bg-[#ff8200]/10 px-4 py-2.5 text-center text-sm">
      <MapPin className="h-4 w-4 flex-shrink-0 text-[#ff8200]" />

      {status === 'not-found' ? (
        <span className="font-semibold text-[#002b5c]">
          Não conseguimos identificar sua cidade entre as atendidas — veja a lista completa mais abaixo.
        </span>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 font-semibold text-[#002b5c] underline decoration-[#ff8200] decoration-2 underline-offset-2 hover:text-[#003b7d] disabled:opacity-60"
        >
          {status === 'loading' && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {status === 'loading' ? 'Localizando...' : 'Ver preço e rede da minha cidade'}
        </button>
      )}

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Fechar aviso"
        className="ml-1 rounded-full p-1 text-[#002b5c]/50 hover:bg-[#002b5c]/10 hover:text-[#002b5c]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
