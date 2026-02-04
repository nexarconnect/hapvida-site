import React, { useEffect, useState } from 'react';
import { initTracking, tracking } from '@/lib/tracking';

const TrackingTest = () => {
  const [status, setStatus] = useState({
    ga4Loaded: false,
    metaLoaded: false,
    href: '',
    title: '',
  });

  useEffect(() => {
    initTracking();

    const timer = setTimeout(() => {
      setStatus({
        ga4Loaded: typeof window.gtag === 'function',
        metaLoaded: typeof window.fbq === 'function',
        href: window.location.href,
        title: document.title,
      });

      // Evento de teste opcional (GA4)
      tracking.customEvent('tracking_test_page_view', {
        page_type: 'tracking_test',
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClickTest = () => {
    tracking.whatsappClick();
  };

  const handleFormStartTest = () => {
    tracking.formStart();
  };

  const handleLeadSubmitTest = () => {
    tracking.leadSubmit({
      lead_source: 'tracking_test',
      value: 0,
    });
  };

  const handleCustomEventTest = () => {
    tracking.customEvent('cta_test_click', {
      cta: 'test_button',
      page: 'tracking_test',
    });
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      <h1 style={{ marginBottom: 8 }}>Tracking Test</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Use esta página para validar GA4 + Meta Pixel (gtag/fbq) e eventos.
      </p>

      <div style={{ marginTop: 16, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>GA4 (gtag): <b>{status.ga4Loaded ? 'OK' : 'NÃO carregou'}</b></li>
          <li>Meta Pixel (fbq): <b>{status.metaLoaded ? 'OK' : 'NÃO carregou'}</b></li>
          <li>URL: <b>{status.href}</b></li>
          <li>Título: <b>{status.title}</b></li>
        </ul>
        <p style={{ marginBottom: 0, marginTop: 12, opacity: 0.8 }}>
          Dica: abra o Console e filtre por “GA4 Event” / “Meta Pixel Event”.
        </p>
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <button onClick={handleWhatsAppClickTest} style={btnStyle}>
          Disparar whatsapp_click (GA4) + Lead (Pixel)
        </button>

        <button onClick={handleFormStartTest} style={btnStyle}>
          Disparar form_start (GA4) + ViewContent (Pixel)
        </button>

        <button onClick={handleLeadSubmitTest} style={btnStyle}>
          Disparar lead (GA4) + Lead (Pixel)
        </button>

        <button onClick={handleCustomEventTest} style={btnStyle}>
          Disparar evento custom (GA4)
        </button>
      </div>

      <div style={{ marginTop: 16, padding: 16, background: '#f7f7f7', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>O que validar</h2>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li>No Console: logs de eventos aparecendo.</li>
          <li>No GA4: DebugView mostrando os eventos.</li>
          <li>No Pixel Helper: PageView e Lead aparecendo.</li>
        </ol>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #ccc',
  background: 'white',
  cursor: 'pointer',
};

export default TrackingTest;