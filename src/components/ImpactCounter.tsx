import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ShieldCheck, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Clientes Atendidos" },
  { icon: ShieldCheck, value: 1800, suffix: "+", label: "Seguros Ativos" },
  { icon: Award, value: 15, suffix: " anos", label: "De Experiência" },
  { icon: TrendingUp, value: 3, suffix: "M+", label: "Em Economias Geradas" },
];

function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
      {active ? count.toLocaleString("pt-BR") : "0"}
      {active && count >= target ? suffix : ""}
    </span>
  );
}

const ImpactCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 gradient-bradesco">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 text-primary-foreground/70 mx-auto mb-3" />
              <AnimatedNumber target={stat.value} suffix={stat.suffix} active={isInView} />
              <p className="text-primary-foreground/80 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;
