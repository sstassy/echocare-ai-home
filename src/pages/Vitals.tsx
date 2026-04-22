import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import VitalsChart from "@/components/VitalsChart";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Heart,
  Activity,
  ArrowLeft,
  Watch,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vitals = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const heartRateData = [
    { time: "8:00", value: 68 },
    { time: "10:00", value: 72 },
    { time: "12:00", value: 75 },
    { time: "14:00", value: 70 },
    { time: "16:00", value: 73 },
    { time: "18:00", value: 72 },
  ];

  const spo2Data = [
    { time: "8:00", value: 98 },
    { time: "10:00", value: 97 },
    { time: "12:00", value: 98 },
    { time: "14:00", value: 99 },
    { time: "16:00", value: 98 },
    { time: "18:00", value: 98 },
  ];

  const bloodPressureData = [
    { time: "8:00", value: 120 },
    { time: "10:00", value: 118 },
    { time: "12:00", value: 122 },
    { time: "14:00", value: 119 },
    { time: "16:00", value: 121 },
    { time: "18:00", value: 120 },
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)]">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <header className="mb-6">
          {!isMobile && (
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          )}

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Health Vitals</h1>
              <p className="text-sm md:text-base text-muted-foreground">Real-time monitoring from connected devices</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 border border-secondary/30 rounded-lg">
              <Watch className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
              <span className="font-medium text-foreground text-sm md:text-base">Connected</span>
            </div>
          </div>
        </header>

        {/* Current Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
          <StatusCard title="Heart Rate" value="72" subtitle="bpm" icon={Heart} variant="success" trend="stable" />
          <StatusCard title="Blood Oxygen" value="98%" subtitle="SpO₂" icon={Activity} variant="success" trend="stable" />
          <div className="col-span-2 md:col-span-1">
            <StatusCard title="Blood Pressure" value="120/80" subtitle="mmHg" icon={TrendingUp} variant="normal" trend="stable" />
          </div>
        </div>

        {/* Charts — 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <VitalsChart title="Heart Rate" data={heartRateData} color="hsl(187 90% 35%)" unit="bpm" threshold={{ min: 60, max: 100 }} />
          <VitalsChart title="Blood Oxygen (SpO₂)" data={spo2Data} color="hsl(145 65% 38%)" unit="%" threshold={{ min: 95, max: 100 }} />
          <div className="lg:col-span-2">
            <VitalsChart title="Blood Pressure (Systolic)" data={bloodPressureData} color="hsl(12 85% 55%)" unit="mmHg" threshold={{ min: 90, max: 140 }} />
          </div>
        </div>

        {/* Thresholds + Devices side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mt-6">
          <Card className="p-5 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Alert Thresholds</h2>
              <Button variant="outline" size="sm">Edit Settings</Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-accent/40 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Heart Rate</span>
                </div>
                <p className="text-sm text-muted-foreground">Alert if &lt; 50 or &gt; 110 bpm</p>
              </div>
              <div className="p-4 bg-accent/40 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-foreground">Blood Oxygen</span>
                </div>
                <p className="text-sm text-muted-foreground">Alert if &lt; 92%</p>
              </div>
              <div className="p-4 bg-accent/40 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--alert))]" />
                  <span className="font-medium text-foreground">Blood Pressure</span>
                </div>
                <p className="text-sm text-muted-foreground">Alert if &gt; 140/90 mmHg</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold text-foreground mb-4">Connected Devices</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-accent/40 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Watch className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium text-foreground">Apple Watch Series 9</p>
                    <p className="text-sm text-muted-foreground">Last sync: 2 minutes ago</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
