import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  LogOut,
  LayoutDashboard,
  Bell,
  Gift,
  Coins,
  HelpCircle
} from "lucide-react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { cn } from "../../lib/utils";


interface CustomerSidebarProps {
  onAction?: () => void;
}

const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ onAction }) => {
  const { logout } = useCustomerAuth();
  const navigate = useNavigate();

  const menuGroups = [
    {
      title: "Core",
      items: [
        { name: "Dashboard", path: "/customer", icon: LayoutDashboard },
        { name: "My Profile", path: "/customer/profile", icon: User },
        { name: "Notifications", path: "/customer/notifications", icon: Bell },
      ]
    },
    {
      title: "Shopping",
      items: [
        { name: "My Orders", path: "/customer/orders", icon: ShoppingBag },
        { name: "Wishlist", path: "/customer/wishlist", icon: Heart },
        { name: "Addresses", path: "/customer/addresses", icon: MapPin },
      ]
    },
    {
      title: "Benefits",
      items: [
        { name: "Refer & Earn", path: "/customer/refer-earn", icon: Gift },
        { name: "Rewards", path: "/customer/rewards", icon: Coins },
      ]
    },
    {
      title: "Support",
      items: [
        { name: "Help & Support", path: "/customer/qa", icon: HelpCircle },
        { name: "Security", path: "/customer/change-password", icon: Lock },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    onAction?.();
  };

  return (
    <div className="w-[280px] max-w-[80vw] bg-white dark:bg-zinc-950 h-full border-r border-border/50 flex flex-col transition-all duration-300 shadow-sm lg:shadow-none">
      <div className="p-8 pb-4">
        <div
          className="flex items-center gap-3 cursor-pointer group/logo"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover/logo:scale-110 transition-transform">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight group-hover/logo:text-primary transition-colors">Zenith</h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] leading-none">Shopper Account</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto scrollbar-hide">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h3 className="px-4 text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.15em] mb-2">{group.title}</h3>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/customer"}
                onClick={() => onAction?.()}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 text-sm group
                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={18} className={cn("transition-transform group-hover:scale-110 duration-300")} />
                    <span>{item.name}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 text-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout Session</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;
