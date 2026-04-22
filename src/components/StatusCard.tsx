import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "normal" | "warning" | "success" | "alert";
  trend?: "up" | "down" | "stable";
}

const StatusCard = ({ title, value, subtitle, icon: Icon, variant = "normal", trend }: StatusCardProps) => {
  const variantStyles = {
    normal: "border-border bg-card",
    warning: "border-[hsl(var(--alert))]/30 bg-[hsl(var(--alert))]/5",
    success: "border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5",
    alert: "border-[hsl(var(--alert))] bg-[hsl(var(--alert))]/10 shadow-[var(--shadow-alert)]",
  };

  const iconChipStyles = {
    normal: "bg-primary/10 text-primary",
    warning: "bg-[hsl(var(--alert))]/15 text-[hsl(var(--alert))]",
    success: "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]",
    alert: "bg-[hsl(var(--alert))]/20 text-[hsl(var(--alert))]",
  };

  return (
    <Card className={`p-5 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-4xl md:text-5xl font-bold text-foreground mb-1 leading-none">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 md:p-3.5 rounded-2xl ${iconChipStyles[variant]}`}>
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-3 border-t border-border/50">
          <span className={`text-xs font-semibold ${trend === 'up' ? 'text-[hsl(var(--success))]' : trend === 'down' ? 'text-[hsl(var(--alert))]' : 'text-muted-foreground'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend === 'up' ? 'Improving' : trend === 'down' ? 'Needs attention' : 'Stable'}
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatusCard;
