import { Home, Building2, Car, Wrench, UtensilsCrossed, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5527999759155?text=Olá! Tenho interesse no seguro: ";

const insuranceTypes = [
  {
    icon: Home,
    title: "Seguro Residencial",
    description: "Proteção completa para casa e apartamento contra incêndio, roubo, danos elétricos e mais.",
    whatsappMsg: "Seguro Residencial",
  },
  {
    icon: Building2,
    title: "Seguro Empresarial",
    description: "Proteja seu negócio, comércio ou escritório com coberturas sob medida para sua empresa.",
    whatsappMsg: "Seguro Empresarial",
  },
  {
    icon: Car,
    title: "Seguro Automobilístico",
    description: "Proteção veicular completa com assistência 24h, cobertura contra terceiros e mais.",
    whatsappMsg: "Seguro Automobilístico",
  },
  {
    icon: Wrench,
    title: "Equipamentos de Trabalho",
    description: "Seguro para máquinas, ferramentas e instrumentos essenciais ao seu trabalho.",
    whatsappMsg: "Seguro de Equipamentos",
  },
  {
    icon: UtensilsCrossed,
    title: "Ramo Alimentício",
    description: "Cobertura especializada para restaurantes, food trucks e indústria alimentícia.",
    whatsappMsg: "Seguro Ramo Alimentício",
  },
  {
    icon: Briefcase,
    title: "Outros Ramos",
    description: "Seguro de vida, saúde, viagem e soluções personalizadas para suas necessidades.",
    whatsappMsg: "Outros Seguros",
  },
];

const InsuranceTypes = () => {
  return (
    <section id="seguros" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            Nossas Soluções
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Seguros
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Coberturas completas para cada necessidade. Escolha a proteção ideal e receba uma cotação personalizada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {insuranceTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="h-full border-border/60 bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 flex flex-col h-full">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                  >
                    <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{item.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full mt-auto group-hover:border-primary group-hover:text-primary transition-colors duration-200">
                    <a
                      href={`${WHATSAPP_URL}${encodeURIComponent(item.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saiba Mais
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceTypes;
