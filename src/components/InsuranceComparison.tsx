import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const coverages = [
  "Incêndio / Explosão",
  "Roubo / Furto",
  "Danos Elétricos",
  "Responsabilidade Civil",
  "Assistência 24h",
  "Quebra de Vidros",
  "Vendaval / Granizo",
  "Perda de Aluguel",
  "Equipamentos",
  "Lucros Cessantes",
];

type Coverage = "yes" | "partial" | "no";

const plans: {
  name: string;
  color: string;
  badge?: string;
  coverages: Coverage[];
}[] = [
  {
    name: "Residencial",
    color: "hsl(var(--primary))",
    coverages: ["yes","yes","yes","yes","yes","yes","yes","yes","no","no"],
  },
  {
    name: "Empresarial",
    color: "hsl(220 70% 50%)",
    badge: "Mais completo",
    coverages: ["yes","yes","yes","yes","yes","yes","yes","yes","partial","yes"],
  },
  {
    name: "Automóvel",
    color: "hsl(142 60% 40%)",
    coverages: ["yes","yes","no","yes","yes","no","yes","no","no","no"],
  },
  {
    name: "Equipamentos",
    color: "hsl(35 90% 50%)",
    coverages: ["yes","yes","yes","partial","yes","no","yes","no","yes","no"],
  },
  {
    name: "Alimentício",
    color: "hsl(270 60% 50%)",
    coverages: ["yes","yes","yes","yes","yes","yes","yes","partial","yes","yes"],
  },
];

const CoverageCell = ({ value, color }: { value: Coverage; color: string }) => {
  if (value === "yes")
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}22`, border: `1.5px solid ${color}` }}
      >
        <Check className="h-3.5 w-3.5" style={{ color }} strokeWidth={2.5} />
      </motion.div>
    );
  if (value === "partial")
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-7 h-7 rounded-full flex items-center justify-center bg-muted border border-border"
      >
        <Minus className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2.5} />
      </motion.div>
    );
  return (
    <span className="mx-auto block w-2 h-2 rounded-full bg-border" />
  );
};

const InsuranceComparison = () => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <section id="comparativo" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            Compare
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que cada seguro cobre?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compare as coberturas e encontre o seguro ideal para você.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-primary" /> Incluso
          </span>
          <span className="flex items-center gap-1.5">
            <Minus className="h-4 w-4 text-muted-foreground" /> Opcional / Parcial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-border inline-block" /> Não incluso
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border shadow-xl bg-card"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-4 text-sm font-semibold text-muted-foreground bg-muted/40 w-[200px]">
                  Cobertura
                </th>
                {plans.map((plan, ci) => (
                  <th
                    key={plan.name}
                    className="px-3 py-4 text-center relative cursor-pointer transition-colors"
                    style={{ backgroundColor: hoveredCol === ci ? `${plan.color}0d` : undefined }}
                    onMouseEnter={() => setHoveredCol(ci)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {plan.badge && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: plan.color }}
                        >
                          {plan.badge}
                        </span>
                      )}
                      <span
                        className="font-display font-bold text-sm"
                        style={{ color: plan.color }}
                      >
                        {plan.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coverages.map((cov, ri) => (
                <tr
                  key={cov}
                  className={`border-b border-border/50 transition-colors ${
                    ri % 2 === 0 ? "bg-card" : "bg-muted/20"
                  }`}
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                    {cov}
                  </td>
                  {plans.map((plan, ci) => (
                    <td
                      key={plan.name}
                      className="px-3 py-3.5 text-center transition-colors"
                      style={{
                        backgroundColor: hoveredCol === ci ? `${plan.color}0a` : undefined,
                      }}
                    >
                      <CoverageCell value={plan.coverages[ri]} color={plan.color} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer CTA */}
          <div className="px-6 py-5 bg-muted/30 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Não sabe qual escolher? Nosso especialista te orienta gratuitamente.
            </p>
            <a
              href="https://wa.me/5527999759155?text=Olá! Preciso de ajuda para escolher o seguro ideal."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-display font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              Falar com especialista
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceComparison;
