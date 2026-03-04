import { motion } from "framer-motion";
import { ShieldCheck, Award, Star, BadgeCheck } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "Corretor SUSEP",
    sub: "Habilitado pela SUSEP",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: BadgeCheck,
    label: "Bradesco Seguros",
    sub: "Parceiro Autorizado Oficial",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: Award,
    label: "+10 Anos",
    sub: "de Experiência no Mercado",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: Star,
    label: "4.9 / 5 ★",
    sub: "Avaliação dos Clientes",
    color: "text-primary",
    bg: "bg-accent",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-10 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Reconhecimento & Credenciais
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center`}>
                <b.icon className={`h-6 w-6 ${b.color}`} />
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-foreground text-base">{b.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bradesco brand strip */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-xs uppercase tracking-widest">Produtos comercializados por</span>
          <span className="font-display font-extrabold text-primary text-lg tracking-tight">
            Bradesco Seguros
          </span>
          <span className="text-xs text-muted-foreground/40">•</span>
          <span className="font-display font-bold text-foreground/60 text-sm">
            Bradesco Vida e Previdência
          </span>
          <span className="text-xs text-muted-foreground/40">•</span>
          <span className="font-display font-bold text-foreground/60 text-sm">
            Bradesco Auto/RE
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
