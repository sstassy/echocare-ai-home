import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditableHouseMap from "@/components/EditableHouseMap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();

  const [houseRooms, setHouseRooms] = useState<Array<{
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    devices: Array<{
      id: string;
      type: 'camera' | 'sensor';
      status: 'active' | 'inactive';
      x: number;
      y: number;
    }>;
  }>>([
    { 
      id: 'living-room', 
      name: 'Living Room', 
      x: 5, y: 10, width: 40, height: 35, 
      devices: [
        { id: 'cam-1', type: 'camera' as const, status: 'active' as const, x: 50, y: 50 }, 
        { id: 'sensor-1', type: 'sensor' as const, status: 'active' as const, x: 20, y: 20 }
      ] 
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      x: 50, y: 10, width: 45, height: 35, 
      devices: [
        { id: 'sensor-2', type: 'sensor' as const, status: 'active' as const, x: 50, y: 50 }
      ] 
    },
    { 
      id: 'bedroom', 
      name: 'Bedroom', 
      x: 5, y: 50, width: 45, height: 45, 
      devices: [
        { id: 'cam-2', type: 'camera' as const, status: 'active' as const, x: 50, y: 30 }, 
        { id: 'sensor-3', type: 'sensor' as const, status: 'active' as const, x: 70, y: 70 }
      ] 
    },
    { 
      id: 'bathroom', 
      name: 'Bathroom', 
      x: 55, y: 50, width: 40, height: 20, 
      devices: [
        { id: 'sensor-4', type: 'sensor' as const, status: 'active' as const, x: 50, y: 50 }
      ] 
    },
    { 
      id: 'hallway', 
      name: 'Hallway', 
      x: 52, y: 75, width: 43, height: 20, 
      devices: [
        { id: 'sensor-5', type: 'sensor' as const, status: 'active' as const, x: 50, y: 50 }
      ] 
    },
  ]);

  const deviceStats = {
    cameras: 2,
    sensors: 6,
    total: 8,
    active: 8
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)] p-3 md:p-6">
      {/* Header */}
      <header className="mb-4 md:mb-6">
        {!isMobile && (
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        )}

        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Home Monitoring</h1>
            <p className="text-sm md:text-base text-muted-foreground">View and manage your smart home devices</p>
          </div>
        </div>

        {/* Device Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <Card className="p-3 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Cameras</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{deviceStats.cameras}</p>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <Wifi className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Sensors</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{deviceStats.sensors}</p>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Total</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{deviceStats.total}</p>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Active</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[hsl(var(--success))]">{deviceStats.active}</p>
          </Card>
        </div>
      </header>

      {/* House Map */}
      <div className="mb-4 md:mb-6">
        <EditableHouseMap 
          rooms={houseRooms} 
          onRoomsChange={setHouseRooms}
        />
      </div>

      {/* Device Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
        {/* Cameras */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg font-semibold text-foreground">Cameras</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Camera
            </Button>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Living Room Camera</p>
                <p className="text-xs md:text-sm text-muted-foreground">HD • Motion Detection</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Bedroom Camera</p>
                <p className="text-xs md:text-sm text-muted-foreground">HD • Night Vision</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
                Active
              </Badge>
            </div>
          </div>
        </Card>

        {/* Sensors */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg font-semibold text-foreground">Sensors</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Living Room Motion</p>
                <p className="text-xs md:text-sm text-muted-foreground">PIR Sensor</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Kitchen Smoke Detector</p>
                <p className="text-xs md:text-sm text-muted-foreground">Smoke & CO</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Bedroom Motion</p>
                <p className="text-xs md:text-sm text-muted-foreground">PIR Sensor</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-accent/30 rounded-lg border border-border gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm md:text-base">Bathroom Fall Sensor</p>
                <p className="text-xs md:text-sm text-muted-foreground">Pressure Mat</p>
              </div>
              <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 text-xs flex-shrink-0">
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