import { useState } from "react";
import { Plus, Search, Users, Building2, MoreHorizontal, Eye, Edit, Trash2, ChevronDown, Mail, Phone, Calendar, Info, User, Briefcase, CheckCircle2, XCircle, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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

const departments = [
  { id: "D001", name: "Warehouse Operations", manager: "John Smith", managerId: "EMP001", employees: 25, budget: 150000, status: "active", description: "Handles all warehouse and inventory operations" },
  { id: "D002", name: "Sales & Marketing", manager: "Sarah Johnson", managerId: "EMP002", employees: 18, budget: 200000, status: "active", description: "Manages sales and marketing activities" },
  { id: "D003", name: "Information Technology", manager: "Mike Davis", managerId: "EMP003", employees: 12, budget: 180000, status: "active", description: "IT infrastructure and development" },
  { id: "D004", name: "Human Resources", manager: "Emily Brown", managerId: "EMP004", employees: 8, budget: 80000, status: "active", description: "Employee management and recruitment" },
  { id: "D005", name: "Finance & Accounting", manager: "Robert Wilson", managerId: "EMP005", employees: 10, budget: 120000, status: "active", description: "Financial operations and reporting" },
  { id: "D006", name: "Customer Support", manager: "Lisa Anderson", managerId: "EMP006", employees: 15, budget: 100000, status: "restructuring", description: "Customer service and support" },
];

type Department = typeof departments[0];

const getShortDeptName = (fullName: string): string => {
  const map: Record<string, string> = {
    "Warehouse Operations": "Warehouse",
    "Sales & Marketing": "Sales",
    "Information Technology": "IT",
    "Human Resources": "HR",
    "Finance & Accounting": "Finance",
    "Customer Support": "Customer Support",
  };
  return map[fullName] || fullName;
};

const getEmployeesByDepartment = (dept: Department) => {
  const shortName = getShortDeptName(dept.name);
  return employees.filter(e => e.department === shortName);
};

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-muted-foreground mt-1" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    restructuring: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    inactive: "bg-muted text-muted-foreground border-border",
  };
  return <Badge variant="outline" className={styles[status] || styles.inactive}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
};

