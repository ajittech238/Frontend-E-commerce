import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, RotateCcw, AlertTriangle, CheckCircle, PackageSearch } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReturnItem {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  status: "Pending Inspection" | "Restocked" | "Damaged" | "Refurbishing";
  date: string;
}

export default function Returns() {
  const [returns] = useState<ReturnItem[]>([
    { id: "RET-2001", orderId: "W-5580", customer: "Alice Green", reason: "Size mismatch", status: "Restocked", date: "2024-01-12" },
    { id: "RET-2002", orderId: "W-5582", customer: "Bob Smith", reason: "Defective item", status: "Damaged", date: "2024-01-11" },
    { id: "RET-2003", orderId: "W-5585", customer: "Sarah Jane", reason: "Changed mind", status: "Pending Inspection", date: "2024-01-12" },
    { id: "RET-2004", orderId: "W-5588", customer: "Robert King", reason: "Wrong product sent", status: "Pending Inspection", date: "2024-01-10" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Returns Management</h1>
          <p className="text-sm text-muted-foreground">Process customer returns, inspections, and inventory re-entry.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 gap-2">
          <RotateCcw className="h-4 w-4" /> Initiate Return
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <PackageSearch className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To Inspect</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Restocked Today</p>
                <h3 className="text-2xl font-bold">15</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Damaged Units</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Return ID or Order..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filter by Reason</Button>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Return ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((ret) => (
                <TableRow key={ret.id}>
                  <TableCell className="font-bold">{ret.id}</TableCell>
                  <TableCell className="font-medium text-pink-600">{ret.orderId}</TableCell>
                  <TableCell className="text-sm">{ret.customer}</TableCell>
                  <TableCell className="text-xs italic">"{ret.reason}"</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      ret.status === 'Restocked' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      ret.status === 'Damaged' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      ret.status === 'Pending Inspection' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }>
                      {ret.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-pink-600 font-bold">Inspect</Button>
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
