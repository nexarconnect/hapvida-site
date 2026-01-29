import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const FormModal = ({ isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: '',
    whatsapp: '',
    cidade: '',
    tipo_plano: 'Nosso Plano',
    numero_pessoas: 1,
    idades: [''],
  });

  // Update ages array when number of people changes
  useEffect(() => {
    const count = parseInt(formData.numero_pessoas) || 1;
    setFormData(prev => {
      const currentAges = [...prev.idades];
      if (count > currentAges.length) {
        // Add more fields
        return {
          ...prev,
          idades: [...currentAges, ...Array(count - currentAges.length).fill('')]
        };
      } else if (count < currentAges.length) {
        // Remove fields
        return {
          ...prev,
          idades: currentAges.slice(0, count)
        };
      }
      return prev;
    });
  }, [formData.numero_pessoas]);

  const handleAgeChange = (index, value) => {
    const newAges = [...formData.idades];
    newAges[index] = value;
    setFormData({ ...formData, idades: newAges });
  };

  const validateForm = () => {
    if (!formData.nome_completo.trim()) return "Nome completo é obrigatório";
    if (!formData.whatsapp.trim()) return "WhatsApp é obrigatório";
    if (formData.whatsapp.length < 10) return "WhatsApp inválido"; // Basic check
    if (!formData.cidade.trim()) return "Cidade é obrigatória";
    if (formData.idades.some(age => !age)) return "Por favor, preencha todas as idades";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast({
        title: "Erro na validação",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const submissionData = {
      ...formData,
      idades: JSON.stringify(formData.idades), // Store as JSON string or comma separated
      created_at: new Date().toISOString()
    };

    try {
      if (isSupabaseConfigured()) {
        const { error: supabaseError } = await supabase
          .from('leads')
          .insert([submissionData]);

        if (supabaseError) throw supabaseError;
      } else {
        // Fallback to local storage
        console.log('Supabase not configured. Saving to localStorage.');
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        const newLead = { ...submissionData, id: crypto.randomUUID() };
        localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast({
        title: "Sucesso!",
        description: "Seus dados foram enviados.",
      });

      onSuccess(formData.nome_completo);
      onClose();
      // Reset form
      setFormData({
        nome_completo: '',
        whatsapp: '',
        cidade: '',
        tipo_plano: 'Nosso Plano',
        numero_pessoas: 1,
        idades: [''],
      });
    } catch (err) {
      console.error('Submission error:', err);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-full flex items-center justify-center w-full py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[var(--hapvida-blue)] p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">Solicitar Cotação</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--hapvida-blue)] focus:border-transparent outline-none transition-all"
                      placeholder="Seu nome completo"
                      value={formData.nome_completo}
                      onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
                    />
                  </div>

                  {/* Grid for WhatsApp and City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--hapvida-blue)] focus:border-transparent outline-none transition-all"
                        placeholder="(DDD) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--hapvida-blue)] focus:border-transparent outline-none transition-all"
                        placeholder="Sua cidade"
                        value={formData.cidade}
                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Plan Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Plano</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--hapvida-blue)] focus:border-transparent outline-none transition-all bg-white"
                      value={formData.tipo_plano}
                      onChange={(e) => setFormData({ ...formData, tipo_plano: e.target.value })}
                    >
                      <option value="Nosso Plano">Nosso Plano (Rede Própria)</option>
                      <option value="Plano Mix">Plano Mix (Rede Própria + Credenciada)</option>
                      <option value="Pleno">Pleno (Cobertura Premium)</option>
                    </select>
                  </div>

                  {/* Number of People */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de pessoas</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, numero_pessoas: Math.max(1, prev.numero_pessoas - 1) }))}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-[var(--hapvida-blue)]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        className="w-20 text-center font-bold text-lg border-none focus:ring-0"
                        value={formData.numero_pessoas}
                        onChange={(e) => setFormData({ ...formData, numero_pessoas: Math.max(1, parseInt(e.target.value) || 1) })}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, numero_pessoas: prev.numero_pessoas + 1 }))}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-[var(--hapvida-blue)]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Ages */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Idades dos beneficiários</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.idades.map((age, index) => (
                        <div key={index}>
                          <input
                            type="number"
                            placeholder={`Idade ${index + 1}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--hapvida-blue)] focus:border-transparent outline-none text-sm"
                            value={age}
                            onChange={(e) => handleAgeChange(index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-6 text-lg font-bold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      style={{ backgroundColor: 'var(--hapvida-orange)' }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'VER PREÇOS AGORA'
                      )}
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Ao enviar, você concorda com nossos termos de privacidade.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;