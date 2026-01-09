import { useState } from "react";
import { useCustomerAuth } from "@/customer/context/CustomerAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Package,
  LogOut,
  Camera,
  Search,
  Filter,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  Download,
  Mail,
  XCircle,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Orders() {
  const { user, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);

  // Real Data from Context
  const orders = user?.orders || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "processing": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "shipped": return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default: return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-green-500";
      case "shipped": return "bg-purple-500";
      case "processing": return "bg-blue-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderStatus = order.status || order.orderStatus || "Processing";
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === "all" || orderStatus.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const handleTrackOrder = (order: any) => {
    setSelectedOrder(order);
    setIsTrackDialogOpen(true);
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Invoice for ${orderId} downloaded successfully`);
  };

  return (
    <div className="container py-8 max-w-6xl animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 px-6">
              <h2 className="text-2xl font-bold">{user?.name || "Guest User"}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" /> {user?.email || "guest@example.com"}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
                  Verified Customer
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-md hidden lg:block sticky top-24">
            <CardContent className="p-2">
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium" onClick={() => navigate('/customer/profile')}>
                  <User className="h-4 w-4" /> Personal Information
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3 font-medium bg-primary/10 text-primary hover:bg-primary/20">
                  <Package className="h-4 w-4" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium" onClick={() => navigate('/customer/profile')}>
                  <MapPin className="h-4 w-4" /> Manage Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
                  <LogOut className="h-4 w-4" /> Log Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">My Orders</h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto p-1 bg-transparent border-b border-border/50 rounded-none mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">All Orders</TabsTrigger>
              <TabsTrigger value="processing" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">Processing</TabsTrigger>
              <TabsTrigger value="shipped" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">Shipped</TabsTrigger>
              <TabsTrigger value="delivered" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">Cancelled</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-lg">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No orders found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredOrders.map((order: any) => (
                  <div key={order.id} className="border border-border/50 rounded-lg overflow-hidden bg-card mb-4">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 border-b border-border/50 last:border-b-0">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Left: Image */}
                          <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 flex justify-center items-center">
                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain"/>
                          </div>
                          {/* Center: Details */}
                          <div className="flex-1">
                            <a href="#" className="font-bold text-base hover:text-primary transition-colors line-clamp-1">{item.name}</a>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          {/* Right: Price */}
                          <div className="w-full sm:w-32 text-left sm:text-right">
                            <p className="font-semibold text-base">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${getStatusDotColor(order.status || order.orderStatus || 'Processing')}`}></div>
                            <div>
                              <p className="font-semibold text-sm capitalize">{order.status || order.orderStatus || 'Processing'}</p>
                              {(order.status === 'Delivered' || order.orderStatus === 'Delivered') && <p className="text-xs text-muted-foreground">Your item has been delivered</p>}
                              {(order.status === 'Shipped' || order.orderStatus === 'Shipped') && <p className="text-xs text-muted-foreground">Item is on the way</p>}
                            </div>
                          </div>
                          {(order.status === 'Delivered' || order.orderStatus === 'Delivered') && (
                            <div className="flex items-center gap-2 text-primary font-semibold cursor-pointer hover:underline">
                              <Star className="w-5 h-5"/>
                              <span className="text-sm">Rate & Review Product</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="bg-muted/30 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
                      <div>
                        <span className="font-semibold">Order confirmed on {new Date(order.date || order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="mx-2 text-muted-foreground">|</span>
                        <span className="font-semibold">Total: ₹{order.total.toLocaleString()}</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary font-semibold" onClick={() => handleTrackOrder(order)}>
                        Order Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Track Order Dialog */}
      <Dialog open={isTrackDialogOpen} onOpenChange={setIsTrackDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Track Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Tracking ID: <span className="font-mono text-primary">{selectedOrder?.tracking?.id}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative space-y-6 pl-2">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

              {selectedOrder?.tracking?.steps ? selectedOrder.tracking.steps.map((step: any, index: number) => (
                <div key={index} className="relative flex gap-4">
                  <div className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${step.completed ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground text-muted-foreground'}`}>
                    {step.completed ? <CheckCircle className="h-3 w-3" /> : <div className="h-2 w-2 rounded-full bg-muted-foreground" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</span>
                    {step.date && <span className="text-xs text-muted-foreground">{step.date}</span>}
                    {step.location && <span className="text-xs text-muted-foreground">{step.location}</span>}
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-muted-foreground">
                  Tracking details not available yet.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}