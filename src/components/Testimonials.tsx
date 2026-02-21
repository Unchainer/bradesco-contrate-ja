import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Maria S.",
    role: "Seguro Residencial",
    text: "Atendimento excelente! Consegui o seguro da minha casa em menos de 24h. Super recomendo!",
    stars: 5,
  },
  {
    name: "Carlos R.",
    role: "Seguro Empresarial",
    text: "Proteção completa para meu restaurante. O corretor entendeu exatamente o que eu precisava.",
    stars: 5,
  },
  {
    name: "Ana P.",
    role: "Seguro Auto",
    text: "Processo simples e rápido. Quando precisei da assistência, fui atendida na hora. Bradesco não decepciona!",
    stars: 5,
  },
  {
    name: "Roberto M.",
    role: "Equipamentos de Trabalho",
    text: "Segurei minhas ferramentas de trabalho e fico tranquilo sabendo que estão protegidas. Ótimo custo-benefício.",
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">Confiança comprovada por quem já se protegeu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-6 w-6 text-primary/30 mb-3" />
                  <p className="text-sm text-muted-foreground mb-4 flex-1 italic">"{t.text}"</p>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-4 w-4 ${si < t.stars ? "text-primary fill-primary" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <p className="font-display font-bold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
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
