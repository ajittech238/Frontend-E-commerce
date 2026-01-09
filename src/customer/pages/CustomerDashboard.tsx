import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
import { Badge } from "@/components/ui/badge";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const CustomerDashboard: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useCustomerAuth();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "Your order #1234 has been shipped", time: "2 min ago", unread: true },
    { id: 2, title: "New offer: 20% off on electronics", time: "1 hour ago", unread: true },
    { id: 3, title: "Reward points added to your account", time: "3 hours ago", unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background dashboard-pink-theme">
        <CustomerSidebar onAction={() => {}} />
        <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-12 sm:h-14 md:h-16 border-b border-border/50 flex items-center px-2 xs:px-3 sm:px-4 md:px-6 bg-card/80 backdrop-blur-md sticky top-0 z-50 gap-2">
            <div className="lg:hidden">
              <SidebarTrigger className="h-10 w-10 text-foreground hover:bg-accent/40">
                <Menu className="h-6 w-6 stroke-[2px]" />
              </SidebarTrigger>
            </div>
            <div>
              <div className={`relative transition-all duration-300 hidden xs:block min-w-0 ${searchFocused ? 'w-40 sm:w-64 md:w-80' : 'w-24 sm:w-48 md:w-64'}`}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground stroke-[2px]" />
                  <Input
                    placeholder="Search orders, products..."
                    className="pl-10 pr-3 py-1.5 sm:py-2 h-9 sm:h-10 bg-accent/30 border-primary/20 focus:border-primary focus:bg-background transition-all text-xs sm:text-sm"
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
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/20 hover:bg-accent/40 transition-all duration-200"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? (
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-[2px]" />
                ) : (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-[2px]" />
                )}
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/20 hover:bg-accent/40 transition-all duration-200"
                  >
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-[2px]" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-600 rounded-full border-2 border-background shadow-sm" />
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
                        {notification.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
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

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 pr-2 sm:pr-3 h-8 sm:h-9 rounded-full hover:bg-accent transition-all duration-200">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/20">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{user?.name || 'Customer'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 xs:w-56">
                  <DropdownMenuLabel className="text-xs xs:text-sm">
                    <div className="flex flex-col">
                      <span>{user?.name || 'Customer'}</span>
                      <span className="text-[11px] xs:text-xs font-normal text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/customer/profile')} className="text-xs xs:text-sm">
                    <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/customer/change-password')} className="text-xs xs:text-sm">
                    <Settings className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Security
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive text-xs xs:text-sm" onClick={handleLogout}>
                    <LogOut className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
