import React from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Star, 
  TrendingUp,
  Clock,
  ChevronRight
} from "lucide-react";

const CustomerOverview: React.FC = () => {
  const { user } = useCustomerAuth();

  const stats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Wishlist", value: "8", icon: Heart, color: "bg-pink-500" },
    { label: "Saved Addresses", value: "2", icon: MapPin, color: "bg-purple-500" },
    { label: "Loyalty Points", value: "450", icon: Star, color: "bg-amber-500" },
  ];

  const recentOrders = [
    { id: "ORD-98231", date: "2 days ago", amount: "$129.00", status: "Delivered" },
    { id: "ORD-98210", date: "1 week ago", amount: "$84.50", status: "Delivered" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-[2rem] border border-primary/10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase">
            Welcome back, <span className="text-primary">{user?.name.split('')[0]}!</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Here's what's happening with your account today.
          </p>
        </div>
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-12 h-12 rounded-2xl border-4 border-background bg-accent flex items-center justify-center overflow-hidden">
              <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-2xl border-4 border-background bg-primary text-white flex items-center justify-center text-xs font-bold">
            +5
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-3xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center mb-4 shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            <div className="text-2xl font-black text-foreground mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-foreground tracking-tight uppercase">Recent Orders</h3>
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-[2rem] p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="font-black text-foreground">{order.id}</div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-foreground">{order.amount}</div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Card */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-foreground tracking-tight uppercase px-2">Quick Access</h3>
          <div className="bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-primary/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            <TrendingUp className="mb-6 opacity-80" size={32} />
            <h4 className="text-2xl font-black leading-tight mb-2">Exclusive <br /> Offers for You</h4>
            <p className="text-white/70 text-sm font-medium mb-6">Unlock special discounts and early access to sales.</p>
            <button className="w-full bg-white text-primary py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-opacity-90 transition-all">
              Claim Rewards
            </button>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-6 space-y-4">
            <h4 className="font-black text-foreground uppercase tracking-tight text-sm">Active Subscription</h4>
            <div className="flex items-center gap-3 p-3 bg-accent rounded-2xl">
              <CreditCard className="text-primary" size={20} />
              <div className="text-xs font-bold text-foreground">Premium Membership</div>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium text-center italic">Next billing on April 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
