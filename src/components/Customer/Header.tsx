import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./useTheme";
import { Breadcrumbs } from "./Breadcrumbs";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const notifications = [
  { id: 1, title: "New order received", time: "2 min ago", read: false },
  { id: 2, title: "Low stock alert: iPhone 15", time: "15 min ago", read: false },
  { id: 3, title: "Return request #1234", time: "1 hour ago", read: true },
  { id: 4, title: "Support ticket assigned", time: "2 hours ago", read: true },
];

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, products..."
            className="w-64 pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary font-medium placeholder:font-bold placeholder:text-[11px] placeholder:uppercase placeholder:tracking-wider"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center group focus:outline-none">
              <Bell className="w-5 h-5 stroke-[2px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-slate-900 shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 mt-2 p-0 overflow-hidden border-border/50 shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border/50 bg-muted/30">
              <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Notifications</h3>
              <Badge className="bg-primary text-primary-foreground border-none font-bold tabular-nums text-[10px] h-5 px-2">{unreadCount} NEW</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`px-4 py-3 cursor-pointer border-b border-slate-50 dark:border-slate-800/50 last:border-0 ${!notification.read ? "bg-primary/[0.03]" : ""}`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.read ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`} />
                    <div className="flex-1">
                      <p className={`text-sm tracking-tight ${!notification.read ? "font-bold text-foreground" : "text-muted-foreground font-medium"}`}>
                        {notification.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1 font-bold uppercase tracking-wider tabular-nums">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary font-bold py-3 cursor-pointer hover:bg-primary/5">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group focus:outline-none border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
              <div className="relative shrink-0">
                <Avatar className="w-8 h-8 border-2 border-white dark:border-slate-900 shadow-sm group-hover:border-primary/20 transition-colors">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></div>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-black text-foreground leading-none tracking-tight">John Doe</p>
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1.5">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
