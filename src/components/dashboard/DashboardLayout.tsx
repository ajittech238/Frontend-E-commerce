import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Bell, Search, User, Menu, Moon, Sun, Settings, LogOut, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function DashboardLayout() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "New order received", time: "2 min ago", unread: true },
    { id: 2, title: "Payment confirmed", time: "1 hour ago", unread: true },
    { id: 3, title: "Product low in stock", time: "3 hours ago", unread: false },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-12 sm:h-14 md:h-16 border-b border-border/50 flex items-center px-2 xs:px-3 sm:px-4 md:px-6 bg-card/80 backdrop-blur-md sticky top-0 z-50 gap-2">
            <div>
              <div className={`relative transition-all duration-300 hidden xs:block min-w-0 ${searchFocused ? 'w-40 sm:w-64 md:w-80' : 'w-24 sm:w-48 md:w-64'}`}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8 pr-3 py-1.5 sm:py-2 h-8 sm:h-9 md:h-10 bg-accent/50 border-transparent focus:border-primary/50 focus:bg-background transition-all text-xs sm:text-sm"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <kbd className="hidden lg:inline-flex absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
                    ⌘K
                  </kbd>
              </div>
            </div>
            
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0 ml-auto">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-accent"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-accent">
                    <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-pink-gradient text-primary-foreground text-[8px] sm:text-[10px] rounded-full flex items-center justify-center font-medium animate-pulse">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 xs:w-72 sm:w-80">
                  <DropdownMenuLabel className="flex items-center justify-between text-xs sm:text-sm">
                    Notifications
                    <Badge variant="secondary" className="text-[10px]">3 new</Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-2 xs:p-3 cursor-pointer">
                      <div className="flex items-center gap-2 w-full">
                        {notification.unread && <div className="w-1.5 h-1.5 rounded-full bg-pink-gradient" />}
                        <span className="font-medium text-xs xs:text-sm">{notification.title}</span>
                      </div>
                      <span className="text-[11px] xs:text-xs text-muted-foreground ml-3.5">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center text-primary font-medium text-xs sm:text-sm">
                    View all
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help */}
              <Button variant="ghost" size="icon" className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-accent">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 pr-2 sm:pr-3 h-8 sm:h-9 rounded-full hover:bg-accent">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                    <span className="hidden md:block text-xs sm:text-sm font-medium">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 xs:w-56">
                  <DropdownMenuLabel className="text-xs xs:text-sm">
                    <div className="flex flex-col">
                      <span>Admin User</span>
                      <span className="text-[11px] xs:text-xs font-normal text-muted-foreground">admin@craftsy.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')} className="text-xs xs:text-sm">
                    <Settings className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs xs:text-sm">
                    <HelpCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive text-xs xs:text-sm" onClick={() => navigate('/')}>
                    <LogOut className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 overflow-auto bg-background/50">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
