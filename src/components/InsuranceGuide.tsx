import { motion, useMotionValue, useTransform } from "framer-motion";
import { FileText, DollarSign, PhoneCall, Shield } from "lucide-react";

const guides = [
  {
    icon: FileText,
    gradient: "from-primary to-primary/70",
    accentColor: "bg-accent",
    title: "O que é uma Apólice?",
    subtitle: "Seu contrato de proteção",
    description:
      "A apólice é o contrato oficial do seu seguro. Nela constam todas as coberturas contratadas, prazos de vigência e condições gerais. É o documento mais importante — guarde sempre uma cópia digital e física.",
    tip: "Dica: verifique todas as coberturas antes de assinar.",
  },
  {
    icon: DollarSign,
    gradient: "from-primary/80 to-primary/50",
    accentColor: "bg-accent",
    title: "O que é Franquia?",
    subtitle: "Sua participação no sinistro",
    description:
      "Franquia é o valor que você co-participa em caso de sinistro parcial. Quanto maior a franquia que você escolhe, menor será o valor mensal pago. É uma forma de personalizar o custo-benefício do seu seguro.",
    tip: "Dica: escolha a franquia de acordo com seu perfil de risco.",
  },
  {
    icon: PhoneCall,
    gradient: "from-primary/70 to-primary/40",
    accentColor: "bg-accent",
    title: "Como Acionar o Seguro?",
    subtitle: "Quando o imprevisto acontece",
    description:
      "Em caso de sinistro (roubo, acidente ou incêndio), ligue imediatamente para a central da seguradora ou use o app. Tenha em mãos sua apólice, documentos pessoais e registre um boletim de ocorrência se necessário.",
    tip: "Dica: salve o número da central na agenda do celular.",
  },
  {
    icon: Shield,
    gradient: "from-primary/60 to-primary/30",
    accentColor: "bg-accent",
    title: "Tipos de Cobertura",
    subtitle: "Personalize sua proteção",
    description:
      "Coberturas variam por modalidade: incêndio, roubo, danos elétricos, responsabilidade civil, assistência 24h e muito mais. Você escolhe quais riscos deseja cobrir e pagará apenas pelo que contratar.",
    tip: "Dica: coberturas adicionais aumentam sua proteção.",
  },
];

const GuideCard = ({ guide, i }: { guide: (typeof guides)[0]; i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [8, -8]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className="group cursor-default"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
        {/* Colored top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${guide.gradient}`} />

        {/* Icon area */}
        <div className="relative p-6 pb-0">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${guide.gradient} shadow-md mb-4`}>
            <guide.icon className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {guide.subtitle}
          </span>
          <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
            {guide.title}
          </h3>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {guide.description}
          </p>
          <div className="flex items-start gap-2 bg-accent rounded-lg px-3 py-2">
            <span className="text-primary mt-0.5">💡</span>
            <p className="text-xs text-accent-foreground font-medium">{guide.tip}</p>
          </div>
        </div>

        {/* Hover shine effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl" />
      </div>
    </motion.div>
  );
};

const InsuranceGuide = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            Educação em Seguros
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Guia Visual de Seguros
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entenda os principais conceitos de seguros de forma simples, visual e sem complicação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {guides.map((guide, i) => (
            <GuideCard key={guide.title} guide={guide} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceGuide;
