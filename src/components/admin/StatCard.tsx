import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  gradient,
  bgGradient,
  onClick,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 bg-gradient-to-br hover:shadow-lg transition-all duration-300 group",
        bgGradient,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className={cn(
                "flex items-center gap-1 text-xs sm:text-sm",
                trend === 'up' ? "text-emerald-600" : trend === 'down' ? "text-destructive" : "text-muted-foreground"
              )}>
                {trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : trend === 'down' ? (
                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : null}
                <span className="font-semibold">{change}</span>
                <span className="text-muted-foreground hidden sm:inline">vs last period</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
            gradient
          )}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
