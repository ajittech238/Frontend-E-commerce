import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const lowStockItems = [
  { name: "Blue Denim Jacket", sku: "SKU-1234", stock: 5, maxStock: 100 },
  { name: "Canvas Sneakers", sku: "SKU-5678", stock: 8, maxStock: 150 },
  { name: "Silk Scarf", sku: "SKU-9012", stock: 3, maxStock: 50 },
  { name: "Leather Belt", sku: "SKU-3456", stock: 12, maxStock: 200 },
];

export function LowStockAlert() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-up" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Low Stock Alerts</h3>
            <p className="text-sm text-muted-foreground">{lowStockItems.length} products need restocking</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-4">
        {lowStockItems.map((item) => {
          const percentage = (item.stock / item.maxStock) * 100;
          const isCritical = percentage < 10;

          return (
            <div key={item.sku} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <span className={cn(
                  "text-sm font-semibold",
                  isCritical ? "text-destructive" : "text-warning"
                )}>
                  {item.stock} left
                </span>
              </div>
              <Progress
                value={percentage}
                className={cn(
                  "h-2",
                  isCritical ? "[&>div]:bg-destructive" : "[&>div]:bg-warning"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
