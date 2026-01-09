import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Users,
  RotateCcw,
  HeadphonesIcon,
  BarChart3,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Warehouse, label: "Inventory", path: "/inventory" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: RotateCcw, label: "Returns", path: "/returns" },
  { icon: HeadphonesIcon, label: "Support", path: "/support" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
];

const bottomNavItems = [
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    const linkContent = (
      <NavLink
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        )}
      >
        <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "drop-shadow-lg")} />
        {!collapsed && (
          <span
            className="font-bold tracking-tight text-sm"
          >
            {item.label}
          </span>
        )}
        {isActive && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full"
          />
        )}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="bg-secondary text-secondary-foreground">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <aside
      style={{ width: collapsed ? 80 : 256 }}
      className="fixed left-0 top-0 h-full bg-sidebar flex flex-col border-r border-sidebar-border z-50 transition-all duration-300"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Store className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-black text-sidebar-foreground tracking-tighter leading-tight">StaffHub</h1>
              <p className="text-[10px] font-bold text-sidebar-foreground/60 uppercase tracking-[0.2em]">E-Commerce</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="text-[10px] font-black text-sidebar-foreground/40 uppercase tracking-[0.2em] px-4 mb-4">
            Main Menu
          </p>
        )}
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
        <button
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full",
            "text-destructive/80 hover:text-destructive hover:bg-destructive/10"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-bold tracking-tight text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
