import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WarehouseOrders() {
  const orders = [
    {
      id: "ORD-1001",
      customer: "John Doe",
      items: 3,
      status: "Pending",
      date: "2024-05-20",
    },
    {
      id: "ORD-1002",
      customer: "Jane Smith",
      items: 1,
      status: "Processing",
      date: "2024-05-19",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <CardTitle className="text-base">{order.id}</CardTitle>
                <Badge
                  variant={order.status === "Pending" ? "secondary" : "default"}
                >
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{order.date}</div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items} items
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Process Order</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
