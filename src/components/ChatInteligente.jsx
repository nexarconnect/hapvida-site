import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send, RotateCcw, Check, Zap } from 'lucide-react';
import { useChatFlow } from '../hooks/useChatFlow';

const WHATSAPP_NUMBER = '5514991235094';

const INITIAL_GREETING =
  'Oi! 😊 Sou o Rafael. Vi que está interessado em simular seu plano Hapvida. Só preciso de algumas informações, é rapidinho!';

const PREF_OPTIONS = [{ label: 'Quero simular agora', value: 'simular' }];

const PLAN_OPTIONS = [
  { label: 'Só para mim', value: 'individual' },
  { label: 'Para minha família', value: 'familia' },
  { label: 'Para minha empresa', value: 'empresa' },
];

const AGE_OPTIONS = ['18-25', '26-35', '36-45', '46-55', '56+'];

const OPTION_STEPS = ['GREETING', 'PREFERENCIA', 'PLANO', 'IDADE', 'FINAL'];
const TEXT_STEPS   = ['CIDADE', 'NOME', 'WHATSAPP', 'EMAIL'];

function validateWhatsApp(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 11) return 'WhatsApp deve ter 11 dígitos.';
  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return 'DDD inválido.';
  if (/^(\d)\1{10}$/.test(digits)) return 'Número inválido.';
  return null;
}

function validateName(value) {
  return value.trim().split(/\s+/).filter(Boolean).length >= 2 ? null : 'Digite nome e sobrenome.';
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value.trim()) ? null : 'Email inválido.';
}

const STEP_VALIDATORS = { NOME: validateName, WHATSAPP: validateWhatsApp, EMAIL: validateEmail };

const STEP_FLOW = {
  CIDADE:   { field: 'cidade',   nextMsg: 'Perfeito. Agora me diga seu nome completo.',                   nextStep: 'NOME' },
  NOME:     { field: 'nome',     nextMsg: 'Ótimo! Qual é o seu WhatsApp para eu te enviar a cotação?',    nextStep: 'WHATSAPP' },
  WHATSAPP: { field: 'whatsapp', nextMsg: 'Perfeito! Agora só falta o email. Qual é o seu email?',        nextStep: 'EMAIL' },
  EMAIL:    { field: 'email',    nextMsg: 'Perfeito! Agora vou abrir o formulário para você finalizar.',  nextStep: 'FINAL' },
};

const FORM_FIELDS = [
  { field: 'nome',     label: 'Nome Completo', placeholder: 'Digite seu nome completo' },
  { field: 'cidade',   label: 'Cidade',        placeholder: 'Sua cidade' },
  { field: 'email',    label: 'Email',         placeholder: 'seu@email.com' },
  { field: 'whatsapp', label: 'WhatsApp',      placeholder: '(00) 00000-0000' },
];

const INPUT_PLACEHOLDER = {
  CIDADE:   'Sua cidade',
  NOME:     'Digite seu nome completo',
  WHATSAPP: '(00) 00000-0000',
  EMAIL:    'seu@email.com',
};

