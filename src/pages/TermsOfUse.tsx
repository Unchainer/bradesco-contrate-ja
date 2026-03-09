import { Link } from "react-router-dom";
import { Shield, ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Aceitação dos Termos",
    content: `Ao acessar e utilizar este site, você concorda com os presentes Termos de Uso. Caso não concorde com alguma condição, recomendamos que não utilize o site.\n\nEste site é operado por **Renifer J. Ferreira**, corretor de seguros habilitado pela SUSEP, parceiro oficial da Bradesco Seguros no Espírito Santo.`,
  },
  {
    title: "2. Finalidade do Site",
    content: `Este site tem caráter exclusivamente **informativo e comercial**, sendo destinado a:\n\n• Apresentar os produtos e serviços de seguros comercializados;\n• Facilitar o contato entre clientes e o corretor para cotações;\n• Fornecer informações educativas sobre seguros;\n\nAs informações disponibilizadas não constituem assessoria jurídica, financeira ou contratual. Cada proposta de seguro é individualizada e sujeita às condições gerais da Bradesco Seguros.`,
  },
  {
    title: "3. Serviços Oferecidos",
    content: `O corretor oferece intermediação para contratação dos seguintes produtos Bradesco Seguros:\n\n• Seguro Residencial\n• Seguro Empresarial\n• Seguro Automobilístico\n• Seguro de Equipamentos de Trabalho\n• Seguro Ramo Alimentício\n• Outros produtos Bradesco Seguros\n\nAs coberturas, valores e condições são determinados pelas apólices emitidas pela **Bradesco Seguros S.A.**, sujeitas às regulamentações da SUSEP.`,
  },
  {
    title: "4. Responsabilidades",
    content: `**Do corretor:**\n• Prestar informações precisas sobre os produtos disponíveis;\n• Auxiliar na análise das necessidades do cliente;\n• Encaminhar propostas à seguradora com as informações fornecidas pelo cliente.\n\n**Do usuário:**\n• Fornecer informações verdadeiras e completas;\n• Não utilizar o site para fins ilícitos;\n• Manter a confidencialidade de suas informações de contato.\n\n**Limitação de responsabilidade:** O corretor não se responsabiliza por decisões tomadas com base exclusivamente nas informações deste site, sem consulta prévia e personalizada.`,
  },
  {
    title: "5. Propriedade Intelectual",
    content: `Todo o conteúdo deste site — textos, imagens, logotipos, layout e código — é protegido por direitos autorais e não pode ser reproduzido, distribuído ou utilizado sem autorização prévia e expressa.\n\nA marca **Bradesco Seguros** e seus logotipos são propriedade da Bradesco Seguros S.A., utilizados mediante autorização comercial.`,
  },
  {
    title: "6. Links Externos",
    content: `Este site pode conter links para sites externos (como o WhatsApp e o portal da SUSEP). Não nos responsabilizamos pelo conteúdo, privacidade ou práticas de sites de terceiros. O acesso a esses links é de responsabilidade exclusiva do usuário.`,
  },
  {
    title: "7. Disponibilidade do Site",
    content: `Buscamos manter o site disponível 24 horas por dia, mas não garantimos disponibilidade ininterrupta. O site pode ficar temporariamente indisponível por manutenção, atualizações ou problemas técnicos sem aviso prévio.`,
  },
  {
    title: "8. Proteção de Dados",
    content: `O tratamento de dados pessoais neste site é realizado em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Para informações detalhadas, consulte nossa **Política de Privacidade**.`,
  },
  {
    title: "9. Legislação Aplicável",
    content: `Estes Termos de Uso são regidos pela legislação brasileira. Qualquer controvérsia decorrente do uso deste site será submetida ao foro da comarca de Vitória — ES, salvo previsão legal em contrário.`,
  },
  {
    title: "10. Contato",
    content: `Para dúvidas sobre estes Termos de Uso:\n\n**Renifer J. Ferreira — Corretor de Seguros**\nE-mail: contato@reniferferreira.com.br\nWhatsApp: (27) 99975-9155\nHabilitado pela SUSEP\n\n**Última atualização:** março de 2026.`,
  },
];

const TermsOfUse = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="bg-foreground py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-bradesco flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-primary-foreground text-base leading-none">Renifer J. Ferreira</p>
            <p className="text-[10px] text-primary-foreground/50">Corretor Bradesco Seguros</p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao site
        </Link>
      </div>
    </header>

    {/* Hero */}
    <div className="gradient-bradesco py-14">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FileText className="h-12 w-12 text-primary-foreground/80 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
            Termos de Uso
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Leia atentamente antes de utilizar nosso site e serviços.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Content */}
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-10">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <h2 className="font-display font-bold text-xl text-foreground mb-3 pb-2 border-b border-border">
              {sec.title}
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {sec.content.split(/\*\*(.*?)\*\*/g).map((part, pi) =>
                pi % 2 === 1 ? <strong key={pi} className="text-foreground font-semibold">{part}</strong> : part
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-foreground text-primary-foreground/50 text-xs text-center py-5">
      <p>© {new Date().getFullYear()} Renifer J. Ferreira — Corretor Bradesco Seguros. Todos os direitos reservados.</p>
    </footer>
  </div>
);

export default TermsOfUse;
