import React from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { Bell, Search, Menu } from "lucide-react";

const CustomerHeader: React.FC = () => {
  const { user } = useCustomerAuth();

  return (
    <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-muted-foreground">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search in dashboard..." 
            className="w-full bg-accent border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary border-2 border-card rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-foreground leading-tight">{user?.name}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden border-2 border-primary/20">
            <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
