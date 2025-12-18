import { useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, Truck, AlertCircle } from "lucide-react";
import { useState } from "react";

const SellerOrders = () => {
  const { getAllOrders, updateOrderStatus } = useOrder();
  const sellerId = "SELLER-1";
  const orders = getAllOrders();
  const [updateingId, setUpdatingId] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusSteps = [
    { status: "pending", label: "Pending", icon: AlertCircle },
    { status: "processing", label: "Processing", icon: Package },
    { status: "shipped", label: "Shipped", icon: Truck },
    { status: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Sales</h1>
        <p className="text-muted-foreground mt-1">Manage orders assigned to you</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">To Process</p>
            <p className="text-2xl font-bold">
              {orders.filter((o) => o.orderStatus === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">In Progress</p>
            <p className="text-2xl font-bold">
              {orders.filter((o) => o.orderStatus === "processing").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Ready to Ship</p>
            <p className="text-2xl font-bold">
              {orders.filter((o) => o.orderStatus === "processing").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                No Orders Assigned
              </h3>
              <p className="text-muted-foreground">
                Orders will appear here once customers place them
              </p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-bold">{order.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={statusColors[order.orderStatus]}>
                      {order.orderStatus.toUpperCase()}
                    </Badge>
                    <Badge
                      className={
                        order.paymentStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.paymentStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Customer</p>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Items</p>
                    <p className="font-semibold">{order.items.length} items</p>
                    <p className="text-xs text-muted-foreground">
                      Total: ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">
                      Delivery Address
                    </p>
                    <p className="font-semibold text-sm">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <p className="text-sm font-semibold mb-3">Order Timeline</p>
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted =
                        statusSteps.indexOf(
                          statusSteps.find((s) => s.status === order.orderStatus) || step
                        ) >= index;
                      const isCurrent = order.orderStatus === step.status;

                      return (
                        <div key={step.status} className="flex flex-col items-center">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                              isCompleted || isCurrent
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-xs font-medium text-center">{step.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const nextStatus =
                            order.orderStatus === "pending"
                              ? "processing"
                              : order.orderStatus === "processing"
                              ? "shipped"
                              : "delivered";
                          handleStatusUpdate(order.id, nextStatus);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Update Status
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    Print Label
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerOrders;
