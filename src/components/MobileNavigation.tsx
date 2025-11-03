import { Home, AlertCircle, Activity, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/emergency-alert", icon: AlertCircle, label: "Alerts" },
    { to: "/vitals", icon: Activity, label: "Vitals" },
    { to: "/house-map", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
