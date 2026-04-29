import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Trash2, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const MyData = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ deleted: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phone.trim();
    if (cleanPhone.length < 8 || cleanPhone.length > 30) {
      setError("Informe um telefone válido (mínimo 8 caracteres).");
      return;
    }
    if (!confirmed) {
      setError("Confirme que deseja excluir permanentemente seus dados.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: rpcError } = await supabase.rpc("request_lead_deletion", {
        _phone: cleanPhone,
        _email: email.trim() || null,
      });
      if (rpcError) throw rpcError;
      setResult(data as { deleted: number });
      toast({ title: "Solicitação processada com sucesso." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao processar a solicitação.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

      <div className="gradient-bradesco py-14">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Lock className="h-12 w-12 text-primary-foreground/80 mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
              Meus Dados (LGPD)
            </h1>
            <p className="text-primary-foreground/85 max-w-xl mx-auto text-sm md:text-base">
              Exerça o seu direito à exclusão dos dados conforme o Art. 18 da Lei nº 13.709/2018.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-xl">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {result ? (
            <div className="text-center py-6">
              <CheckCircle className="h-14 w-14 text-primary mx-auto mb-4" />
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                Solicitação concluída
              </h2>
              <p className="text-sm text-muted-foreground mb-1">
                {result.deleted === 0
                  ? "Não encontramos nenhum lead vinculado ao telefone informado. Sua solicitação foi registrada."
                  : `${result.deleted} registro(s) vinculado(s) ao seu telefone foram permanentemente excluídos da nossa base.`}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Caso ainda receba contato, entre em contato com o DPO: contato@reniferferreira.com.br
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/">Voltar à página inicial</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="font-display font-bold text-lg text-foreground mb-1">
                  Solicitar exclusão dos meus dados
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Informe o telefone usado em qualquer formulário deste site. Todos os leads
                  vinculados serão apagados imediatamente da nossa base.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Telefone (com DDD)</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="27 99975-9155"
                  maxLength={30}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  E-mail (opcional, para comprovante)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  maxLength={255}
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground leading-snug cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span>
                  Confirmo que sou o titular dos dados e desejo a <strong>exclusão definitiva</strong>{" "}
                  de todos os leads vinculados a este telefone. Esta ação é irreversível.
                </span>
              </label>

              {error && (
                <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 rounded-md p-3">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full font-display font-bold">
                <Trash2 className="h-4 w-4 mr-2" />
                {loading ? "Processando…" : "Excluir meus dados agora"}
              </Button>

              <p className="text-[11px] text-muted-foreground text-center">
                Toda solicitação é registrada em log de auditoria. Veja a{" "}
                <Link to="/politica-de-privacidade" className="underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </main>

      <footer className="bg-foreground text-primary-foreground/50 text-xs text-center py-5">
        <p>© {new Date().getFullYear()} Renifer J. Ferreira — Corretor Bradesco Seguros.</p>
      </footer>
    </div>
  );
};

export default MyData;