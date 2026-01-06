import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#ORD-7821",
    customer: "Emma Wilson",
    email: "emma@example.com",
    items: 3,
    total: "$284.00",
    status: "delivered",
    date: "2 min ago",
  },
  {
    id: "#ORD-7820",
    customer: "James Chen",
    email: "james@example.com",
    items: 1,
    total: "$129.00",
    status: "shipped",
    date: "15 min ago",
  },
  {
    id: "#ORD-7819",
    customer: "Sofia Garcia",
    email: "sofia@example.com",
    items: 5,
    total: "$512.00",
    status: "processing",
    date: "1 hour ago",
  },
  {
    id: "#ORD-7818",
    customer: "Michael Brown",
    email: "michael@example.com",
    items: 2,
    total: "$198.00",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "#ORD-7817",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    items: 4,
    total: "$367.00",
    status: "cancelled",
    date: "3 hours ago",
  },
];

const statusStyles = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-fade-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Latest customer purchases</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Order</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Customer</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Items</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Total</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-muted-foreground">{order.items} items</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">{order.total}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={cn("capitalize border", statusStyles[order.status as keyof typeof statusStyles])}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
