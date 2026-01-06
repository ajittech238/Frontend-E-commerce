import React, { useState } from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { Bell, Search, Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerHeaderProps {
  onMenuClick?: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ onMenuClick }) => {
  const { user } = useCustomerAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
            onClick={() => navigate('/customer/profile')}
            className="flex items-center gap-3 pl-3 border-l border-border cursor-pointer group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-foreground leading-tight group-hover:text-primary transition-colors">{user?.name}</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden border-2 border-primary/20 shadow-sm group-hover:border-primary transition-all">
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
