import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Loader2,
  User,
  Phone,
  MapPin,
  FileText,
  Users,
  Cake,
  Lock,
  CheckCircle,
  ExternalLink,
  Search,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { CITIES } from '@/lib/cities';
import { generateWhatsAppURL, DEFAULT_WHATSAPP_MESSAGE, NEXAR_WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { tracking } from '@/lib/tracking';

const FormModal = ({ isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Estados para modal de sucesso e redirect
  const [successOpen, setSuccessOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [whatsUrl, setWhatsUrl] = useState('');
  
  // Estados para autocomplete
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Dados do formulário
  const [formData, setFormData] = useState({
    nome_completo: '',
    whatsapp: '',
    cidade: '',
    tipo_plano: '',
    numero_pessoas: 1,
    idades: [''],
    preferencia: '',
    idades_pendentes: false,
  });

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtra cidades para autocomplete
  const filteredCities = searchTerm.length > 0
    ? CITIES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    : CITIES.slice(0, 10); // Mostra Bauru + região (10 primeiras) quando vazio

  // Seleciona cidade
  const handleSelectCity = (city) => {
    setFormData({ ...formData, cidade: city });
    setSearchTerm(city);
    setShowDropdown(false);
  };

  // Sincroniza idades com número de pessoas
  useEffect(() => {
    if (formData.idades_pendentes) return;

    const count = Math.max(1, parseInt(formData.numero_pessoas) || 1);
    setFormData(prev => {
      const currentAges = [...prev.idades];
      if (count > currentAges.length) {
        return { ...prev, idades: [...currentAges, ...Array(count - currentAges.length).fill('')] };
      } else if (count < currentAges.length) {
        return { ...prev, idades: currentAges.slice(0, count) };
      }
      return prev;
    });
  }, [formData.numero_pessoas, formData.idades_pendentes]);

  // Atualiza idade específica
  const handleAgeChange = (index, value) => {
    const newAges = [...formData.idades];
    newAges[index] = value;
    setFormData({ ...formData, idades: newAges });
  };

  // Toggle para idades pendentes
  const toggleIdadesPendentes = () => {
    setFormData(prev => ({
      ...prev,
      idades_pendentes: !prev.idades_pendentes,
      idades: !prev.idades_pendentes ? [] : [''],
    }));
  };

  // Countdown para redirect
  useEffect(() => {
    if (!successOpen || countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
    
    // Quando chegar a 0, abre WhatsApp
    if (countdown === 1) {
      const newWindow = window.open(whatsUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // Fallback se popup for bloqueado
        window.location.href = whatsUrl;
      }
    }
    
    return () => clearInterval(timer);
  }, [successOpen, countdown, whatsUrl]);

  // Função para formatar WhatsApp em tempo real: (00) 00000-0000
  const formatWhatsApp = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 11);
    if (v.length <= 2) return v;
    if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  };

  // Validação Rigorosa (ajustada para idades opcionais)
  const validateForm = () => {
    const cleanPhone = String(formData.whatsapp).replace(/\D/g, '');
    const nameParts = formData.nome_completo.trim().split(/\s+/);

    if (nameParts.length < 2) return "Por favor, insira nome e sobrenome.";

    if (cleanPhone.length !== 11) return "WhatsApp inválido. Use DDD + 9 dígitos (11 números).";

    // Bloqueia número óbvio de teste (ex: 11111111111)
    if (/^(\d)\1+$/.test(cleanPhone)) return "Por favor, insira um número de WhatsApp válido.";

    // Bloqueia DDD inválido (00, 01 etc.) – regra simples (pode ajustar)
    const ddd = parseInt(cleanPhone.slice(0, 2), 10);
    if (ddd < 11 || ddd > 99) return "DDD inválido.";

    if (!(formData.cidade || searchTerm)) return "Selecione uma cidade da lista.";

    if (!formData.tipo_plano) return "Selecione o tipo de plano.";

    // Validação de idades só se não estiver pendente
    if (!formData.idades_pendentes) {
      const invalidAge = formData.idades.some(age => {
        const n = parseInt(age, 10);
        return Number.isNaN(n) || n < 0 || n > 120;
      });
      if (invalidAge) return "Verifique as idades (devem estar entre 0 e 120 anos).";
    }

    return null;
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast({ title: "Erro na validação", description: error, variant: "destructive" });
      return;
    }

    setLoading(true);
    
    // Usa cidade selecionada ou digitada
    const finalCity = formData.cidade || searchTerm;
    
    const submissionData = {
      ...formData,
      cidade: finalCity,
      idades: formData.idades_pendentes ? 'PENDENTE' : JSON.stringify(formData.idades),
      preferencia: formData.preferencia || 'Tanto faz (me mostre opções)',
      created_at: new Date().toISOString()
    };

    try {
      // Salva no Supabase ou localStorage
      if (isSupabaseConfigured()) {
        const { error: supabaseError } = await supabase
          .from('leads')
          .insert([submissionData]);
        
        if (supabaseError) throw supabaseError;
      } else {
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        const newLead = { ...submissionData, id: crypto.randomUUID() };
        localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
        await new Promise(resolve => setTimeout(resolve, 700));
      }

      // Tracking
      tracking.leadSubmit({ lead_source: 'form_modal', value: 0 });

      // Prepara mensagem para WhatsApp
      const tipo = formData.tipo_plano === 'empresarial' ? 'Empresarial' : 'Individual/Familiar';
      const ages = formData.idades_pendentes
        ? 'PENDENTE (confirmo no WhatsApp)'
        : formData.idades.filter(Boolean).join(', ');

      const details = [
        `Nome: ${formData.nome_completo}`,
        `WhatsApp: ${formData.whatsapp}`,
        `Cidade: ${finalCity}`,
        `Tipo: ${tipo}`,
        `Nº pessoas: ${formData.numero_pessoas}`,
        `Idades: ${ages}`,
      ].join('\n');

      const preferenciaText = formData.preferencia || 'Tanto faz (me mostre opções)';

      const message = `${DEFAULT_WHATSAPP_MESSAGE}\n\n*Dados para cotação:*\n${details}\n\n*Preferência:*\n• ${preferenciaText}`;
      const url = generateWhatsAppURL(NEXAR_WHATSAPP_NUMBER, message);
      
      setWhatsUrl(url);
      setSuccessOpen(true);
      
      onSuccess?.(formData.nome_completo);
      onClose();
      
      // Reseta formulário
      setFormData({
        nome_completo: '',
        whatsapp: '',
        cidade: '',
        tipo_plano: '',
        numero_pessoas: 1,
        idades: [''],
        preferencia: '',
        idades_pendentes: false,
      });
      setSearchTerm('');
      
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
    <>
      {/* MODAL DO FORMULÁRIO */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={onClose}
          >
            <div className="min-h-full flex items-center justify-center w-full py-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header com gatilhos */}
                <div className="bg-[#004a8e] p-6 text-white text-center relative">
                  <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  <h2 className="text-xl font-bold mb-1">Plano de saúde Hapvida 2026</h2>
                  <div className="text-2xl font-black mb-1">
                    Valores a partir de <span className="text-[#ff7f00]">R$ 75,70</span>
                  </div>
                  <p className="text-sm opacity-95">
                    Receba as <span className="text-[#ff7f00] font-bold underline">PROMOÇÕES</span> ao preencher o formulário
                  </p>
                  <p className="text-xs mt-1">
                    (cotação em <span className="font-bold text-[#ff7f00]">menos de 1 minuto</span>)
                  </p>
                  <p className="text-xs mt-2 opacity-90">
                    Validamos disponibilidade e valores para seu município
                  </p>
                </div>

                {/* Formulário */}
                <div className="p-6 max-h-[75vh] overflow-y-auto">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome Completo */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          required
                          type="text"
                          placeholder="Digite seu nome completo"
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                            formData.nome_completo && formData.nome_completo.trim().split(/\s+/).length < 2 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200'
                          }`}
                          value={formData.nome_completo}
                          onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          required
                          type="tel"
                          placeholder="(00) 00000-0000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004a8e] outline-none transition-all"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })}
                        />
                      </div>
                    </div>

                    {/* Cidade com Autocomplete */}
                    <div className="space-y-1" ref={dropdownRef}>
                      <label className="text-sm font-bold text-gray-700">Cidade</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          required
                          type="text"
                          placeholder="Sua cidade"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004a8e] outline-none transition-all"
                          value={searchTerm}
                          onFocus={() => setShowDropdown(true)}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setFormData({ ...formData, cidade: '' });
                            setShowDropdown(true);
                          }}
                        />
                        
                        {/* Dropdown de sugestões */}
                        <AnimatePresence>
                          {showDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
                            >
                              {filteredCities.map((city) => (
                                <div
                                  key={city}
                                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0 transition-colors"
                                  onClick={() => handleSelectCity(city)}
                                >
                                  {city}
                                </div>
                              ))}
                              
                              {/* Opção "Não encontrei minha cidade" */}
                              <div
                                className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-bold text-[#ff7f00] border-t border-gray-100"
                                onClick={() => handleSelectCity(searchTerm || "Outra cidade")}
                              >
                                Não encontrei minha cidade: "{searchTerm || '...'}"
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Tipo de Plano */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Tipo de Plano</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004a8e] outline-none bg-white transition-all"
                          value={formData.tipo_plano}
                          onChange={(e) => setFormData({ ...formData, tipo_plano: e.target.value })}
                        >
                          <option value="">Selecione</option>
                          <option value="individual">Individual/Familiar</option>
                          <option value="empresarial">Empresarial</option>
                        </select>
                      </div>
                    </div>

                    {/* Nº de Pessoas e Idades */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Nº de Pessoas</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            required
                            type="number"
                            min="1"
                            max="20"
                            placeholder="Ex: 2"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004a8e] outline-none"
                            value={formData.numero_pessoas}
                            onChange={(e) => setFormData({ ...formData, numero_pessoas: Math.max(1, parseInt(e.target.value) || 1) })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Idades</label>
                        {!formData.idades_pendentes ? (
                          <div className="grid grid-cols-2 gap-2">
                            {formData.idades.map((age, index) => (
                              <div key={index} className="relative">
                                <Cake className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                  required
                                  type="number"
                                  min="0"
                                  max="120"
                                  placeholder={`Idade ${index + 1}`}
                                  className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#004a8e] outline-none"
                                  value={age}
                                  onChange={(e) => handleAgeChange(index, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600 italic">
                            Idades: PENDENTE (confirmo no WhatsApp)
                          </div>
                        )}
                        
                        {/* Toggle para idades opcionais */}
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="idades_pendentes"
                            checked={formData.idades_pendentes}
                            onChange={toggleIdadesPendentes}
                            className="w-4 h-4 text-[#004a8e] bg-gray-100 border-gray-300 rounded focus:ring-[#004a8e] focus:ring-2"
                          />
                          <label htmlFor="idades_pendentes" className="text-sm text-gray-600 cursor-pointer">
                            Não sei as idades agora (preencher depois)
                          </label>
                        </div>
                        <div className="text-xs text-gray-500">
                          Sem problema. O consultor confirma com você no WhatsApp.
                        </div>
                      </div>
                    </div>

                    {/* Mini-passo Preferência (opcional) */}
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-[#004a8e]" />
                        <label className="text-sm font-bold text-gray-700">Suas preferências (opcional)</label>
                      </div>
                      <p className="text-xs text-gray-600">Assim o consultor já te envia as melhores opções pra você.</p>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">O que é mais importante pra você?</label>
                        <div className="space-y-2">
                          {[
                            { value: 'Menor preço', label: 'Menor preço' },
                            { value: 'Melhor custo-benefício', label: 'Melhor custo-benefício' },
                            { value: 'Melhor cobertura', label: 'Melhor cobertura' },
                            { value: 'Tanto faz (me mostre opções)', label: 'Tanto faz (me mostre opções)' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="preferencia"
                                value={option.value}
                                checked={formData.preferencia === option.value}
                                onChange={(e) => setFormData({ ...formData, preferencia: e.target.value })}
                                className="w-4 h-4 text-[#004a8e] bg-gray-100 border-gray-300 focus:ring-[#004a8e] focus:ring-2"
                              />
                              <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Você pode mudar isso depois no WhatsApp.</p>
                      </div>
                    </div>

                    {/* Botão Submit */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={loading || formData.nome_completo.length < 5 || formData.whatsapp.length < 14}
                        className="w-full py-7 text-xl font-black text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-[#ff7f00] hover:bg-[#e67300]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'SOLICITAR COTAÇÃO'
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
                        <Lock className="h-3 w-3" />
                        <span>Fique tranquilo, seus dados estão seguros.</span>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE SUCESSO */}
      <AnimatePresence>
        {successOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSuccessOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#004a8e] p-6 text-white relative">
                <button
                  onClick={() => setSuccessOpen(false)}
                  className="absolute right-4 top-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="bg-white/15 rounded-full p-2">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Formulário enviado com sucesso!</h3>
                    <p className="text-sm opacity-95">
                      Você receberá sua cotação com um consultor em instantes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 text-center space-y-4">
                <div className="text-sm text-gray-700">
                  Redirecionando para o WhatsApp em{' '}
                  <span className="font-bold text-[#ff7f00]">{Math.max(0, countdown)}</span> segundos...
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    const newWindow = window.open(whatsUrl, '_blank', 'noopener,noreferrer');
                    if (!newWindow) window.location.href = whatsUrl;
                  }}
                  className="w-full py-6 text-lg font-black text-white rounded-2xl bg-[#25D366] hover:bg-[#1fb85a] flex items-center justify-center gap-2"
                >
                  ABRIR WHATSAPP AGORA <ExternalLink className="h-5 w-5" />
                </Button>

                <div className="text-xs text-gray-500">
                  Se não abrir automaticamente, clique no botão acima.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormModal;