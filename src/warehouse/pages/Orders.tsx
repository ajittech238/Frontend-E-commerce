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
import { Search, Filter, Eye, MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderItem {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: "Pending" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled";
  priority: "High" | "Medium" | "Low";
  items: number;
  total: string;
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "W-5592",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-12",
      status: "Processing",
      priority: "High",
      items: 3,
      total: "₹2,499.00",
    },
    {
      id: "W-5593",
      customer: "Sarah Smith",
      email: "sarah@example.com",
      date: "2024-01-12",
      status: "Pending",
      priority: "Medium",
      items: 1,
      total: "₹899.00",
    },
    {
      id: "W-5594",
      customer: "Robert Brown",
      email: "robert@example.com",
      date: "2024-01-11",
      status: "Packed",
      priority: "High",
      items: 5,
      total: "₹12,450.00",
    },
    {
      id: "W-5595",
      customer: "Emma Wilson",
      email: "emma@example.com",
      date: "2024-01-11",
      status: "Shipped",
      priority: "Low",
      items: 2,
      total: "₹1,200.00",
    },
    {
      id: "W-5596",
      customer: "Michael Johnson",
      email: "michael@example.com",
      date: "2024-01-10",
      status: "Delivered",
      priority: "Medium",
      items: 1,
      total: "₹3,499.00",
    },
  ]);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "Pending": return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">Pending</Badge>;
      case "Processing": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Processing</Badge>;
      case "Packed": return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none">Packed</Badge>;
      case "Shipped": return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none">Shipped</Badge>;
      case "Delivered": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Delivered</Badge>;
      case "Cancelled": return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">Cancelled</Badge>;
    }
  };

  const getPriorityBadge = (priority: OrderItem["priority"]) => {
    switch (priority) {
      case "High": return <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[10px] uppercase tracking-wider"><span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> High</div>;
      case "Medium": return <div className="flex items-center gap-1.5 text-amber-600 font-bold text-[10px] uppercase tracking-wider"><span className="h-1.5 w-1.5 rounded-full bg-amber-600" /> Medium</div>;
      case "Low": return <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-wider"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Low</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and fulfill customer orders from all channels.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">Batch Dispatch</Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-xs h-10">All Orders</Button>
              <Button variant="ghost" className="text-xs h-10 text-muted-foreground hover:text-foreground">Today</Button>
              <Button variant="ghost" className="text-xs h-10 text-muted-foreground hover:text-foreground">Unfulfilled</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-pink-600">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{order.customer}</span>
                    <span className="text-[10px] text-muted-foreground">{order.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{order.date}</TableCell>
                <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-center font-medium">{order.items}</TableCell>
                <TableCell className="text-right font-bold">{order.total}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Generate Picklist</DropdownMenuItem>
                        <DropdownMenuItem>Pack Order</DropdownMenuItem>
                        <DropdownMenuItem>Print Shipping Label</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-600">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">Showing {filteredOrders.length} of {orders.length} orders</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
