import { useState } from "react";
import { Search, Calendar, CheckCircle, XCircle, Clock, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const leaves = [
  { id: "LV001", employee: "John Smith", empId: "EMP001", type: "Vacation", startDate: "2024-12-20", endDate: "2024-12-25", days: 5, reason: "Family vacation", status: "approved" },
  { id: "LV002", employee: "Sarah Johnson", empId: "EMP002", type: "Sick Leave", startDate: "2024-12-10", endDate: "2024-12-11", days: 2, reason: "Medical appointment", status: "approved" },
  { id: "LV003", employee: "Mike Davis", empId: "EMP003", type: "Personal", startDate: "2024-12-15", endDate: "2024-12-15", days: 1, reason: "Personal matters", status: "pending" },
  { id: "LV004", employee: "Emily Brown", empId: "EMP004", type: "Vacation", startDate: "2024-12-22", endDate: "2024-12-31", days: 8, reason: "Holiday travel", status: "pending" },
  { id: "LV005", employee: "Robert Wilson", empId: "EMP005", type: "Work from Home", startDate: "2024-12-12", endDate: "2024-12-13", days: 2, reason: "Home repairs", status: "rejected" },
];

export default function AdminLeaves() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    const icons: Record<string, JSX.Element> = {
      approved: <CheckCircle className="h-3 w-3 mr-1" />,
      pending: <Clock className="h-3 w-3 mr-1" />,
      rejected: <XCircle className="h-3 w-3 mr-1" />,
    };
    return <Badge variant="outline" className={`${styles[status]} flex items-center`}>{icons[status]}{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Vacation": "bg-blue-500/10 text-blue-500",
      "Sick Leave": "bg-red-500/10 text-red-500",
      "Personal": "bg-purple-500/10 text-purple-500",
      "Work from Home": "bg-teal-500/10 text-teal-500",
    };
    return <Badge variant="secondary" className={colors[type] || ""}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Manage employee leave requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{leaves.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{leaves.filter(l => l.status === "pending").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{leaves.filter(l => l.status === "approved").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{leaves.filter(l => l.status === "rejected").length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Types" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{leave.employee.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{leave.employee}</div>
                        <div className="text-sm text-muted-foreground">{leave.empId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(leave.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {leave.startDate} - {leave.endDate}
                    </div>
                  </TableCell>
                  <TableCell>{leave.days} days</TableCell>
                  <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                  <TableCell>{getStatusBadge(leave.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        {leave.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-emerald-500"><CheckCircle className="h-4 w-4 mr-2" />Approve</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><XCircle className="h-4 w-4 mr-2" />Reject</DropdownMenuItem>
                          </>
                        )}
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
