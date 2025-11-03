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
  ArrowLeft
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
      status: "Elevated"
    }
  };

  const houseRooms = [
    { id: 'living-room', name: 'Living Room', x: 5, y: 10, width: 40, height: 35, devices: [{ type: 'camera' as const, status: 'active' as const }, { type: 'sensor' as const, status: 'active' as const }] },
    { id: 'kitchen', name: 'Kitchen', x: 50, y: 10, width: 45, height: 35, devices: [{ type: 'sensor' as const, status: 'active' as const }] },
    { id: 'bedroom', name: 'Bedroom', x: 5, y: 50, width: 45, height: 45, devices: [{ type: 'camera' as const, status: 'active' as const }, { type: 'sensor' as const, status: 'active' as const }] },
    { id: 'bathroom', name: 'Bathroom', x: 55, y: 50, width: 40, height: 20, devices: [{ type: 'sensor' as const, status: 'active' as const }] },
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)] p-4 md:p-6">
      {/* Header with Alert Status */}
      <header className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-[hsl(var(--alert))]/10 border-2 border-[hsl(var(--alert))] rounded-2xl p-6 shadow-[var(--shadow-alert)] animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-[hsl(var(--alert))]/20 rounded-xl">
                <AlertCircle className="w-8 h-8 text-[hsl(var(--alert))]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{alertData.type}</h1>
                  <Badge className="bg-[hsl(var(--alert))] text-[hsl(var(--alert-foreground))] hover:bg-[hsl(var(--alert))]">
                    HIGH PRIORITY
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="emergency" size="lg">
              <Phone className="w-5 h-5" />
              Call 911
            </Button>
            <Button variant="success" size="lg">
              <Check className="w-5 h-5" />
              Acknowledge
            </Button>
            <Button variant="outline" size="lg" className="bg-background/50">
              <X className="w-5 h-5" />
              Dismiss
            </Button>
            <Button variant="outline" size="lg" className="bg-background/50">
              <Camera className="w-5 h-5" />
              View Camera
            </Button>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Vitals & Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Vitals */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Current Vitals
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Heart Rate</p>
                <p className="text-2xl font-bold text-[hsl(var(--alert))]">{alertData.vitals.heartRate} bpm</p>
                <Badge variant="outline" className="mt-2 border-[hsl(var(--alert))]/50 text-[hsl(var(--alert))]">
                  {alertData.vitals.status}
                </Badge>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Blood Pressure</p>
                <p className="text-2xl font-bold text-foreground">{alertData.vitals.bloodPressure}</p>
                <p className="text-xs text-muted-foreground mt-1">mmHg</p>
              </div>
            </div>
          </Card>

          {/* Alert Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Alert Timeline</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--alert))] mt-2" />
                <div>
                  <p className="font-medium text-foreground">Fall detected</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium text-foreground">Emergency services notified</p>
                  <p className="text-xs text-muted-foreground">12 seconds ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium text-foreground">Caregiver alert sent</p>
                  <p className="text-xs text-muted-foreground">15 seconds ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-medium text-foreground">Voice assistant activated</p>
                  <p className="text-xs text-muted-foreground">18 seconds ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - House Map */}
        <div className="lg:col-span-2">
          <HouseMapView rooms={houseRooms} alertRoom={alertData.roomId} />
          
          {/* Recommended Actions */}
          <Card className="p-6 mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">1. Verify Patient Status</h3>
                <p className="text-sm text-muted-foreground">Check camera feed or make voice contact</p>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">2. Assess Situation</h3>
                <p className="text-sm text-muted-foreground">Review vitals and determine severity</p>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">3. Contact Emergency</h3>
                <p className="text-sm text-muted-foreground">Call 911 if assistance needed</p>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">4. Document Incident</h3>
                <p className="text-sm text-muted-foreground">Log details for medical records</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;