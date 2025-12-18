import { useState } from "react";
import { Plus, Search, MapPin, Package, Users, Settings, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouses</h1>
          <p className="text-muted-foreground">Manage warehouse locations and inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Warehouse</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Warehouses</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{warehouses.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Capacity</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{warehouses.reduce((a, w) => a + w.capacity, 0).toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{warehouses.reduce((a, w) => a + w.products, 0).toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{Math.round(warehouses.reduce((a, w) => a + (w.used / w.capacity) * 100, 0) / warehouses.length)}%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search warehouses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Warehouse</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell>
                    <div className="font-medium">{warehouse.name}</div>
                    <div className="text-sm text-muted-foreground">{warehouse.id}</div>
                  </TableCell>
                  <TableCell><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{warehouse.location}</div></TableCell>
                  <TableCell>{warehouse.manager}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()}</div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${getCapacityColor(warehouse.used, warehouse.capacity)}`} style={{ width: `${(warehouse.used / warehouse.capacity) * 100}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{warehouse.products}</TableCell>
                  <TableCell>{getStatusBadge(warehouse.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem><Package className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
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
