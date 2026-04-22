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
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-18 px-2 pt-2 pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-12 h-8 rounded-full mb-1 transition-colors ${
                    isActive ? "bg-primary/15" : ""
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                </span>
                <span className="text-xs font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
