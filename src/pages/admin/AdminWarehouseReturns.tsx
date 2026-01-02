import { useState } from "react";
import { Search, RefreshCw, Box, ClipboardCheck, AlertTriangle, CheckCircle2, MoreHorizontal, Edit, Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const warehouseReturns = [
  { id: "WR-1001", orderId: "ORD-9921", product: "iPhone 15 Pro", warehouse: "Central Warehouse", reason: "Defective", condition: "damaged", status: "inspected" },
  { id: "WR-1002", orderId: "ORD-8854", product: "Samsung S24", warehouse: "West Coast Hub", reason: "Wrong Item", condition: "sealed", status: "pending" },
  { id: "WR-1003", orderId: "ORD-7762", product: "MacBook Pro", warehouse: "Central Warehouse", reason: "Customer Choice", condition: "open-box", status: "re-stocked" },
  { id: "WR-1004", orderId: "ORD-5541", product: "Sony Headphones", warehouse: "Midwest Center", reason: "Damaged in Transit", condition: "broken", status: "rejected" },
];

export default function AdminWarehouseReturns() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      inspected: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "re-stocked": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const styles: Record<string, string> = {
      sealed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "open-box": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      damaged: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      broken: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[condition]}>{condition.replace("-", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Return Management</h1>
          <p className="text-muted-foreground">Process inward returns, inspections, and stock restoration</p>
        </div>
        <Button className="gap-2"><ClipboardCheck className="h-4 w-4" />Process Return</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Pending Inspection</CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Today's Returns</CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Recovery Rate</CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">82%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Total Rejected</CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">4</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Return ID, Order ID or Warehouse..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Info</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouseReturns.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.id}</div>
                    <div className="text-xs text-muted-foreground">Order: {item.orderId}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Box className="h-3 w-3" /> {item.warehouse}</div>
                  </TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{getConditionBadge(item.condition)}</TableCell>
                  <TableCell className="text-sm">{item.reason}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><ClipboardCheck className="h-4 w-4 mr-2" />Complete Inspection</DropdownMenuItem>
                        <DropdownMenuItem><RefreshCw className="h-4 w-4 mr-2" />Restore to Stock</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><ShieldAlert className="h-4 w-4 mr-2" />Reject & Scrap</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
