import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", phone: "+1234567890", createdAt: "2024-01-15", avatar: "" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "active", phone: "+1234567891", createdAt: "2024-01-20", avatar: "" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "Support", status: "inactive", phone: "+1234567892", createdAt: "2024-02-01", avatar: "" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "active", phone: "+1234567893", createdAt: "2024-02-10", avatar: "" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "Customer", status: "suspended", phone: "+1234567894", createdAt: "2024-02-15", avatar: "" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-pink-gradient/10 text-primary text-[10px] sm:text-sm font-medium">
              {user.name.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground text-xs sm:text-sm">{user.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", className: "hidden lg:table-cell" },
    {
      key: "role",
      header: "Role",
      className: "hidden md:table-cell",
      render: (user: any) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span>{user.role}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "hidden sm:table-cell",
      render: (user: any) => <StatusBadge status={user.status} />,
    },
    {
      key: "createdAt",
      header: "Joined",
      className: "hidden xl:table-cell",
      render: (user: any) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (user: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingUser(user); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Send Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in min-h-[calc(100vh-80px)] pb-10">
      <AdminPageHeader
        title="User Management"
        description="Manage all users, roles, and permissions"
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingUser(null); setIsDialogOpen(true); }}
        addLabel="Add User"
        onExport={() => {}}
        onRefresh={() => {}}
      />

      <DataTable
        columns={columns}
        data={filteredUsers}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        pagination={{ page: 1, pageSize: 10, total: filteredUsers.length, onPageChange: () => {} }}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "Update user information" : "Create a new user account"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={editingUser?.name} placeholder="Enter full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={editingUser?.email} placeholder="Enter email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue={editingUser?.phone} placeholder="Enter phone number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue={editingUser?.role || "Customer"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editingUser?.status || "active"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
