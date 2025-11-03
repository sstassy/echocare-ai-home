import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmergencyAlert from "./pages/EmergencyAlert";
import Vitals from "./pages/Vitals";
import HouseMapPage from "./pages/HouseMapPage";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";
import NotFound from "./pages/NotFound";
import MobileNavigation from "./components/MobileNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/emergency-alert" element={<EmergencyAlert />} />
            <Route path="/vitals" element={<Vitals />} />
            <Route path="/house-map" element={<HouseMapPage />} />
            <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
