import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditableHouseMap from "@/components/EditableHouseMap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Camera, Wifi, Plus } from "lucide-react";
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
      type: "camera" | "sensor";
      status: "active" | "inactive";
      x: number;
      y: number;
    }>;
  }>>([
    { id: "living-room", name: "Living Room", x: 5, y: 10, width: 40, height: 35, devices: [{ id: "cam-1", type: "camera", status: "active", x: 50, y: 50 }, { id: "sensor-1", type: "sensor", status: "active", x: 20, y: 20 }] },
    { id: "kitchen", name: "Kitchen", x: 50, y: 10, width: 45, height: 35, devices: [{ id: "sensor-2", type: "sensor", status: "active", x: 50, y: 50 }] },
    { id: "bedroom", name: "Bedroom", x: 5, y: 50, width: 45, height: 45, devices: [{ id: "cam-2", type: "camera", status: "active", x: 50, y: 30 }, { id: "sensor-3", type: "sensor", status: "active", x: 70, y: 70 }] },
    { id: "bathroom", name: "Bathroom", x: 55, y: 50, width: 40, height: 20, devices: [{ id: "sensor-4", type: "sensor", status: "active", x: 50, y: 50 }] },
    { id: "hallway", name: "Hallway", x: 52, y: 75, width: 43, height: 20, devices: [{ id: "sensor-5", type: "sensor", status: "active", x: 50, y: 50 }] },
  ]);

  const deviceStats = { cameras: 2, sensors: 6, total: 8, active: 8 };

  const StatCard = ({ icon, label, value, valueClass = "text-foreground", indicator }: { icon?: React.ReactNode; label: string; value: number | string; valueClass?: string; indicator?: React.ReactNode }) => (
    <Card className="p-4 ring-1 ring-white/40 shadow-[var(--shadow-card)] min-w-[120px]">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        {indicator}
        <span className="text-xs md:text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)]">
      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <header className="mb-4 md:mb-6">
          {!isMobile && (
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Home Monitoring</h1>
              <p className="text-sm md:text-base text-muted-foreground">View and manage your smart home devices</p>
            </div>
          </div>

          {/* Mobile: horizontal scroll stats */}
          <div className="md:hidden -mx-3 px-3 overflow-x-auto">
            <div className="flex gap-3 pb-2 min-w-max">
              <StatCard icon={<Camera className="w-4 h-4 text-primary" />} label="Cameras" value={deviceStats.cameras} />
              <StatCard icon={<Wifi className="w-4 h-4 text-secondary" />} label="Sensors" value={deviceStats.sensors} />
              <StatCard label="Total" value={deviceStats.total} />
              <StatCard
                indicator={<span className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />}
                label="Active"
                value={deviceStats.active}
                valueClass="text-[hsl(var(--success))]"
              />
            </div>
          </div>
        </header>

        {/* Desktop: sidebar + map / Mobile: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-4">
            <StatCard icon={<Camera className="w-4 h-4 text-primary" />} label="Cameras" value={deviceStats.cameras} />
            <StatCard icon={<Wifi className="w-4 h-4 text-secondary" />} label="Sensors" value={deviceStats.sensors} />
            <StatCard label="Total devices" value={deviceStats.total} />
            <StatCard
              indicator={<span className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />}
              label="Active"
              value={deviceStats.active}
              valueClass="text-[hsl(var(--success))]"
            />
          </aside>

          {/* Map */}
          <div className="lg:col-span-3">
            <EditableHouseMap rooms={houseRooms} onRoomsChange={setHouseRooms} />
          </div>
        </div>

        {/* Device Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          <Card className="p-4 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-semibold text-foreground">Cameras</h2>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Camera
              </Button>
            </div>
            <div className="space-y-2 md:space-y-3">
              {[
                ["Living Room Camera", "HD • Motion Detection"],
                ["Bedroom Camera", "HD • Night Vision"],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-center justify-between p-3 md:p-4 bg-accent/40 rounded-lg border border-border gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm md:text-base">{name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30 text-xs flex-shrink-0">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 md:p-6 ring-1 ring-white/40 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-semibold text-foreground">Sensors</h2>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Sensor
              </Button>
            </div>
            <div className="space-y-2 md:space-y-3">
              {[
                ["Living Room Motion", "PIR Sensor"],
                ["Kitchen Smoke Detector", "Smoke & CO"],
                ["Bedroom Motion", "PIR Sensor"],
                ["Bathroom Fall Sensor", "Pressure Mat"],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-center justify-between p-3 md:p-4 bg-accent/40 rounded-lg border border-border gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm md:text-base">{name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30 text-xs flex-shrink-0">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HouseMapPage;
