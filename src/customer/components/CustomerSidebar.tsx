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

const CustomerSidebar: React.FC = () => {
  const { logout } = useCustomerAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/customer", icon: LayoutDashboard },
    { name: "My Profile", path: "/customer/profile", icon: User },
    { name: "My Orders", path: "/customer/orders", icon: ShoppingBag },
    { name: "Wishlist", path: "/customer/wishlist", icon: Heart },
    { name: "Addresses", path: "/customer/addresses", icon: MapPin },
    { name: "Notifications", path: "/customer/notifications", icon: Bell },
    { name: "Refer & Earn", path: "/customer/refer-earn", icon: Gift },
    { name: "Rewards", path: "/customer/rewards", icon: Coins },
    { name: "Help & Support", path: "/customer/qa", icon: HelpCircle },
    { name: "Security", path: "/customer/change-password", icon: Lock },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-card h-full border-r border-border flex flex-col transition-colors duration-300">
      <div className="p-6">
        <h2 className="text-xl font-black text-foreground uppercase tracking-tighter">Account</h2>
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Management</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/customer"}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300
              ${isActive 
                ? "bg-primary text-primary-foreground shadow-lg shadow-pink-500/20" 
                : "text-muted-foreground hover:bg-accent hover:text-primary"}
            `}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-black rounded-xl hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;
