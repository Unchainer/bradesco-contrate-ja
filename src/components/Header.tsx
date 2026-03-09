import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Shield, Home, Building2, Car, Wrench, UtensilsCrossed,
  Briefcase, ChevronDown, MessageCircle, Phone, HelpCircle, Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/pixel";

const WHATSAPP_BASE = "https://wa.me/5527999759155?text=";
const WHATSAPP_URL  = WHATSAPP_BASE + encodeURIComponent("Olá! Gostaria de saber mais sobre seguros.");

/* ── Seguros mega-menu items ───────────────────────────── */
const insuranceItems = [
  { icon: Home,            label: "Seguro Residencial",      desc: "Casa e apartamento",             msg: "Seguro Residencial" },
  { icon: Building2,       label: "Seguro Empresarial",      desc: "Comércio e escritório",           msg: "Seguro Empresarial" },
  { icon: Car,             label: "Seguro Automobilístico",  desc: "Cobertura veicular completa",     msg: "Seguro Automobilístico" },
  { icon: Wrench,          label: "Equipamentos",            desc: "Máquinas e ferramentas",          msg: "Seguro de Equipamentos" },
  { icon: UtensilsCrossed, label: "Ramo Alimentício",        desc: "Restaurantes e food trucks",      msg: "Seguro Ramo Alimentício" },
  { icon: Briefcase,       label: "Outros Ramos",            desc: "Vida, saúde e viagem",            msg: "Outros Seguros" },
];

/* ── Main nav items ────────────────────────────────────── */
const navItems = [
  { label: "Início",     href: "#inicio",    icon: Home      },
  { label: "Como funciona", href: "#como-funciona", icon: Info },
  { label: "Dúvidas",   href: "#duvidas",   icon: HelpCircle },
  { label: "Contato",   href: "#contato",   icon: Phone      },
];

/* ── Active-section detector ───────────────────────────── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

const Header = () => {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [scrolled, setScrolled]          = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  /* shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mega on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setInsuranceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sectionIds = ["inicio", "seguros", "como-funciona", "depoimentos", "duvidas", "contato"];
  const active = useActiveSection(sectionIds);

  const isActive = (href: string) => active === href.replace("#", "");

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/98 backdrop-blur-md shadow-md border-b border-border"
            : "bg-background/95 backdrop-blur-sm border-b border-border/50"
        }`}
        style={{ marginTop: 3 }}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">

          {/* ── Logo ── */}
          <a href="#inicio" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-bradesco flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-base text-foreground leading-none block">
                Renifer J. Ferreira
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                Corretor Bradesco Seguros
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1">

            <a
              href="#inicio"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("#inicio")
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Início
            </a>

            {/* Seguros mega-trigger */}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => setInsuranceOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  insuranceOpen || isActive("#seguros")
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                Seguros
                <motion.span animate={{ rotate: insuranceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              {/* Mega menu panel */}
              <AnimatePresence>
                {insuranceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Header strip */}
                    <div className="gradient-bradesco px-5 py-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary-foreground/80" />
                      <span className="font-display font-bold text-sm text-primary-foreground">
                        Nossos Seguros
                      </span>
                      <span className="ml-auto text-xs text-primary-foreground/60">
                        Clique para solicitar cotação
                      </span>
                    </div>

                    {/* Grid of items */}
                    <div className="grid grid-cols-2 gap-px bg-border p-px">
                      {insuranceItems.map((item) => (
                        <a
                          key={item.label}
                          href={`${WHATSAPP_BASE}${encodeURIComponent(`Olá! Tenho interesse no ${item.msg}. Pode me ajudar?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { setInsuranceOpen(false); trackWhatsAppClick(`mega_${item.msg}`); }}
                          className="flex items-center gap-3 bg-card px-4 py-3.5 hover:bg-accent transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                            <item.icon className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-none mb-0.5">
                              {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-5 py-3 bg-muted/40 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Não sabe qual seguro escolher?
                      </span>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { setInsuranceOpen(false); trackWhatsAppClick("mega_footer"); }}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        Fale com um especialista <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:+5527999759155`}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              (27) 99975-9155
            </a>
            <Button
              asChild size="sm"
              className="font-display font-bold shadow-sm"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("header_cta")}
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                Solicitar Cotação
              </a>
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE FULL-SCREEN DRAWER
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-foreground/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-[85vw] max-w-sm bg-background flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl gradient-bradesco flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-foreground leading-none">Renifer J. Ferreira</p>
                    <p className="text-[10px] text-muted-foreground">Corretor Bradesco Seguros</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

                {/* Main links */}
                {[{ label: "Início", href: "#inicio", icon: Home }, ...navItems.slice(1)].map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-accent text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    {item.label}
                    {isActive(item.href) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </motion.a>
                ))}

                {/* Seguros section */}
                <div className="pt-3 pb-1">
                  <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Seguros
                  </p>
                  {insuranceItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={`${WHATSAPP_BASE}${encodeURIComponent(`Olá! Tenho interesse no ${item.msg}. Pode me ajudar?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      onClick={() => { setMobileOpen(false); trackWhatsAppClick(`mobile_${item.msg}`); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <item.icon className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground leading-none truncate">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-40 group-hover:opacity-100 flex-shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Drawer footer CTAs */}
              <div className="border-t border-border px-4 py-4 space-y-3">
                <a
                  href="tel:+5527999759155"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  (27) 99975-9155
                </a>
                <Button
                  asChild
                  className="w-full font-display font-bold"
                  onClick={() => { setMobileOpen(false); trackWhatsAppClick("mobile_cta"); }}
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Solicitar Cotação pelo WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
