import { useState, useEffect, useRef } from "react";
import { X, Send, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { trackQuoteSubmit, trackWhatsAppClick } from "@/lib/pixel";
import { supabase } from "@/integrations/supabase/client";

const INSURANCE_OPTIONS = [
  "Residencial",
  "Empresarial",
  "Automobilístico",
  "Equipamentos de Trabalho",
  "Ramo Alimentício",
  "Outros",
];

const FloatingQuoteForm = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const triggered = useRef(false);

  // Show after user scrolls past 50% of the page
  useEffect(() => {
    const handleScroll = () => {
      if (triggered.current || dismissed) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? scrollY / docHeight : 0;
      if (percent >= 0.5) {
        triggered.current = true;
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !insuranceType) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      await supabase.from("leads").insert({
        name: name.trim(),
        phone: phone.trim(),
        insurance_type: insuranceType,
        source: "floating_form",
      });
    } catch {
      // silently continue — WhatsApp redirect is the primary action
    }

    const msg = encodeURIComponent(
      `Olá! Meu nome é ${name.trim()}, telefone ${phone.trim()}. Tenho interesse em Seguro ${insuranceType}. Pode me ajudar?`
    );
    trackQuoteSubmit(insuranceType);
    trackWhatsAppClick("floating_form");
    window.open(`https://wa.me/5527999759155?text=${msg}`, "_blank");
    setSaving(false);
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      setDismissed(true);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating-form"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="fixed bottom-24 left-4 z-50 w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border border-border bg-card"
        >
          {/* Header */}
          <div className="gradient-bradesco px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              <span className="font-display font-bold text-sm text-primary-foreground">
                Cotação Rápida
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized((m) => !m)}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-0.5"
                aria-label={minimized ? "Expandir" : "Minimizar"}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${minimized ? "rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={handleDismiss}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-0.5"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <AnimatePresence initial={false}>
            {!minimized && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  {submitted ? (
                    <div className="flex flex-col items-center gap-2 py-4 text-center">
                      <ShieldCheck className="h-10 w-10 text-primary" />
                      <p className="font-display font-semibold text-sm text-foreground">
                        Abrindo o WhatsApp…
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Em breve nosso corretor entrará em contato!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-snug mb-1">
                        Receba uma cotação personalizada em minutos pelo WhatsApp.
                      </p>
                      <Input
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Telefone com DDD"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={20}
                        className="h-9 text-sm"
                      />
                      <select
                        value={insuranceType}
                        onChange={(e) => setInsuranceType(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Tipo de seguro…</option>
                        {INSURANCE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="submit"
                        size="sm"
                        className="w-full font-display font-bold text-xs"
                      >
                        Solicitar pelo WhatsApp
                        <Send className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingQuoteForm;
