import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { format } from "date-fns";

type Lead = {
  id: string;
  name: string;
  phone: string;
  insurance_type: string;
  source: string | null;
  created_at: string;
};

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(210, 70%, 50%)",
  "hsl(140, 60%, 40%)",
  "hsl(30, 80%, 50%)",
];

export function LeadCharts({ leads }: { leads: Lead[] }) {
  const byType = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.insurance_type] = (map[l.insurance_type] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [leads]);

  const byDay = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      const day = format(new Date(l.created_at), "dd/MM");
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map)
      .map(([day, count]) => ({ day, count }))
      .slice(-14); // last 14 days with data
  }, [leads]);

  if (leads.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* By type - Pie */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Leads por tipo de seguro</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={byType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name.replace("Seguro ", "")} (${(percent * 100).toFixed(0)}%)`} labelLine={false} fontSize={11}>
              {byType.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* By day - Bar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Leads por dia</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byDay}>
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="count" name="Leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
