import { useState } from "react";
import { FileText, Search, Filter, Download, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const events = [
  { id: "EVT001", action: "User Login", user: "admin@craftsy.com", type: "login", status: "success", timestamp: "2024-01-25 10:30:45", details: "Admin user logged in" },
  { id: "EVT002", action: "Product Created", user: "admin@craftsy.com", type: "create", status: "success", timestamp: "2024-01-25 10:15:20", details: "New product added to catalog" },
  { id: "EVT003", action: "Order Cancelled", user: "user@example.com", type: "delete", status: "warning", timestamp: "2024-01-25 09:45:10", details: "Order #ORD123 was cancelled" },
  { id: "EVT004", action: "Payment Failed", user: "customer@example.com", type: "error", status: "error", timestamp: "2024-01-25 09:20:00", details: "Payment gateway timeout" },
  { id: "EVT005", action: "Export Started", user: "manager@craftsy.com", type: "export", status: "success", timestamp: "2024-01-25 08:50:30", details: "User data export initiated" },
];

export default function EventLogs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredEvents = events.filter(event =>
    (typeFilter === "all" || event.type === typeFilter) &&
    (event.action.toLowerCase().includes(search.toLowerCase()) ||
     event.user.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    {
      key: "action",
      header: "Action",
      render: (event: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{event.action}</p>
            <p className="text-xs text-muted-foreground">{event.details}</p>
          </div>
        </div>
      ),
    },
    { key: "user", header: "User" },
    { key: "timestamp", header: "Time" },
    {
      key: "status",
      header: "Status",
      render: (event: any) => {
        const statusConfig = {
          success: { icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
          warning: { icon: AlertCircle, color: "bg-amber-500/10 text-amber-600" },
          error: { icon: AlertCircle, color: "bg-destructive/10 text-destructive" },
          info: { icon: Info, color: "bg-blue-500/10 text-blue-600" },
        };
        const config = statusConfig[event.status as keyof typeof statusConfig];
        return (
          <Badge className={config.color}>
            {event.status}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Logs</h1>
          <p className="text-muted-foreground mt-1">System activity and user actions</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search events..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: "2,345", icon: FileText },
          { label: "Today", value: "145", icon: FileText },
          { label: "Errors", value: "12", icon: AlertCircle },
          { label: "Warnings", value: "23", icon: AlertCircle },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredEvents}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: filteredEvents.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
