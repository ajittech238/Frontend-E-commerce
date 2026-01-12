import { useState } from "react";
import { Plus, Search, Mail, Phone, Building, Calendar, MoreHorizontal, Eye, Edit, Trash2, UserCheck, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Briefcase, User, Cake, CheckCircle2, XCircle, Info, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

const employees = [
  { id: "EMP001", name: "John Smith", email: "john@company.com", phone: "+1 234-567-8901", department: "Warehouse", designation: "Manager", hireDate: "2021-03-15", status: "active", address: "123 Main St, Anytown, USA", dob: "1990-01-01", gender: "Male" },
  { id: "EMP002", name: "Sarah Johnson", email: "sarah@company.com", phone: "+1 234-567-8902", department: "Sales", designation: "Sales Lead", hireDate: "2020-08-22", status: "active", address: "456 Oak Ave, Anytown, USA", dob: "1992-05-10", gender: "Female" },
  { id: "EMP003", name: "Mike Davis", email: "mike@company.com", phone: "+1 234-567-8903", department: "IT", designation: "Developer", hireDate: "2022-01-10", status: "active", address: "789 Pine Ln, Anytown, USA", dob: "1988-11-23", gender: "Male" },
  { id: "EMP004", name: "Emily Brown", email: "emily@company.com", phone: "+1 234-567-8904", department: "HR", designation: "HR Specialist", hireDate: "2021-06-01", status: "on-leave", address: "101 Maple Dr, Anytown, USA", dob: "1995-03-15", gender: "Female" },
  { id: "EMP005", name: "Robert Wilson", email: "robert@company.com", phone: "+1 234-567-8905", department: "Finance", designation: "Accountant", hireDate: "2019-11-30", status: "active", address: "212 Birch Rd, Anytown, USA", dob: "1985-07-19", gender: "Male" },
  { id: "EMP006", name: "Lisa Anderson", email: "lisa@company.com", phone: "+1 234-567-8906", department: "Warehouse", designation: "Supervisor", hireDate: "2023-02-14", status: "inactive", address: "333 Cedar Blvd, Anytown, USA", dob: "1998-09-02", gender: "Female" },
];

const attendanceData = {
  EMP001: [
    { date: "2024-07-01", status: "Present" }, { date: "2024-07-02", status: "Present" }, { date: "2024-07-03", status: "Absent" },
    { date: "2024-07-04", status: "Present" }, { date: "2024-07-05", status: "Leave" }, { date: "2024-07-06", status: "Present" }, { date: "2024-07-07", status: "Present" }
  ],
  EMP002: [
    { date: "2024-07-01", status: "Present" }, { date: "2024-07-02", status: "Present" }, { date: "2024-07-03", status: "Present" },
    { date: "2024-07-04", status: "Present" }, { date: "2024-07-05", status: "Present" }, { date: "2024-07-06", status: "Present" }, { date: "2024-07-07", status: "Leave" }
  ],
};

type Employee = typeof employees[0];

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-muted-foreground mt-1" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

// View Profile Dialog
const ViewProfileDialog = ({ employee, open, onOpenChange }: { employee: Employee | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!employee) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] flex flex-col p-0">
        <div className="p-6 bg-gradient-to-br from-muted/70 to-muted/30 rounded-t-lg">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarFallback className="text-3xl bg-pink-gradient/20 text-primary">{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.id}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-5 h-5" /> Job Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={Building} label="Department" value={employee.department} />
                <DetailItem icon={GripVertical} label="Designation" value={employee.designation} />
                <DetailItem icon={Calendar} label="Hire Date" value={employee.hireDate} />
                <DetailItem icon={Info} label="Status" value={employee.status.charAt(0).toUpperCase() + employee.status.slice(1)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={Mail} label="Email" value={employee.email} />
                <DetailItem icon={Phone} label="Phone" value={employee.phone} />
                <div className="sm:col-span-2">
                  <DetailItem icon={Building} label="Address" value={employee.address} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="w-5 h-5" /> Personal Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={User} label="Gender" value={employee.gender} />
                <DetailItem icon={Cake} label="Date of Birth" value={employee.dob} />
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Edit Employee Dialog
const EditEmployeeDialog = ({ employee, open, onOpenChange }: { employee: Employee | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!employee) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b"><DialogTitle>Edit Employee Details</DialogTitle></DialogHeader>
        <div className="p-6 space-y-4 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={employee.name} /></div>
            <div className="space-y-2"><Label>Employee Code</Label><Input defaultValue={employee.id} readOnly /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue={employee.email} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue={employee.phone} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Department</Label>
              <Select defaultValue={employee.department.toLowerCase()}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="warehouse">Warehouse</SelectItem><SelectItem value="sales">Sales</SelectItem><SelectItem value="it">IT</SelectItem><SelectItem value="hr">HR</SelectItem><SelectItem value="finance">Finance</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Designation</Label><Input defaultValue={employee.designation} /></div>
          </div>
          <div className="space-y-2"><Label>Hire Date</Label><Input type="date" defaultValue={employee.hireDate} /></div>
          <Button className="w-full">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// View Attendance Dialog
const ViewAttendanceDialog = ({ employee, open, onOpenChange }: { employee: Employee | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!employee) return null;
  const empAttendance = attendanceData[employee.id as keyof typeof attendanceData] || [];
  const totalPresent = empAttendance.filter(a => a.status === "Present").length;
  const totalAbsent = empAttendance.filter(a => a.status === "Absent").length;
  const totalLeave = empAttendance.filter(a => a.status === "Leave").length;

  const statusConfig = {
    Present: { icon: CheckCircle2, class: "text-emerald-500", bg: "bg-emerald-500/10" },
    Absent: { icon: XCircle, class: "text-rose-500", bg: "bg-rose-500/10" },
    Leave: { icon: Info, class: "text-amber-500", bg: "bg-amber-500/10" },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b"><DialogTitle>Attendance for {employee.name}</DialogTitle></DialogHeader>
        <div className="p-6 flex-shrink-0 border-b">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <p className="text-2xl font-bold text-emerald-600">{totalPresent}</p>
              <p className="text-xs font-medium text-emerald-700">Present</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10">
              <p className="text-2xl font-bold text-rose-600">{totalAbsent}</p>
              <p className="text-xs font-medium text-rose-700">Absent</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <p className="text-2xl font-bold text-amber-600">{totalLeave}</p>
              <p className="text-xs font-medium text-amber-700">Leave</p>
            </div>
          </div>
        </div>
        <div className="p-6 overflow-y-auto scrollbar-hide">
          {empAttendance.length > 0 ? (
            <div className="space-y-3">
              {empAttendance.map((att, index) => {
                const config = statusConfig[att.status as keyof typeof statusConfig];
                return (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${config.bg}`}>
                    <config.icon className={`w-5 h-5 mr-3 ${config.class}`} />
                    <p className={`font-medium text-sm ${config.class}`}>{att.status}</p>
                    <p className="font-mono text-sm text-muted-foreground ml-auto">{att.date}</p>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-center text-muted-foreground py-8">No attendance data found.</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default function AdminEmployees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setAddIsDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isAttendanceOpen, setAttendanceOpen] = useState(false);

  const handleOpenDialog = (employee: Employee, dialog: 'profile' | 'edit' | 'attendance') => {
    setSelectedEmployee(employee);
    if (dialog === 'profile') setProfileOpen(true);
    else if (dialog === 'edit') setEditOpen(true);
    else if (dialog === 'attendance') setAttendanceOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "on-leave": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      inactive: "bg-muted text-muted-foreground border-border",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  const renderExpandedRow = (employee: Employee) => (
    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">
      <div className="bg-card p-3 rounded border"><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{employee.email}</p></div>
      <div className="bg-card p-3 rounded border"><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{employee.phone}</p></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded border"><p className="text-xs text-muted-foreground">Department</p><p className="text-sm font-medium flex items-center gap-2"><Building className="h-3.5 w-3.5 text-muted-foreground" />{employee.department}</p></div>
        <div className="bg-card p-3 rounded border"><p className="text-xs text-muted-foreground">Designation</p><p className="text-sm font-medium">{employee.designation}</p></div>
      </div>
      <div className="bg-card p-3 rounded border"><p className="text-xs text-muted-foreground">Hire Date</p><p className="text-sm font-medium flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />{employee.hireDate}</p></div>
      <div className="bg-card p-3 rounded border flex justify-around items-center">
        {getStatusBadge(employee.status)}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="w-1/2 justify-start"><MoreHorizontal className="w-4 h-4 mr-2" />Actions</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'profile')}><Eye className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'edit')}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'attendance')}><UserCheck className="h-4 w-4 mr-2" />View Attendance</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRowId = (item: any) => item.id;
  const allSelected = filteredEmployees.length > 0 && filteredEmployees.every((item) => selectedIds.includes(getRowId(item)));

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredEmployees.map(getRowId) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds(checked ? [...selectedIds, id] : selectedIds.filter((i) => i !== id));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const totalPages = Math.ceil(filteredEmployees.length / pagination.pageSize);
  const paginatedData = filteredEmployees.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize);

  const columns = [
    {
      key: "name", header: "Employee", width: "250px", className: "table-cell",
      render: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9"><AvatarFallback className="bg-pink-gradient/10 text-primary text-xs sm:text-sm">{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
          <div><div className="font-medium text-xs sm:text-sm">{employee.name}</div><div className="text-[10px] sm:text-xs text-muted-foreground">{employee.id}</div></div>
        </div>
      ),
    },
    {
      key: "contact", header: "Contact", width: "200px", className: "hidden sm:table-cell",
      render: (employee: Employee) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs sm:text-sm"><Mail className="h-3 w-3 text-muted-foreground" />{employee.email}</div>
          <div className="flex items-center gap-2 text-xs sm:text-sm"><Phone className="h-3 w-3 text-muted-foreground" />{employee.phone}</div>
        </div>
      ),
    },
    {
      key: "department", header: "Department", width: "150px", className: "hidden md:table-cell",
      render: (employee: Employee) => (<div className="flex items-center gap-2 text-xs sm:text-sm"><Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />{employee.department}</div>),
    },
    { key: "designation", header: "Designation", width: "150px", className: "hidden lg:table-cell" },
    {
      key: "hireDate", header: "Hire Date", width: "150px", className: "hidden lg:table-cell",
      render: (employee: Employee) => (<div className="flex items-center gap-2 text-xs sm:text-sm"><Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />{employee.hireDate}</div>),
    },
    { key: "status", header: "Status", width: "120px", className: "hidden sm:table-cell", render: (employee: Employee) => getStatusBadge(employee.status) },
    {
      key: "actions", header: "", width: "60px", className: "hidden lg:table-cell",
      render: (employee: Employee) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'profile')}><Eye className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'edit')}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDialog(employee, 'attendance')}><UserCheck className="h-4 w-4 mr-2" />View Attendance</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 px-1 xs:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold text-foreground">Employees</h1><p className="text-xs sm:text-sm text-muted-foreground">Manage employee records and information</p></div>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddIsDialogOpen}>
          <DialogTrigger asChild><Button className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" />Add Employee</Button></DialogTrigger>
          <DialogContent className="w-[95vw] max-w-lg h-[85vh] rounded-md">
            <DialogHeader><DialogTitle>Add New Employee</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-2"><Label>Full Name</Label><Input placeholder="John Doe" /></div><div className="space-y-2"><Label>Employee Code</Label><Input placeholder="EMP001" /></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@company.com" /></div><div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 234-567-8900" /></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Department</Label><Select><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent><SelectItem value="warehouse">Warehouse</SelectItem><SelectItem value="sales">Sales</SelectItem><SelectItem value="it">IT</SelectItem><SelectItem value="hr">HR</SelectItem><SelectItem value="finance">Finance</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Designation</Label><Input placeholder="Manager" /></div>
              </div>
              <div className="space-y-2"><Label>Hire Date</Label><Input type="date" /></div>
              <Button className="w-full">Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"><CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Employees</CardTitle></CardHeader><CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{employees.length}</div></CardContent></Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20"><CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Active</CardTitle></CardHeader><CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{employees.filter(e => e.status === "active").length}</div></CardContent></Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20"><CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">On Leave</CardTitle></CardHeader><CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{employees.filter(e => e.status === "on-leave").length}</div></CardContent></Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20"><CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Departments</CardTitle></CardHeader><CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{new Set(employees.map(e => e.department)).size}</div></CardContent></Card>
      </div>

      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6"><div className="flex flex-col sm:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div><Select><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Departments" /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem><SelectItem value="warehouse">Warehouse</SelectItem><SelectItem value="sales">Sales</SelectItem><SelectItem value="it">IT</SelectItem></SelectContent></Select></div></CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 overflow-hidden"><div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead><tr className="bg-muted/30 border-b"><th className="w-12 p-4 text-left"><Checkbox checked={allSelected} onCheckedChange={handleSelectAll} /></th>{columns.map((col) => (<th key={col.key} style={{ width: col.width }} className={`p-4 text-left text-xs font-semibold ${col.className ?? ""}`}>{col.header}</th>))}<th className="w-10 p-4 lg:hidden" /></tr></thead>
                <tbody>
                  {paginatedData.map((item) => {
                    const id = item.id;
                    const isExpanded = expandedRows.has(id);
                    return (<>
                      <tr key={id} className="border-b hover:bg-muted/50">
                        <td className="w-12 p-4"><Checkbox checked={selectedIds.includes(id)} onCheckedChange={(c) => handleSelectRow(id, !!c)} /></td>
                        {columns.map((col) => (<td key={col.key} style={{ width: col.width }} className={`text-xs px-4 py-4 ${col.className ?? ""}`}>{col.render ? col.render(item) : item[col.key as keyof typeof item]}</td>))}
                        <td className="lg:hidden p-4"><Button variant="ghost" size="icon" onClick={() => toggleExpand(id)}><ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} /></Button></td>
                      </tr>
                      {isExpanded && (<tr className="lg:hidden"><td colSpan={columns.length + 2} className="p-0">{renderExpandedRow(item)}</td></tr>)}
                    </>);
                  })}
                </tbody>
              </table>
            </div></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm pb-4">
              <p className="text-muted-foreground">Showing {(pagination.page - 1) * pagination.pageSize + 1} to {Math.min(pagination.page * pagination.pageSize, filteredEmployees.length)} of {filteredEmployees.length}</p>
              <div className="flex items-center gap-1 m-2">
                <Button variant="outline" size="icon" className="w-8 h-8 sm:w-9 sm:h-9" onClick={() => handlePageChange(1)} disabled={pagination.page === 1} title="First page"><ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                <Button variant="outline" size="icon" className="w-8 h-8 sm:w-9 sm:h-9" onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1} title="Previous page"><ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                <span className="px-2 sm:px-3 font-medium text-xs sm:text-sm">{pagination.page} / {totalPages}</span>
                <Button variant="outline" size="icon" className="w-8 h-8 sm:w-9 sm:h-9" onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === totalPages} title="Next page"><ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                <Button variant="outline" size="icon" className="w-8 h-8 sm:w-9 sm:h-9" onClick={() => handlePageChange(totalPages)} disabled={pagination.page === totalPages} title="Last page"><ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ViewProfileDialog employee={selectedEmployee} open={isProfileOpen} onOpenChange={setProfileOpen} />
      <EditEmployeeDialog employee={selectedEmployee} open={isEditOpen} onOpenChange={setEditOpen} />
      <ViewAttendanceDialog employee={selectedEmployee} open={isAttendanceOpen} onOpenChange={setAttendanceOpen} />
    </div>
  );
}