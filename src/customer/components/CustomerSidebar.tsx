import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin, Star, Settings, LogOut, Store,
  Users, BarChart3, Ticket, RotateCcw, FileText, Bell, Calendar, HeadphonesIcon,
  User, CreditCard, Gift, Coins, HelpCircle, Lock
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const menuGroups = [
  {
    label: "Core",
    items: [
      { name: "Dashboard", path: "/customer", icon: LayoutDashboard },
      { name: "My Profile", path: "/customer/profile", icon: User },
      { name: "Notifications", path: "/customer/notifications", icon: Bell, badge: "3" },
    ]
  },
  {
    label: "Shopping",
    items: [
      { name: "My Orders", path: "/customer/orders", icon: ShoppingBag, badge: "2" },
      { name: "Wishlist", path: "/customer/wishlist", icon: Heart, badge: "12" },
      { name: "Addresses", path: "/customer/addresses", icon: MapPin },
    ]
  },
  {
    label: "Benefits",
    items: [
      { name: "Refer & Earn", path: "/customer/refer-earn", icon: Gift },
      { name: "Rewards", path: "/customer/rewards", icon: Coins },
    ]
  },
  {
    label: "Support",
    items: [
      { name: "Help & Support", path: "/customer/qa", icon: HelpCircle },
      { name: "Security", path: "/customer/change-password", icon: Lock },
    ]
  }
];

interface CustomerSidebarProps {
  onAction?: () => void;
}

const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ onAction }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useCustomerAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    logout();
    navigate("/login");
    onAction?.();
  };

  return (
    <ShadcnSidebar collapsible="icon" className="border-r border-border/50 bg-card">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center shadow-lg flex-shrink-0">
            <Store className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Zenith</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Customer Portal</span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <ScrollArea className="h-[calc(100vh-180px)]">
          {menuGroups.map((group) => (
            <SidebarGroup key={group.label} className="py-2">
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path || (item.path === "/customer" && location.pathname === "/customer/");
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton 
                          asChild 
                          tooltip={collapsed ? item.name : undefined}
                        >
                          <NavLink
                            to={item.path}
                            className={cn(
                              "flex items-center py-2 rounded-lg transition-all text-sm",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span className="flex-1 truncate">{item.name}</span>}
                            {!collapsed && (item as any).badge && (
                              <Badge variant={isActive ? "secondary" : "outline"} className="text-[10px] px-1.5 py-0">
                                {(item as any).badge}
                              </Badge>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2 border-t border-border/50">
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip={collapsed ? "Logout" : undefined}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default CustomerSidebar;
