import { Button } from "@/components/ui/button";
import VoiceAssistant from "@/components/VoiceAssistant";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft,
  Volume2,
  VolumeX,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VoiceAssistantPage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--gradient-calm)] p-4 md:p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Button 
            variant="outline"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Voice Assistance</h1>
          <p className="text-muted-foreground">EchoCare is here to help guide you</p>
        </div>
      </header>

      {/* Main Voice Assistant */}
      <div className="max-w-3xl mx-auto mb-8">
        <VoiceAssistant 
          message="Help is on the way. Please stay calm and remain where you are. Emergency services have been notified and your caregiver has been contacted."
          emergencyType="Fall Detection Alert"
          onDismiss={() => navigate('/')}
        />
      </div>

      {/* Emergency Contact Cards */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">Primary Caregiver</h3>
                <p className="text-sm text-muted-foreground">Sarah Johnson</p>
              </div>
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <Button variant="default" className="w-full" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">911</p>
              </div>
              <Phone className="w-5 h-5 text-[hsl(var(--alert))]" />
            </div>
            <Button variant="emergency" className="w-full" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Call 911
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">Family Member</h3>
                <p className="text-sm text-muted-foreground">Michael Johnson</p>
              </div>
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <Button variant="outline" className="w-full" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">Doctor's Office</h3>
                <p className="text-sm text-muted-foreground">Dr. Martinez</p>
              </div>
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <Button variant="outline" className="w-full" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </Card>
        </div>
      </div>

      {/* Guidance Text */}
      <Card className="max-w-3xl mx-auto mt-6 p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-3">What to do now:</h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Stay calm and try to remain still if you've fallen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Help is already on the way - emergency contacts have been notified</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>If you can, try to move to a more comfortable position</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Use the buttons above to directly contact emergency services or caregivers</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default VoiceAssistantPage;