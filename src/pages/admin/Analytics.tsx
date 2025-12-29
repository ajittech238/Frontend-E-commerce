import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Target,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const revenueData = [
  { date: "Jan 1", revenue: 2400, target: 2400 },
  { date: "Jan 8", revenue: 2210, target: 2400 },
  { date: "Jan 15", revenue: 2290, target: 2400 },
  { date: "Jan 22", revenue: 2000, target: 2400 },
  { date: "Jan 29", revenue: 2181, target: 2400 },
  { date: "Feb 5", revenue: 2500, target: 2400 },
  { date: "Feb 12", revenue: 2100, target: 2400 },
  { date: "Feb 19", revenue: 2900, target: 2400 },
  { date: "Feb 26", revenue: 2300, target: 2400 },
  { date: "Mar 5", revenue: 3200, target: 2400 },
];

const salesData = [
  { month: "Jan", sales: 4000, orders: 240, customers: 221 },
  { month: "Feb", sales: 3000, orders: 213, customers: 229 },
  { month: "Mar", sales: 2000, orders: 229, customers: 200 },
  { month: "Apr", sales: 2780, orders: 200, customers: 218 },
  { month: "May", sales: 1890, orders: 229, customers: 250 },
  { month: "Jun", sales: 2390, orders: 200, customers: 210 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3b82f6" },
  { name: "Fashion", value: 25, color: "#a855f7" },
  { name: "Home", value: 20, color: "#10b981" },
  { name: "Beauty", value: 12, color: "#ec4899" },
  { name: "Sports", value: 8, color: "#f59e0b" },
];

const topProducts = [
  { id: 1, name: "Wireless Headphones", sales: 1204, revenue: "₹2,40,800", trend: 12 },
  { id: 2, name: "Smart Watch", sales: 1121, revenue: "₹2,24,200", trend: -5 },
  { id: 3, name: "Phone Case", sales: 1100, revenue: "₹1,10,000", trend: 23 },
  { id: 4, name: "USB Cable", sales: 989, revenue: "₹49,450", trend: 8 },
  { id: 5, name: "Screen Protector", sales: 876, revenue: "₹43,800", trend: -2 },
];

const customerMetrics = [
  { label: "Total Customers", value: "12,345", change: "+5.2%", trend: "up" },
  { label: "New Customers", value: "234", change: "+12.8%", trend: "up" },
  { label: "Returning Customers", value: "8,765", change: "+2.1%", trend: "up" },
  { label: "Customer Retention", value: "71%", change: "-1.2%", trend: "down" },
];

const conversionData = [
  { stage: "Visitors", value: 50000 },
  { stage: "Add to Cart", value: 8500 },
  { stage: "Checkout", value: 6200 },
  { stage: "Purchase", value: 4100 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      title: "Total Revenue",
      value: "₹24,56,789",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      bgColor: "from-emerald-500/10 to-green-500/10",
      iconBg: "from-emerald-500 to-green-500",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      bgColor: "from-blue-500/10 to-cyan-500/10",
      iconBg: "from-blue-500 to-cyan-500",
    },
    {
      title: "Unique Visitors",
      value: "45,678",
      change: "+21.4%",
      trend: "up",
      icon: Eye,
      bgColor: "from-purple-500/10 to-pink-500/10",
      iconBg: "from-purple-500 to-pink-500",
    },
    {
      title: "Conversion Rate",
      value: "8.2%",
      change: "-0.5%",
      trend: "down",
      icon: Target,
      bgColor: "from-amber-500/10 to-orange-500/10",
      iconBg: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 h-9 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last 1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="h-9">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className={`bg-gradient-to-br ${stat.bgColor} border-0`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
                    stat.trend === "up" ? "text-emerald-600" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Sales Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Weekly revenue vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
                <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Sales</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales & Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Performance</CardTitle>
          <CardDescription>Sales, orders, and new customers by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="customers" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products & Customer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products by sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-pink-gradient/20 flex items-center justify-center text-sm font-semibold text-primary">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">{product.revenue}</p>
                    <p className={`text-xs font-medium ${product.trend > 0 ? "text-emerald-600" : "text-destructive"}`}>
                      {product.trend > 0 ? "+" : ""}{product.trend}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
            <CardDescription>Key customer statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.value}</p>
                  </div>
                  <div className={`text-sm font-semibold ${metric.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
                    {metric.trend === "up" ? "+" : ""}{metric.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Customer journey from visit to purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionData.map((item, index) => {
              const percentage = (item.value / conversionData[0].value) * 100;
              const prevPercentage = index > 0 ? (conversionData[index - 1].value / conversionData[0].value) * 100 : 100;
              const drop = prevPercentage - percentage;

              return (
                <div key={item.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground">{item.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{item.value.toLocaleString()}</span>
                      {index > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <ArrowDownRight className="w-3 h-3 mr-1 text-destructive" />
                          {drop.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">{percentage.toFixed(1)}% of visitors</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Organic Search", value: 12500, percentage: 45, color: "bg-emerald-500" },
              { name: "Direct", value: 8200, percentage: 29, color: "bg-blue-500" },
              { name: "Social Media", value: 5300, percentage: 19, color: "bg-purple-500" },
              { name: "Paid Ads", value: 2100, percentage: 7, color: "bg-amber-500" },
            ].map((source) => (
              <div key={source.name} className="p-4 rounded-lg bg-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm text-foreground">{source.name}</p>
                  <Badge className="text-xs">{source.percentage}%</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{source.value.toLocaleString()}</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className={`${source.color} h-full rounded-full`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
