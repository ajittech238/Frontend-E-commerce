import { useState, useMemo } from "react";
import { 
  Search, 
  Filter,
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { orders, Order } from "@/data/orders";

const statusConfig = {
  pending: { icon: Clock, color: "bg-amber-500", textColor: "text-amber-600", bgColor: "bg-amber-500/10", label: "Pending" },
  processing: { icon: Package, color: "bg-blue-500", textColor: "text-blue-600", bgColor: "bg-blue-500/10", label: "Processing" },
  shipped: { icon: Truck, color: "bg-purple-500", textColor: "text-purple-600", bgColor: "bg-purple-500/10", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "bg-emerald-500", textColor: "text-emerald-600", bgColor: "bg-emerald-500/10", label: "Delivered" },
  cancelled: { icon: XCircle, color: "bg-destructive", textColor: "text-destructive", bgColor: "bg-destructive/10", label: "Cancelled" },
};

export default function DashboardOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    revenue: orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0),
  }), []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage customer orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={handleRefresh}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <Card className="border-border/50 col-span-1">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        {Object.entries(statusConfig).map(([key, config]) => (
          <Card 
            key={key} 
            className={`border-border/50 cursor-pointer transition-all hover:shadow-md ${status === key ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setStatus(status === key ? "all" : key)}
          >
            <CardContent className="p-3 sm:p-4 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${config.color}`} />
              <p className="text-xl sm:text-2xl font-bold text-foreground">{stats[key as keyof typeof stats]}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Summary */}
      <Card className="border-border/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue (excluding cancelled)</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">₹{stats.revenue.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <ArrowUpRight className="w-5 h-5" />
              <span className="font-semibold">+12.5% from last month</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Order Fulfillment Rate</span>
              <span>{Math.round((stats.delivered / (stats.total - stats.cancelled)) * 100)}%</span>
            </div>
            <Progress value={(stats.delivered / (stats.total - stats.cancelled)) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-9 sm:h-10"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-44 h-9 sm:h-10">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm">Order ID</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm hidden sm:table-cell">Customer</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm hidden lg:table-cell">Items</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm hidden md:table-cell">Date</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm">Total</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm">Status</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr key={order.id} className="hover:bg-accent/30 transition-colors">
                    <td className="p-3 sm:p-4">
                      <span className="font-medium text-foreground text-sm">{order.id}</span>
                    </td>
                    <td className="p-3 sm:p-4 hidden sm:table-cell">
                      <div>
                        <p className="font-medium text-foreground text-sm">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{order.items.length} items</span>
                    </td>
                    <td className="p-3 sm:p-4 hidden md:table-cell text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="font-semibold text-foreground text-sm">₹{order.total.toLocaleString()}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <Badge className={`${statusConfig[order.status].bgColor} ${statusConfig[order.status].textColor} hover:${statusConfig[order.status].bgColor} text-xs`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">{statusConfig[order.status].label}</span>
                      </Badge>
                    </td>
                    <td className="p-3 sm:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="w-4 h-4 mr-2" /> Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Order {selectedOrder?.id}
              {selectedOrder && (
                <Badge className={`${statusConfig[selectedOrder.status].bgColor} ${statusConfig[selectedOrder.status].textColor}`}>
                  {statusConfig[selectedOrder.status].label}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {selectedOrder.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{selectedOrder.customerName}</p>
                          <p className="text-xs text-muted-foreground">Customer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {selectedOrder.email}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        {selectedOrder.address}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-emerald-600">Free</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span className="text-primary">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="items" className="mt-4">
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-4">
                  {[
                    { status: "Order Placed", date: selectedOrder.date, completed: true },
                    { status: "Payment Confirmed", date: selectedOrder.date, completed: true },
                    { status: "Processing", date: selectedOrder.date, completed: ["processing", "shipped", "delivered"].includes(selectedOrder.status) },
                    { status: "Shipped", date: selectedOrder.date, completed: ["shipped", "delivered"].includes(selectedOrder.status) },
                    { status: "Delivered", date: selectedOrder.date, completed: selectedOrder.status === "delivered" },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground'
                      }`}>
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 pb-4 border-l-2 border-border pl-4 -ml-4">
                        <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.status}
                        </p>
                        {step.completed && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(step.date).toLocaleDateString()} at {new Date(step.date).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
