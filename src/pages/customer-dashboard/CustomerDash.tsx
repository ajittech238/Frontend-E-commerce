import {
  ShoppingCart,
  DollarSign,
  Clock,
  AlertTriangle,
  RotateCcw,
  HeadphonesIcon,
  Calendar,
  RefreshCw,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "./StatCard";
import { SalesChart } from "./SalesChart";
import { OrderStatusChart } from "./OrderStatusChart";
import { RecentOrders } from "./RecentOrders";
import { LowStockAlert } from "./LowStockAlert";

const stats = [
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12.5%",
    trend: "up" as const,
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Revenue",
    value: "₹48,920",
    change: "+8.2%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Pending Orders",
    value: "47",
    change: "-5.1%",
    trend: "down" as const,
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Low Stock Items",
    value: "12",
    change: "+3.2%",
    trend: "up" as const,
    icon: AlertTriangle,
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    title: "Return Requests",
    value: "8",
    change: "-2.4%",
    trend: "down" as const,
    icon: RotateCcw,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
  },
  {
    title: "Support Tickets",
    value: "23",
    change: "+5.7%",
    trend: "up" as const,
    icon: HeadphonesIcon,
    gradient: "from-sky-500 to-blue-500",
    bgGradient: "from-sky-500/10 to-blue-500/10",
  },
];

export default function CustomerDash() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tighter">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium tracking-tight">Welcome back! Here's what's happening today.</p>
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
          <Button size="sm" className="h-9 bg-pink-gradient">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            gradient={stat.gradient}
            bgGradient={stat.bgGradient}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <OrderStatusChart />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <LowStockAlert />
      </div>
    </div>
  );
}
