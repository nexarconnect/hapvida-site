// src/lib/tracking.js
// Configuração completa de tracking para LP de leads
// Atualizado: 2025 - Versão mais recente com todas as melhores práticas
// IDs configurados: GA4 G-522891125 | Meta Pixel 1403680251552283

// ================= CONFIGURAÇÕES =================
const CONFIG = {
  // 🔹 SEUS IDs REAIS (CONFIRMADOS)
  GA4_MEASUREMENT_ID: 'G-522891125', // GA4 Measurement ID
  META_PIXEL_ID: '1403680251552283', // Meta Pixel ID
  HOTJAR_ID: null, // Opcional: seu Hotjar Site ID
  MICROSOFT_CLARITY_ID: null, // Opcional: seu Microsoft Clarity Project ID
  
  // Configurações de eventos
  SCROLL_DEPTHS: [25, 50, 75, 90], // Percentuais de scroll para rastrear
  TIME_TRACKING: [30, 60], // Segundos para rastrear tempo na página
};

// ================= INICIALIZAÇÃO =================

// 1. Google Analytics 4 (GA4)
function initGA4() {
  if (!CONFIG.GA4_MEASUREMENT_ID) return;
  
  // Carrega script do GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Configura GA4
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
    debug_mode: process.env.NODE_ENV === 'development',
    page_title: document.title,
    page_location: window.location.href,
  });
  
  console.log('✅ GA4 inicializado com ID:', CONFIG.GA4_MEASUREMENT_ID);
}

// 2. Meta Pixel (Facebook Pixel)
function initMetaPixel() {
  if (!CONFIG.META_PIXEL_ID) return;
  
  // Carrega script do Meta Pixel
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${CONFIG.META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
  
  console.log('✅ Meta Pixel inicializado com ID:', CONFIG.META_PIXEL_ID);
}

// 3. Hotjar (opcional)
function initHotjar() {
  if (!CONFIG.HOTJAR_ID) return;
  
  const script = document.createElement('script');
  script.innerHTML = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${CONFIG.HOTJAR_ID},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  document.head.appendChild(script);
  
  console.log('✅ Hotjar inicializado');
}

// 4. Microsoft Clarity (opcional)
function initMicrosoftClarity() {
  if (!CONFIG.MICROSOFT_CLARITY_ID) return;
  
  const script = document.createElement('script');
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CONFIG.MICROSOFT_CLARITY_ID}");
  `;
  document.head.appendChild(script);
  
  console.log('✅ Microsoft Clarity inicializado');
}

// ================= EVENTOS CUSTOMIZADOS =================

// Função para disparar eventos GA4
function trackGA4(eventName, parameters = {}) {
  if (!window.gtag || !CONFIG.GA4_MEASUREMENT_ID) return;
  
  window.gtag('event', eventName, {
    ...parameters,
    page_title: document.title,
    page_location: window.location.href,
  });
  
  console.log(`📊 GA4 Event: ${eventName}`, parameters);
}

// Função para disparar eventos Meta Pixel
function trackMetaPixel(eventName, parameters = {}) {
  if (!window.fbq || !CONFIG.META_PIXEL_ID) return;
  
  window.fbq('track', eventName, parameters);
  
  console.log(`📱 Meta Pixel Event: ${eventName}`, parameters);
}

// ================= RASTREAMENTO AUTOMÁTICO =================

// 1. Scroll Depth Tracking
function initScrollTracking() {
  let maxScroll = 0;
  
  function checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    
    CONFIG.SCROLL_DEPTHS.forEach(depth => {
      if (scrollPercent >= depth && maxScroll < depth) {
        maxScroll = depth;
        trackGA4('scroll_depth', { scroll_depth: depth });
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll, { passive: true });
}

// 2. Time on Page Tracking
function initTimeTracking() {
  let startTime = Date.now();
  
  CONFIG.TIME_TRACKING.forEach(seconds => {
    setTimeout(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent >= seconds) {
        trackGA4('time_on_page', { time_seconds: seconds });
      }
    }, seconds * 1000);
  });
}

// ================= EVENTOS MANUAIS =================

// Funções para chamar manualmente nos componentes
export const tracking = {
  // WhatsApp click
  whatsappClick: () => {
    trackGA4('whatsapp_click', {
      method: 'button',
      location: 'floating_button'
    });
    trackMetaPixel('Lead', {
      content_name: 'WhatsApp Contact',
      content_category: 'Lead Generation'
    });
  },
  
  // Form start
  formStart: () => {
    trackGA4('form_start', {
      form_name: 'lead_form',
      form_location: 'main_cta'
    });
    trackMetaPixel('ViewContent', {
      content_name: 'Lead Form',
      content_category: 'Form Interaction'
    });
  },
  
  // Lead submit
  leadSubmit: (formData = {}) => {
    trackGA4('lead', {
      form_name: 'lead_form',
      lead_type: 'contact_request',
      ...formData
    });
    trackMetaPixel('Lead', {
      content_name: 'Lead Form Submission',
      content_category: 'Lead Generation',
      value: formData.value || 0,
      currency: 'BRL'
    });
  },
  
  // Custom event
  customEvent: (eventName, parameters = {}) => {
    trackGA4(eventName, parameters);
  }
};

// ================= INICIALIZAÇÃO GERAL =================

// Função principal para inicializar tudo
export function initTracking() {
  // Inicializa todas as ferramentas
  initGA4();
  initMetaPixel();
  initHotjar();
  initMicrosoftClarity();
  
  // Inicializa rastreamento automático
  initScrollTracking();
  initTimeTracking();
  
  console.log('🚀 Todos os trackings inicializados');
}

// ================= EXPORT =================
export default tracking;