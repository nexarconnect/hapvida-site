import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Loader2 } from 'lucide-react';
import { saveLead, validateWhatsApp, validateName } from '../lib/supabase';
import { tracking, trackLead } from '../lib/tracking';
import SuccessModal from './SuccessModal';
import { useToast } from './ui/use-toast';

function canUseSupabaseSave() {
  return typeof saveLead === 'function';
}

function buildInitialAges(total) {
  return Array.from({ length: total }, () => '');
}

function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validateEmail(email) {
  const value = String(email || '').trim().toLowerCase();
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function isRepeatedDigits(value) {
  const digits = normalizeDigits(value);
  return digits.length >= 8 && /^(\d)\1+$/.test(digits);
}

function hasSequentialPattern(value) {
  const digits = normalizeDigits(value);
  if (digits.length < 8) return false;
  const asc = '01234567890123456789';
  const desc = '98765432109876543210';
  return asc.includes(digits) || desc.includes(digits);
}

const DRAFT_KEY = 'formDraft';

export default function FormModal({
  isOpen,
  onClose,
  lowestPrice = '157,29',
  initialPlan = null,
  userCity = '',
}) {
  const TOTAL_STEPS = 4;
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [skipAges, setSkipAges] = useState(false);

  const abandonmentTracked = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cidade: userCity || '',
    numPessoas: '1',
    idades: [''],
    preferencia: 'Tanto faz (me mostre opções)',
    email: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    setStep(1);
    setLoading(false);
    setIsSuccess(false);
    setLeadData(null);
    setSkipAges(false);
    abandonmentTracked.current = false;

    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          cidade: parsed?.cidade || userCity || '',
          numPessoas: parsed?.numPessoas || '1',
          idades: Array.isArray(parsed?.idades) ? parsed.idades : [''],
          preferencia: parsed?.preferencia || 'Tanto faz (me mostre opções)',
          email: parsed?.email || '',
        }));
        setSkipAges(Boolean(parsed?.skipAges));
      } catch (error) {
        console.error('Erro ao restaurar rascunho:', error);
      }
    } else {
      setFormData({
        nome: '',
        whatsapp: '',
        cidade: userCity || '',
        numPessoas: '1',
        idades: [''],
        preferencia: 'Tanto faz (me mostre opções)',
        email: '',
      });
    }

    try {
      if (tracking?.formStart) {
        tracking.formStart('modal', {
          plano: initialPlan || null,
          cidade: userCity || '',
        });
      } else if (tracking?.event) {
        tracking.event('inicio_formulario', 'modal', {
          plano: initialPlan || null,
          cidade: userCity || '',
        });
      }
    } catch (error) {
      console.error('Erro ao registrar início do formulário:', error);
    }
  }, [isOpen, initialPlan, userCity]);

  useEffect(() => {
    if (!isOpen) return;
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        ...formData,
        skipAges,
      })
    );
  }, [formData, skipAges, isOpen]);

  useEffect(() => {
    if (isOpen) return;

    if (!isSuccess && formData.nome && !abandonmentTracked.current) {
      try {
        if (tracking?.event) {
          tracking.event('form_abandonment', 'modal', {
            step,
            nome: formData.nome,
            plano: initialPlan || null,
          });
        }
      } catch (error) {
        console.error('Erro ao registrar abandono do formulário:', error);
      }

      abandonmentTracked.current = true;
    }
  }, [isOpen, isSuccess, formData.nome, step, initialPlan]);

  const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

  const updateFormField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showErrorToast = (title, description) => {
    toast({
      title,
      description,
      variant: 'destructive',
    });
  };

  const handlePeopleChange = (e) => {
    const value = e.target.value;
    updateFormField('numPessoas', value);
    const total = Math.max(1, Math.min(20, Number(value) || 1));
    updateFormField('idades', buildInitialAges(total));
  };

  const handleAgeChange = (index, value) => {
    const nextAges = [...formData.idades];
    nextAges[index] = value;
    updateFormField('idades', nextAges);
  };

  const handleToggleSkipAges = (checked) => {
    setSkipAges(checked);
    if (checked) {
      updateFormField('idades', []);
      return;
    }
    const total = Math.max(1, Math.min(20, Number(formData.numPessoas) || 1));
    updateFormField('idades', buildInitialAges(total));
  };

  const handlePhoneChange = (e) => {
    updateFormField('whatsapp', formatPhone(e.target.value));
  };

  const validateStepOne = () => {
    const nome = String(formData.nome || '').trim();
    const whatsappDigits = normalizeDigits(formData.whatsapp);
    const cidade = String(formData.cidade || '').trim();

    if (!validateName(nome)) {
      showErrorToast('Nome incompleto', 'Digite nome e sobrenome.');
      return false;
    }

    if (!validateWhatsApp(formData.whatsapp)) {
      showErrorToast('WhatsApp inválido', 'Digite um WhatsApp válido com DDD.');
      return false;
    }

    if (whatsappDigits.length < 10 || whatsappDigits.length > 11) {
      showErrorToast('WhatsApp inválido', 'Digite um número com DDD válido.');
      return false;
    }

    const ddd = Number(whatsappDigits.slice(0, 2));
    if (!Number.isInteger(ddd) || ddd < 11 || ddd > 99) {
      showErrorToast('WhatsApp inválido', 'O DDD precisa estar entre 11 e 99.');
      return false;
    }

    if (isRepeatedDigits(whatsappDigits) || hasSequentialPattern(whatsappDigits)) {
      showErrorToast('WhatsApp inválido', 'Digite um número real de contato.');
      return false;
    }

    if (!cidade) {
      showErrorToast('Cidade inválida', 'Digite sua cidade.');
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    const totalPeople = Number(formData.numPessoas);

    if (!Number.isInteger(totalPeople) || totalPeople < 1 || totalPeople > 20) {
      showErrorToast('Quantidade inválida', 'Informe um número de pessoas entre 1 e 20.');
      return false;
    }

    if (skipAges) return true;

    if (!formData.idades.length || formData.idades.length !== totalPeople) {
      showErrorToast('Idades incompletas', 'Preencha uma idade para cada pessoa.');
      return false;
    }

    const invalidAge = formData.idades.some((age) => {
      const n = Number(age);
      return !Number.isFinite(n) || n < 0 || n > 120;
    });

    if (invalidAge) {
      showErrorToast('Idades inválidas', 'Preencha as idades com valores entre 0 e 120.');
      return false;
    }

    return true;
  };

  const validateStepFour = () => {
    if (!validateEmail(formData.email)) {
      showErrorToast('E-mail inválido', 'Digite um e-mail válido.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStepOne()) return;
    if (step === 2 && !validateStepTwo()) return;
    if (step === 4 && !validateStepFour()) return;

    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    handleSubmit();
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const whatsappRaw = normalizeDigits(formData.whatsapp);
      const finalAges = skipAges
        ? []
        : formData.idades.map((age) => Number(age)).filter((age) => Number.isFinite(age));

      const payload = {
        nome: String(formData.nome || '').trim(),
        whatsapp: String(formData.whatsapp || '').trim(),
        whatsappRaw,
        cidade: String(formData.cidade || '').trim(),
        numPessoas: Number(formData.numPessoas) || 1,
        idades: finalAges,
        preferencia: String(formData.preferencia || '').trim(),
        email: String(formData.email || '').trim(),
        plano: initialPlan || null,
      };

      if (!canUseSupabaseSave()) {
        showErrorToast('Erro ao enviar', 'Não foi possível salvar seus dados.');
        return;
      }

      const result = await saveLead(payload);

      if (!result || !result.success) {
        showErrorToast('Erro ao enviar', 'Não foi possível salvar seus dados.');
        return;
      }

      const finalLead = {
        ...payload,
        id: result.id,
        savedInSupabase: true,
      };

      setLeadData(finalLead);
      setIsSuccess(true);
      localStorage.removeItem(DRAFT_KEY);

      try {
        if (tracking?.event) {
          tracking.event('leadSubmit', 'modal', {
            plano: initialPlan || null,
            cidade: formData.cidade,
            numPessoas: formData.numPessoas,
            preferencia: formData.preferencia,
            email: formData.email,
          });
        }

        trackLead(initialPlan || null, formData.cidade, 'modal');
      } catch (error) {
        console.error('Erro ao registrar lead:', error);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      showErrorToast('Erro ao enviar', 'Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !isSuccess) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/35 p-4 backdrop-blur-md">
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/30 bg-white/75 p-8 shadow-2xl backdrop-blur-xl md:p-12"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-6 text-gray-400 transition hover:text-gray-600"
                aria-label="Fechar modal"
              >
                <X />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-2xl font-black text-[#002b5c]">Plano de saúde Hapvida 2026</h2>
                <p className="font-bold text-[#ff8200]">Valores a partir de R$ {lowestPrice}</p>
                <p className="mt-2 text-sm text-slate-500">
                  Validamos disponibilidade e valores para seu município
                </p>
              </div>

              <div className="mb-8">
                <div
                  className="h-2 w-full rounded-full bg-slate-200"
                  role="progressbar"
                  aria-valuenow={(step / TOTAL_STEPS) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progresso do formulário"
                >
                  <div
                    className="h-2 rounded-full bg-[#ff8200] transition-all duration-300"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#002b5c]">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={(e) => updateFormField('nome', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#002b5c]">WhatsApp</label>
                    <input
                      type="tel"
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#002b5c]">Cidade</label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Sua cidade"
                      value={formData.cidade}
                      onChange={(e) => updateFormField('cidade', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#002b5c]">Nº de Pessoas</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="Ex: 2"
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={formData.numPessoas}
                      onChange={handlePeopleChange}
                    />
                  </div>

                  {!skipAges && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {formData.idades.map((age, index) => (
                        <input
                          key={`idade-${index}`}
                          type="number"
                          min="0"
                          max="120"
                          placeholder={`Idade ${index + 1}`}
                          className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={age}
                          onChange={(e) => handleAgeChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                  )}

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={skipAges}
                        onChange={(e) => handleToggleSkipAges(e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-slate-700">
                        Não sei as idades agora (preencher depois)
                        <span className="mt-1 block text-xs text-slate-500">
                          Sem problema. O consultor confirma com você no WhatsApp.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-black text-[#002b5c]">O que é mais importante pra você?</p>
                    <p className="mt-1 text-sm text-slate-500">Você pode mudar isso depois no WhatsApp.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Menor preço',
                      'Melhor custo-benefício',
                      'Melhor cobertura',
                      'Tanto faz (me mostre opções)',
                    ].map((option) => {
                      const selected = formData.preferencia === option;

                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                            selected ? 'border-[#ff8200] bg-orange-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferencia"
                            checked={selected}
                            onChange={() => updateFormField('preferencia', option)}
                            className="h-4 w-4 accent-[#ff8200]"
                          />
                          <span className={`text-sm font-medium ${selected ? 'text-[#002b5c]' : 'text-slate-700'}`}>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-[#002b5c]">
                    Você pode mudar isso depois no WhatsApp.
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#002b5c]">E-mail</label>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="voce@exemplo.com"
                      value={formData.email}
                      onChange={(e) => updateFormField('email', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-2xl bg-gray-100 p-4 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed"
                    aria-label="Voltar ao passo anterior"
                    disabled={loading}
                  >
                    <ChevronLeft />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-[#ff8200] py-4 font-black uppercase tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label={step === TOTAL_STEPS ? 'Enviar formulário' : 'Avançar para o próximo passo'}
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    'ENVIAR E RECEBER COTAÇÃO'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SuccessModal isOpen={isSuccess} onClose={() => setIsSuccess(false)} leadData={leadData} />
    </>
  );
}