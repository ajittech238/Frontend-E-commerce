import { useState } from "react";
import { Shield, Plus, Edit, Trash2, MoreHorizontal, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roles = [
  { id: "ROLE001", name: "Admin", description: "Full system access", users: 2, permissions: 50, status: "active" },
  { id: "ROLE002", name: "Manager", description: "Manage store and staff", users: 5, permissions: 35, status: "active" },
  { id: "ROLE003", name: "Support", description: "Customer support only", users: 8, permissions: 15, status: "active" },
  { id: "ROLE004", name: "Editor", description: "Content management", users: 3, permissions: 20, status: "active" },
];

const allPermissions = [
  { id: "view_dashboard", name: "View Dashboard", category: "Dashboard" },
  { id: "manage_users", name: "Manage Users", category: "Users" },
  { id: "manage_products", name: "Manage Products", category: "Products" },
  { id: "manage_orders", name: "Manage Orders", category: "Orders" },
  { id: "view_analytics", name: "View Analytics", category: "Analytics" },
  { id: "manage_settings", name: "Manage Settings", category: "Settings" },
];

export default function Roles() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const columns = [
    {
      key: "name",
      header: "Role",
      render: (role: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-pink-gradient/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-xs sm:text-sm">{role.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{role.description}</p>
          </div>
        </div>
      ),
    },
    { key: "users", header: "Users", className: "hidden sm:table-cell" },
    { key: "permissions", header: "Perms", className: "hidden md:table-cell" },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (role: any) => (
        <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-xs">{role.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (role: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setEditingRole(role); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in px-1 xs:px-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Roles</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage access control</p>
        </div>
        <Button onClick={() => { setEditingRole(null); setIsDialogOpen(true); }} className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">New Role</span>
          <span className="xs:hidden">New</span>
        </Button>
      </div>

      {/* Roles Table */}
      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Roles</CardTitle>
          <CardDescription className="text-xs sm:text-sm">System roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <DataTable
            columns={columns}
            data={roles}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: roles.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
            <DialogDescription>
              {editingRole ? "Update role details" : "Set up a new user role"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Role Name</Label>
              <Input defaultValue={editingRole?.name} placeholder="Enter role name" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input defaultValue={editingRole?.description} placeholder="Enter description" />
            </div>
            <div className="grid gap-3">
              <Label>Permissions</Label>
              <div className="space-y-2">
                {allPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPermissions([...selectedPermissions, permission.id]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                        }
                      }}
                    />
                    <label htmlFor={permission.id} className="flex-1 text-sm font-medium cursor-pointer">
                      {permission.name}
                      <span className="text-xs text-muted-foreground block">{permission.category}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingRole ? "Save Changes" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
