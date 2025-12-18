import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 
  | 'active' | 'inactive' | 'pending' | 'approved' | 'rejected'
  | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  | 'success' | 'failed' | 'warning' | 'info'
  | 'published' | 'draft' | 'archived'
  | 'paid' | 'unpaid' | 'overdue'
  | 'connected' | 'disconnected' | 'syncing'
  | 'enabled' | 'disabled';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // General states
  active: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  inactive: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
  pending: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  rejected: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  
  // Order states
  processing: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  cancelled: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  refunded: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
  
  // Alert states
  success: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  failed: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  warning: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  info: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
  
  // Content states
  published: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  draft: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
  archived: "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20",
  
  // Payment states
  paid: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  unpaid: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  
  // Integration states
  connected: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  disconnected: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
  syncing: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
  
  // Toggle states
  enabled: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  disabled: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const style = statusStyles[normalizedStatus] || "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20";
  
  return (
    <Badge className={cn("text-xs font-medium capitalize border-0", style, className)}>
      {status}
    </Badge>
  );
}
