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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Em 4 passos simples, você garante a proteção que precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full gradient-bradesco flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="text-2xl font-display font-bold text-primary mb-2">{i + 1}</div>
              <h3 className="font-display font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
