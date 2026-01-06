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
import { cn } from "@/lib/utils";

const dailyData = [
  { name: "Mon", sales: 4200 },
  { name: "Tue", sales: 3800 },
  { name: "Wed", sales: 5100 },
  { name: "Thu", sales: 4600 },
  { name: "Fri", sales: 6200 },
  { name: "Sat", sales: 7800 },
  { name: "Sun", sales: 5400 },
];

const weeklyData = [
  { name: "Week 1", sales: 24000 },
  { name: "Week 2", sales: 28500 },
  { name: "Week 3", sales: 32000 },
  { name: "Week 4", sales: 29800 },
];

const monthlyData = [
  { name: "Jan", sales: 65000 },
  { name: "Feb", sales: 72000 },
  { name: "Mar", sales: 85000 },
  { name: "Apr", sales: 78000 },
  { name: "May", sales: 92000 },
  { name: "Jun", sales: 108000 },
];

type Period = "daily" | "weekly" | "monthly";

const dataMap = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
};

export function SalesChart() {
  const [period, setPeriod] = useState<Period>("daily");

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
          <p className="text-sm text-muted-foreground">Track your revenue performance</p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary rounded-lg">
          {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              onClick={() => setPeriod(p)}
              className={cn(
                "capitalize text-xs font-medium",
                period === p && "bg-card shadow-sm text-foreground"
              )}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[period]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(239 84% 67%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
