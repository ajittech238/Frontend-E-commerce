import { useState } from "react";
import { Store, Plus, Edit, Trash2, MapPin, Phone, Globe, MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const shops = [
  { id: "SHP001", name: "Mumbai Main Store", location: "Mumbai, Maharashtra", status: "active", phone: "+91-22-1234-5678", website: "mumbai.store.com", employees: 15 },
  { id: "SHP002", name: "Delhi Hub", location: "Delhi, NCR", status: "active", phone: "+91-11-1234-5678", website: "delhi.store.com", employees: 12 },
  { id: "SHP003", name: "Bangalore Center", location: "Bangalore, Karnataka", status: "active", phone: "+91-80-1234-5678", website: "bangalore.store.com", employees: 18 },
  { id: "SHP004", name: "Kolkata Branch", location: "Kolkata, West Bengal", status: "inactive", phone: "+91-33-1234-5678", website: "kolkata.store.com", employees: 8 },
];

export default function Shops() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<any>(null);

  const columns = [
    {
      key: "name",
      header: "Shop Name",
      render: (shop: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-pink-gradient/10 flex items-center justify-center flex-shrink-0">
            <Store className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-xs sm:text-sm">{shop.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 mt-0.5 sm:mt-1">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {shop.location}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (shop: any) => (
        <Badge className={shop.status === "active" ? "bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-xs" : "bg-gray-500/10 text-gray-600 text-[10px] sm:text-xs"}>
          {shop.status}
        </Badge>
      ),
    },
    {
      key: "phone",
      header: "Contact",
      className: "hidden md:table-cell",
      render: (shop: any) => (
        <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          {shop.phone}
        </div>
      ),
    },
    { key: "employees", header: "Staff", className: "hidden sm:table-cell" },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (shop: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setEditingShop(shop); setIsDialogOpen(true); }}>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Shops</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage all store locations</p>
        </div>
        <Button onClick={() => { setEditingShop(null); setIsDialogOpen(true); }} className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Add Shop</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Shops", value: "4", color: "text-blue-600" },
          { label: "Active Shops", value: "3", color: "text-emerald-600" },
          { label: "Total Employees", value: "53", color: "text-purple-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xl sm:text-3xl font-bold mt-1 sm:mt-2 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shops Table */}
      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Store Locations</CardTitle>
          <CardDescription className="text-xs sm:text-sm">All your shop branches and locations</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <DataTable
            columns={columns}
            data={shops}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: shops.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingShop ? "Edit Shop" : "Add New Shop"}</DialogTitle>
            <DialogDescription>
              {editingShop ? "Update shop details" : "Create a new shop location"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Shop Name</Label>
              <Input defaultValue={editingShop?.name} placeholder="Enter shop name" />
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input defaultValue={editingShop?.location} placeholder="Enter location" />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input defaultValue={editingShop?.phone} placeholder="Enter phone number" />
            </div>
            <div className="grid gap-2">
              <Label>Website</Label>
              <Input defaultValue={editingShop?.website} placeholder="Enter website URL" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingShop ? "Save Changes" : "Create Shop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
