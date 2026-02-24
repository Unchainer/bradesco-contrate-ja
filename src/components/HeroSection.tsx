import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WHATSAPP_URL = "https://wa.me/5527999759155?text=Olá! Gostaria de uma cotação de seguro.";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative pt-16 overflow-hidden">
      <motion.div style={{ y }} className="gradient-bradesco relative">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none"
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div style={{ opacity }} className="container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/25 rounded-full px-4 py-1.5 mb-8"
              >
                <Shield className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground tracking-wide">
                  Corretor Autorizado Bradesco Seguros
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Proteja o que é seu.{" "}
                <span className="opacity-85">
                  Seguros sob medida com a confiança Bradesco.
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                Residencial, empresarial, automobilístico e muito mais. Receba uma proposta
                personalizada em minutos.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold text-base shadow-lg"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Fale com um Especialista
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-semibold"
                  >
                    <a href="#seguros">Ver Seguros</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
              href="#seguros"
              className="inline-flex flex-col items-center gap-1 mt-14 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z"
              fill="hsl(0 0% 100%)"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
