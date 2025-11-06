import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Wifi, AlertCircle, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  type: 'camera' | 'sensor';
  status: 'active' | 'inactive';
  x: number;
  y: number;
}

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  devices: Device[];
}

interface EditableHouseMapProps {
  rooms: Room[];
  alertRoom?: string;
  onRoomsChange?: (rooms: Room[]) => void;
}

const EditableHouseMap = ({ rooms: initialRooms, alertRoom, onRoomsChange }: EditableHouseMapProps) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [editMode, setEditMode] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [draggingDevice, setDraggingDevice] = useState<{ roomId: string; deviceId: string } | null>(null);
  const { toast } = useToast();

  const handleEditRoomName = (roomId: string, currentName: string) => {
    setEditingRoom(roomId);
    setEditName(currentName);
  };

  const handleSaveRoomName = (roomId: string) => {
    const updatedRooms = rooms.map(room =>
      room.id === roomId ? { ...room, name: editName } : room
    );
    setRooms(updatedRooms);
    onRoomsChange?.(updatedRooms);
    setEditingRoom(null);
    toast({
      title: "Room Updated",
      description: "Room name has been saved successfully.",
    });
  };

  const handleDeviceDragStart = (roomId: string, deviceId: string) => {
    if (!editMode) return;
    setDraggingDevice({ roomId, deviceId });
  };

  const handleDeviceDrop = (e: React.MouseEvent, roomId: string) => {
    if (!draggingDevice || !editMode) return;
    
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const updatedRooms = rooms.map(r => {
      if (r.id === draggingDevice.roomId) {
        return {
          ...r,
          devices: r.devices.filter(d => d.id !== draggingDevice.deviceId)
        };
      }
      if (r.id === roomId) {
        const device = rooms
          .find(rm => rm.id === draggingDevice.roomId)
          ?.devices.find(d => d.id === draggingDevice.deviceId);
        
        if (device) {
          return {
            ...r,
            devices: [...r.devices, { ...device, x, y }]
          };
        }
      }
      return r;
    });

    setRooms(updatedRooms);
    onRoomsChange?.(updatedRooms);
    setDraggingDevice(null);
    
    toast({
      title: "Device Moved",
      description: "Device location has been updated.",
    });
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Home Layout</h3>
        <div className="flex items-center gap-2">
          {!editMode && (
            <div className="hidden md:flex items-center gap-3 text-xs mr-4">
              <div className="flex items-center gap-1">
                <Camera className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">Camera</span>
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-secondary" />
                <span className="text-muted-foreground">Sensor</span>
              </div>
            </div>
          )}
          <Button
            size="sm"
            variant={editMode ? "default" : "outline"}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Done
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="relative bg-accent/30 rounded-lg p-2 md:p-4 border border-border overflow-hidden" style={{ minHeight: '300px', maxHeight: '70vh', aspectRatio: '4/3' }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`absolute border-2 rounded-lg p-2 md:p-3 transition-all duration-300 ${
              alertRoom === room.id
                ? 'border-[hsl(var(--alert))] bg-[hsl(var(--alert))]/10 shadow-[var(--shadow-alert)] animate-pulse'
                : editMode
                ? 'border-primary/50 bg-card hover:border-primary cursor-pointer'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            style={{
              left: `${room.x}%`,
              top: `${room.y}%`,
              width: `${room.width}%`,
              height: `${room.height}%`,
            }}
            onClick={(e) => {
              if (editMode && draggingDevice) {
                handleDeviceDrop(e, room.id);
              }
            }}
          >
            <div className="flex items-start justify-between mb-1 md:mb-2">
              {editingRoom === room.id ? (
                <div className="flex items-center gap-1 flex-1">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-7 text-xs md:text-sm"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => handleSaveRoomName(room.id)}
                  >
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setEditingRoom(null)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-xs md:text-sm font-semibold text-foreground">{room.name}</span>
                  <div className="flex items-center gap-1">
                    {editMode && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditRoomName(room.id, room.name)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    )}
                    {alertRoom === room.id && (
                      <AlertCircle className="w-4 h-4 text-[hsl(var(--alert))]" />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {room.devices.map((device) => (
                <div
                  key={device.id}
                  className={`flex items-center gap-1 px-1.5 md:px-2 py-1 rounded-md text-xs ${
                    device.status === 'active'
                      ? device.type === 'camera'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  } ${editMode ? 'cursor-move hover:scale-110 transition-transform' : ''}`}
                  draggable={editMode}
                  onDragStart={() => handleDeviceDragStart(room.id, device.id)}
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
        <div className="mt-3 p-2 md:p-3 bg-[hsl(var(--alert))]/10 border border-[hsl(var(--alert))]/20 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-[hsl(var(--alert))]">
            Alert detected in {rooms.find(r => r.id === alertRoom)?.name}
          </p>
        </div>
      )}
      
      {editMode && (
        <div className="mt-3 p-2 md:p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-primary">
            Edit Mode: Tap room names to rename, drag devices to move them between rooms
          </p>
        </div>
      )}
    </Card>
  );
};

export default EditableHouseMap;
