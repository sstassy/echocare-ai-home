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
    normal: "border-border",
    warning: "border-[hsl(var(--alert))]/20 bg-[hsl(var(--alert))]/5",
    success: "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/5",
    alert: "border-[hsl(var(--alert))] bg-[hsl(var(--alert))]/10 shadow-[var(--shadow-alert)]",
  };

  const iconStyles = {
    normal: "text-primary",
    warning: "text-[hsl(var(--alert))]",
    success: "text-[hsl(var(--success))]",
    alert: "text-[hsl(var(--alert))]",
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-background ${iconStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-[hsl(var(--success))]' : trend === 'down' ? 'text-[hsl(var(--alert))]' : 'text-muted-foreground'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend === 'up' ? 'Improving' : trend === 'down' ? 'Needs attention' : 'Stable'}
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatusCard;