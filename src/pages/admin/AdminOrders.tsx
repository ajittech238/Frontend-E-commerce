import { useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { Eye, Edit2 } from "lucide-react";
import { useState } from "react";

interface DataTableColumn {
  key: string;
  header: string;
  width?: string;
  render?: (item: any) => React.ReactNode;
}

const AdminOrders = () => {
  const { getAllOrders, updateOrderStatus } = useOrder();
  const orders = getAllOrders();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Order ID",
      width: "120px",
      render: (order) => (
        <span className="font-mono text-xs font-bold">{order.id}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      width: "150px",
    },
    {
      key: "total",
      header: "Amount",
      width: "100px",
      render: (order) => (
        <span className="font-bold text-blue-600">₹{order.total.toLocaleString()}</span>
      ),
    },
    {
      key: "orderStatus",
      header: "Status",
      width: "120px",
      render: (order) => (
        <Badge className={statusColors[order.orderStatus]}>
          {order.orderStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      width: "100px",
      render: (order) => (
        <Badge className={order.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
          {order.paymentStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      width: "120px",
      render: (order) => (
        <span className="text-sm">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      render: (order) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.orderStatus === "pending").length,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "Processing",
      value: orders.filter((o) => o.orderStatus === "processing").length,
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.orderStatus === "delivered").length,
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Total Revenue",
      value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
        <p className="text-muted-foreground mt-1">Manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orders}
            selectable
            selectedIds={selectedOrders}
            onSelectChange={setSelectedOrders}
            getRowId={(order) => order.id}
            pagination={{
              page: 1,
              pageSize: 10,
              total: orders.length,
              onPageChange: () => {},
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
