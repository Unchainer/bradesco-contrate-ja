import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-display font-bold text-primary-foreground">Bradesco Seguros</span>
            </div>
            <p className="text-sm">
              Corretor autorizado Bradesco Seguros. Proteção e tranquilidade para você e sua família.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#seguros" className="hover:text-primary transition-colors">Nossos Seguros</a></li>
              <li><a href="#duvidas" className="hover:text-primary transition-colors">Dúvidas Frequentes</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp: (00) 00000-0000</li>
              <li>Email: contato@corretor.com.br</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs">
          <p>© {new Date().getFullYear()} Corretor Bradesco Seguros. Todos os direitos reservados.</p>
          <p className="mt-1 text-primary-foreground/50">
            Corretor habilitado pela SUSEP. As condições contratuais/regulamentos estão disponíveis na Bradesco Seguros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
