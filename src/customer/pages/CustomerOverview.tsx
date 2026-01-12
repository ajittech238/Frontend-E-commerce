import React, { useState } from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
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
  Zap,
  Calendar,
  RefreshCw,
  Download,
  ArrowDownRight,
  Eye,
  Gift,
  User,
  Truck
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerOverview: React.FC = () => {
  const { user } = useCustomerAuth();
  const { items: wishlistItems } = useWishlist();
  const { items: cartItems } = useCart();
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const stats = [
    {
      title: "Total Spent",
      value: user?.totalSpent || "₹0",
      change: "+12.5%",
      trend: "up" as const,
      icon: CreditCard,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Total Orders",
      value: user?.ordersCount?.toString() || "0",
      change: `Last: ${user?.orders?.[0]?.date || 'None'}`,
      trend: "up" as const,
      icon: ShoppingBag,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
      title: "Wishlist Items",
      value: wishlistItems.length.toString(),
      change: "Items to buy",
      trend: "up" as const,
      icon: Heart,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Cart Items",
      value: cartItems.length.toString(),
      change: "Items in cart",
      trend: "up" as const,
      icon: ShoppingBag,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/10",
    }
  ];

  const recentOrders = user?.orders?.slice(0, 3).map((order: any) => ({
    id: order.id,
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: `₹${order.total.toLocaleString()}`,
    status: order.orderStatus,
    items: order.items.map((i: any) => i.name).join(", ")
  })) || [];

  const OrderStatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
      'Delivered': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      'In Transit': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'Processing': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'Pending': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    };
    return (
      <Badge className={`text-xs whitespace-nowrap border ${statusStyles[status] || statusStyles.Pending}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Hello, {user?.name.split(' ')[0]}!</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Welcome back! Here's what's happening with your account today.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 h-9 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={handleRefresh}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button size="sm" className="h-9 bg-pink-gradient text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all font-semibold border-0">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.bgGradient} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                    stat.trend === "up" ? "text-emerald-600" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    <span className="font-semibold">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Spending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Recent Orders</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Track your latest purchases</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary cursor-pointer">
              <Link to="/customer/orders">
                View all
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 sm:p-4 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-gradient/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm sm:text-base truncate">{order.id}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.items}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-semibold text-foreground text-sm">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                    <Button variant="ghost" size="icon" asChild className="w-8 h-8 flex-shrink-0">
                      <Link to={`/customer/orders/${order.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-muted-foreground">
                  No orders yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Address Details</CardTitle>
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <CardDescription className="text-xs sm:text-sm">Your primary shipping address</CardDescription>
          </CardHeader>
          <CardContent>
            {user?.addresses && user.addresses.length > 0 ? (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-accent/30 border border-border/50">
                  <p className="font-bold text-sm text-foreground">{user.addresses[0].fullName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user.addresses[0].address}</p>
                  <p className="text-xs text-muted-foreground">{user.addresses[0].city}, {user.addresses[0].state} - {user.addresses[0].zipCode}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                    <Clock size={12} />
                    Last used during checkout
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link to="/customer/profile">Manage Addresses</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-muted-foreground mb-4">No addresses saved yet.</p>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rewards & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Saved Payments</CardTitle>
              <CreditCard className="w-5 h-5 text-emerald-500" />
            </div>
            <CardDescription className="text-xs sm:text-sm">Your payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.orders && user.orders.length > 0 ? (
              <div className="p-3 rounded-xl bg-accent/30 flex items-center justify-between border border-border/50">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-primary" />
                  <span className="text-xs font-bold uppercase">{user.orders[0].paymentMethod}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">Primary</Badge>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground">No payment methods saved.</p>
              </div>
            )}
            <Button variant="ghost" size="sm" className="w-full text-[10px] uppercase tracking-widest font-black" disabled>
              Add New Method
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "My Profile", icon: User, path: "/customer/profile", color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Track Orders", icon: Truck, path: "/customer/orders", color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Wishlist", icon: Heart, path: "/customer/wishlist", color: "text-pink-500", bg: "bg-pink-500/10" },
            { label: "Rewards", icon: Gift, path: "/customer/rewards", color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((item) => (
            <Link key={item.label} to={item.path} className="group">
              <Card className="border-border/50 h-full hover:border-primary/50 transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-foreground">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
