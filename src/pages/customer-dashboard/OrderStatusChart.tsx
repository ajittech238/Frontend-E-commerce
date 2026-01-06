import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const data = [
  { name: "Delivered", value: 540, color: "hsl(142, 71%, 45%)" },
  { name: "Shipped", value: 280, color: "hsl(199, 89%, 48%)" },
  { name: "Pending", value: 180, color: "hsl(38, 92%, 50%)" },
  { name: "Cancelled", value: 45, color: "hsl(0, 84%, 60%)" },
];

export function OrderStatusChart() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">Order Status</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Current distribution of orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-bold pl-4">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