export default function ChatInteligente() {
  const {
    isOpen, step, messages, isTyping, input, lead, mounted,
    openChat, closeChat, setStep, setTyping, setInput, addMessage, setLead, resetChat,
  } = useChatFlow(INITIAL_GREETING, PREF_OPTIONS);

  const [lastActionTs, setLastActionTs] = useState(0);
  const [isSending,    setIsSending]    = useState(false);
  const [countdown,    setCountdown]    = useState(null);
  const [redirectMode, setRedirectMode] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const countdownRef   = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (!OPTION_STEPS.includes(step) && !redirectMode) inputRef.current?.focus();
    }, 80);
    return () => clearTimeout(t);
  }, [isOpen, messages, step, redirectMode]);

  useEffect(() => {
    if (!redirectMode || countdown === null) return;

    if (countdown === 0) {
      const message = [
        'Olá! Gostaria de dar continuidade à minha cotação com um consultor.',
        '',
        `*Nome:* ${lead.nome || '—'}`,
        `*Cidade:* ${lead.cidade || '—'}`,
        `*E-mail:* ${lead.email || '—'}`,
        `*Preferência:* ${lead.preferencia || '—'}`,
        `*Plano:* ${lead.plano || '—'}`,
        `*Idade:* ${lead.idade || '—'}`,
        `*WhatsApp:* ${lead.whatsapp || '—'}`,
        '',
        'Fico no aguardo.',
      ].join('\n');

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      const closeTimer = setTimeout(() => {
        closeChat();
        setIsSending(false);
        setRedirectMode(false);
        setCountdown(null);
      }, 700);

      return () => clearTimeout(closeTimer);
    }

    countdownRef.current = setTimeout(
      () => setCountdown((prev) => (prev !== null ? prev - 1 : prev)),
      1000
    );
    return () => { if (countdownRef.current) clearTimeout(countdownRef.current); };
  }, [countdown, redirectMode, lead, closeChat]);

  const handleOptionClick = useCallback(
    (opt) => {
      const now = Date.now();
      if (now - lastActionTs < 250 || isTyping || isSending || redirectMode || !opt) return;
      setLastActionTs(now);
      addMessage('user', opt.label);
      setTyping(true);

      setTimeout(() => {
        setTyping(false);

        if (step === 'GREETING' && opt.value === 'simular') {
          setLead({ preferencia: opt.value });
          addMessage('bot', 'Perfeito! Agora, qual tipo de plano você procura?', PLAN_OPTIONS);
          setStep('PLANO');
          return;
        }
        if (step === 'PLANO') {
          setLead({ plano: opt.value });
          addMessage('bot', 'Ótimo! Qual é sua faixa etária?', AGE_OPTIONS.map((a) => ({ label: a, value: a })));
          setStep('IDADE');
          return;
        }
        if (step === 'IDADE') {
          setLead({ idade: opt.value });
          addMessage('bot', `Perfeito! ${opt.value} anos.`);
          addMessage('bot', 'Agora vou abrir o formulário para você finalizar.');
          setStep('FINAL');
        }
      }, 250);
    },
    [addMessage, isSending, isTyping, lastActionTs, redirectMode, step, setLead, setStep, setTyping]
  );

  const handleTextStep = useCallback(() => {
    const value = input.trim();
    if (!value || isTyping || isSending || redirectMode) return;
    const now = Date.now();
    if (now - lastActionTs < 250) return;
    setLastActionTs(now);

    const validate = STEP_VALIDATORS[step];
    if (validate) {
      const err = validate(value);
      if (err) { addMessage('bot', err); return; }
    }

    const flow = STEP_FLOW[step];
    if (!flow) return;

    setLead({ [flow.field]: value });
    addMessage('user', value);
    addMessage('bot', flow.nextMsg);
    setStep(flow.nextStep);
    setInput('');
  }, [addMessage, input, isSending, isTyping, lastActionTs, redirectMode, step, setLead, setStep, setInput]);

  const handleFinalAction = useCallback(() => {
    if (isSending || redirectMode) return;
    if (!lead.nome || !lead.cidade || !lead.email || !lead.whatsapp) {
      addMessage('bot', 'Faltam alguns dados para continuar. Pode revisar?');
      return;
    }
    setIsSending(true);
    setRedirectMode(true);
    setCountdown(2);
  }, [addMessage, isSending, lead, redirectMode]);

  const handleSend = useCallback(() => {
    if (TEXT_STEPS.includes(step)) handleTextStep();
  }, [handleTextStep, step]);

  const handleReset = useCallback(() => {
    if (countdownRef.current) clearTimeout(countdownRef.current);
    resetChat();
    setIsSending(false);
    setCountdown(null);
    setRedirectMode(false);
  }, [resetChat]);

  const renderOptions = (opts) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
      {opts.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleOptionClick(opt)}
          disabled={isTyping || isSending || redirectMode}
          style={{
            background: '#075E54',
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            padding: '10px 14px',
            textAlign: 'left',
            cursor: isTyping || isSending || redirectMode ? 'not-allowed' : 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Check size={16} />
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );

  const renderInternalForm = () => {
    if (step !== 'FINAL') return null;
    return (
      <div style={{ background: '#fff', borderRadius: 18, padding: 16, marginTop: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.08)', color: '#1F2937' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Formulário</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FORM_FIELDS.map(({ field, label, placeholder }) => (
            <div key={field}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <input
                value={lead[field] || ''}
                onChange={(e) => setLead({ [field]: e.target.value })}
                placeholder={placeholder}
                style={fieldStyle}
                disabled={redirectMode}
              />
            </div>
          ))}
          <button onClick={handleFinalAction} disabled={isSending || redirectMode} style={ctaStyle}>
            ENVIAR E RECEBER COTAÇÃO
          </button>
          <div style={{ fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={14} />
            Você será direcionado para o WhatsApp.
          </div>
        </div>
      </div>
    );
  };

  const inputDisabled = OPTION_STEPS.includes(step) || redirectMode;
  const sendEnabled   = Boolean(input.trim()) && !isTyping && !isSending && !redirectMode && !OPTION_STEPS.includes(step);

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        @media (max-width: 768px) {
          .chat-panel-responsive {
            right: 10px !important;
            bottom: 80px !important;
            width: calc(100vw - 20px) !important;
            max-height: calc(100vh - 120px) !important;
          }
        }
      `}</style>

      <button onClick={openChat} style={fabStyle} aria-label="Abrir chat">
        <MessageCircle size={26} />
      </button>

      {isOpen && !redirectMode && (
        <div className="chat-panel-responsive" style={panelStyle}>
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div style={avatarStyle}>H</div>
              <div style={{ minWidth: 0 }}>
                <strong style={{ display: 'block', lineHeight: 1.1, fontSize: 15 }}>Rafael</strong>
                <div style={{ fontSize: 12, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <Zap size={12} />
                  <span>Responde em 5 min</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleReset} style={iconBtnStyle} aria-label="Reiniciar"><RotateCcw size={18} /></button>
              <button onClick={closeChat}   style={iconBtnStyle} aria-label="Fechar"><X size={20} /></button>
            </div>
          </div>

          <div style={messagesStyle}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}
              >
                <div style={bubbleStyle(msg.role)}>
                  <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.4, fontSize: 15 }}>
                    {msg.text}
                  </div>
                  <div style={{ marginTop: 6, textAlign: 'right', fontSize: 11, color: '#667781', opacity: 0.8 }}>
                    {msg.time}
                  </div>
                  {msg.options && msg.role === 'bot' && renderOptions(msg.options)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                <div style={{ background: '#fff', padding: '12px 16px', borderRadius: 20, color: '#1F2937' }}>
                  Rafael está digitando...
                </div>
              </div>
            )}

            {renderInternalForm()}
            <div ref={messagesEndRef} />
          </div>

          <div style={footerStyle}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={INPUT_PLACEHOLDER[step] ?? 'Digite sua resposta...'}
                disabled={inputDisabled}
                style={inputStyle}
              />
              <button onClick={handleSend} disabled={!sendEnabled} style={sendBtnStyle(sendEnabled)}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {redirectMode && (
        <div style={redirectOverlayStyle}>
          <div style={redirectCardStyle}>
            <div style={{ fontSize: 13, color: '#666666', marginBottom: 10, fontWeight: 500 }}>
              Encaminhando para o WhatsApp
            </div>
            <div style={redirectCountdownStyle}>{countdown ?? 0}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#333333', textAlign: 'center', lineHeight: 1.3 }}>
              Você será redirecionado em instantes
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, color: '#666666', textAlign: 'center', lineHeight: 1.4 }}>
              Aguarde alguns segundos para abrir a conversa.
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}

const panelStyle = {
  position: 'fixed', right: '20px', bottom: '100px', width: '380px',
  maxWidth: 'calc(100vw - 40px)', maxHeight: '80vh', zIndex: 2147483647,
  background: '#fff', borderRadius: '24px', overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)', fontFamily: 'system-ui, -apple-system, sans-serif',
  display: 'flex', flexDirection: 'column',
};

const headerStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '16px 20px', background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)',
  color: '#fff', flexShrink: 0,
};

const avatarStyle = {
  width: 40, height: 40, background: '#fff', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#075E54', fontWeight: 'bold', flexShrink: 0,
};

const messagesStyle = {
  flex: 1, overflowY: 'auto', background: 'linear-gradient(to bottom, #e5ddd5 0%, #d5dbdb 100%)',
  padding: '20px', display: 'flex', flexDirection: 'column',
};

const footerStyle = {
  padding: '16px', background: '#f0f0f0', borderTop: '1px solid #e1e8ed', flexShrink: 0,
};

const bubbleStyle = (role) => ({
  maxWidth: '66%', width: 'fit-content',
  background: role === 'user' ? '#DCF8C6' : '#fff',
  padding: '12px 14px', borderRadius: '18px', fontSize: '15px', lineHeight: 1.4,
  color: '#1F2937', boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  borderBottomLeftRadius: role === 'bot' ? '6px' : '18px',
  borderBottomRightRadius: role === 'user' ? '6px' : '18px',
  whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word',
});

const inputStyle = {
  flex: 1, padding: '12px 16px', border: 'none', borderRadius: '24px',
  outline: 'none', background: '#fff', fontSize: '15px', color: '#1F2937', minWidth: 0,
};

const sendBtnStyle = (enabled) => ({
  width: '48px', height: '48px', borderRadius: '50%',
  background: enabled ? '#25D366' : '#e1e8ed', color: '#fff',
  border: 'none', cursor: enabled ? 'pointer' : 'not-allowed',
  opacity: enabled ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
});

const ctaStyle = {
  width: '100%', padding: '14px', borderRadius: '24px',
  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer',
};

const fieldStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '12px',
  border: '1px solid #d1d5db', outline: 'none', color: '#1F2937', background: '#fff',
};

const iconBtnStyle = {
  color: '#fff', background: 'none', border: 'none', cursor: 'pointer',
  padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const fabStyle = {
  position: 'fixed', right: '20px', bottom: '20px', width: '64px', height: '64px',
  borderRadius: '50%', background: '#25D366', color: '#fff', zIndex: 2147483647,
  border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const redirectOverlayStyle = {
  position: 'fixed', inset: 0, zIndex: 2147483648,
  background: 'rgba(10, 20, 40, 0.40)', backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', padding: 20,
};

const redirectCardStyle = {
  width: '100%', maxWidth: 360, background: '#fff', borderRadius: 24,
  padding: '34px 26px', boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
};

const redirectCountdownStyle = {
  width: 84, height: 84, borderRadius: '50%',
  background: 'linear-gradient(135deg, #2652B5 0%, #307CBF 100%)',
  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 34, fontWeight: 800, marginBottom: 20,
  boxShadow: '0 14px 30px rgba(38, 82, 181, 0.25)',
};
