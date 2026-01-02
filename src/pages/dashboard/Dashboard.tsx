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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
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
          <Button size="sm" className="h-9 bg-pink-gradient">
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
        <DialogContent className="sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader className="p-4 sm:p-6 pb-0">
                <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center">
                  <Hash className="w-6 h-6 mr-2 text-primary" />
                  Order Details: {selectedOrder.id}
                </DialogTitle>
                <DialogDescription>
                  {new Date(selectedOrder.date).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="px-4 sm:px-6 py-2 sm:py-4 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Customer Details */}
                  <Card className="bg-accent/50 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary" />
                        Customer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-center">
                        <strong className="w-16">Name:</strong>
                        <span className="text-muted-foreground">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedOrder.email}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedOrder.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Summary */}
                  <Card className="bg-accent/50 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex justify-between items-center">
                        <strong>Status:</strong>
                        <OrderStatusBadge status={selectedOrder.status} />
                      </div>
                      <div className="flex justify-between items-center">
                        <strong>Total:</strong>
                        <span className="font-bold text-lg text-foreground">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <strong>Items:</strong>
                        <span className="text-muted-foreground">{selectedOrder.items.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Items List */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-primary" />
                    Items Ordered
                  </h3>
                  <div className="border rounded-lg overflow-hidden border-border/50">
                    {selectedOrder.items.map((item, index) => (
                      <div key={item.productId} className={`flex items-center justify-between p-3 ${index !== selectedOrder.items.length - 1 ? 'border-b border-border/50' : ''} hover:bg-accent/30`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center text-primary font-bold">
                            {item.quantity}x
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Product ID: {item.productId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground text-sm">₹{item.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Subtotal: ₹{(item.quantity * item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
