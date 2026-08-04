import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';

import HomePage from './pages/HomePage';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import DashboardLeads from './pages/DashboardLeads';
import AvisoLegal from './pages/AvisoLegal';
import PoliticasPrivacidade from './pages/PoliticasPrivacidade';
import TermosDeUso from './pages/TermosDeUso';
import PerguntasFrequentes from './pages/PerguntasFrequentes';
import RedeAtendimento from './pages/RedeAtendimento';

import ScrollToTop from './components/ScrollToTop';
import NetworkUnitsTest from './components/NetworkUnitsTest';
import FormModal from './components/FormModal';
import ChatInteligente from './components/ChatInteligente';

const ConfigPage = () => (
  <div className="p-8 text-center">Configurações (Em breve)</div>
);

function ProtectedRoute({ session, children }) {
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

function PublicOnlyRoute({ session, children }) {
  if (session) return <Navigate to="/admin" replace />;
  return children;
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    let subscription;

    async function getInitialSession() {
      try {
        if (!supabase) {
          if (mounted) {
            setSession(null);
            setLoading(false);
          }
          return;
        }

        const { data } = await supabase.auth.getSession();

        if (mounted) {
          setSession(data?.session ?? null);
          setLoading(false);
        }

        const authListener = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) {
            setSession(session ?? null);
            setLoading(false);
          }
        });

        subscription = authListener?.data?.subscription;
      } catch (error) {
        console.error('Erro ao iniciar sessão:', error);

        if (mounted) {
          setSession(null);
          setLoading(false);
        }
      }
    }

    getInitialSession();

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleOpenConsultorOnline = () => {
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900" />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onOpenForm={handleOpenForm}
              onOpenConsultorOnline={handleOpenConsultorOnline}
            />
          }
        />
        <Route path="/obrigado" element={<ThankYou />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politicas-privacidade" element={<PoliticasPrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
        <Route path="/rede-de-atendimento" element={<RedeAtendimento />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute session={session}>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute session={session}>
              <DashboardLeads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute session={session}>
              <DashboardLeads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/config"
          element={
            <ProtectedRoute session={session}>
              <ConfigPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/rede"
          element={
            <ProtectedRoute session={session}>
              <NetworkUnitsTest />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <ChatInteligente />
    </Router>
  );
}

export default App;