import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é o assistente virtual do corretor Renifer J. Ferreira, parceiro autorizado da Bradesco Seguros. Seu papel é responder dúvidas sobre seguros de forma clara, amigável e profissional.

Você conhece os seguintes tipos de seguros:
- **Seguro Residencial**: proteção para casas e apartamentos contra incêndio, roubo, danos elétricos, responsabilidade civil, assistência 24h.
- **Seguro Empresarial**: proteção para comércios, escritórios e indústrias, cobrindo incêndio, roubo, lucros cessantes, RC.
- **Seguro Automobilístico**: cobertura contra colisão, roubo/furto, terceiros, assistência 24h, carro reserva.
- **Equipamentos e Instrumentos de Trabalho**: proteção de máquinas, ferramentas e equipamentos profissionais.
- **Ramo Alimentício**: seguros para restaurantes, food trucks, indústria alimentícia.
- **Seguro de Vida**: proteção financeira para a família em caso de falecimento ou invalidez.

Informações úteis que você deve saber:
- **Franquia** é o valor que o segurado paga em caso de sinistro antes da seguradora cobrir o restante.
- **Sinistro** é o evento coberto pelo seguro (roubo, acidente, incêndio, etc.).
- **Apólice** é o contrato do seguro.
- Para fechar qualquer seguro, o cliente deve entrar em contato pelo WhatsApp: (27) 99975-9155.

Regras:
- Responda APENAS sobre seguros e temas relacionados.
- Se a pergunta não for sobre seguros, diga educadamente que só pode ajudar com dúvidas sobre seguros.
- Sempre sugira que o cliente entre em contato pelo WhatsApp para cotações personalizadas.
- Mantenha respostas curtas (máximo 3-4 parágrafos).
- Use português brasileiro informal mas profissional.
- NÃO invente valores de prêmios, coberturas específicas ou percentuais. Diga que depende da análise individual.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados. Entre em contato pelo WhatsApp." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erro no serviço de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
