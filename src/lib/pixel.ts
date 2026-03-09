// Meta Pixel helper
// Replace PLACEHOLDER_PIXEL_ID with your actual Pixel ID from Meta Business Suite
// e.g. "1234567890123456"
const PIXEL_ID = "PLACEHOLDER_PIXEL_ID";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export function initPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return; // already loaded

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}

/** Call when user clicks any WhatsApp button */
export function trackWhatsAppClick(source = "button") {
  trackEvent("Contact", { source, channel: "whatsapp" });
  trackEvent("Lead", { source, channel: "whatsapp" });
}

/** Call when user sends a chatbot message */
export function trackChatbotMessage() {
  trackEvent("CustomEvent", { event_name: "ChatbotMessage" });
}

/** Call when quote form is submitted */
export function trackQuoteSubmit(insuranceType: string) {
  trackEvent("Lead", { content_name: insuranceType, channel: "quote_form" });
}
