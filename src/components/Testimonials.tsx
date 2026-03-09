import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Maria Souza",
    role: "Seguro Residencial",
    city: "Vila Velha, ES",
    text: "Contratei o seguro da minha casa com o Renifer e foi tudo muito rápido. Em menos de 24h já estava coberta. Atendimento nota 10!",
    stars: 5,
    initial: "MS",
    color: "hsl(0 85% 45%)",
  },
  {
    name: "Carlos Roberto Lima",
    role: "Seguro Empresarial",
    city: "Vitória, ES",
    text: "Proteção completa para meu restaurante. O Renifer entendeu exatamente o que eu precisava e encontrou o melhor custo-benefício.",
    stars: 5,
    initial: "CL",
    color: "hsl(220 70% 50%)",
  },
  {
    name: "Ana Paula Mendes",
    role: "Seguro Automobilístico",
    city: "Serra, ES",
    text: "Processo simples e rápido. Quando precisei da assistência 24h, fui atendida na hora. Confio 100% no trabalho do Renifer!",
    stars: 5,
    initial: "AM",
    color: "hsl(142 60% 40%)",
  },
  {
    name: "Roberto Machado",
    role: "Equipamentos de Trabalho",
    city: "Cariacica, ES",
    text: "Segurei minhas ferramentas de trabalho e fico tranquilo sabendo que estão protegidas. O Renifer explicou tudo com paciência.",
    stars: 5,
    initial: "RM",
    color: "hsl(35 90% 50%)",
  },
  {
    name: "Fernanda Costa",
    role: "Seguro Residencial",
    city: "Guarapari, ES",
    text: "Nunca pensei que contratar um seguro fosse tão fácil! O atendimento foi super personalizado e o preço ficou dentro do meu orçamento.",
    stars: 5,
    initial: "FC",
    color: "hsl(270 60% 50%)",
  },
  {
    name: "Paulo Henrique Alves",
    role: "Ramo Alimentício",
    city: "Cachoeiro, ES",
    text: "Meu food truck agora está 100% protegido. O Renifer foi extremamente atencioso e me deu a melhor cotação que encontrei.",
    stars: 5,
    initial: "PA",
    color: "hsl(180 60% 40%)",
  },
];

const VISIBLE = 3; // cards visible at once on desktop
const AUTO_DELAY = 4500;

const AnimatedStars = ({ count, delay = 0 }: { count: number; delay?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + i * 0.07, type: "spring", stiffness: 300 }}
      >
        <Star
          className={`h-4 w-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
        />
      </motion.div>
    ))}
  </div>
);

const AvatarInitials = ({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) => (
  <div
    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0 shadow-md"
    style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
  >
    {initials}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((c) => (c + dir + total) % total);
    },
    [total]
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTO_DELAY);
    return () => clearInterval(id);
  }, [go, paused]);

  // Which indices are visible (wrap-around)
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total);

  return (
    <section id="depoimentos" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Confiança comprovada por quem já se protegeu.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards grid — desktop shows 3, mobile shows 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[280px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleIndices.map((idx, pos) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 80, scale: 0.94 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    className={`flex flex-col ${pos > 0 ? "hidden md:flex" : "flex"}`}
                  >
                    <div className="flex-1 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden p-6 flex flex-col">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-accent rounded-bl-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Quote icon */}
                      <Quote className="h-7 w-7 text-primary/20 group-hover:text-primary/40 transition-colors duration-300 mb-3 relative z-10" />

                      {/* Text */}
                      <p className="text-sm text-muted-foreground mb-5 flex-1 italic leading-relaxed relative z-10">
                        "{t.text}"
                      </p>

                      {/* Stars */}
                      <div className="mb-4 relative z-10">
                        <AnimatedStars count={t.stars} delay={pos * 0.1} />
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3 relative z-10">
                        <AvatarInitials initials={t.initial} color={t.color} />
                        <div>
                          <p className="font-display font-bold text-sm text-foreground leading-none mb-0.5">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                          <p className="text-xs text-muted-foreground/70">{t.city}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300"
                  aria-label={`Ir para depoimento ${i + 1}`}
                >
                  <motion.div
                    animate={{
                      width: i === current ? 24 : 8,
                      backgroundColor: i === current ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                    className="h-2 rounded-full"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-sm"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Auto-progress bar */}
          <div className="mt-4 max-w-xs mx-auto h-0.5 bg-border rounded-full overflow-hidden">
            {!paused && (
              <motion.div
                key={current}
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
              />
            )}
          </div>
        </div>

        {/* Trust summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14"
        >
          {[
            { value: "4.9 / 5", label: "Avaliação média" },
            { value: "+200", label: "Clientes satisfeitos" },
            { value: "100%", label: "Recomendam o corretor" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
