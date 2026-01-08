import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Shield, ChevronDown } from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

// Define a type for your user object for better type safety
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  phone: string;
  createdAt: string;
  avatar: string;
  // Add any other relevant fields here
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", phone: "+1234567890", createdAt: "2024-01-15", avatar: "" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "active", phone: "+1234567891", createdAt: "2024-01-20", avatar: "" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "Support", status: "inactive", phone: "+1234567892", createdAt: "2024-02-01", avatar: "" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "active", phone: "+1234567893", createdAt: "2024-02-10", avatar: "" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "Customer", status: "suspended", phone: "+1234567894", createdAt: "2024-02-15", avatar: "" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [isEditAddDialogOpen, setIsEditAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const [isShowDetailDialogOpen, setIsShowDetailDialogOpen] = useState(false);
  const [isSendEmailDialogOpen, setIsSendEmailDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openUserDetailDialog = (user: User) => {
    setSelectedUser(user);
    setIsShowDetailDialogOpen(true);
  };

  const closeUserDetailDialog = () => {
    setIsShowDetailDialogOpen(false);
    setSelectedUser(null);
  };

  const openSendEmailDialog = (user: User) => {
    setSelectedUser(user);
    setIsSendEmailDialogOpen(true);
  };

  const closeSendEmailDialog = () => {
    setIsSendEmailDialogOpen(false);
    // We don't nullify selectedUser here so the email can be sent in the background
    // Or we can add a sending status
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: User) => (
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
      render: (user: User) => (
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
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: "createdAt",
      header: "Joined",
      className: "hidden xl:table-cell",
      render: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
    
    {
      key: "actions",
      header: "",
      width: "60px",
      className:"hidden lg:table-cell",
      render: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openUserDetailDialog(user)}><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingUser(user); setIsEditAddDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openSendEmailDialog(user)}><Mail className="w-4 h-4 mr-2" /> Send Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      key: "expand",
      header: "",
      className: "lg:hidden w-10",
      render: (user: User) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleExpand(user.id)}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedRows.has(user.id) ? "rotate-180" : ""
              }`}
          />
        </Button>
      ),
    },
  ];

  const renderExpandedRow = (user: User) => (
    <div className="bg-muted/50 p-4 mx-2 my-1 rounded-lg border border-border/50 space-y-3 animate-in slide-in-from-top-2">
      <div className="bg-card p-3 rounded-md border">
        <p className="text-xs text-muted-foreground">Phone</p>
        <p className="text-sm font-semibold">{user.phone}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded-md border">
          <p className="text-xs text-muted-foreground">Role</p>
          <p className="text-sm font-semibold">{user.role}</p>
        </div>
        <div className="bg-card p-3 rounded-md border flex items-center justify-center">
          <StatusBadge status={user.status} />
        </div>
      </div>

      <div className="bg-card p-3 rounded-md border">
        <p className="text-xs text-muted-foreground">Joined</p>
        <p className="text-sm font-semibold">
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => openUserDetailDialog(user)}><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEditingUser(user); setIsEditAddDialogOpen(true); }}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => openSendEmailDialog(user)}><Mail className="w-4 h-4 mr-2" /> Send Email</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in min-h-[calc(100vh-80px)] pb-10">
      <AdminPageHeader
        title="User Management"
        description="Manage all users, roles, and permissions"
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingUser(null); setIsEditAddDialogOpen(true); }}
        addLabel="Add User"
        onExport={() => { }}
        onRefresh={() => { }}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const isExpanded = expandedRows.has(user.id);
              return (
                <>
                  <TableRow key={user.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.className}>
                        {column.render ? column.render(user) : (user as any)[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="lg:hidden">
                      <TableCell colSpan={columns.length}>
                        {renderExpandedRow(user)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isEditAddDialogOpen} onOpenChange={setIsEditAddDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "Update user information" : "Create a new user account"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="grid gap-4">
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
          </div>
          <DialogFooter className="p-4 mt-auto border-t bg-background">
            <Button variant="outline" onClick={() => setIsEditAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditAddDialogOpen(false)}>
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Detail Dialog */}
      <Dialog open={isShowDetailDialogOpen} onOpenChange={setIsShowDetailDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" /> User Details
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Full information for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-grow overflow-y-auto px-6 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-4">
            {selectedUser && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Each detail item */}
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="text-sm font-semibold">{selectedUser.id}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold">{selectedUser.name}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold">{selectedUser.email}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold">{selectedUser.phone}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="text-sm font-semibold capitalize">{selectedUser.role}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md border flex items-center">
                  <p className="text-xs text-muted-foreground mr-2">Status:</p>
                  <StatusBadge status={selectedUser.status} />
                </div>
                <div className="bg-muted/30 p-3 rounded-md border">
                  <p className="text-xs text-muted-foreground">Joined At</p>
                  <p className="text-sm font-semibold">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="p-4 mt-auto border-t bg-background">
            <Button variant="outline" onClick={closeUserDetailDialog} className="w-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Send Email Dialog */}
      <Dialog open={isSendEmailDialogOpen} onOpenChange={setIsSendEmailDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> Send Email
            </DialogTitle>
            <DialogDescription>
              Compose and send an email to {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="to">To</Label>
                <Input id="to" readOnly defaultValue={selectedUser?.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
              </div>
            </div>
          </div>
          <DialogFooter className="p-4 mt-auto border-t bg-background flex-row justify-end gap-2">
            <Button variant="outline" onClick={closeSendEmailDialog}>Cancel</Button>
            <Button onClick={closeSendEmailDialog}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

