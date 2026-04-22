import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HouseMapView from "@/components/HouseMapView";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertCircle,
  Phone,
  X,
  Check,
  Clock,
  MapPin,
  Activity,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmergencyAlert = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const alertData = {
    type: "Fall Detected",
    severity: "high",
    timestamp: new Date().toLocaleString(),
    room: "Bedroom",
    roomId: "bedroom",
    vitals: {
      heartRate: 95,
      bloodPressure: "140/90",
      status: "Elevated",
    },
  };

  const houseRooms = [
    { id: "living-room", name: "Living Room", x: 5, y: 10, width: 40, height: 35, devices: [{ type: "camera" as const, status: "active" as const }, { type: "sensor" as const, status: "active" as const }] },
    { id: "kitchen", name: "Kitchen", x: 50, y: 10, width: 45, height: 35, devices: [{ type: "sensor" as const, status: "active" as const }] },
    { id: "bedroom", name: "Bedroom", x: 5, y: 50, width: 45, height: 45, devices: [{ type: "camera" as const, status: "active" as const }, { type: "sensor" as const, status: "active" as const }] },
    { id: "bathroom", name: "Bathroom", x: 55, y: 50, width: 40, height: 20, devices: [{ type: "sensor" as const, status: "active" as const }] },
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)]">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="mb-6">
          {!isMobile && (
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          )}

          <div
            className={`bg-[hsl(var(--alert))]/10 border-2 border-[hsl(var(--alert))] rounded-2xl p-5 md:p-6 shadow-[var(--shadow-alert)] ${
              !isMobile ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="p-3 md:p-4 bg-[hsl(var(--alert))]/20 rounded-xl flex-shrink-0">
                <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-[hsl(var(--alert))]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{alertData.type}</h1>
                  <Badge className="bg-[hsl(var(--alert))] text-[hsl(var(--alert-foreground))] hover:bg-[hsl(var(--alert))]">
                    HIGH PRIORITY
                  </Badge>
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{alertData.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{alertData.room}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons — 2x2 on mobile, row on desktop */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2.5 md:gap-3">
              <Button variant="emergency" size="lg" className="w-full md:w-auto">
                <Phone className="w-5 h-5" />
                Call 911
              </Button>
              <Button variant="success" size="lg" className="w-full md:w-auto">
                <Check className="w-5 h-5" />
                Acknowledge
              </Button>
              <Button variant="outline" size="lg" className="w-full md:w-auto bg-background/50">
                <X className="w-5 h-5" />
                Dismiss
              </Button>
              <Button variant="outline" size="lg" className="w-full md:w-auto bg-background/50">
                <Camera className="w-5 h-5" />
                View Camera
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile: scrollable vitals chips */}
        <div className="md:hidden mb-5 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max">
            <div className="px-4 py-3 bg-card border border-border rounded-xl shadow-[var(--shadow-card)] min-w-[140px]">
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-xl font-bold text-[hsl(var(--alert))]">{alertData.vitals.heartRate} bpm</p>
            </div>
            <div className="px-4 py-3 bg-card border border-border rounded-xl shadow-[var(--shadow-card)] min-w-[140px]">
              <p className="text-xs text-muted-foreground">Blood Pressure</p>
              <p className="text-xl font-bold text-foreground">{alertData.vitals.bloodPressure}</p>
            </div>
            <div className="px-4 py-3 bg-card border border-border rounded-xl shadow-[var(--shadow-card)] min-w-[160px]">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-xl font-bold text-[hsl(var(--alert))]">{alertData.vitals.status}</p>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column: vitals + timeline (desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-6">
            <Card className="p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Current Vitals
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-accent/40 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Heart Rate</p>
                  <p className="text-2xl font-bold text-[hsl(var(--alert))]">{alertData.vitals.heartRate} bpm</p>
                  <Badge variant="outline" className="mt-2 border-[hsl(var(--alert))]/50 text-[hsl(var(--alert))]">
                    {alertData.vitals.status}
                  </Badge>
                </div>
                <div className="p-4 bg-accent/40 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Blood Pressure</p>
                  <p className="text-2xl font-bold text-foreground">{alertData.vitals.bloodPressure}</p>
                  <p className="text-xs text-muted-foreground mt-1">mmHg</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-foreground mb-4">Alert Timeline</h2>
              <div className="space-y-3">
                {[
                  { color: "bg-[hsl(var(--alert))]", title: "Fall detected", time: "Just now" },
                  { color: "bg-primary", title: "Emergency services notified", time: "12 seconds ago" },
                  { color: "bg-primary", title: "Caregiver alert sent", time: "15 seconds ago" },
                  { color: "bg-secondary", title: "Voice assistant activated", time: "18 seconds ago" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color} mt-2`} />
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right / map column */}
          <div className="lg:col-span-3">
            <HouseMapView rooms={houseRooms} alertRoom={alertData.roomId} />

            <Card className="p-5 md:p-6 mt-5 md:mt-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ["1. Verify Patient Status", "Check camera feed or make voice contact"],
                  ["2. Assess Situation", "Review vitals and determine severity"],
                  ["3. Contact Emergency", "Call 911 if assistance needed"],
                  ["4. Document Incident", "Log details for medical records"],
                ].map(([title, desc]) => (
                  <div key={title} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
