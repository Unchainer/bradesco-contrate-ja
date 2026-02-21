import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Quero proteger meu patrimônio com um seguro Bradesco.";

const CTASection = () => {
  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-bradesco rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto"
        >
          <ShieldCheck className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Não deixe para depois.
          </h2>
          <p className="text-lg text-primary-foreground/85 mb-8 max-w-xl mx-auto">
            Proteja sua casa, seu negócio, seu carro e sua família com a segurança Bradesco Seguros. Fale agora com nosso especialista!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold text-base"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Quero Minha Cotação
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
