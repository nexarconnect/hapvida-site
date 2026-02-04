import React, { useEffect, useState } from 'react';
import { initTracking, tracking } from '@/lib/tracking';

const TrackingDebugger = () => {
  const [status, setStatus] = useState({
    ga4Loaded: false,
    metaLoaded: false,
    href: '',
    title: '',
    eventsFired: [],
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Inicializa tracking se ainda não foi
    if (!window.gtag || !window.fbq) {
      initTracking();
    }

    // Verifica status após 1 segundo
    const timer = setTimeout(() => {
      setStatus(prev => ({
        ...prev,
        ga4Loaded: typeof window.gtag === 'function',
        metaLoaded: typeof window.fbq === 'function',
        href: window.location.href,
        title: document.title,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClickTest = () => {
    tracking.whatsappClick();
    addEventLog('whatsapp_click (GA4) + Lead (Pixel)');
  };

  const handleFormStartTest = () => {
    tracking.formStart();
    addEventLog('form_start (GA4) + ViewContent (Pixel)');
  };

  const handleLeadSubmitTest = () => {
    tracking.leadSubmit({
      lead_source: 'tracking_test',
      value: 0,
    });
    addEventLog('lead (GA4) + Lead (Pixel)');
  };

  const handleCustomEventTest = () => {
    tracking.customEvent('debug_test', {
      test_type: 'manual',
      timestamp: new Date().toISOString(),
    });
    addEventLog('debug_test (GA4 custom)');
  };

  const addEventLog = (eventName) => {
    setStatus(prev => ({
      ...prev,
      eventsFired: [
        ...prev.eventsFired,
        {
          name: eventName,
          time: new Date().toLocaleTimeString(),
        }
      ].slice(-10), // Mantém apenas últimos 10 eventos
    }));
  };

  const handleCheckStatus = () => {
    setStatus(prev => ({
      ...prev,
      ga4Loaded: typeof window.gtag === 'function',
      metaLoaded: typeof window.fbq === 'function',
    }));
  };

  const handleClearLogs = () => {
    setStatus(prev => ({ ...prev, eventsFired: [] }));
  };

  // Estilos inline para não precisar de CSS
  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    },
    toggleButton: {
      background: '#0070f3',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      fontSize: '24px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 112, 243, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    panel: {
      background: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      width: '400px',
      maxHeight: '500px',
      overflowY: 'auto',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      marginBottom: '10px',
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      padding: '8px',
      borderRadius: '6px',
      background: '#f8f9fa',
    },
    statusIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '16px',
    },
    testButton: {
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      background: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      flex: '1',
      minWidth: '120px',
    },
    eventLog: {
      marginTop: '16px',
      padding: '12px',
      background: '#f8f9fa',
      borderRadius: '8px',
      fontSize: '12px',
    },
    eventItem: {
      padding: '4px 0',
      borderBottom: '1px solid #eee',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    title: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '600',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      {isVisible && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <h2 style={styles.title}>🔍 Tracking Debugger</h2>
            <button 
              onClick={() => setIsVisible(false)}
              style={styles.closeButton}
            >
              ×
            </button>
          </div>

          {/* Status Section */}
          <div>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>Status</h3>
            <div style={styles.statusItem}>
              <div style={{
                ...styles.statusIndicator,
                background: status.ga4Loaded ? '#10b981' : '#ef4444'
              }} />
              <span>
                <strong>GA4 (gtag):</strong> {status.ga4Loaded ? '✅ Carregado' : '❌ Não carregado'}
              </span>
            </div>
            <div style={styles.statusItem}>
              <div style={{
                ...styles.statusIndicator,
                background: status.metaLoaded ? '#10b981' : '#ef4444'
              }} />
              <span>
                <strong>Meta Pixel (fbq):</strong> {status.metaLoaded ? '✅ Carregado' : '❌ Não carregado'}
              </span>
            </div>
            
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
              <div><strong>URL:</strong> {status.href}</div>
              <div><strong>Título:</strong> {status.title}</div>
            </div>
          </div>

          {/* Test Buttons */}
          <div style={styles.buttonGroup}>
            <button onClick={handleWhatsAppClickTest} style={styles.testButton}>
              WhatsApp Click
            </button>
            <button onClick={handleFormStartTest} style={styles.testButton}>
              Form Start
            </button>
            <button onClick={handleLeadSubmitTest} style={styles.testButton}>
              Lead Submit
            </button>
            <button onClick={handleCustomEventTest} style={styles.testButton}>
              Custom Event
            </button>
            <button onClick={handleCheckStatus} style={styles.testButton}>
              Re-check Status
            </button>
            <button onClick={handleClearLogs} style={styles.testButton}>
              Clear Logs
            </button>
          </div>

          {/* Event Log */}
          <div style={styles.eventLog}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Event Log (últimos 10):</strong>
              <span style={{ fontSize: '11px', color: '#666' }}>
                {status.eventsFired.length} eventos
              </span>
            </div>
            {status.eventsFired.length > 0 ? (
              status.eventsFired.map((event, index) => (
                <div key={index} style={styles.eventItem}>
                  <div style={{ color: '#0070f3' }}>{event.name}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>{event.time}</div>
                </div>
              ))
            ) : (
              <div style={{ color: '#666', fontStyle: 'italic' }}>
                Nenhum evento disparado ainda
              </div>
            )}
          </div>

          {/* Instructions */}
          <div style={{ marginTop: '16px', fontSize: '11px', color: '#666' }}>
            <strong>Como validar:</strong>
            <ol style={{ margin: '4px 0', paddingLeft: '16px' }}>
              <li>Abra Console do navegador</li>
              <li>Verifique logs "GA4 Event" / "Meta Pixel Event"</li>
              <li>GA4 DebugView: eventos em tempo real</li>
              <li>Meta Pixel Helper: PageView e Lead</li>
            </ol>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={styles.toggleButton}
        title="Toggle Tracking Debugger"
      >
        {isVisible ? '×' : '🔍'}
      </button>
    </div>
  );
};

export default TrackingDebugger;