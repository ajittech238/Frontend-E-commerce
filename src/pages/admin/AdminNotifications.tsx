import { useState } from "react";
import { Search, Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Trash2, MoreHorizontal, Eye, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const notifications = [
  { id: "N001", type: "order", title: "New Order Received", message: "Order #ORD-2024-001 has been placed by John Doe", recipient: "Admin Team", channel: "email", sentAt: "2024-12-12 10:30", status: "delivered" },
  { id: "N002", type: "alert", title: "Low Stock Alert", message: "Product 'Wireless Headphones' is running low on stock (5 remaining)", recipient: "Warehouse Team", channel: "push", sentAt: "2024-12-12 09:15", status: "delivered" },
  { id: "N003", type: "system", title: "System Maintenance", message: "Scheduled maintenance on Dec 15, 2024 from 2:00 AM to 4:00 AM", recipient: "All Users", channel: "email", sentAt: "2024-12-11 18:00", status: "delivered" },
  { id: "N004", type: "payment", title: "Payment Received", message: "Payment of $1,234.56 received for Order #ORD-2024-002", recipient: "Finance Team", channel: "sms", sentAt: "2024-12-12 11:45", status: "pending" },
  { id: "N005", type: "review", title: "New Product Review", message: "Customer left a 5-star review on 'Smart Watch Pro'", recipient: "Product Team", channel: "push", sentAt: "2024-12-12 08:20", status: "failed" },
];

export default function AdminNotifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };


  const renderExpandedRow = (n: any) => (
    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">

      <div className="bg-card p-3 rounded border">
        <p className="text-xs text-muted-foreground">Message</p>
        <p className="text-sm">{n.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Recipient</p>
          <p className="text-sm font-medium">{n.recipient}</p>
        </div>

        <div className="bg-card p-3 rounded border flex items-center justify-center">
          {getStatusBadge(n.status)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Channel</p>
          {getChannelBadge(n.channel)}
        </div>

        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Sent At</p>
          <p className="text-sm">{n.sentAt}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MoreHorizontal className="h-4 w-4 mr-2" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View</DropdownMenuItem>
          <DropdownMenuItem><Mail className="h-4 w-4 mr-2" /> Resend</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );


  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      order: <Bell className="h-4 w-4 text-blue-500" />,
      alert: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      system: <Settings className="h-4 w-4 text-purple-500" />,
      payment: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      review: <MessageSquare className="h-4 w-4 text-pink-500" />,
    };
    return icons[type] || <Bell className="h-4 w-4" />;
  };

  const getChannelBadge = (channel: string) => {
    const styles: Record<string, string> = {
      email: "bg-blue-500/10 text-blue-500",
      push: "bg-purple-500/10 text-purple-500",
      sms: "bg-emerald-500/10 text-emerald-500",
    };
    return <Badge variant="secondary" className={styles[channel]}>{channel}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage system notifications and alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Settings className="h-4 w-4 mr-2" />Settings</Button>
          <Button>Send Notification</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{notifications.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{notifications.filter(n => n.status === "delivered").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{notifications.filter(n => n.status === "pending").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{notifications.filter(n => n.status === "failed").length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notifications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Channels" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"><Checkbox /></TableHead>
                <TableHead>Notification</TableHead>
                <TableHead className="hidden md:table-cell text-right">Recipient</TableHead>
                <TableHead className="hidden md:table-cell text-right">Channel</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Sent At</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Actions</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <>
                  {/* MAIN ROW */}
                  <TableRow key={notification.id}>
                    <TableCell><Checkbox /></TableCell>

                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center mt-0.5">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div>
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-muted-foreground max-w-md truncate hidden lg:table-cell">
                            {notification.message}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">{notification.recipient}</TableCell>
                    <TableCell className="hidden md:table-cell">{getChannelBadge(notification.channel)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden lg:table-cell ">{notification.sentAt}</TableCell>
                    <TableCell className="hidden lg:table-cell">{getStatusBadge(notification.status)}</TableCell>

                    {/* DESKTOP ACTIONS */}
                    <TableCell className="hidden lg:table-cell text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="h-4 w-4 mr-2" />Resend</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    {/* CHEVRON */}
                    <TableCell className="lg:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpand(notification.id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedRows.has(notification.id) ? "rotate-180" : ""
                            }`}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* EXPANDED ROW */}
                  {expandedRows.has(notification.id) && (
                    <TableRow className="lg:hidden">
                      <TableCell colSpan={8} className="p-0">
                        {renderExpandedRow(notification)}
                      </TableCell>
                    </TableRow>
                  )}
                </>

              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}










