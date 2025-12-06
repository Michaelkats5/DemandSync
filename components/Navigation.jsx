import { Link, useLocation } from "react-router-dom";
import { DemandSyncLogo } from "./DemandSyncLogo";

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/catalog", label: "Catalog" },
  ];
  
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-orange-500 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center gap-4">
          <DemandSyncLogo size={36} color="#FFFFFF" />
          <div>
            <p className="text-xs uppercase tracking-wider text-orange-100">Demand Sync</p>
            <p className="text-sm text-white font-medium">Comet Capital Grill Intelligence Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || 
                            (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-white hover:bg-white/20 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

