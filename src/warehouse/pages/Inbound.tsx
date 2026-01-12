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
import { Search, Plus, Filter, Download, ArrowDownLeft, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface InboundEntry {
  grn: string;
  supplier: string;
  date: string;
  items: number;
  status: "Received" | "Pending" | "Inspecting";
  type: "Purchase Order" | "Return" | "Transfer";
}

export default function Inbound() {
  const [entries, setEntries] = useState<InboundEntry[]>([
    { grn: "GRN-7822", supplier: "Global Tech Inc", date: "2024-01-12", items: 450, status: "Received", type: "Purchase Order" },
    { grn: "GRN-7823", supplier: "Fashion Hub", date: "2024-01-12", items: 120, status: "Inspecting", type: "Purchase Order" },
    { grn: "GRN-7824", supplier: "Customer Return #123", date: "2024-01-11", items: 2, status: "Pending", type: "Return" },
    { grn: "GRN-7825", supplier: "Mumbai Warehouse", date: "2024-01-11", items: 85, status: "Received", type: "Transfer" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inbound Management</h1>
          <p className="text-sm text-muted-foreground">Manage incoming stock, GRNs, and quality inspections.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          <Button className="bg-pink-600 hover:bg-pink-700 gap-2"><Plus className="h-4 w-4" /> New Receipt</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Received Today</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Arrival</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open POs</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">Recent Goods Receipts (GRN)</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search GRN or Supplier..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>GRN Number</TableHead>
                <TableHead>Source / Supplier</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.grn}>
                  <TableCell className="font-bold text-pink-600">{entry.grn}</TableCell>
                  <TableCell className="font-medium">{entry.supplier}</TableCell>
                  <TableCell className="text-xs">{entry.date}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full font-medium">{entry.type}</span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{entry.items}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      entry.status === 'Received' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      entry.status === 'Inspecting' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-700'
                    }>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
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
