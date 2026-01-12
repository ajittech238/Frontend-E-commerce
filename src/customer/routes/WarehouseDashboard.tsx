import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, AlertTriangle, CheckCircle } from "lucide-react";

export default function WarehouseDashboard() {
  const stats = [
    {
      title: "Total Inventory",
      value: "12,450",
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Pending Orders",
      value: "45",
      icon: Truck,
      color: "text-orange-500",
    },
    {
      title: "Low Stock Items",
      value: "12",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      title: "Completed Today",
      value: "128",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Chart placeholder.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
