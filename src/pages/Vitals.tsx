import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import VitalsChart from "@/components/VitalsChart";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  ArrowLeft,
  Watch,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vitals = () => {
  const navigate = useNavigate();

  const heartRateData = [
    { time: '8:00', value: 68 },
    { time: '10:00', value: 72 },
    { time: '12:00', value: 75 },
    { time: '14:00', value: 70 },
    { time: '16:00', value: 73 },
    { time: '18:00', value: 72 },
  ];

  const spo2Data = [
    { time: '8:00', value: 98 },
    { time: '10:00', value: 97 },
    { time: '12:00', value: 98 },
    { time: '14:00', value: 99 },
    { time: '16:00', value: 98 },
    { time: '18:00', value: 98 },
  ];

  const bloodPressureData = [
    { time: '8:00', value: 120 },
    { time: '10:00', value: 118 },
    { time: '12:00', value: 122 },
    { time: '14:00', value: 119 },
    { time: '16:00', value: 121 },
    { time: '18:00', value: 120 },
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)] p-4 md:p-6">
      {/* Header */}
      <header className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Health Vitals</h1>
            <p className="text-muted-foreground">Real-time monitoring from connected devices</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg">
            <Watch className="w-5 h-5 text-secondary" />
            <span className="font-medium text-foreground">Connected</span>
          </div>
        </div>
      </header>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusCard
          title="Heart Rate"
          value="72"
          subtitle="bpm"
          icon={Heart}
          variant="success"
          trend="stable"
        />
        <StatusCard
          title="Blood Oxygen"
          value="98%"
          subtitle="SpO₂"
          icon={Activity}
          variant="success"
          trend="stable"
        />
        <StatusCard
          title="Blood Pressure"
          value="120/80"
          subtitle="mmHg"
          icon={TrendingUp}
          variant="normal"
          trend="stable"
        />
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <VitalsChart
          title="Heart Rate"
          data={heartRateData}
          color="hsl(187 85% 42%)"
          unit="bpm"
          threshold={{ min: 60, max: 100 }}
        />
        
        <VitalsChart
          title="Blood Oxygen (SpO₂)"
          data={spo2Data}
          color="hsl(145 60% 50%)"
          unit="%"
          threshold={{ min: 95, max: 100 }}
        />
        
        <VitalsChart
          title="Blood Pressure (Systolic)"
          data={bloodPressureData}
          color="hsl(15 85% 62%)"
          unit="mmHg"
          threshold={{ min: 90, max: 140 }}
        />
      </div>

      {/* Threshold Settings */}
      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Alert Thresholds</h2>
          <Button variant="outline" size="sm">
            Edit Settings
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">Heart Rate</span>
            </div>
            <p className="text-sm text-muted-foreground">Alert if &lt; 50 or &gt; 110 bpm</p>
          </div>
          <div className="p-4 bg-accent/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-secondary" />
              <span className="font-medium text-foreground">Blood Oxygen</span>
            </div>
            <p className="text-sm text-muted-foreground">Alert if &lt; 92%</p>
          </div>
          <div className="p-4 bg-accent/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[hsl(var(--alert))]" />
              <span className="font-medium text-foreground">Blood Pressure</span>
            </div>
            <p className="text-sm text-muted-foreground">Alert if &gt; 140/90 mmHg</p>
          </div>
        </div>
      </Card>

      {/* Device Info */}
      <Card className="p-6 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Connected Devices</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
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
  );
};

export default Vitals;