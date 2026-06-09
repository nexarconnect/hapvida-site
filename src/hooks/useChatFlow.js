import { useReducer, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'hapvidaLead';

function nowTime() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function makeMsg(role, text, options = null) {
  return { id: Date.now() + Math.random(), role, text, time: nowTime(), options };
}

function getStoredLead() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function buildInitialState(greeting, options) {
  return {
    isOpen: false,
    step: 'GREETING',
    messages: [makeMsg('bot', greeting, options)],
    isTyping: false,
    input: '',
    lead: getStoredLead(),
    mounted: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN':       return { ...state, isOpen: true };
    case 'CLOSE':      return { ...state, isOpen: false };
    case 'MOUNTED':    return { ...state, mounted: true };
    case 'SET_STEP':   return { ...state, step: action.payload };
    case 'SET_TYPING': return { ...state, isTyping: Boolean(action.payload) };
    case 'SET_INPUT':  return { ...state, input: action.payload };
    case 'ADD_MSG':    return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LEAD':   return { ...state, lead: { ...state.lead, ...action.payload } };
    case 'RESET':
      return { ...state, step: 'GREETING', messages: [action.payload], isTyping: false, input: '', lead: {} };
    default: return state;
  }
}

export function useChatFlow(initialGreeting, initialOptions) {
  const [state, dispatch] = useReducer(
    reducer,
    null,
    () => buildInitialState(initialGreeting, initialOptions)
  );

  useEffect(() => { dispatch({ type: 'MOUNTED' }); }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lead)); } catch {}
  }, [state.lead]);

  const openChat   = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const closeChat  = useCallback(() => dispatch({ type: 'CLOSE' }), []);
  const setStep    = useCallback((s) => dispatch({ type: 'SET_STEP', payload: s }), []);
  const setTyping  = useCallback((v) => dispatch({ type: 'SET_TYPING', payload: v }), []);
  const setInput   = useCallback((v) => dispatch({ type: 'SET_INPUT', payload: v }), []);
  const setLead    = useCallback((payload) => dispatch({ type: 'SET_LEAD', payload }), []);

  const addMessage = useCallback((role, text, options = null) => {
    dispatch({ type: 'ADD_MSG', payload: makeMsg(role, text, options) });
  }, []);

  const resetChat = useCallback(() => {
    dispatch({ type: 'RESET', payload: makeMsg('bot', initialGreeting, initialOptions) });
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, [initialGreeting, initialOptions]);

  return useMemo(
    () => ({ ...state, openChat, closeChat, setStep, setTyping, setInput, setLead, addMessage, resetChat }),
    [state, openChat, closeChat, setStep, setTyping, setInput, setLead, addMessage, resetChat]
  );
}
