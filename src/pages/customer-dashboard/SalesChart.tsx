import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dailyData = [
  { name: "Mon", sales: 4000, orders: 240 },
  { name: "Tue", sales: 3000, orders: 198 },
  { name: "Wed", sales: 5000, orders: 320 },
  { name: "Thu", sales: 2780, orders: 178 },
  { name: "Fri", sales: 6890, orders: 390 },
  { name: "Sat", sales: 8390, orders: 480 },
  { name: "Sun", sales: 4490, orders: 280 },
];

const monthlyData = [
  { name: "Jan", sales: 45000, orders: 2400 },
  { name: "Feb", sales: 52000, orders: 2800 },
  { name: "Mar", sales: 48000, orders: 2600 },
  { name: "Apr", sales: 61000, orders: 3200 },
  { name: "May", sales: 55000, orders: 2900 },
  { name: "Jun", sales: 67000, orders: 3500 },
  { name: "Jul", sales: 72000, orders: 3800 },
  { name: "Aug", sales: 69000, orders: 3600 },
  { name: "Sep", sales: 78000, orders: 4100 },
  { name: "Oct", sales: 82000, orders: 4300 },
  { name: "Nov", sales: 91000, orders: 4800 },
  { name: "Dec", sales: 98000, orders: 5200 },
];

type Period = "daily" | "monthly";

export function SalesChart() {
  const [period, setPeriod] = useState<Period>("daily");
  const data = period === "daily" ? dailyData : monthlyData;

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base sm:text-lg font-semibold">Sales Overview</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Revenue and order trends over time</CardDescription>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-lg">
          <Button
            variant={period === "daily" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setPeriod("daily")}
          >
            Daily
          </Button>
          <Button
            variant={period === "monthly" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground" 
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground" 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#salesGradient)"
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
