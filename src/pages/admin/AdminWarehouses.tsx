import { useState } from "react";
import { Plus, Search, MapPin, Package, Eye, Edit, Trash2, MoreHorizontal, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const warehouses = [
  { id: "WH001", name: "Central Warehouse", location: "New York, NY", manager: "John Smith", capacity: 10000, used: 7500, products: 1250, status: "active" },
  { id: "WH002", name: "West Coast Hub", location: "Los Angeles, CA", manager: "Sarah Johnson", capacity: 8000, used: 6200, products: 980, status: "active" },
  { id: "WH003", name: "Midwest Center", location: "Chicago, IL", manager: "Mike Davis", capacity: 5000, used: 4800, products: 650, status: "warning" },
  { id: "WH004", name: "Southern Depot", location: "Houston, TX", manager: "Emily Brown", capacity: 6000, used: 3500, products: 420, status: "active" },
  { id: "WH005", name: "Northeast Facility", location: "Boston, MA", manager: "Robert Wilson", capacity: 4000, used: 1200, products: 180, status: "inactive" },
];

const mockProducts = [

    { id: 'PROD001', name: 'Laptop', quantity: 150, category: 'Electronics', image: '/placeholder.svg' },

    { id: 'PROD002', name: 'Keyboard', quantity: 300, category: 'Accessories', image: '/placeholder.svg' },

    { id: 'PROD003', name: 'Mouse', quantity: 450, category: 'Accessories', image: '/placeholder.svg' },

    { id: 'PROD004', name: 'Monitor', quantity: 100, category: 'Electronics', image: '/placeholder.svg' },

    { id: 'PROD005', name: 'Webcam', quantity: 200, category: 'Accessories', image: '/placeholder.svg' },

    { id: 'PROD006', name: 'Headphones', quantity: 250, category: 'Accessories', image: '/placeholder.svg' },

];



export default function AdminWarehouses() {

  const [searchQuery, setSearchQuery] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);

  const [selectedWarehouse, setSelectedWarehouse] = useState<any | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());



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



  const renderExpandedRow = (warehouse: any) => (

    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">

      <div className="bg-card p-3 rounded border">

        <p className="text-xs text-muted-foreground">Location</p>

        <p className="text-sm font-medium flex items-center gap-2">

          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />

          {warehouse.location}

        </p>

      </div>



      <div className="grid grid-cols-2 gap-3">

        <div className="bg-card p-3 rounded border">

          <p className="text-xs text-muted-foreground">Manager</p>

          <p className="text-sm font-medium">{warehouse.manager}</p>

        </div>

        <div className="bg-card p-3 rounded border">

          <p className="text-xs text-muted-foreground">Products</p>

          <p className="text-sm font-medium">{warehouse.products}</p>

        </div>

      </div>



      <div className="bg-card p-3 rounded border">

        <p className="text-xs text-muted-foreground mb-2">Capacity</p>

        <div className="space-y-1">

          <div className="text-xs">{warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()}</div>

          <div className="h-1.5 bg-muted rounded-full overflow-hidden">

            <div className={`h-full ${getCapacityColor(warehouse.used, warehouse.capacity)}`} style={{ width: `${(warehouse.used / warehouse.capacity) * 100}%` }} />

          </div>

        </div>

      </div>



      <div className="bg-card p-3 rounded border flex justify-around">

        {getStatusBadge(warehouse.status)}

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button variant="outline" size="sm" className="w-1/2 justify-start">

              <MoreHorizontal className="w-4 h-4 mr-2" />

              Actions

            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsViewDialogOpen(true); }}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsEditDialogOpen(true); }}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsProductsDialogOpen(true); }}><Package className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>

            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>

  );



  const filteredWarehouses = warehouses.filter(w =>

    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

    w.id.toLowerCase().includes(searchQuery.toLowerCase())

  );



  const getRowId = (item: any) => item.id;



  const allSelected = filteredWarehouses.length > 0 && filteredWarehouses.every((item) => selectedIds.includes(getRowId(item)));



  const handleSelectAll = (checked: boolean) => {

    if (checked) {

      setSelectedIds(filteredWarehouses.map(getRowId));

    } else {

      setSelectedIds([]);

    }

  };



  const handleSelectRow = (id: string, checked: boolean) => {

    if (checked) {

      setSelectedIds([...selectedIds, id]);

    } else {

      setSelectedIds(selectedIds.filter((i) => i !== id));

    }

  };



  const handlePageChange = (page: number) => {

    setPagination((prev) => ({ ...prev, page }));

  };



  const totalPages = Math.ceil(filteredWarehouses.length / pagination.pageSize);



  const paginatedData = filteredWarehouses.slice(

    (pagination.page - 1) * pagination.pageSize,

    pagination.page * pagination.pageSize

  );



  const columns = [

    {

      key: "name",

      header: "Warehouse",

      width: "200px",

      className: "table-cell",

      render: (warehouse: any) => (

        <div>

          <div className="font-medium text-xs sm:text-sm">{warehouse.name}</div>

          <div className="text-[10px] sm:text-xs text-muted-foreground">{warehouse.id}</div>

        </div>

      ),

    },

    {

      key: "location",

      header: "Location",

      width: "180px",

      className: "hidden sm:table-cell",

      render: (warehouse: any) => (

        <div className="flex items-center gap-2 text-xs sm:text-sm">

          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />

          {warehouse.location}

        </div>

      ),

    },

    {

      key: "manager",

      header: "Manager",

      width: "150px",

      className: "hidden md:table-cell"

    },

    {

      key: "capacity",

      header: "Capacity",

      width: "150px",

      className: "hidden lg:table-cell",

      render: (warehouse: any) => (

        <div className="space-y-1 min-w-[120px]">

          <div className="text-xs">{warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()}</div>

          <div className="h-1.5 bg-muted rounded-full overflow-hidden">

            <div className={`h-full ${getCapacityColor(warehouse.used, warehouse.capacity)}`} style={{ width: `${(warehouse.used / warehouse.capacity) * 100}%` }} />

          </div>

        </div>

      ),

    },

    {

      key: "products",

      header: "Products",

      width: "100px",

      className: "hidden lg:table-cell"

    },

    {

      key: "status",

      header: "Status",

      width: "100px",

      className: "hidden lg:table-cell",

      render: (warehouse: any) => getStatusBadge(warehouse.status),

    },

    {

      key: "actions",

      header: "",

      width: "60px",

      className: "hidden lg:table-cell",

      render: (warehouse: any) => (

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button variant="ghost" size="icon" className="h-8 w-8">

              <MoreHorizontal className="h-4 w-4" />

            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsViewDialogOpen(true); }}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsEditDialogOpen(true); }}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>

            <DropdownMenuItem onClick={() => { setSelectedWarehouse(warehouse); setIsProductsDialogOpen(true); }}><Package className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>

            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      ),

    },

  ];



  return (

    <div className="space-y-6 px-1 xs:px-0">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Warehouses</h1>

          <p className="text-xs sm:text-sm text-muted-foreground">Manage warehouse locations and inventory</p>

        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

          <DialogTrigger asChild>

            <Button className="w-full sm:w-auto "><Plus className="h-4 w-4 mr-2" />Add Warehouse</Button>

          </DialogTrigger>

          <DialogContent className="w-[95vw] max-w-md h-[90vh] rounded-md">

            <DialogHeader>

              <DialogTitle>Add New Warehouse</DialogTitle>

            </DialogHeader>

            <div className="space-y-4 p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

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

        <CardContent className="p-0">

          <div className="space-y-4">

            <div className="rounded-xl border border-border/50 overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full table-auto">

                  <thead>

                    <tr className="bg-muted/30 border-b">

                      <th className="w-12 p-4 text-left">

                        <Checkbox

                          checked={allSelected}

                          onCheckedChange={handleSelectAll}

                        />

                      </th>



                      {columns.map((col) => (

                        <th

                          key={col.key}

                          style={{ width: col.width }}

                          className={`p-4 text-left text-xs font-semibold ${col.className ?? ""}`}

                        >

                          {col.header}

                        </th>

                      ))}



                      <th className="w-10 p-4 lg:hidden" />

                    </tr>

                  </thead>



                  <tbody>

                    {paginatedData.map((item) => {

                      const id = item.id;

                      const isExpanded = expandedRows.has(id);



                      return (

                        <>

                          <tr key={id} className="border-b hover:bg-muted/50">

                            <td className="w-12 p-4">

                              <Checkbox

                                checked={selectedIds.includes(id)}

                                onCheckedChange={(c) => handleSelectRow(id, !!c)}

                              />

                            </td>



                            {columns.map((col) => (

                              <td

                                key={col.key}

                                style={{ width: col.width }}

                                className={`text-xs px-4 py-4 ${col.className ?? ""}`}

                              >

                                {col.render

                                  ? col.render(item)

                                  : item[col.key as keyof typeof item]}

                              </td>

                            ))}



                            <td className="lg:hidden p-4">

                              <Button

                                variant="ghost"

                                size="icon"

                                onClick={() => toggleExpand(id)}

                              >

                                <ChevronDown

                                  className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}

                                />

                              </Button>

                            </td>

                          </tr>



                          {isExpanded && (

                            <tr className="lg:hidden">

                              <td colSpan={columns.length + 2} className="p-0">

                                {renderExpandedRow(item)}

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



            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm pb-4">

              <p className="text-muted-foreground">

                Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}

                {Math.min(pagination.page * pagination.pageSize, filteredWarehouses.length)} of{" "}

                {filteredWarehouses.length}

              </p>

              <div className="flex items-center gap-1 m-2">

                <Button

                  variant="outline"

                  size="icon"

                  className="w-8 h-8 sm:w-9 sm:h-9"

                  onClick={() => handlePageChange(1)}

                  disabled={pagination.page === 1}

                  title="First page"

                >

                  <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />

                </Button>

                <Button

                  variant="outline"

                  size="icon"

                  className="w-8 h-8 sm:w-9 sm:h-9"

                  onClick={() => handlePageChange(pagination.page - 1)}

                  disabled={pagination.page === 1}

                  title="Previous page"

                >

                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />

                </Button>

                <span className="px-2 sm:px-3 font-medium text-xs sm:text-sm">

                  {pagination.page} / {totalPages}

                </span>

                <Button

                  variant="outline"

                  size="icon"

                  className="w-8 h-8 sm:w-9 sm:h-9"

                  onClick={() => handlePageChange(pagination.page + 1)}

                  disabled={pagination.page === totalPages}

                  title="Next page"

                >

                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />

                </Button>

                <Button

                  variant="outline"

                  size="icon"

                  className="w-8 h-8 sm:w-9 sm:h-9"

                  onClick={() => handlePageChange(totalPages)}

                  disabled={pagination.page === totalPages}

                  title="Last page"

                >

                  <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />

                </Button>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>



            {/* View Details Dialog */}

            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>

                <DialogContent className="w-[95vw] max-w-lg">

                    <DialogHeader>

                        <DialogTitle>{selectedWarehouse?.name} Details</DialogTitle>

                    </DialogHeader>

                    {selectedWarehouse && (

                        <div className="space-y-4 py-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="border p-3 rounded-md">

                                    <Label className="text-muted-foreground">Location</Label>

                                    <p className="font-medium flex items-center gap-2 mt-1">

                                        <MapPin className="h-4 w-4" />

                                        {selectedWarehouse.location}

                                    </p>

                                </div>

                                <div className="border p-3 rounded-md">

                                    <Label className="text-muted-foreground">Manager</Label>

                                    <p className="font-medium flex items-center gap-2 mt-1">

                                        <Users className="h-4 w-4" />

                                        {selectedWarehouse.manager}

                                    </p>

                                </div>

                            </div>

                            <div className="border p-3 rounded-md">

                                <Label className="text-muted-foreground">Capacity</Label>

                                <p className="font-medium">{selectedWarehouse.used.toLocaleString()} / {selectedWarehouse.capacity.toLocaleString()} units</p>

                                <div className="h-2 bg-muted rounded-full overflow-hidden mt-1 w-full">

                                    <div className={`h-full ${getCapacityColor(selectedWarehouse.used, selectedWarehouse.capacity)}`} style={{ width: `${(selectedWarehouse.used / selectedWarehouse.capacity) * 100}%` }} />

                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="border p-3 rounded-md">

                                    <Label className="text-muted-foreground">Products</Label>

                                    <p className="font-medium flex items-center gap-2 mt-1">

                                        <Package className="h-4 w-4" />

                                        {selectedWarehouse.products}

                                    </p>

                                </div>

                                <div className="border p-3 rounded-md">

                                    <Label className="text-muted-foreground">Status</Label>

                                    <div>{getStatusBadge(selectedWarehouse.status)}</div>

                                </div>

                            </div>

                        </div>

                    )}

                </DialogContent>

            </Dialog>

            {/* Edit Warehouse Dialog */}

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>

                <DialogContent className="w-[95vw] max-w-md rounded-md">

                    <DialogHeader>

                        <DialogTitle>Edit {selectedWarehouse?.name}</DialogTitle>

                    </DialogHeader>

                    <div className="space-y-4 py-4">

                        <div className="space-y-2">

                            <Label>Warehouse Name</Label>

                            <Input defaultValue={selectedWarehouse?.name} />

                        </div>

                        <div className="space-y-2">

                            <Label>Location</Label>

                            <Input defaultValue={selectedWarehouse?.location} />

                        </div>

                        <div className="space-y-2">

                            <Label>Manager</Label>

                            <Input defaultValue={selectedWarehouse?.manager} />

                        </div>

                        <Button className="w-full">Save Changes</Button>

                    </div>

                </DialogContent>

            </Dialog>



            {/* View Products Dialog */}

            <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>

                <DialogContent className="w-[95vw] max-w-3xl h-[80vh] sm:h-auto sm:max-h-[80vh] flex flex-col">

                    <DialogHeader>

                        <DialogTitle>Products in {selectedWarehouse?.name}</DialogTitle>

                    </DialogHeader>

                    <div className="py-4 flex-grow overflow-y-auto scrollbar-hide">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                            {mockProducts.map(p => (

                                <Card key={p.id}>

                                    <CardContent className="p-4 flex flex-col">

                                        <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-md mb-4" />

                                        <h3 className="font-semibold text-base flex-grow">{p.name}</h3>

                                        <p className="text-sm text-muted-foreground">{p.category}</p>

                                        <p className="text-sm font-medium mt-2">{p.quantity} units</p>

                                    </CardContent>

                                </Card>

                            ))}

                        </div>

                    </div>

                </DialogContent>

            </Dialog>



    </div>

  );

}
