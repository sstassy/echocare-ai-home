import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Heart,
  Activity,
  Camera,
  Phone,
  Bell,
  Home,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import echoCareLogoUrl from "@/assets/echocare-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const recentAlerts = [
    { id: 1, type: "Motion detected", room: "Living Room", time: "2 hours ago", severity: "low" },
    { id: 2, type: "Medication reminder", time: "4 hours ago", severity: "medium" },
    { id: 3, type: "Vital check complete", time: "6 hours ago", severity: "success" },
  ];

  const severityBorder: Record<string, string> = {
    low: "border-l-primary",
    medium: "border-l-[hsl(var(--alert))]",
    success: "border-l-[hsl(var(--success))]",
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)]">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Mobile sticky top bar */}
        <header className="md:hidden sticky top-0 -mx-4 px-4 py-3 mb-4 bg-background/80 backdrop-blur-md border-b border-border z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={echoCareLogoUrl} alt="EchoCare Logo" className="w-10 h-10 rounded-xl" />
              <div>
                <h1 className="text-lg font-bold text-foreground leading-tight">EchoCare</h1>
                <p className="text-xs text-muted-foreground leading-tight">Smart home health</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Desktop header */}
        <header className="hidden md:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={echoCareLogoUrl} alt="EchoCare Logo" className="w-14 h-14 rounded-xl" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">EchoCare</h1>
                <p className="text-sm text-muted-foreground">Your smart home health assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero card */}
        <Card
          className="relative overflow-hidden p-5 md:p-7 mb-5 md:mb-8 border-0 text-white shadow-[var(--shadow-card)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm md:text-base text-white/80 mb-1">Good day, Margaret</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                <span className="text-xs md:text-sm font-medium">All systems operational</span>
              </div>
              <p className="text-3xl md:text-5xl font-bold tracking-tight leading-none">{timeStr}</p>
              <p className="text-xs md:text-sm text-white/80 mt-1">{dateStr}</p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
        </Card>

        {/* Desktop two-column layout / Mobile stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / main column */}
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            {/* Emergency button */}
            <div className="p-1 rounded-2xl bg-[hsl(var(--alert))]/10 ring-1 ring-[hsl(var(--alert))]/20">
              <Button
                variant="emergency"
                size="xl"
                className="w-full hover:ring-4 hover:ring-[hsl(var(--alert))]/30"
                onClick={() => navigate("/voice-assistant")}
              >
                <Phone className="w-6 h-6" />
                Emergency — Call for Help
              </Button>
            </div>

            {/* Status cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div onClick={() => navigate("/vitals")} className="cursor-pointer">
                <StatusCard
                  title="Heart Rate"
                  value="72"
                  subtitle="bpm"
                  icon={Heart}
                  variant="success"
                  trend="stable"
                />
              </div>
              <div onClick={() => navigate("/vitals")} className="cursor-pointer">
                <StatusCard
                  title="Blood Oxygen"
                  value="98%"
                  subtitle="SpO₂"
                  icon={Activity}
                  variant="success"
                  trend="stable"
                />
              </div>
              <div className="col-span-2">
                <StatusCard
                  title="Active Monitors"
                  value="8"
                  subtitle="devices online across 5 rooms"
                  icon={Camera}
                  variant="normal"
                />
              </div>
            </div>

            {/* Recent activity */}
            <Card className="p-5 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Recent Activity</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate("/emergency-alert")}>
                  View All
                </Button>
              </div>
              <div className="space-y-2.5">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center justify-between p-4 bg-accent/40 rounded-xl border border-border border-l-4 ${severityBorder[alert.severity]} hover:bg-accent/60 transition-colors cursor-pointer`}
                    onClick={() => (alert.severity === "low" ? navigate("/house-map") : null)}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{alert.type}</p>
                      {alert.room && <p className="text-sm text-muted-foreground">{alert.room}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-3">{alert.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column — desktop only */}
          <div className="hidden lg:block space-y-6">
            <Card className="p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">House at a Glance</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate("/house-map")}>
                  Open
                </Button>
              </div>
              <div
                className="aspect-[4/3] rounded-xl border border-border bg-accent/40 relative overflow-hidden cursor-pointer"
                onClick={() => navigate("/house-map")}
              >
                {/* Simple mini floor plan */}
                <div className="absolute inset-3 grid grid-cols-2 grid-rows-2 gap-2">
                  <div className="rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
                    Living
                  </div>
                  <div className="rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
                    Kitchen
                  </div>
                  <div className="rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
                    Bedroom
                  </div>
                  <div className="rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
                    Bath
                  </div>
                </div>
                <span className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                  8 active
                </span>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="lg" onClick={() => navigate("/vitals")}>
                  <Activity className="w-5 h-5" />
                  View Vitals
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg" onClick={() => navigate("/house-map")}>
                  <Home className="w-5 h-5" />
                  House Map
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg" onClick={() => navigate("/emergency-alert")}>
                  <AlertCircle className="w-5 h-5" />
                  Alerts
                </Button>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between p-3 bg-accent/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Camera Monitoring</span>
                    </div>
                    <button
                      onClick={() => setCameraEnabled(!cameraEnabled)}
                      aria-label="Toggle camera monitoring"
                      className={`relative w-11 h-6 rounded-full transition-colors ${cameraEnabled ? "bg-primary" : "bg-muted"}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${cameraEnabled ? "translate-x-5" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
