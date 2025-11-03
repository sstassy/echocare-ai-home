import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Wifi, AlertCircle } from "lucide-react";

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  devices: Array<{ type: 'camera' | 'sensor'; status: 'active' | 'inactive' }>;
}

interface HouseMapViewProps {
  rooms: Room[];
  alertRoom?: string;
}

const HouseMapView = ({ rooms, alertRoom }: HouseMapViewProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Home Layout</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Camera className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">Camera</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-secondary" />
            <span className="text-muted-foreground">Sensor</span>
          </div>
        </div>
      </div>
      
      <div className="relative bg-accent/30 rounded-lg p-4 border border-border" style={{ minHeight: '400px' }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`absolute border-2 rounded-lg p-3 transition-all duration-300 ${
              alertRoom === room.id
                ? 'border-[hsl(var(--alert))] bg-[hsl(var(--alert))]/10 shadow-[var(--shadow-alert)] animate-pulse'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            style={{
              left: `${room.x}%`,
              top: `${room.y}%`,
              width: `${room.width}%`,
              height: `${room.height}%`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{room.name}</span>
              {alertRoom === room.id && (
                <AlertCircle className="w-4 h-4 text-[hsl(var(--alert))]" />
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {room.devices.map((device, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                    device.status === 'active'
                      ? device.type === 'camera'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {device.type === 'camera' ? (
                    <Camera className="w-3 h-3" />
                  ) : (
                    <Wifi className="w-3 h-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {alertRoom && (
        <div className="mt-3 p-3 bg-[hsl(var(--alert))]/10 border border-[hsl(var(--alert))]/20 rounded-lg">
          <p className="text-sm font-medium text-[hsl(var(--alert))]">
            Alert detected in {rooms.find(r => r.id === alertRoom)?.name}
          </p>
        </div>
      )}
    </Card>
  );
};

export default HouseMapView;