import { useState } from "react";
import { Search, DollarSign, TrendingUp, Calendar, Download, Eye, MoreHorizontal, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const salaries = [
  { id: "SAL001", employee: "John Smith", empId: "EMP001", department: "Warehouse", basic: 5000, allowances: 800, deductions: 500, net: 5300, month: "December", year: 2024, status: "paid", paidAt: "2024-12-01" },
  { id: "SAL002", employee: "Sarah Johnson", empId: "EMP002", department: "Sales", basic: 5500, allowances: 1000, deductions: 550, net: 5950, month: "December", year: 2024, status: "paid", paidAt: "2024-12-01" },
  { id: "SAL003", employee: "Mike Davis", empId: "EMP003", department: "IT", basic: 6000, allowances: 1200, deductions: 600, net: 6600, month: "December", year: 2024, status: "pending", paidAt: null },
  { id: "SAL004", employee: "Emily Brown", empId: "EMP004", department: "HR", basic: 4500, allowances: 600, deductions: 450, net: 4650, month: "December", year: 2024, status: "pending", paidAt: null },
  { id: "SAL005", employee: "Robert Wilson", empId: "EMP005", department: "Finance", basic: 5200, allowances: 900, deductions: 520, net: 5580, month: "December", year: 2024, status: "processing", paidAt: null },
];

export default function AdminSalaries() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    const icons: Record<string, JSX.Element> = {
      paid: <CheckCircle className="h-3 w-3 mr-1" />,
      pending: <Clock className="h-3 w-3 mr-1" />,
      processing: <Clock className="h-3 w-3 mr-1" />,
    };
    return <Badge variant="outline" className={`${styles[status]} flex items-center`}>{icons[status]}{status}</Badge>;
  };

  const totalPayroll = salaries.reduce((a, s) => a + s.net, 0);
  const paidAmount = salaries.filter(s => s.status === "paid").reduce((a, s) => a + s.net, 0);
  const pendingAmount = salaries.filter(s => s.status !== "paid").reduce((a, s) => a + s.net, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Salary Management</h1>
          <p className="text-muted-foreground">Manage employee salaries and payroll</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Payroll</Button>
          <Button>Process Payroll</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Payroll</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">December 2024</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{salaries.filter(s => s.status === "paid").length} employees</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{salaries.filter(s => s.status !== "paid").length} employees</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Salary</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalPayroll / salaries.length).toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+5% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select defaultValue="december">
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="december">December 2024</SelectItem>
                <SelectItem value="november">November 2024</SelectItem>
                <SelectItem value="october">October 2024</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Basic</TableHead>
                <TableHead className="text-right">Allowances</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-pink-gradient/10 text-primary text-xs">{salary.employee.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{salary.employee}</div>
                        <div className="text-sm text-muted-foreground">{salary.empId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{salary.department}</TableCell>
                  <TableCell className="text-right">${salary.basic.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-emerald-500">+${salary.allowances.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-destructive">-${salary.deductions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${salary.net.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(salary.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        <DropdownMenuItem><Download className="h-4 w-4 mr-2" />Download Slip</DropdownMenuItem>
                        {salary.status !== "paid" && <DropdownMenuItem><CheckCircle className="h-4 w-4 mr-2" />Mark as Paid</DropdownMenuItem>}
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
