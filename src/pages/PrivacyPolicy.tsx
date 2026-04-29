import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Quem somos",
    content: `Renifer J. Ferreira é um corretor de seguros autorizado, habilitado pela SUSEP (Superintendência de Seguros Privados), atuando como parceiro oficial da Bradesco Seguros no estado do Espírito Santo. Este site tem caráter exclusivamente informativo e comercial para apresentação de produtos de seguro.`,
  },
  {
    title: "2. Dados coletados",
    content: `Ao utilizar este site, poderemos coletar as seguintes informações:\n\n• **Dados fornecidos voluntariamente:** nome, telefone e tipo de seguro de interesse, quando você preenche o formulário de cotação ou nos contata pelo WhatsApp.\n• **Dados de navegação:** endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, coletados automaticamente via cookies e ferramentas de análise (Meta Pixel).\n\nNão coletamos dados bancários, senhas ou informações sensíveis diretamente por este site.`,
  },
  {
    title: "3. Finalidade do tratamento",
    content: `Os dados coletados são utilizados para:\n\n• Responder às suas solicitações de cotação e atendimento;\n• Enviar propostas e informações sobre produtos de seguro;\n• Melhorar a experiência de navegação no site;\n• Medir o desempenho de campanhas publicitárias (com sua autorização via cookie);\n• Cumprir obrigações legais e regulatórias.`,
  },
  {
    title: "4. Base legal (LGPD)",
    content: `O tratamento de dados pessoais é fundamentado nas seguintes bases legais previstas na Lei nº 13.709/2018 (LGPD):\n\n• **Consentimento** (Art. 7º, I): para uso de cookies analíticos e de marketing;\n• **Execução de contrato** (Art. 7º, V): para processar solicitações de cotação;\n• **Legítimo interesse** (Art. 7º, IX): para melhorar nossos serviços e comunicações;\n• **Cumprimento de obrigação legal** (Art. 7º, II): quando exigido por regulamentação da SUSEP.`,
  },
  {
    title: "5. Compartilhamento de dados",
    content: `Seus dados podem ser compartilhados com:\n\n• **Bradesco Seguros:** para elaboração de propostas e contratação de seguros;\n• **Plataformas de análise:** Meta (Facebook/Instagram) — apenas com consentimento para cookies de marketing;\n• **Autoridades competentes:** quando exigido por lei ou regulamentação da SUSEP.\n\nNão vendemos, alugamos ou cedemos seus dados pessoais a terceiros para fins comerciais.`,
  },
  {
    title: "6. Seus direitos (LGPD)",
    content: `Nos termos da LGPD, você tem direito a:\n\n• Confirmação da existência de tratamento;\n• Acesso aos dados;\n• Correção de dados incompletos, inexatos ou desatualizados;\n• Anonimização, bloqueio ou eliminação de dados desnecessários;\n• Portabilidade dos dados;\n• Eliminação dos dados tratados com consentimento;\n• Informação sobre compartilhamento;\n• Revogação do consentimento a qualquer momento.\n\n**Exclusão automática (autoatendimento):** acesse [/privacidade/meus-dados](/privacidade/meus-dados) e informe seu telefone para que todos os seus leads sejam removidos imediatamente da nossa base.\n\nPara outros direitos, entre em contato: contato@reniferferreira.com.br`,
  },
  {
    title: "7. Retenção de dados",
    content: `Leads capturados pelos formulários do site são automaticamente excluídos após **12 meses** da captura, salvo se houver relacionamento comercial em curso. Dados relacionados a contratos de seguro efetivados são mantidos pelos prazos exigidos pela SUSEP (em geral, 5 anos após o encerramento do relacionamento). Você também pode solicitar a exclusão antecipada a qualquer momento.`,
  },
  {
    title: "8. Cookies",
    content: `Utilizamos cookies para:\n\n• **Essenciais:** funcionamento básico do site (não requerem consentimento);\n• **Analíticos:** medir audiência e comportamento de navegação;\n• **Marketing:** rastrear conversões de campanhas (Meta Pixel) — somente com consentimento.\n\nVocê pode gerenciar suas preferências de cookies a qualquer momento pelo banner de cookies no rodapé do site ou pelas configurações do seu navegador.`,
  },
  {
    title: "9. Segurança",
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida, incluindo conexão segura (HTTPS) e acesso restrito às informações.`,
  },
  {
    title: "10. Contato do Encarregado (DPO)",
    content: `Para questões relacionadas à proteção de dados:\n\n**Nome:** Renifer J. Ferreira\n**E-mail:** contato@reniferferreira.com.br\n**WhatsApp:** (27) 99975-9155`,
  },
  {
    title: "11. Atualizações desta política",
    content: `Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página. Recomendamos que você a revise periodicamente.\n\n**Última atualização:** março de 2026.`,
  },
];

const PrivacyPolicy = () => (
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
          <Lock className="h-12 w-12 text-primary-foreground/80 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
            Política de Privacidade
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
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

export default PrivacyPolicy;
