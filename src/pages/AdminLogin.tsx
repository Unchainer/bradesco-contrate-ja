import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Erro ao entrar", description: "Verifique suas credenciais.", variant: "destructive" });
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-3" />
          <h1 className="font-display text-2xl font-bold text-foreground">Área do Corretor</h1>
          <p className="text-sm text-muted-foreground mt-1">Acesse o painel de leads</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 bg-card border border-border rounded-xl p-6 shadow-lg">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              maxLength={255}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              maxLength={128}
            />
          </div>
          <Button type="submit" className="w-full font-display font-bold" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;