// View Details Dialog
const ViewDetailsDialog = ({ department, open, onOpenChange }: { department: Department | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!department) return null;
  const deptEmployees = getEmployeesByDepartment(department);
  const manager = employees.find(e => e.id === department.managerId);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] flex flex-col p-0 rounded-md">
        <div className="p-6 bg-gradient-to-br from-muted/70 to-muted/30 rounded-t-lg">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 border-4 border-background rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{department.name}</h3>
              <p className="text-sm text-muted-foreground">{department.id}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-5 h-5" /> Department Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={Info} label="Description" value={department.description} />
                <DetailItem icon={GripVertical} label="Status" value={department.status.charAt(0).toUpperCase() + department.status.slice(1)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="w-5 h-5" /> Manager Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {manager && (
                  <>
                    <DetailItem icon={User} label="Name" value={manager.name} />
                    <DetailItem icon={Mail} label="Email" value={manager.email} />
                  </>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="w-5 h-5" /> Statistics</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={Users} label="Employee Count" value={department.employees.toString()} />
                <DetailItem icon={Info} label="Budget" value={`$${department.budget.toLocaleString()}`} />
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Edit Department Dialog
const EditDepartmentDialog = ({ department, open, onOpenChange }: { department: Department | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!department) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] flex flex-col p-0 rounded-md">
        <DialogHeader className="p-6 border-b"><DialogTitle>Edit Department Details</DialogTitle></DialogHeader>
        <div className="p-6 space-y-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-2"><Label>Department Name</Label><Input defaultValue={department.name} /></div>
          <div className="space-y-2"><Label>Department Code</Label><Input defaultValue={department.id} readOnly /></div>
          <div className="space-y-2"><Label>Manager</Label>
            <Select defaultValue={department.managerId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {employees.map(emp => <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Annual Budget</Label><Input type="number" defaultValue={department.budget} /></div>
          <div className="space-y-2"><Label>Status</Label>
            <Select defaultValue={department.status}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="restructuring">Restructuring</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={department.description} /></div>
          <Button className="w-full">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// View Employees Dialog
const ViewEmployeesDialog = ({ department, open, onOpenChange }: { department: Department | null; open: boolean; onOpenChange: (open: boolean) => void; }) => {
  if (!department) return null;
  const deptEmployees = getEmployeesByDepartment(department);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0 rounded-md">
        <DialogHeader className="p-6 border-b"><DialogTitle>Employees in {department.name}</DialogTitle></DialogHeader>
        <div className="p-6 overflow-y-auto scrollbar-hide">
          {deptEmployees.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden sm:table-cell">Designation</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deptEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{emp.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                        <div><div className="font-medium">{emp.name}</div><div className="text-xs text-muted-foreground">{emp.id}</div></div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{emp.designation}</TableCell>
                    <TableCell className="hidden md:table-cell">{emp.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{emp.hireDate}</TableCell>
                    <TableCell>{getStatusBadge(emp.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">No employees found in this department.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function AdminDepartments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isViewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isViewEmployeesOpen, setViewEmployeesOpen] = useState(false);

  const handleOpenDialog = (department: Department, dialog: 'details' | 'edit' | 'employees') => {
    setSelectedDepartment(department);
    if (dialog === 'details') setViewDetailsOpen(true);
    else if (dialog === 'edit') setEditOpen(true);
    else if (dialog === 'employees') setViewEmployeesOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExpandedRow = (department: Department) => {
    const manager = employees.find(e => e.id === department.managerId);
    return (
      <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Description</p>
          <p className="text-sm font-medium">{department.description}</p>
        </div>
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Manager</p>
          <div className="flex items-center gap-2">
            {manager && <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">{manager.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>}
            <span className="text-sm font-medium">{department.manager}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card p-3 rounded border">
            <p className="text-xs text-muted-foreground">Employee Count</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              {department.employees}
            </div>
          </div>
          <div className="bg-card p-3 rounded border">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-sm font-medium">${department.budget.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-card p-3 rounded border flex justify-around items-center">
          {getStatusBadge(department.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-1/2 justify-start">
                <MoreHorizontal className="w-4 h-4 mr-2" />Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleOpenDialog(department, 'details')}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenDialog(department, 'edit')}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenDialog(department, 'employees')}><Users className="h-4 w-4 mr-2" />View Employees</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  const columns = [
    { key: "name", header: "Department", width: "250px", className: "", render: (dept: Department) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="font-medium text-xs sm:text-sm">{dept.name}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">{dept.id}</div>
        </div>
      </div>
    ) },
    { key: "manager", header: "Manager", width: "150px", className: "hidden md:table-cell", render: (dept: Department) => (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Avatar className="h-6 w-6"><AvatarFallback className="text-xs bg-primary/10">{dept.manager.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
        {dept.manager}
      </div>
    ) },
    { key: "employees", header: "Employees", width: "120px", className: "hidden lg:table-cell", render: (dept: Department) => (
      <div className="flex items-center gap-2 text-xs sm:text-sm"><Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />{dept.employees}</div>
    ) },
    { key: "budget", header: "Budget", width: "120px", className: "hidden sm:table-cell", render: (dept: Department) => `$${dept.budget.toLocaleString()}` },
    { key: "status", header: "Status", width: "100px", className: "hidden sm:table-cell", render: (dept: Department) => getStatusBadge(dept.status) },
    { key: "actions", header: "", width: "60px", className: "hidden lg:table-cell", render: (dept: Department) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleOpenDialog(dept, 'details')}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDialog(dept, 'edit')}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDialog(dept, 'employees')}><Users className="h-4 w-4 mr-2" />View Employees</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) },
  ];

  return (
    <div className="space-y-6 px-1 xs:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage organizational departments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" />Add Department</Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-lg h-[85vh] rounded-md">
            <DialogHeader><DialogTitle>Add New Department</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4 overflow-y-auto scrollbar-hide">
              <div className="space-y-2"><Label>Department Name</Label><Input placeholder="Enter department name" /></div>
              <div className="space-y-2"><Label>Manager</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                  <SelectContent>{employees.map(emp => <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Annual Budget</Label><Input type="number" placeholder="100000" /></div>
              <div className="space-y-2"><Label>Status</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="restructuring">Restructuring</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Department description" /></div>
              <Button className="w-full">Create Department</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Departments</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0"><div className="text-xl sm:text-2xl font-bold">{departments.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Employees</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0"><div className="text-xl sm:text-2xl font-bold">{departments.reduce((a, d) => a + d.employees, 0)}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Budget</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0"><div className="text-xl sm:text-2xl font-bold">${(departments.reduce((a, d) => a + d.budget, 0) / 1000).toFixed(0)}K</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Team Size</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0"><div className="text-xl sm:text-2xl font-bold">{Math.round(departments.reduce((a, d) => a + d.employees, 0) / departments.length)}</div></CardContent>
        </Card>
      </div>

      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search departments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-muted/30 border-b">
                      {columns.map((col) => (
                        <th key={col.key} style={{ width: col.width }} className={`p-4 text-left text-xs font-semibold ${col.className ?? ""}`}>
                          {col.header}
                        </th>
                      ))}
                      <th className="w-10 p-4 lg:hidden" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartments.map((dept) => {
                      const id = dept.id;
                      const isExpanded = expandedRows.has(id);
                      return (
                        <>
                          <tr key={id} className="border-b hover:bg-muted/50">
                            {columns.map((col) => (
                              <td key={col.key} style={{ width: col.width }} className={`text-xs px-4 py-4 ${col.className ?? ""}`}>
                                {col.render ? col.render(dept) : dept[col.key as keyof typeof dept]}
                              </td>
                            ))}
                            <td className="w-10 p-4 lg:hidden">
                              <Button variant="ghost" size="icon" onClick={() => toggleExpand(id)}>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                              </Button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="lg:hidden">
                              <td colSpan={columns.length + 1} className="p-0">
                                {renderExpandedRow(dept)}
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ViewDetailsDialog department={selectedDepartment} open={isViewDetailsOpen} onOpenChange={setViewDetailsOpen} />
      <EditDepartmentDialog department={selectedDepartment} open={isEditOpen} onOpenChange={setEditOpen} />
      <ViewEmployeesDialog department={selectedDepartment} open={isViewEmployeesOpen} onOpenChange={setViewEmployeesOpen} />
    </div>
  );
}