import { useState } from "react";
import { Plus, Search, MapPin, Package, Users, Settings, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const warehouses = [
  { id: "WH001", name: "Central Warehouse", location: "New York, NY", manager: "John Smith", capacity: 10000, used: 7500, products: 1250, status: "active" },
  { id: "WH002", name: "West Coast Hub", location: "Los Angeles, CA", manager: "Sarah Johnson", capacity: 8000, used: 6200, products: 980, status: "active" },
  { id: "WH003", name: "Midwest Center", location: "Chicago, IL", manager: "Mike Davis", capacity: 5000, used: 4800, products: 650, status: "warning" },
  { id: "WH004", name: "Southern Depot", location: "Houston, TX", manager: "Emily Brown", capacity: 6000, used: 3500, products: 420, status: "active" },
  { id: "WH005", name: "Northeast Facility", location: "Boston, MA", manager: "Robert Wilson", capacity: 4000, used: 1200, products: 180, status: "inactive" },
];

export default function AdminWarehouses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      inactive: "bg-muted text-muted-foreground border-border",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  const getCapacityColor = (used: number, capacity: number) => {
    const percent = (used / capacity) * 100;
    if (percent >= 90) return "bg-destructive";
    if (percent >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Warehouse",
      render: (warehouse) => (
        <div>
          <div className="font-medium text-xs sm:text-sm">{warehouse.name}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">{warehouse.id}</div>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      className: "hidden sm:table-cell",
      render: (warehouse) => (
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {warehouse.location}
        </div>
      ),
    },
    { key: "manager", header: "Manager", className: "hidden md:table-cell" },
    {
      key: "capacity",
      header: "Capacity",
      className: "hidden lg:table-cell",
      render: (warehouse) => (
        <div className="space-y-1 min-w-[120px]">
          <div className="text-xs">{warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()}</div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${getCapacityColor(warehouse.used, warehouse.capacity)}`} style={{ width: `${(warehouse.used / warehouse.capacity) * 100}%` }} />
          </div>
        </div>
      ),
    },
    { key: "products", header: "Products", className: "hidden sm:table-cell" },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (warehouse) => getStatusBadge(warehouse.status),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (warehouse) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
              <DropdownMenuItem><Package className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredWarehouses = warehouses.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 px-1 xs:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Warehouses</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage warehouse locations and inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" />Add Warehouse</Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Warehouse</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Warehouse Name</Label>
                <Input placeholder="Enter warehouse name" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="City, State" />
              </div>
              <div className="space-y-2">
                <Label>Manager</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Capacity (units)</Label>
                <Input type="number" placeholder="10000" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea placeholder="Full address" />
              </div>
              <Button className="w-full">Create Warehouse</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Warehouses</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{warehouses.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Capacity</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{warehouses.reduce((a, w) => a + w.capacity, 0).toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Products</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{warehouses.reduce((a, w) => a + w.products, 0).toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2 p-4 sm:p-6"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle></CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0"><div className="text-xl sm:text-2xl font-bold">{Math.round(warehouses.reduce((a, w) => a + (w.used / w.capacity) * 100, 0) / warehouses.length)}%</div></CardContent>
        </Card>
      </div>

      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search warehouses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <DataTable
            columns={columns}
            data={filteredWarehouses}
            pagination={{
              page: 1,
              pageSize: 10,
              total: filteredWarehouses.length,
              onPageChange: () => {}
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
