import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/StatusCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Heart, 
  Activity, 
  Camera, 
  Phone, 
  Bell, 
  Settings, 
  User,
  Home,
  Clock,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const recentAlerts = [
    { id: 1, type: "Motion detected", room: "Living Room", time: "2 hours ago", severity: "low" },
    { id: 2, type: "Medication reminder", time: "4 hours ago", severity: "medium" },
    { id: 3, type: "Vital check complete", time: "6 hours ago", severity: "success" },
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)] p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">EchoCare</h1>
              <p className="text-sm text-muted-foreground">Your smart home health assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Status Banner */}
        <Card className="p-4 bg-card border-border shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--success))] animate-pulse" />
              <span className="font-medium text-foreground">All systems operational</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last check: 2 min ago</span>
            </div>
          </div>
        </Card>
      </header>

      {/* Emergency Button - Prominent */}
      <div className="mb-8">
        <Button 
          variant="emergency" 
          size="xl" 
          className="w-full"
          onClick={() => navigate('/voice-assistant')}
        >
          <Phone className="w-6 h-6" />
          Emergency - Call for Help
        </Button>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div onClick={() => navigate('/vitals')} className="cursor-pointer">
          <StatusCard
            title="Heart Rate"
            value="72"
            subtitle="bpm"
            icon={Heart}
            variant="success"
            trend="stable"
          />
        </div>
        <div onClick={() => navigate('/vitals')} className="cursor-pointer">
          <StatusCard
            title="Blood Oxygen"
            value="98%"
            subtitle="SpO₂"
            icon={Activity}
            variant="success"
            trend="stable"
          />
        </div>
        <StatusCard
          title="Active Monitors"
          value="8"
          subtitle="devices online"
          icon={Camera}
          variant="normal"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/emergency-alert')}
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                  onClick={() => alert.severity === 'low' ? navigate('/house-map') : null}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'success' ? 'bg-[hsl(var(--success))]' :
                      alert.severity === 'medium' ? 'bg-[hsl(var(--alert))]/50' :
                      'bg-primary'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{alert.type}</p>
                      {alert.room && (
                        <p className="text-sm text-muted-foreground">{alert.room}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="lg"
                onClick={() => navigate('/vitals')}
              >
                <Activity className="w-5 h-5" />
                View Vitals
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="lg"
                onClick={() => navigate('/house-map')}
              >
                <Home className="w-5 h-5" />
                House Map
              </Button>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Camera Monitoring</span>
                  </div>
                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      cameraEnabled ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        cameraEnabled ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;