import React, { useState } from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { 
  Bell, 
  Search, 
  Menu, 
  ShoppingCart, 
  ChevronDown, 
  UserCircle, 
  ShoppingBag, 
  Gift, 
  Star, 
  HelpCircle, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerHeaderProps {
  onMenuClick?: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/orders?search=${encodeURIComponent(searchQuery)}`);
      // Or search globally if preferred:
      // navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <header className="h-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-border px-4 sm:px-6 lg:px-8 flex items-center sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-3 lg:gap-6 w-full">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={onMenuClick}
          >
            <Menu size={22} />
          </button>
          <div className="hidden sm:flex items-center cursor-pointer" onClick={() => navigate('/') }>
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-black">Z</div>
            <div className="ml-2 hidden md:block">
              <div className="text-sm font-black text-foreground">Zenith</div>
              <div className="text-[10px] text-muted-foreground uppercase">Shopper</div>
            </div>
          </div>
        </div>

        {/* Search bar - prominent */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="flex-1 mx-4">
          <div className="flex items-center w-full max-w-4xl mx-auto bg-accent/60 dark:bg-zinc-900 border border-border/50 rounded-2xl px-3 py-2 shadow-sm">
            <select className="bg-transparent text-xs font-bold text-muted-foreground px-3 py-2 rounded-l-lg hidden md:inline-block border-r border-border/50">
              <option>All</option>
              <option>Orders</option>
              <option>Products</option>
            </select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search orders, products, and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none pl-10 pr-12 py-2 text-sm font-medium outline-none"
              />
            </div>
            <button type="submit" className="ml-3 bg-primary text-white px-4 py-2 rounded-lg text-sm font-black hover:brightness-95 transition-all">
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 lg:gap-6 ml-auto">
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
          </button>

          <button
            onClick={() => navigate('/customer/notifications')}
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
          </button>

          <div 
            className="relative group"
            onMouseEnter={() => setIsAccountOpen(true)}
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <DropdownMenu open={isAccountOpen} onOpenChange={setIsAccountOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-3 border-l border-border cursor-pointer group">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-black text-foreground leading-tight group-hover:text-primary transition-colors">{user?.name}</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden border-2 border-primary/20 shadow-sm group-hover:border-primary transition-all relative">
                    <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", isAccountOpen ? "rotate-180" : "")} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 p-2 bg-white dark:bg-zinc-950 border border-border/50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200" align="end">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-foreground">My Account</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 bg-border/50" />
                <DropdownMenuItem onClick={() => navigate("/customer/profile")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <UserCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/customer/orders")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/customer/refer-earn")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <Gift className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Refer & Earn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/customer/rewards")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <Star className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Rewards</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/customer/qa")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/customer/profile")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                  <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-bold">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 bg-border/50" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-all group text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-bold">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
