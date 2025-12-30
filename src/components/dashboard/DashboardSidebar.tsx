import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, CreditCard, Settings, LogOut, Store,
  Users, BarChart3, FolderTree, Ticket, Warehouse, Box, RotateCcw, FileText, Star, Shield,
  Gift, Coins, MessageSquare, Mail, Bell, Calendar, Building2, DollarSign, Plug, Bot,
  ShoppingBag, Truck, HelpCircle, PanelLeftClose, PanelRightOpen
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", url: "/dashboard/products", icon: Package, badge: "24" },
      { title: "Categories", url: "/dashboard/categories", icon: FolderTree },
      { title: "Reviews", url: "/dashboard/reviews", icon: Star },
    ],
  },
  {
    label: "Sales",
    items: [
      { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart, badge: "8" },
      { title: "Checkout", url: "/dashboard/checkout", icon: CreditCard },
      { title: "Coupons", url: "/dashboard/coupons", icon: Ticket },
      { title: "Invoices", url: "/dashboard/invoices", icon: FileText },
      { title: "Returns", url: "/dashboard/returns", icon: RotateCcw },
      { title: "Transactions", url: "/dashboard/transactions", icon: DollarSign },
    ],
  },
  {
    label: "Customers",
    items: [
      { title: "Users", url: "/dashboard/users", icon: Users },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
      { title: "Refer & Earn", url: "/dashboard/refer-earn", icon: Gift },
      { title: "Rewards", url: "/dashboard/rewards", icon: Coins },
      { title: "Q&A", url: "/dashboard/qa", icon: HelpCircle },
    ],
  },
  {
    label: "Inventory",
    items: [
      { title: "Warehouses", url: "/dashboard/warehouses", icon: Warehouse },
      { title: "Racks", url: "/dashboard/racks", icon: Box },
      { title: "Shops", url: "/dashboard/shops", icon: Store },
    ],
  },
  {
    label: "HR & Payroll",
    items: [
      { title: "Employees", url: "/dashboard/employees", icon: Users },
      { title: "Departments", url: "/dashboard/departments", icon: Building2 },
      { title: "Leaves", url: "/dashboard/leaves", icon: Calendar },
      { title: "Salaries", url: "/dashboard/salaries", icon: DollarSign },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Email Templates", url: "/dashboard/emails", icon: Mail },
      { title: "Chatbot", url: "/dashboard/chatbot", icon: Bot },
      { title: "WhatsApp", url: "/dashboard/whatsapp", icon: MessageSquare },
    ],
  },
  {
    label: "Integrations",
    items: [
      { title: "Razorpay", url: "/dashboard/razorpay", icon: CreditCard },
      { title: "Amazon", url: "/dashboard/amazon", icon: ShoppingBag },
      { title: "Shopify", url: "/dashboard/shopify", icon: Store },
      { title: "All Integrations", url: "/dashboard/integrations", icon: Plug },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Roles & Permissions", url: "/dashboard/roles", icon: Shield },
      { title: "Event Logs", url: "/dashboard/events", icon: BarChart3 },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/50">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center shadow-lg">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">Craftsy</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Panel</span>
              </div>
            )}
          </NavLink>
          {!collapsed && (
            <SidebarTrigger className="p-2 rounded-lg hover:bg-accent">
              <PanelLeftClose className="w-4 h-4" />
            </SidebarTrigger>
          )}
        </div>
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
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <NavLink
                            to={item.url}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm",
                              isActive
                                ? "bg-pink-gradient text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
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
          onClick={() => navigate("/")}
          tooltip="Logout"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 w-full"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </SidebarMenuButton>
        {collapsed && (
          <div className="flex justify-center pt-2">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-accent">
              <PanelRightOpen className="w-4 h-4" />
            </SidebarTrigger>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
