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
    <section ref={ref} className="py-20 gradient-bradesco relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-widest">
            Nossos números falam por si
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-center group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-foreground/20 transition-colors duration-300">
                <stat.icon className="h-7 w-7 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <AnimatedNumber target={stat.value} suffix={stat.suffix} active={isInView} />
              <p className="text-primary-foreground/75 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;
