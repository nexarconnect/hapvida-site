import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Mock data for fallback
const MOCK_PRICES = [
  { age_range: '0-18 anos', ambulatorial_total: 64.35, ambulatorial_partial: 89.50, enfermaria_total: 120.00, enfermaria_partial: 145.00, pj_value: 95.00 },
  { age_range: '19-23 anos', ambulatorial_total: 98.50, ambulatorial_partial: 125.00, enfermaria_total: 180.00, enfermaria_partial: 220.00, pj_value: 145.00 },
  { age_range: '24-28 anos', ambulatorial_total: 125.00, ambulatorial_partial: 165.00, enfermaria_total: 240.00, enfermaria_partial: 290.00, pj_value: 185.00 },
  { age_range: '29-33 anos', ambulatorial_total: 145.00, ambulatorial_partial: 195.00, enfermaria_total: 280.00, enfermaria_partial: 340.00, pj_value: 220.00 },
  { age_range: '34-38 anos', ambulatorial_total: 175.00, ambulatorial_partial: 235.00, enfermaria_total: 340.00, enfermaria_partial: 410.00, pj_value: 270.00 },
  { age_range: '39-43 anos', ambulatorial_total: 215.00, ambulatorial_partial: 285.00, enfermaria_total: 420.00, enfermaria_partial: 510.00, pj_value: 335.00 },
  { age_range: '44-48 anos', ambulatorial_total: 265.00, ambulatorial_partial: 355.00, enfermaria_total: 520.00, enfermaria_partial: 630.00, pj_value: 415.00 },
  { age_range: '49-53 anos', ambulatorial_total: 335.00, ambulatorial_partial: 445.00, enfermaria_total: 660.00, enfermaria_partial: 800.00, pj_value: 525.00 },
  { age_range: '54-58 anos', ambulatorial_total: 425.00, ambulatorial_partial: 565.00, enfermaria_total: 840.00, enfermaria_partial: 1020.00, pj_value: 665.00 },
  { age_range: '59+ anos', ambulatorial_total: 545.00, ambulatorial_partial: 725.00, enfermaria_total: 1080.00, enfermaria_partial: 1310.00, pj_value: 855.00 },
];

const MOCK_CITIES = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 
  'Salvador', 'Fortaleza', 'Recife', 'Porto Alegre', 'Curitiba'
];

const PriceTablesSection = () => {
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState('São Paulo');
  const [cities, setCities] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
    fetchPriceData('São Paulo');
  }, []);

  const fetchCities = async () => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('price_tables')
          .select('city')
          .order('city');

        if (error) throw error;
        const uniqueCities = [...new Set(data.map(item => item.city))];
        setCities(uniqueCities);
      } else {
        // Fallback to mock cities
        setCities(MOCK_CITIES);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      // Fallback on error
      setCities(MOCK_CITIES);
    }
  };

  const fetchPriceData = async (city) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('price_tables')
          .select('*')
          .eq('city', city)
          .order('age_range');

        if (error) throw error;
        setPriceData(data || []);
      } else {
        // Fallback to mock data
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setPriceData(MOCK_PRICES);
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
      // Fallback on error
      setPriceData(MOCK_PRICES);
      toast({
        title: "Aviso",
        description: "Exibindo dados de exemplo (modo offline).",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    fetchPriceData(city);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section id="precos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--hapvida-blue)' }}>
            Tabela de Preços
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Confira os valores dos planos Hapvida para sua cidade
          </p>

          <div className="max-w-md mx-auto">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold focus:outline-none focus:border-[var(--hapvida-blue)] transition-all"
            >
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))
              ) : (
                <option value="São Paulo">São Paulo</option>
              )}
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--hapvida-blue)' }}></div>
              <p className="mt-4 text-gray-600">Carregando preços...</p>
            </div>
          ) : priceData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: 'var(--hapvida-blue)' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">Faixa Etária</th>
                    <th className="px-6 py-4 text-right text-white font-bold">Ambulatorial Total</th>
                    <th className="px-6 py-4 text-right text-white font-bold">Ambulatorial Parcial</th>
                    <th className="px-6 py-4 text-right text-white font-bold">Enfermaria Total</th>
                    <th className="px-6 py-4 text-right text-white font-bold">Enfermaria Parcial</th>
                    <th className="px-6 py-4 text-right text-white font-bold">PJ</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.age_range}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(row.ambulatorial_total)}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(row.ambulatorial_partial)}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(row.enfermaria_total)}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(row.enfermaria_partial)}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(row.pj_value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-600">
              Nenhum dado de preço disponível para esta cidade.
            </div>
          )}

          <div className="px-6 py-4 bg-yellow-50 border-t-2 border-yellow-200">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Atenção:</strong> Tabelas atualizadas frequentemente. Consulte um consultor para valores atuais e condições especiais.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceTablesSection;
