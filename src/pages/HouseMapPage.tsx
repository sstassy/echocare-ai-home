import { Button } from "@/components/ui/button";
import HouseMapView from "@/components/HouseMapView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Camera,
  Wifi,
  Plus,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HouseMapPage = () => {
  const navigate = useNavigate();

  const houseRooms = [
    { id: 'living-room', name: 'Living Room', x: 5, y: 10, width: 40, height: 35, devices: [{ type: 'camera' as const, status: 'active' as const }, { type: 'sensor' as const, status: 'active' as const }] },
    { id: 'kitchen', name: 'Kitchen', x: 50, y: 10, width: 45, height: 35, devices: [{ type: 'sensor' as const, status: 'active' as const }] },
    { id: 'bedroom', name: 'Bedroom', x: 5, y: 50, width: 45, height: 45, devices: [{ type: 'camera' as const, status: 'active' as const }, { type: 'sensor' as const, status: 'active' as const }] },
    { id: 'bathroom', name: 'Bathroom', x: 55, y: 50, width: 40, height: 20, devices: [{ type: 'sensor' as const, status: 'active' as const }] },
    { id: 'hallway', name: 'Hallway', x: 52, y: 75, width: 43, height: 20, devices: [{ type: 'sensor' as const, status: 'active' as const }] },
  ];

  const deviceStats = {
    cameras: 2,
    sensors: 6,
    total: 8,
    active: 8
  };

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

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Home Monitoring Setup</h1>
            <p className="text-muted-foreground">View and manage your smart home devices</p>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Edit Layout
          </Button>
        </div>

        {/* Device Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Cameras</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{deviceStats.cameras}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Sensors</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{deviceStats.sensors}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground">Total Devices</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{deviceStats.total}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Active</span>
            </div>
            <p className="text-2xl font-bold text-[hsl(var(--success))]">{deviceStats.active}</p>
          </Card>
        </div>
      </header>

      {/* House Map */}
      <div className="mb-6">
        <HouseMapView rooms={houseRooms} />
      </div>

      {/* Device Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cameras */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Cameras</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Camera
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Living Room Camera</p>
                <p className="text-sm text-muted-foreground">HD • Motion Detection</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Bedroom Camera</p>
                <p className="text-sm text-muted-foreground">HD • Night Vision</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
          </div>
        </Card>

        {/* Sensors */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Sensors</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Living Room Motion</p>
                <p className="text-sm text-muted-foreground">PIR Sensor</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Kitchen Smoke Detector</p>
                <p className="text-sm text-muted-foreground">Smoke & CO</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Bedroom Motion</p>
                <p className="text-sm text-muted-foreground">PIR Sensor</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Bathroom Fall Sensor</p>
                <p className="text-sm text-muted-foreground">Pressure Mat</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20">
                Active
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HouseMapPage;