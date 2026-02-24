import { HelpCircle, FileWarning, DollarSign, Clock, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const faqs = [
  {
    icon: HelpCircle,
    question: "O que é franquia no seguro?",
    answer: "A franquia é o valor que o segurado paga em caso de sinistro parcial. É como uma participação no custo do reparo. Quanto maior a franquia, menor o valor do seguro.",
  },
  {
    icon: FileWarning,
    question: "Como funciona o sinistro?",
    answer: "Sinistro é quando o evento coberto pelo seguro acontece (roubo, acidente, incêndio). Você aciona a seguradora, apresenta documentos e recebe a indenização conforme a apólice.",
  },
  {
    icon: DollarSign,
    question: "Quanto custa um seguro?",
    answer: "O valor varia conforme o tipo de seguro, cobertura, perfil do segurado e bem protegido. Peça uma cotação sem compromisso pelo WhatsApp!",
  },
  {
    icon: Clock,
    question: "Qual o prazo de vigência?",
    answer: "A maioria dos seguros tem vigência de 12 meses (1 ano). Ao final, é possível renovar com condições atualizadas.",
  },
  {
    icon: FileText,
    question: "Quais documentos preciso?",
    answer: "Geralmente: RG/CPF, comprovante de endereço e informações sobre o bem a ser segurado. Para auto, também CNH e documento do veículo.",
  },
  {
    icon: AlertTriangle,
    question: "O que NÃO é coberto?",
    answer: "Cada apólice tem exclusões específicas. Danos intencionais, desgaste natural e eventos não contratados são exemplos comuns. Consulte sempre sua apólice.",
  },
];

const FAQSection = () => {
  return (
    <section id="duvidas" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entenda os principais conceitos de seguros de forma simples e direta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="h-full hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                <CardContent className="p-6">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <faq.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
