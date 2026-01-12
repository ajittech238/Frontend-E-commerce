import { useState, useMemo } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Heart,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreHorizontal,
  Calendar,
  RefreshCw,
  Download,
  Filter,
  User,
  Mail,
  MapPin,
  Truck,
  Hash,
  Clock,
  Star,
  Gift,
  Coins
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const stats = [
  {
    title: "Total Spent",
    value: "₹45,678",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Active Orders",
    value: "3",
    change: "Last 30 days",
    trend: "up" as const,
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Wishlist Items",
    value: "12",
    change: "+2 new",
    trend: "up" as const,
    icon: Heart,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Zenith Coins",
    value: "1,250",
    change: "₹125 value",
    trend: "up" as const,
    icon: Star,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  }
];

const recentOrders = [
  { id: "ORD-98231", date: "2024-03-24", total: 4299, status: "shipped", items: "iPhone Case, USB-C Cable" },
  { id: "ORD-98210", date: "2024-03-20", total: 1850, status: "delivered", items: "Cotton T-shirt (M)" },
  { id: "ORD-98192", date: "2024-03-15", total: 12490, status: "delivered", items: "Sony WH-1000XM4" },
];

export default function CustomerDash() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const OrderStatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
      delivered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      shipped: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return (
      <Badge className={`text-xs whitespace-nowrap border ${statusStyles[status] || statusStyles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Welcome back, John!</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Here's an overview of your recent activity and rewards.</p>
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
            <span className="hidden sm:inline">Statements</span>
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

      {/* Recent Orders & Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Recent Orders</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Track your latest purchases</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentOrders.map((order) => (
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
                      <p className="font-semibold text-foreground text-sm">₹{order.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                    <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Offers */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Special Offers</CardTitle>
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <CardDescription className="text-xs sm:text-sm">Handpicked deals for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {[
              { title: "20% Off on Electronics", code: "ELECTRO20", expiry: "2 days left" },
              { title: "Free Shipping on next order", code: "FREESHIP", expiry: "5 days left" },
              { title: "Buy 1 Get 1 on Fashion", code: "BOGOFA", expiry: "1 day left" },
            ].map((offer, index) => (
              <div key={index} className="p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors space-y-2">
                <p className="text-sm font-bold text-foreground">{offer.title}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-mono text-[10px]">{offer.code}</Badge>
                  <span className="text-[10px] text-muted-foreground">{offer.expiry}</span>
                </div>
              </div>
            ))}
            <Button className="w-full bg-pink-gradient text-white">View All Offers</Button>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Progress */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Rewards Program</CardTitle>
              <CardDescription className="text-xs sm:text-sm">You are 250 coins away from your next reward!</CardDescription>
            </div>
            <Coins className="w-5 h-5 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress to Gold Status</span>
              <span className="text-primary">80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-accent/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold">1,250</p>
                <p className="text-[10px] text-muted-foreground">Total Coins</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-accent/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold">₹125</p>
                <p className="text-[10px] text-muted-foreground">Cash Value</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-accent/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Gift className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-bold">5</p>
                <p className="text-[10px] text-muted-foreground">Rewards Claimed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
