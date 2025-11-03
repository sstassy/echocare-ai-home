import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Volume2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface VoiceAssistantProps {
  message: string;
  emergencyType?: string;
  onDismiss?: () => void;
  autoPlay?: boolean;
}

const VoiceAssistant = ({ message, emergencyType, onDismiss, autoPlay = true }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(autoPlay);

  useEffect(() => {
    if (autoPlay) {
      setIsListening(true);
      // Simulate voice playing
      const timer = setTimeout(() => {
        setIsListening(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <Card className="p-8 shadow-[var(--shadow-card)] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 relative">
          <Volume2 className={`w-10 h-10 text-primary ${isListening ? 'animate-pulse' : ''}`} />
          {isListening && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <span className="absolute inset-2 rounded-full bg-primary/10 animate-pulse" />
            </>
          )}
        </div>
        
        {emergencyType && (
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-[hsl(var(--alert))]/10 text-[hsl(var(--alert))] rounded-full text-sm font-medium">
              {emergencyType}
            </span>
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-foreground mb-4">
          EchoCare Assistant
        </h3>
        
        <div className="bg-background/50 rounded-xl p-6 mb-6 border border-border/50">
          <p className="text-lg text-foreground leading-relaxed">
            "{message}"
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <Button 
            variant="emergency" 
            size="lg"
            className="min-w-[160px]"
          >
            <Phone className="w-5 h-5" />
            Call Help
          </Button>
          
          {onDismiss && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={onDismiss}
            >
              <X className="w-5 h-5" />
              I'm Okay
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VoiceAssistant;