
import { useState, useMemo } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Users,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/data/products";
import { orders, Order } from "@/data/orders";
import { Separator } from "@/components/ui/separator";

const stats = [
  {
    title: "Total Revenue",
    value: "₹24,56,789",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Total Orders",
    value: orders.length.toString(),
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Total Products",
    value: products.length.toString(),
    change: "+3.1%",
    trend: "up" as const,
    icon: Package,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "-2.4%",
    trend: "down" as const,
    icon: Users,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  }
];

const recentOrders = orders.slice(0, 5);
const topProducts = products.slice(0, 5);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const orderStats = useMemo(() => ({
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  }), []);

  const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusStyles = {
      delivered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      shipped: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return (
      <Badge className={`text-xs whitespace-nowrap border ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Welcome back! Here's what's happening today.</p>
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
              <SelectItem value="90d">Last 90 days</SelectItem>
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
                    <span className="text-muted-foreground hidden sm:inline">vs last period</span>
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

      {/* Order Status Quick View */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold">Order Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Pending", value: orderStats.pending, color: "bg-amber-500" },
              { label: "Processing", value: orderStats.processing, color: "bg-blue-500" },
              { label: "Shipped", value: orderStats.shipped, color: "bg-purple-500" },
              { label: "Delivered", value: orderStats.delivered, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label} className="relative p-3 sm:p-4 rounded-xl bg-accent/50 overflow-hidden group hover:bg-accent transition-colors">
                <div className={`absolute top-0 left-0 w-1 h-full ${item.color}`} />
                <p className="text-xl sm:text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Recent Orders</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Latest transactions from your store</CardDescription>
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
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm sm:text-base truncate">{order.id}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-semibold text-foreground text-sm">₹{order.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Top Products</CardTitle>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <CardDescription className="text-xs sm:text-sm">Best performing items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 group">
                <span className="text-xs font-bold text-muted-foreground w-4">#{index + 1}</span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-xs sm:text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">{Math.floor(Math.random() * 100 + 50)} sold</p>
                  <div className="flex items-center text-xs text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {Math.floor(Math.random() * 20 + 5)}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Categories Performance */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Category Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Sales distribution across categories</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "Electronics", sales: 45, amount: "₹12.5L", color: "bg-blue-500" },
              { name: "Fashion", sales: 32, amount: "₹8.2L", color: "bg-purple-500" },
              { name: "Home & Living", sales: 28, amount: "₹6.8L", color: "bg-emerald-500" },
              { name: "Beauty", sales: 24, amount: "₹5.4L", color: "bg-pink-500" },
              { name: "Sports", sales: 18, amount: "₹3.2L", color: "bg-amber-500" },
            ].map((category) => (
              <div key={category.name} className="p-3 sm:p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-xs font-semibold text-primary">{category.sales}%</span>
                </div>
                <Progress value={category.sales} className="h-1.5 sm:h-2" />
                <p className="text-xs text-muted-foreground">{category.amount} revenue</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={selectedOrder !== null} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
        <DialogContent className="w-[95vw] sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl bg-background/95 backdrop-blur-xl rounded-sm">
          {selectedOrder && (
            <div className="flex flex-col h-full max-h-[92vh] sm:max-h-[90vh]">
              {/* Header with Gradient */}
              <div className="relative p-5 sm:p-8 bg-gradient-to-br from-primary/10 via-background to-background border-b">
                <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
                  <Package className="w-24 h-24 rotate-12" />
                </div>
                
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <div className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        Official Order
                      </div>
                      <span className="text-muted-foreground text-[10px]">•</span>
                      <span className="text-muted-foreground text-[10px] sm:text-xs">{new Date(selectedOrder.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                      <span className="text-primary opacity-50">#</span>
                      {selectedOrder.id.replace('ORD-', '')}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <OrderStatusBadge status={selectedOrder.status} />
                    <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full shrink-0">
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-6 sm:space-y-8">
                {/* Simple Timeline / Progress */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">Order Progress</span>
                    <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">Est. Delivery: 05 Jan</span>
                  </div>
                  <div className="relative flex items-center justify-between px-1 sm:px-2">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-muted-foreground/20 z-0 mx-4" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0 transition-all duration-1000 mx-4" style={{ width: selectedOrder.status === 'delivered' ? 'calc(100% - 2rem)' : selectedOrder.status === 'shipped' ? '66%' : selectedOrder.status === 'processing' ? '33%' : '0%' }} />
                    
                    {[
                      { label: 'Placed', icon: Package, status: ['pending', 'processing', 'shipped', 'delivered'] },
                      { label: 'Process', icon: RefreshCw, status: ['processing', 'shipped', 'delivered'] },
                      { label: 'Shipped', icon: Truck, status: ['shipped', 'delivered'] },
                      { label: 'Done', icon: Package, status: ['delivered'] },
                    ].map((step, i) => {
                      const isActive = step.status.includes(selectedOrder.status);
                      return (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-background border-muted-foreground/30 text-muted-foreground'}`}>
                            <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className={`text-[9px] sm:text-[10px] font-bold ${isActive ? 'text-primary' : 'text-muted-foreground'} hidden xs:block`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-tight">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Customer
                    </div>
                    <div className="p-4 rounded-xl sm:rounded-2xl bg-accent/30 border border-border/50 hover:bg-accent/40 transition-colors">
                      <p className="font-bold text-foreground text-sm mb-1">{selectedOrder.customerName}</p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5 mb-2 truncate">
                        <Mail className="w-3 h-3 shrink-0" />
                        {selectedOrder.email}
                      </p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground flex items-start gap-1.5 leading-relaxed">
                        <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                        {selectedOrder.address}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-tight">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Payment
                    </div>
                    <div className="p-4 rounded-xl sm:rounded-2xl bg-accent/30 border border-border/50 hover:bg-accent/40 transition-colors">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Method</span>
                        <span className="text-[11px] sm:text-xs font-bold text-foreground">Credit Card</span>
                      </div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Status</span>
                        <Badge variant="outline" className="text-[9px] sm:text-[10px] h-5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Paid</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Currency</span>
                        <span className="text-[11px] sm:text-xs font-bold text-foreground">INR (₹)</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-3 sm:col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-tight">
                      <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Shipping
                    </div>
                    <div className="p-4 rounded-xl sm:rounded-2xl bg-accent/30 border border-border/50 hover:bg-accent/40 transition-colors">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Carrier</span>
                        <span className="text-[11px] sm:text-xs font-bold text-foreground">BlueDart</span>
                      </div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Type</span>
                        <span className="text-[11px] sm:text-xs font-bold text-foreground">Express</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Track ID</span>
                        <span className="text-[11px] sm:text-xs font-bold text-primary underline underline-offset-2 cursor-pointer">BD-92182</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm uppercase tracking-tight">
                      <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Order Items ({selectedOrder.items.length})
                    </div>
                  </div>
                  
                  {/* Desktop Table */}
                  <div className="hidden sm:block rounded-2xl border border-border/50 overflow-hidden bg-accent/10">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-accent/30 text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                            <th className="px-4 py-3 font-semibold">Product</th>
                            <th className="px-4 py-3 font-semibold text-center">Qty</th>
                            <th className="px-4 py-3 font-semibold text-right">Price</th>
                            <th className="px-4 py-3 font-semibold text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {selectedOrder.items.map((item) => (
                            <tr key={item.productId} className="hover:bg-accent/30 transition-colors group">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border group-hover:border-primary/30 transition-colors shrink-0">
                                    <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium">SKU: {item.productId.split('-')[1]}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-xs font-bold text-foreground">
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <p className="text-sm font-medium text-foreground">₹{item.price.toLocaleString()}</p>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <p className="text-sm font-bold text-foreground">₹{(item.quantity * item.price).toLocaleString()}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Item Cards */}
                  <div className="sm:hidden space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.productId} className="p-3 rounded-xl border border-border/50 bg-accent/10 flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border shrink-0">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <p className="text-xs font-bold text-foreground truncate">{item.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] text-muted-foreground font-medium uppercase">Qty: {item.quantity}</p>
                            <p className="text-xs font-bold text-primary">₹{(item.quantity * item.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary & Totals */}
                <div className="flex flex-col sm:flex-row justify-end gap-6 pt-4 border-t border-dashed">
                  <div className="w-full sm:w-64 space-y-2.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-muted-foreground">Shipping Fee</span>
                      <span className="text-emerald-500 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-muted-foreground">Tax (GST 18%)</span>
                      <span className="font-medium text-foreground">₹{(selectedOrder.total * 0.18).toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-bold text-foreground">Total Amount</span>
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-black text-primary">₹{(selectedOrder.total * 1.18).toLocaleString()}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase">Inclusive of all taxes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-6 bg-accent/20 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground font-medium order-2 sm:order-1">
                  <Clock className="w-3 h-3 sm:w-3 " />
                  Last updated: 5 mins ago
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                  <Button variant="outline" className="flex-1 sm:flex-none h-9 text-xs border-border/50 hover:bg-background" onClick={() => setSelectedOrder(null)}>
                    Close
                  </Button>
                  <Button className="flex-1 sm:flex-none h-9 text-xs bg-pink-gradient text-white shadow-lg hover:shadow-primary/20 hover:opacity-90 transition-all">
                    Print Invoice
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
