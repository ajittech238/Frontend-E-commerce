import React from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomerOverview: React.FC = () => {
  const { user } = useCustomerAuth();

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const stats = [
    { label: "Total Orders", value: user?.ordersCount?.toString() || "0", change: "+2 this month", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Wishlist Items", value: "23", change: "4 new added", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
    { label: "Zenith Coins", value: "1,250", change: "₹125 value", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Total Spent", value: user?.totalSpent || "₹0", change: "Last 6 months", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const recentOrders = [
    { id: "#ZN-98231", date: "Today, 02:45 PM", amount: "₹4,299.00", status: "In Transit", items: "iPhone Case, USB-C Cable" },
    { id: "#ZN-98210", date: "24 Mar, 2024", amount: "₹1,850.00", status: "Delivered", items: "Cotton T-shirt (M)" },
    { id: "#ZN-98192", date: "18 Mar, 2024", amount: "₹12,490.00", status: "Delivered", items: "Sony WH-1000XM4" },
  ];

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Banner & Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-border/50 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest mb-6">
              <Zap size={12} className="fill-current" />
              Elite Member
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none mb-4">
              Hello, <span className="text-primary">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="text-muted-foreground font-medium max-w-md text-sm lg:text-base leading-relaxed">
              Your last order is arriving by <span className="text-foreground font-bold">Tomorrow, 8 PM</span>. You've saved <span className="text-emerald-500 font-bold">₹2,450</span> this month!
            </p>
          </div>
          <div className="mt-8 flex items-center gap-6 relative z-10">
            <button className="px-8 py-3.5 bg-foreground text-background dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Track Order
            </button>
            <div className="h-10 w-px bg-border/50 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <ShieldCheck size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-black text-muted-foreground uppercase leading-none mb-1">Account Security</div>
                <div className="text-xs font-bold text-foreground">Verified & Secured</div>
              </div>
            </div>
          </div>
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Star size={32} className="fill-white" />
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                <ArrowUpRight size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-black leading-tight mb-2 uppercase tracking-tight">Reward<br />Points</h3>
            <div className="text-5xl font-black tracking-tighter mb-1">1,250</div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Available for redemption</p>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
              <span>Next Reward at 1500</span>
              <span className="text-white/60">84%</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[84%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 border border-border/50 rounded-[2rem] p-5 lg:p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-[0.1em] mb-1">{stat.label}</div>
              <div className="text-xl lg:text-2xl font-black text-foreground tracking-tight">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Orders Feed */}
        <div className="xl:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-black text-foreground tracking-tight uppercase">Active Orders</h3>
            <button className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-accent transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-zinc-900 border border-border/50 rounded-[2rem] p-4 lg:p-6 group hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-foreground text-sm lg:text-base">{order.id}</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          order.status === "In Transit" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1 flex items-center gap-2">
                        <Clock size={12} /> {order.date}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium truncate max-w-[200px]">{order.items}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1">
                    <div className="text-lg font-black text-foreground">{order.amount}</div>
                    <Link to={`/customer/orders/${order.id}`} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics & Quick Access */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-border/50 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-foreground tracking-tight uppercase">Spending</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Last 6 Months Activity</p>
              </div>
              <TrendingUp className="text-emerald-500" size={24} />
            </div>
            <div className="h-[200px] w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4b91" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff4b91" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.1}/>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}}
                    dy={10}
                  />
                  <Tooltip
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#18181b', color: '#fff'}}
                    itemStyle={{color: '#ff4b91', fontWeight: 900}}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ff4b91"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl p-6 hover:bg-primary/5 transition-colors cursor-pointer group">
              <CreditCard size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Payments</div>
              <div className="text-xs font-bold text-foreground">Manage Cards</div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl p-6 hover:bg-primary/5 transition-colors cursor-pointer group">
              <Star size={24} className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Support</div>
              <div className="text-xs font-bold text-foreground">Customer Care</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
