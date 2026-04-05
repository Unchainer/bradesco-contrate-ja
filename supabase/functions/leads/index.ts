import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization - only service role or authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Não autorizado." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Verify the caller is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Não autorizado." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "json";
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "100", 10), 1000);
    const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

    const { data: leads, error, count } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("leads query error:", error);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar leads." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (format === "csv") {
      const header = "ID,Nome,Telefone,Tipo de Seguro,Origem,Data\n";
      const rows = (leads || []).map((l: Record<string, unknown>) =>
        `"${l.id}","${String(l.name || "").replace(/"/g, '""')}","${l.phone}","${l.insurance_type}","${l.source || ""}","${l.created_at}"`
      ).join("\n");
      return new Response(header + rows, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=leads.csv",
        },
      });
    }

    return new Response(
      JSON.stringify({ leads, total: count, limit, offset }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("leads error:", e);
    return new Response(
      JSON.stringify({ error: "Erro interno." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});