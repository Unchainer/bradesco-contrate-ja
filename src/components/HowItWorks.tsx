import { MessageCircle, ClipboardList, FileCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    title: "Entre em contato",
    description: "Fale conosco pelo WhatsApp de forma rápida e prática.",
  },
  {
    icon: ClipboardList,
    title: "Informe suas necessidades",
    description: "Conte o que você precisa proteger e tire suas dúvidas.",
  },
  {
    icon: FileCheck,
    title: "Receba sua proposta",
    description: "Enviamos uma cotação personalizada e sem compromisso.",
  },
  {
    icon: ShieldCheck,
    title: "Feche com tranquilidade",
    description: "Contrate seu seguro anual com a confiança Bradesco.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            Processo Simples
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Em 4 passos simples, você garante a proteção que precisa.
          </p>
        </motion.div>

        {/* Connector line (desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-px bg-border z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="text-center group"
            >
              <div className="relative mx-auto w-16 h-16 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-full gradient-bradesco flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </motion.div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-primary text-primary text-xs font-display font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
