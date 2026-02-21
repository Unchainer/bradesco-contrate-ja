import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de uma cotação de seguro.";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative pt-16 overflow-hidden">
      <div className="gradient-bradesco">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Corretor Autorizado Bradesco Seguros</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
                Proteja o que é seu.{" "}
                <span className="opacity-90">Seguros sob medida com a confiança Bradesco.</span>
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
                Residencial, empresarial, automobilístico e muito mais. Receba uma proposta personalizada em minutos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold text-base"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Fale com um Especialista
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-semibold"
                >
                  <a href="#seguros">Ver Seguros</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z" fill="hsl(0 0% 100%)" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
