import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShieldCheck, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/5527999759155?text=Olá! Quero proteger meu patrimônio com um seguro Bradesco.";

const insuranceOptions = [
  "Residencial",
  "Empresarial",
  "Automobilístico",
  "Equipamentos de Trabalho",
  "Ramo Alimentício",
  "Outros",
];

const CTASection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !insuranceType) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${name.trim()}, telefone ${phone.trim()}. Tenho interesse em Seguro ${insuranceType}. Pode me ajudar?`
    );
    window.open(`https://wa.me/5527999759155?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setInsuranceType("");
    }, 4000);
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-bradesco rounded-2xl p-10 md:p-16 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: CTA text */}
            <div className="text-center md:text-left">
              <ShieldCheck className="h-12 w-12 text-primary-foreground/80 mx-auto md:mx-0 mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
                Não deixe para depois.
              </h2>
              <p className="text-lg text-primary-foreground/85 mb-8">
                Proteja sua casa, seu negócio, seu carro e sua família com a segurança Bradesco Seguros. Fale agora com nosso especialista!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold text-base"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Fale pelo WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Right: Quick quote form */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-4 text-center">
                Cotação Rápida
              </h3>
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-8 text-primary-foreground">
                  <CheckCircle className="h-12 w-12" />
                  <p className="font-display font-semibold text-lg">Redirecionando ao WhatsApp!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="bg-primary-foreground/90 border-0 text-foreground placeholder:text-muted-foreground"
                  />
                  <Input
                    placeholder="Telefone com DDD"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                    className="bg-primary-foreground/90 border-0 text-foreground placeholder:text-muted-foreground"
                  />
                  <select
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                    className="flex h-10 w-full rounded-md bg-primary-foreground/90 px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Tipo de Seguro</option>
                    {insuranceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold"
                  >
                    Solicitar Cotação
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
