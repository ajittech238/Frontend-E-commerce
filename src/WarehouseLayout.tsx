import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useWarehouseAuth } from "./WarehouseAuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WarehouseLayout() {
  const { user, logout } = useWarehouseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/warehouse" },
    { icon: Package, label: "Inventory", path: "/warehouse/inventory" },
    { icon: ClipboardList, label: "Orders", path: "/warehouse/orders" },
    { icon: Settings, label: "Settings", path: "/warehouse/settings" },
  ];

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
          <span className="font-bold text-xl">Warehouse Portal</span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-4 bg-muted/50 rounded-lg mb-4">
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.warehouseId}</p>
          </div>
          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center px-6 bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">
            {menuItems.find((i) => i.path === location.pathname)?.label ||
              "Warehouse"}
          </h1>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
