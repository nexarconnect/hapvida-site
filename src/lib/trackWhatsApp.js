import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

export function trackWhatsAppClick({ placement = "unknown" } = {}) {
  // GA4
  ReactGA.event({
    category: "engagement",
    action: "whatsapp_click",
    label: placement,
  });

  // Meta Pixel
  // Recomendo "Lead" para clique no WhatsApp (intenção forte)
  ReactPixel.track("Lead", { placement });
}