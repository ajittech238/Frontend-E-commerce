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
import { Search, Plus, Filter, ArrowUpRight, Truck, Package, ClipboardCheck, Barcode } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutboundOrder {
  id: string;
  customer: string;
  carrier: string;
  status: "Ready to Pick" | "Picking" | "Packing" | "Dispatched";
  priority: "High" | "Normal";
  deadline: string;
}

export default function Outbound() {
  const [orders, setOrders] = useState<OutboundOrder[]>([
    { id: "W-5592", customer: "John Doe", carrier: "Delhivery", status: "Picking", priority: "High", deadline: "14:00 PM" },
    { id: "W-5594", customer: "Robert Brown", carrier: "BlueDart", status: "Ready to Pick", priority: "High", deadline: "15:30 PM" },
    { id: "W-5595", customer: "Emma Wilson", carrier: "Ecom Express", status: "Packing", priority: "Normal", deadline: "17:00 PM" },
    { id: "W-5598", customer: "Alice Green", carrier: "Delhivery", status: "Dispatched", priority: "Normal", deadline: "11:00 AM" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Outbound Management</h1>
          <p className="text-sm text-muted-foreground">Manage order picking, packing, and carrier handovers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Barcode className="h-4 w-4" /> Scan to Pack</Button>
          <Button className="bg-pink-600 hover:bg-pink-700">Generate Picklists</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Ready to Pick", value: 8, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Currently Picking", value: 3, icon: ClipboardCheck, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Ready to Ship", value: 12, icon: Truck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "High Priority", value: 5, icon: ArrowUpRight, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{stat.label}</p>
                  <h3 className="text-xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CardTitle className="text-lg">Dispatch Pipeline</CardTitle>
              <div className="flex gap-1">
                <Badge variant="secondary" className="bg-slate-100">All (24)</Badge>
                <Badge variant="outline">Priority (5)</Badge>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Order ID..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Dispatch Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-pink-600">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell className="text-sm">{order.carrier}</TableCell>
                  <TableCell>
                    {order.priority === 'High' ? (
                      <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-2 py-0">High</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">Normal</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">{order.deadline}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.status === 'Dispatched' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      order.status === 'Picking' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      order.status === 'Packing' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-50 text-slate-700'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-pink-600 font-bold">Start {order.status === 'Ready to Pick' ? 'Pick' : 'Pack'}</Button>
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
