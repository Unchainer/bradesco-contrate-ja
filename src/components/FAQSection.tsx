import { useState } from "react";
import {
  Home, Building2, Car, Wrench, UtensilsCrossed, HelpCircle,
  ChevronDown, DollarSign, Clock, FileText, AlertTriangle,
  FileWarning, Shield, Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Categories ─────────────────────────────────────────── */
const categories = [
  { id: "geral",       label: "Geral",       icon: HelpCircle },
  { id: "residencial", label: "Residencial", icon: Home       },
  { id: "empresarial", label: "Empresarial", icon: Building2  },
  { id: "auto",        label: "Automóvel",   icon: Car        },
  { id: "equipamentos",label: "Equipamentos",icon: Wrench     },
  { id: "alimenticio", label: "Alimentício", icon: UtensilsCrossed },
];

/* ── FAQs ─────────────────────────────────────────────────── */
const faqs = [
  // Geral
  { cat: "geral", icon: HelpCircle,    q: "O que é franquia no seguro?",           a: "A franquia é o valor que o segurado paga em caso de sinistro parcial. É como uma participação no custo do reparo. Quanto maior a franquia, menor o prêmio do seguro." },
  { cat: "geral", icon: FileWarning,   q: "Como funciona o acionamento do sinistro?", a: "Sinistro é quando o evento coberto acontece (roubo, acidente, incêndio). Você aciona a seguradora, apresenta os documentos solicitados e recebe a indenização conforme a apólice." },
  { cat: "geral", icon: DollarSign,    q: "Quanto custa um seguro?",               a: "O valor varia conforme o tipo, cobertura, perfil do segurado e bem a ser protegido. Peça uma cotação sem compromisso pelo WhatsApp — é rápido e gratuito!" },
  { cat: "geral", icon: Clock,         q: "Qual o prazo de vigência?",             a: "A maioria dos seguros tem vigência de 12 meses. Ao final do período, é possível renovar com condições atualizadas e, muitas vezes, com desconto por fidelidade." },
  { cat: "geral", icon: FileText,      q: "Quais documentos preciso para contratar?", a: "Geralmente: RG/CPF, comprovante de endereço e informações sobre o bem a ser segurado. Para auto, também a CNH e o documento do veículo." },
  { cat: "geral", icon: AlertTriangle, q: "O que NÃO é coberto?",                  a: "Cada apólice tem exclusões específicas. Danos intencionais, desgaste natural e eventos não contratados são exemplos comuns. Sempre consulte sua apólice ou fale com nosso corretor." },
  // Residencial
  { cat: "residencial", icon: Home,    q: "O seguro residencial cobre apartamento alugado?", a: "Sim! Inquilinos também podem contratar seguro residencial para proteger seus bens e responder por danos ao imóvel. É altamente recomendado." },
  { cat: "residencial", icon: Shield,  q: "Danos elétricos são cobertos?",         a: "Sim, a maioria dos planos residenciais cobre danos elétricos causados por surtos, raios e variações de tensão em eletrodomésticos e instalações." },
  { cat: "residencial", icon: FileText,q: "Posso contratar cobertura para itens de valor?", a: "Sim. Joias, obras de arte, eletrônicos e equipamentos específicos podem ser segurados com coberturas adicionais. Consulte as opções disponíveis." },
  // Empresarial
  { cat: "empresarial", icon: Building2, q: "O seguro empresarial cobre responsabilidade civil?", a: "Sim. A cobertura de Responsabilidade Civil protege a empresa contra danos causados a terceiros nas dependências do estabelecimento ou durante as atividades." },
  { cat: "empresarial", icon: DollarSign, q: "Lucros cessantes: o que é?",         a: "É a cobertura que compensa a perda de receita quando o negócio precisa fechar temporariamente por um sinistro coberto, como incêndio ou inundação." },
  { cat: "empresarial", icon: Shield,  q: "Comércio de rua pode contratar?",       a: "Sim! Bares, lojas, escritórios, clínicas e qualquer tipo de estabelecimento comercial podem contratar o seguro empresarial com coberturas personalizadas." },
  // Auto
  { cat: "auto", icon: Car,            q: "O que é cobertura compreensiva?",       a: "Cobre roubo/furto, colisão, incêndio e fenômenos naturais. É a cobertura mais completa para automóveis e inclui assistência 24h." },
  { cat: "auto", icon: HelpCircle,     q: "O seguro cobre danos a terceiros?",     a: "Sim, a cobertura de Responsabilidade Civil para Danos a Terceiros (RCF) está disponível em todos os planos de seguro auto." },
  { cat: "auto", icon: Clock,          q: "Como funciona a assistência 24h?",      a: "Em caso de pane, acidente ou necessidade de reboque, basta ligar para a central de assistência. O atendimento é disponível 24 horas, 7 dias por semana." },
  // Equipamentos
  { cat: "equipamentos", icon: Wrench, q: "Que equipamentos podem ser segurados?", a: "Máquinas industriais, ferramentas, equipamentos médicos, computadores, câmeras e qualquer instrumento essencial ao exercício de uma atividade profissional." },
  { cat: "equipamentos", icon: Shield, q: "Cobre equipamentos em trânsito?",       a: "Sim, alguns planos oferecem cobertura para equipamentos portáteis mesmo fora das instalações fixas, como durante transporte ou uso externo." },
  // Alimentício
  { cat: "alimenticio", icon: UtensilsCrossed, q: "Restaurantes precisam de seguro específico?", a: "Sim. O seguro para ramo alimentício cobre riscos específicos da atividade como incêndio em cozinhas industriais, contaminação de alimentos e danos a equipamentos." },
  { cat: "alimenticio", icon: DollarSign, q: "Food trucks têm cobertura disponível?", a: "Sim! Food trucks podem ter apólices especializadas que cobrem o veículo, os equipamentos de cozinha e a responsabilidade civil perante os clientes." },
];

/* ── Accordion item ──────────────────────────────────────── */
const FAQItem = ({ item, index }: { item: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left group"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${open ? "bg-primary" : "bg-accent group-hover:bg-primary/20"}`}>
          <item.icon className={`h-4 w-4 transition-colors duration-300 ${open ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <span className={`flex-1 font-display font-semibold text-sm transition-colors duration-200 ${open ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`h-4 w-4 transition-colors duration-200 ${open ? "text-primary" : "text-muted-foreground"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────── */
const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("geral");
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = f.cat === activeCategory;
    const matchSearch = search.trim() === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="duvidas" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.05),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre respostas rápidas por categoria ou pesquise diretamente.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-8 relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar dúvida..."
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ accordion list */}
        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {filtered.map((item, i) => (
                  <FAQItem key={item.q} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-muted-foreground"
              >
                <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-display font-semibold">Nenhum resultado encontrado</p>
                <p className="text-sm mt-1">Tente outra palavra-chave ou mude a categoria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Não encontrou o que procurava?</p>
          <a
            href="https://wa.me/5527999759155?text=Olá! Tenho uma dúvida sobre seguros."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            Perguntar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
