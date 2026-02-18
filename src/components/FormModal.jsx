import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Loader2, User, Phone, MapPin, FileText, Users, 
  Cake, Lock, CheckCircle, ExternalLink, Heart, ChevronDown 
} from 'lucide-react';

// --- DADOS E CONFIG ---
const CITIES = ["Bauru", "Agudos", "Pederneiras", "Lençóis Paulista", "Piratininga", "Jaú", "Marília", "Botucatu", "Avaré", "Lins"];
const NEXAR_WHATSAPP_NUMBER = "5514991235094"; // Seu número

const FormModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [whatsUrl, setWhatsUrl] = useState('');
  
  // Autocomplete
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cidade: '',
    plano: '',
    vidas: 1,
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

  // Sincroniza idades com número de pessoas
  useEffect(() => {
    if (formData.idades_pendentes) return;
    const count = Math.max(1, parseInt(formData.vidas) || 1);
    
    setFormData(prev => {
      const currentAges = [...prev.idades];
      if (count > currentAges.length) {
        return { ...prev, idades: [...currentAges, ...Array(count - currentAges.length).fill('')] };
      } else if (count < currentAges.length) {
        return { ...prev, idades: currentAges.slice(0, count) };
      }
      return prev;
    });
  }, [formData.vidas, formData.idades_pendentes]);

  // Atualiza idade específica
  const handleAgeChange = (index, value) => {
    const newAges = [...formData.idades];
    newAges[index] = value;
    setFormData(prev => ({ ...prev, idades: newAges }));
  };

  // Formata WhatsApp
  const formatWhatsApp = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 11);
    if (v.length <= 2) return v;
    if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  };

  // Submit OTIMIZADO PARA CONVERSÃO
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const finalCity = formData.cidade || searchTerm;
      
      // Formata as idades para ficar bonito na mensagem
      const ages = formData.idades_pendentes 
        ? '⚠️ *Pendente* (Vou informar no chat)' 
        : formData.idades.filter(Boolean).join(', ');
      
      const preferenciaText = formData.preferencia || 'O consultor pode sugerir';
      
      // --- MENSAGEM OTIMIZADA ---
      const text = 
        `👋 *Olá! Vim pelo site e gostaria da Tabela Hapvida 2026.*\n\n` +
        `Aqui estão os dados para a simulação:\n\n` +
        `👤 *Nome:* ${formData.nome}\n` +
        `📍 *Cidade:* ${finalCity}\n` +
        `📋 *Plano:* ${formData.plano}\n` +
        `👥 *Vidas:* ${formData.vidas}\n` +
        `🎂 *Idades:* ${ages}\n\n` +
        `❤️ *Prioridade:* ${preferenciaText}\n\n` +
        `_Aguardo o retorno com os valores._`;
        
      const url = `https://wa.me/${NEXAR_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      
      setWhatsUrl(url);
      setSuccessOpen(true);
      setLoading(false);
      
      setCountdown(3);
    }, 1000);
  };

  // Efeito do Countdown
  useEffect(() => {
    if (!successOpen || countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    
    if (countdown === 1) {
      window.open(whatsUrl, '_blank');
    }
    return () => clearInterval(timer);
  }, [successOpen, countdown, whatsUrl]);

  if (!isOpen && !successOpen) return null;

  return (
    <>
      {/* MODAL PRINCIPAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-8">
            
            {/* Header Premium */}
            <div className="bg-[#004a8e] p-6 text-white text-center relative">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mb-3">
                <div className="text-xs uppercase tracking-wide text-white/80 mb-2 font-bold">
                  Cotação Oficial Hapvida • 2026
                </div>
                <h2 className="text-2xl font-black leading-tight">
                  <span className="inline-block px-2 py-1 rounded-lg bg-[#ff7f00] text-white transform -rotate-1">
                    Tabela Atualizada
                  </span>
                </h2>
              </div>
              <p className="text-sm text-white/90">
                Preencha para receber os valores no seu WhatsApp em <span className="font-bold text-[#ff7f00]">1 minuto</span>.
              </p>
            </div>

            {/* Formulário */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nome */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      required
                      placeholder="Digite seu nome"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#004a8e] outline-none transition-all font-medium"
                      value={formData.nome}
                      onChange={e => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      required
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#004a8e] outline-none transition-all font-medium"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Cidade (Autocomplete) */}
                <div className="space-y-1" ref={dropdownRef}>
                  <label className="text-sm font-bold text-gray-700 ml-1">Cidade</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      required
                      placeholder="Sua cidade"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#004a8e] outline-none transition-all font-medium"
                      value={searchTerm}
                      onFocus={() => setShowDropdown(true)}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setFormData({ ...formData, cidade: '' });
                        setShowDropdown(true);
                      }}
                    />
                    {showDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                        {CITIES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).map((city) => (
                          <div
                            key={city}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-0 text-gray-700 font-medium"
                            onClick={() => {
                              setFormData({ ...formData, cidade: city });
                              setSearchTerm(city);
                              setShowDropdown(false);
                            }}
                          >
                            {city}
                          </div>
                        ))}
                        <div
                          className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-bold text-[#ff7f00] border-t border-gray-100"
                          onClick={() => {
                            setFormData({ ...formData, cidade: searchTerm });
                            setShowDropdown(false);
                          }}
                        >
                          Usar: "{searchTerm || '...'}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plano e Vidas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Plano</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        required
                        className="w-full pl-10 pr-8 py-3 border-2 border-gray-100 rounded-xl focus:border-[#004a8e] outline-none bg-white appearance-none font-medium text-gray-700"
                        value={formData.plano}
                        onChange={e => setFormData({ ...formData, plano: e.target.value })}
                      >
                        <option value="">Tipo</option>
                        <option value="Individual">Individual</option>
                        <option value="Empresarial">Empresarial</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Pessoas</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        required
                        className="w-full pl-10 pr-8 py-3 border-2 border-gray-100 rounded-xl focus:border-[#004a8e] outline-none bg-white appearance-none font-medium text-gray-700"
                        value={formData.vidas}
                        onChange={e => setFormData({ ...formData, vidas: parseInt(e.target.value) })}
                      >
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Pessoa':'Pessoas'}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Idades Dinâmicas */}
                <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Cake className="w-4 h-4 text-[#ff7f00]" /> Idades
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pendente"
                        checked={formData.idades_pendentes}
                        onChange={() => setFormData(prev => ({ ...prev, idades_pendentes: !prev.idades_pendentes }))}
                        className="w-4 h-4 text-[#004a8e] rounded focus:ring-[#004a8e]"
                      />
                      <label htmlFor="pendente" className="text-xs text-gray-600 font-medium cursor-pointer">
                        Não sei agora
                      </label>
                    </div>
                  </div>

                  {!formData.idades_pendentes ? (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.idades.map((age, index) => (
                        <input
                          key={index}
                          type="number"
                          placeholder={`Idade ${index + 1}`}
                          className="w-full p-2 border border-gray-200 rounded-lg text-center text-sm focus:border-[#004a8e] outline-none"
                          value={age}
                          onChange={e => handleAgeChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic text-center py-2 bg-white rounded-lg border border-dashed border-gray-300">
                      O consultor confirmará as idades no WhatsApp.
                    </div>
                  )}
                </div>

                {/* Preferências */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2 ml-1">
                    <Heart className="w-4 h-4 text-red-500" /> O que é prioridade?
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Menor preço', 'Melhor custo-benefício', 'Melhor cobertura'].map((opt) => (
                      <label key={opt} className={`
                        flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                        ${formData.preferencia === opt ? 'border-[#004a8e] bg-blue-50' : 'border-gray-100 hover:border-gray-200'}
                      `}>
                        <input
                          type="radio"
                          name="pref"
                          value={opt}
                          checked={formData.preferencia === opt}
                          onChange={e => setFormData({ ...formData, preferencia: e.target.value })}
                          className="w-4 h-4 text-[#004a8e] focus:ring-[#004a8e]"
                        />
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1ebc57] text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Enviando...</>
                  ) : (
                    'VER TABELA DE PREÇOS'
                  )}
                </button>

                <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Seus dados estão 100% seguros
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUCESSO */}
      {successOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#25D366] p-8 text-center text-white">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-black mb-2">Sucesso!</h2>
              <p className="opacity-90 font-medium">Abrindo seu WhatsApp...</p>
            </div>
            
            <div className="p-8 text-center space-y-6">
              <p className="text-gray-600 text-lg">
                Redirecionando em <span className="font-bold text-[#004a8e] text-2xl">{countdown}s</span>
              </p>
              
              <button
                onClick={() => window.open(whatsUrl, '_blank')}
                className="w-full py-4 bg-[#004a8e] hover:bg-[#003b73] text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                ABRIR AGORA <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;