import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/catalog", label: "Catalog" },
  ];
  
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">Comet Capital Grill</p>
            <p className="text-sm text-slate-400">Supply Chain Analytics</p>
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
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
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

