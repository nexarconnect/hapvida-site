import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { loadSiteConfig } from './lib/siteConfig';

import HomePage from './pages/HomePage';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import DashboardLeads from './pages/DashboardLeads';
import SobreNos from './pages/SobreNos';
import Contato from './pages/Contato';
import AvisoLegal from './pages/AvisoLegal';
import PoliticasPrivacidade from './pages/PoliticasPrivacidade';
import TermosDeUso from './pages/TermosDeUso';
import PerguntasFrequentes from './pages/PerguntasFrequentes';
import RedeAtendimento from './pages/RedeAtendimento';
import PlanoPorCidade from './pages/PlanoPorCidade';
import PlanosPorCidade from './pages/PlanosPorCidade';
import PlanoIndividual from './pages/PlanoIndividual';
import PlanoEmpresarial from './pages/PlanoEmpresarial';
import TiposDePlanos from './pages/TiposDePlanos';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';
import NetworkUnitsTest from './components/NetworkUnitsTest';
import FormModal from './components/FormModal';
import ChatInteligente from './components/ChatInteligente';

const ConfigPage = lazy(() => import('./pages/ConfigPage'));

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
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadSiteConfig();
  }, []);

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

  const handleOpenForm = (planName) => {
    setSelectedPlan(planName || null);
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
          element={<HomePage onOpenForm={handleOpenForm} />}
        />
        <Route path="/obrigado" element={<ThankYou />} />
        <Route path="/sobre-nos" element={<SobreNos onOpenForm={handleOpenForm} />} />
        <Route path="/contato" element={<Contato onOpenForm={handleOpenForm} />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politicas-privacidade" element={<PoliticasPrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
        <Route path="/rede-de-atendimento" element={<RedeAtendimento />} />
        <Route
          path="/planos-hapvida-por-cidade"
          element={<PlanosPorCidade onOpenForm={handleOpenForm} />}
        />
        <Route
          path="/plano-individual-hapvida"
          element={<PlanoIndividual onOpenForm={handleOpenForm} />}
        />
        <Route
          path="/plano-empresarial-hapvida"
          element={<PlanoEmpresarial onOpenForm={handleOpenForm} />}
        />
        <Route
          path="/tipos-de-planos"
          element={<TiposDePlanos onOpenForm={handleOpenForm} />}
        />
        <Route
          path="/plano-hapvida/:slug"
          element={<PlanoPorCidade onOpenForm={handleOpenForm} />}
        />
        <Route path="/blog" element={<BlogIndex onOpenForm={handleOpenForm} />} />
        <Route path="/blog/:slug" element={<BlogPost onOpenForm={handleOpenForm} />} />

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
              <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900" /></div>}>
                <ConfigPage />
              </Suspense>
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

        <Route path="*" element={<NotFound />} />
      </Routes>

      <FormModal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setSelectedPlan(null); }}
        initialPlan={selectedPlan}
      />
      <ChatInteligente />
    </Router>
  );
}

export default App;