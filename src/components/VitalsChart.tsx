import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface VitalsChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: string;
  unit: string;
  threshold?: { min: number; max: number };
}

const VitalsChart = ({ title, data, color, unit, threshold }: VitalsChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              domain={threshold ? [threshold.min - 10, threshold.max + 10] : ['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "14px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value} ${unit}`, title]}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {threshold && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <span>Normal range: {threshold.min}-{threshold.max} {unit}</span>
        </div>
      )}
    </Card>
  );
};

export default VitalsChart;