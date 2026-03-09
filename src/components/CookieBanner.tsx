import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Check, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "cookie_consent";

type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
};

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Small delay so it doesn't pop immediately on page load
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const saveConsent = (analyticsVal: boolean, marketingVal: boolean) => {
    const consent: ConsentState = {
      essential: true,
      analytics: analyticsVal,
      marketing: marketingVal,
      decided: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setShow(false);
  };

  const acceptAll = () => saveConsent(true, true);
  const acceptEssential = () => saveConsent(false, false);
  const saveCustom = () => saveConsent(analytics, marketing);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[70] bg-card border-t border-border shadow-2xl"
        >
          <div className="container mx-auto px-4 py-4">
            {!showDetails ? (
              /* ── Simple view ── */
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none mb-1">
                      Usamos cookies 🍪
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Utilizamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies analíticos e de marketing.{" "}
                      <Link to="/politica-de-privacidade" className="text-primary hover:underline">
                        Saiba mais
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-2 transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5" /> Personalizar
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="text-xs font-medium text-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                  >
                    Só essenciais
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex items-center gap-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5" /> Aceitar todos
                  </button>
                </div>
              </div>
            ) : (
              /* ── Detailed view ── */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-primary" /> Preferências de Cookies
                  </h3>
                  <button onClick={() => setShowDetails(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {/* Essential */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                    <div className="mt-0.5 w-9 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-end px-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Essenciais</p>
                      <p className="text-[11px] text-muted-foreground">Sempre ativos. Necessários para o site funcionar.</p>
                    </div>
                  </div>
                  {/* Analytics */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border cursor-pointer" onClick={() => setAnalytics(v => !v)}>
                    <div className={`mt-0.5 w-9 h-5 rounded-full flex-shrink-0 flex items-center px-1 transition-colors ${analytics ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Analíticos</p>
                      <p className="text-[11px] text-muted-foreground">Medem audiência e comportamento de navegação.</p>
                    </div>
                  </div>
                  {/* Marketing */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border cursor-pointer" onClick={() => setMarketing(v => !v)}>
                    <div className={`mt-0.5 w-9 h-5 rounded-full flex-shrink-0 flex items-center px-1 transition-colors ${marketing ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Marketing</p>
                      <p className="text-[11px] text-muted-foreground">Meta Pixel para rastrear conversões de anúncios.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button onClick={acceptEssential} className="text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-2 transition-colors">
                    Só essenciais
                  </button>
                  <button onClick={saveCustom} className="text-xs font-bold bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors shadow-sm">
                    Salvar preferências
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
