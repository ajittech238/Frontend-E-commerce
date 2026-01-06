import { Eye, MoreHorizontal, ArrowUpRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#ORD-7823",
    customer: "Sarah Wilson",
    date: "Dec 31, 2025",
    amount: "₹19,234",
    payment: "Paid",
    status: "delivered",
  },
  {
    id: "#ORD-7822",
    customer: "Michael Chen",
    date: "Dec 31, 2025",
    amount: "₹7,389",
    payment: "Paid",
    status: "shipped",
  },
  {
    id: "#ORD-7821",
    customer: "Emily Rodriguez",
    date: "Dec 30, 2025",
    amount: "₹45,567",
    payment: "Pending",
    status: "pending",
  },
  {
    id: "#ORD-7820",
    customer: "James Thompson",
    date: "Dec 30, 2025",
    amount: "₹10,123",
    payment: "Paid",
    status: "shipped",
  },
  {
    id: "#ORD-7819",
    customer: "Lisa Anderson",
    date: "Dec 29, 2025",
    amount: "₹36,445",
    payment: "Refunded",
    status: "cancelled",
  },
];

export function RecentOrders() {
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-muted/20">
        <div>
          <CardTitle className="text-base sm:text-lg font-black tracking-tighter">Recent Orders</CardTitle>
          <CardDescription className="text-xs font-bold text-muted-foreground/70 tracking-tight">Latest order activity from customers</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5">
          View all
          <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b-border/50">
              <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Order ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Customer</TableHead>
              <TableHead className="hidden md:table-cell text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Status</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/10 transition-colors border-b-border/30">
                <TableCell className="font-black text-primary tabular-nums tracking-tighter">
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-primary/40 hidden sm:inline" />
                    {order.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-black text-sm tracking-tight">{order.customer}</div>
                  <div className="text-[10px] font-bold text-muted-foreground/50 md:hidden tabular-nums">{order.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground font-bold text-xs tabular-nums">{order.date}</TableCell>
                <TableCell className="font-black tabular-nums tracking-tighter">₹{order.amount.replace('₹', '')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md",
                    order.status === 'delivered' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/20' :
                    order.status === 'shipped' ? 'bg-purple-500/5 text-purple-600 border-purple-500/20' :
                    order.status === 'pending' ? 'bg-amber-500/5 text-amber-600 border-amber-500/20' :
                    'bg-destructive/5 text-destructive border-destructive/20'
                  )}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
