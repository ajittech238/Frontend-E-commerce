import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useWarehouseAuth } from "../context/WarehouseAuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Settings,
  ArrowDownLeft,
  ArrowUpRight,
  Truck,
  RotateCcw,
  Users,
  MapPin,
  BarChart3,
  Zap,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/warehouse" },
  { icon: Package, label: "Inventory", path: "/warehouse/inventory" },
  { icon: ArrowDownLeft, label: "Inbound", path: "/warehouse/inbound" },
  { icon: ArrowUpRight, label: "Outbound", path: "/warehouse/outbound" },
  { icon: ClipboardList, label: "Orders", path: "/warehouse/orders" },
  { icon: Truck, label: "Shipments", path: "/warehouse/shipments" },
  { icon: RotateCcw, label: "Returns", path: "/warehouse/returns" },
  { icon: UserCircle, label: "Suppliers", path: "/warehouse/suppliers" },
  { icon: MapPin, label: "Locations", path: "/warehouse/locations" },
  { icon: Users, label: "Staff", path: "/warehouse/staff" },
  { icon: BarChart3, label: "Analytics", path: "/warehouse/analytics" },
  { icon: Zap, label: "Automation", path: "/warehouse/automation" },
  { icon: ShieldCheck, label: "Security", path: "/warehouse/security" },
  { icon: Settings, label: "Settings", path: "/warehouse/settings" },
];

export default function WarehouseLayout() {
  const { user, logout } = useWarehouseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/warehouse/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            WMS Portal
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 h-10",
                location.pathname === item.path && "bg-pink-50 text-pink-700 hover:bg-pink-100 hover:text-pink-800"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={cn("h-4 w-4", location.pathname === item.path ? "text-pink-600" : "text-muted-foreground")} />
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="p-4 border-t mt-auto">
          <div className="p-3 bg-muted/50 rounded-lg mb-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-xs">
              {user?.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-xs truncate">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.warehouseId}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full gap-2 justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> 
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">
              {menuItems.find((i) => i.path === location.pathname)?.label || "Warehouse"}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Actions</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
