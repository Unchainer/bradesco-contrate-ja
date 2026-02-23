import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import infographicApolice from "@/assets/infographic-apolice.jpg";
import infographicFranquia from "@/assets/infographic-franquia.jpg";
import infographicSinistro from "@/assets/infographic-sinistro.jpg";
import infographicCoberturas from "@/assets/infographic-coberturas.jpg";

const guides = [
  {
    image: infographicApolice,
    title: "O que é uma Apólice?",
    description:
      "A apólice é o contrato do seu seguro. Nela estão todas as coberturas, valores, prazos e condições. É o documento mais importante — sempre guarde uma cópia!",
  },
  {
    image: infographicFranquia,
    title: "O que é Franquia?",
    description:
      "Franquia é a parte do custo que você paga em caso de sinistro parcial. Quanto maior a franquia escolhida, menor o valor mensal do seguro.",
  },
  {
    image: infographicSinistro,
    title: "Como Acionar o Seguro?",
    description:
      "Em caso de sinistro (roubo, acidente, incêndio), entre em contato com a seguradora imediatamente. Tenha em mãos sua apólice e documentos pessoais.",
  },
  {
    image: infographicCoberturas,
    title: "Tipos de Cobertura",
    description:
      "Coberturas variam por tipo de seguro: incêndio, roubo, danos elétricos, responsabilidade civil, assistência 24h e muito mais. Personalize conforme sua necessidade.",
  },
];

const InsuranceGuide = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Guia Visual de Seguros
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entenda os principais conceitos de seguros de forma simples e visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceGuide;
