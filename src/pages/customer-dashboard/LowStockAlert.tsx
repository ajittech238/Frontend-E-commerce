import { AlertTriangle, Package, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const lowStockItems = [
  { name: "iPhone 15 Pro Max", stock: 5, threshold: 20, category: "Electronics" },
  { name: "Nike Air Max 270", stock: 8, threshold: 25, category: "Footwear" },
  { name: "Samsung Galaxy Watch", stock: 3, threshold: 15, category: "Electronics" },
  { name: "Levi's 501 Jeans", stock: 12, threshold: 30, category: "Clothing" },
];

export function LowStockAlert() {
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-muted/20">
        <div>
          <CardTitle className="text-base sm:text-lg font-black tracking-tighter flex items-center gap-2">
            Low Stock
            <AlertTriangle className="w-4 h-4 text-amber-500 fill-amber-500/10" />
          </CardTitle>
          <CardDescription className="text-xs font-bold text-muted-foreground/70 tracking-tight">{lowStockItems.length} items need attention</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5">
          All
          <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        {lowStockItems.map((item) => {
          const percentage = (item.stock / item.threshold) * 100;
          const isCritical = percentage < 25;

          return (
            <div
              key={item.name}
              className="group p-3 rounded-2xl bg-accent/20 hover:bg-accent/40 transition-all duration-300 space-y-3 border border-transparent hover:border-border/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-background border border-border group-hover:scale-105 transition-transform shadow-sm">
                    <Package className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-foreground truncate tracking-tight">{item.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider tabular-nums whitespace-nowrap px-2 py-0.5 rounded-md ${isCritical ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"}`}>
                  {item.stock} left
                </span>
              </div>
              <div className="space-y-1">
                <Progress
                  value={percentage}
                  className={`h-1.5 rounded-full ${isCritical ? "bg-destructive/10" : "bg-amber-500/10"}`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
