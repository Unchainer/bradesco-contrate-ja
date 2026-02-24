import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Maria Souza",
    role: "Seguro Residencial",
    city: "Vila Velha, ES",
    text: "Contratei o seguro da minha casa com o Renifer e foi tudo muito rápido. Em menos de 24h já estava coberta. Atendimento nota 10!",
    stars: 5,
    initial: "M",
  },
  {
    name: "Carlos Roberto Lima",
    role: "Seguro Empresarial",
    city: "Vitória, ES",
    text: "Proteção completa para meu restaurante. O Renifer entendeu exatamente o que eu precisava e encontrou o melhor custo-benefício.",
    stars: 5,
    initial: "C",
  },
  {
    name: "Ana Paula Mendes",
    role: "Seguro Automobilístico",
    city: "Serra, ES",
    text: "Processo simples e rápido. Quando precisei da assistência 24h, fui atendida na hora. Confio 100% no trabalho do Renifer!",
    stars: 5,
    initial: "A",
  },
  {
    name: "Roberto Machado",
    role: "Equipamentos de Trabalho",
    city: "Cariacica, ES",
    text: "Segurei minhas ferramentas de trabalho e fico tranquilo sabendo que estão protegidas. O Renifer explicou tudo com paciência.",
    stars: 5,
    initial: "R",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent rounded-bl-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  <Quote className="h-7 w-7 text-primary/20 group-hover:text-primary/40 transition-colors duration-300 mb-3" />
                  <p className="text-sm text-muted-foreground mb-5 flex-1 italic leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + si * 0.06 }}
                        viewport={{ once: true }}
                      >
                        <Star
                          className={`h-4 w-4 ${si < t.stars ? "text-primary fill-primary" : "text-border"}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-bradesco flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-sm font-display font-bold">
                        {t.initial}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role} · {t.city}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
