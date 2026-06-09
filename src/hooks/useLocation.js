import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [city, setCity] = useState(() => localStorage.getItem('detected_city') || 'sua região');
  const [loading, setLoading] = useState(!localStorage.getItem('detected_city'));

  useEffect(() => {
    if (localStorage.getItem('detected_city')) {
      setLoading(false);
      return;
    }

    const fetchLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Falha na API');
        
        const data = await response.json();
        
        if (data.city) {
          setCity(data.city);
          localStorage.setItem('detected_city', data.city);
        }
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        // Mantém "sua região" como fallback
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { city, loading };
};