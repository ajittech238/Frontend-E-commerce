import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
}

export function StatCard({ title, value, change, trend, icon: Icon, gradient, bgGradient }: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 bg-gradient-to-br hover:shadow-lg transition-all duration-300 group cursor-pointer",
        bgGradient
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em]">{title}</p>
            <p className="text-xl sm:text-2xl font-black text-foreground tabular-nums tracking-tighter">{value}</p>
            {change && (
              <div className={cn(
                "flex items-center gap-1 text-[11px] font-black tabular-nums tracking-tight",
                trend === "up" ? "text-emerald-600" : "text-destructive"
              )}>
                {trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 stroke-[3px]" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 stroke-[3px]" />
                )}
                <span>{change}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
            gradient
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
