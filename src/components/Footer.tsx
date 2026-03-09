import { Shield, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5527999759155?text=Olá! Gostaria de saber mais sobre seguros.";

const quickLinks = [
  { label: "Início",             href: "#inicio"        },
  { label: "Nossos Seguros",     href: "#seguros"       },
  { label: "Compare Coberturas", href: "#comparativo"   },
  { label: "Como Funciona",      href: "#como-funciona" },
  { label: "Depoimentos",        href: "#depoimentos"   },
  { label: "Dúvidas Frequentes", href: "#duvidas"       },
  { label: "Solicitar Cotação",  href: "#contato"       },
];

const insuranceLinks = [
  { label: "Seguro Residencial",     msg: "Seguro Residencial"     },
  { label: "Seguro Empresarial",     msg: "Seguro Empresarial"     },
  { label: "Seguro Automobilístico", msg: "Seguro Automobilístico" },
  { label: "Equipamentos",           msg: "Seguro de Equipamentos" },
  { label: "Ramo Alimentício",       msg: "Seguro Ramo Alimentício"},
  { label: "Outros Ramos",           msg: "Outros Seguros"         },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:text-pink-400",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:text-blue-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "hover:text-sky-400",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground/70">
      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bradesco flex items-center justify-center shadow">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-bold text-primary-foreground leading-none text-base">
                  Renifer J. Ferreira
                </p>
                <p className="text-[10px] text-primary-foreground/50 font-medium tracking-wide">
                  Corretor Bradesco Seguros
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5">
              Corretor autorizado Bradesco Seguros. Proteção e tranquilidade para você, sua família e seu negócio.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center transition-colors duration-200 hover:bg-primary-foreground/20 ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-widest mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary-foreground hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Insurance Types */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-widest mb-5">
              Seguros
            </h4>
            <ul className="space-y-2.5">
              {insuranceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={`https://wa.me/5527999759155?text=${encodeURIComponent(`Olá! Tenho interesse no ${item.msg}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary-foreground inline-flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-widest mb-5">
              Contato
            </h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+5527999759155"
                  className="hover:text-primary-foreground transition-colors"
                >
                  (27) 99975-9155
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  WhatsApp direto
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contato@reniferferreira.com.br"
                  className="hover:text-primary-foreground transition-colors break-all"
                >
                  contato@reniferferreira.com.br
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Espírito Santo, Brasil</span>
              </li>
            </ul>

            {/* CTA button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-display font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Solicitar Cotação
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-primary-foreground/10" />

      {/* ── Bottom bar ── */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-1 text-center">
            <span>© {year} Renifer J. Ferreira — Corretor Bradesco Seguros. Todos os direitos reservados.</span>
            <span className="hidden sm:block">·</span>
            <span>CNPJ: 00.000.000/0001-00</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Corretor habilitado pela SUSEP</span>
            <a
              href="https://www2.susep.gov.br/safe/buscarCorretorForm.do"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary-foreground/70 transition-colors"
            >
              Verificar SUSEP <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
