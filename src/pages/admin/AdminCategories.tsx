import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Edit, Trash2, FolderTree, ShoppingCart, DollarSign, PackageCheck, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockCategories = [
  { id: "1", name: "Electronics", slug: "electronics", parent: null, description: "Electronic devices and gadgets", productCount: 156, status: "active" },
  { id: "2", name: "Fashion", slug: "fashion", parent: null, description: "Clothing and accessories", productCount: 234, status: "active" },
  { id: "3", name: "Home & Living", slug: "home-living", parent: null, description: "Home decor and furniture", productCount: 89, status: "active" },
  { id: "4", name: "Smartphones", slug: "smartphones", parent: "Electronics", description: "Mobile phones", productCount: 45, status: "active" },
  { id: "5", name: "Laptops", slug: "laptops", parent: "Electronics", description: "Laptop computers", productCount: 32, status: "draft" },
];

const mockProducts = [
  { id: "p1", name: "iPhone 15 Pro", slug: "iphone-15-pro", category: "smartphones", price: 99999, stock: 25, status: "active" },
  { id: "p2", name: "Samsung Galaxy S24", slug: "samsung-galaxy-s24", category: "smartphones", price: 79999, stock: 15, status: "active" },
  { id: "p3", name: "MacBook Pro 14\"", slug: "macbook-pro-14", category: "laptops", price: 199999, stock: 8, status: "draft" },
  { id: "p4", name: "Dell XPS 13", slug: "dell-xps-13", category: "laptops", price: 129999, stock: 12, status: "active" },
  { id: "p5", name: "T-Shirt Casual", slug: "tshirt-casual", category: "fashion", price: 999, stock: 100, status: "active" },
  { id: "p6", name: "Jeans Slim Fit", slug: "jeans-slim-fit", category: "fashion", price: 2499, stock: 50, status: "active" },
  { id: "p7", name: "Sofa Modern", slug: "sofa-modern", category: "home-living", price: 29999, stock: 5, status: "active" },
  { id: "p8", name: "LED TV 55\"", slug: "led-tv-55", category: "electronics", price: 49999, stock: 20, status: "active" },
];

export default function AdminCategories() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const filteredData = mockCategories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = mockProducts.filter((product) =>
    product.category === selectedCategory?.slug
  );

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-gradient/10 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "parent",
      header: "Parent",
      render: (item: any) => item.parent || <span className="text-muted-foreground">—</span>,
    },
    { 
      key: "productCount", 
      header: "Products",
      className: "hidden md:table-cell"
    },
    {
      key: "status",
      header: "Status",
      className: "hidden md:table-cell",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      className: "hidden md:table-cell",
      render: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedCategory(item); setIsProductsDialogOpen(true); }}>
              <Eye className="w-4 h-4 mr-2" /> View Products
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const productColumns = [
    {
      key: "name",
      header: "Product",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: any) => (
        <div className="text-right">
          <p className="font-semibold text-foreground">₹{item.price.toLocaleString()}</p>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (item: any) => (
        <div className="text-center">
          <Badge variant={item.stock > 0 ? "default" : "secondary"} className="text-xs">
            {item.stock}
          </Badge>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in p-4 sm:p-0">
      <AdminPageHeader
        title="Categories"
        description="Manage product categories and hierarchy"
        searchPlaceholder="Search categories..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingItem(null); setIsDialogOpen(true); }}
        addLabel="Add Category"
        onExport={() => {}}
      />
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          pagination={{ page: 1, pageSize: 10, total: filteredData.length, onPageChange: () => {} }}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-0">
          <div className="p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Category" : "Add Category"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update category details" : "Create a new category"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={editingItem?.name} placeholder="Category name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent">Parent Category</Label>
                <Select defaultValue={editingItem?.parent || ""}>
                  <SelectTrigger><SelectValue placeholder="Select parent (optional)" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Living">Home & Living</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={editingItem?.description} placeholder="Category description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingItem ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <PackageCheck className="w-5 h-5" />
                  Products in {selectedCategory?.name}
                </DialogTitle>
                <Badge variant="secondary" className="text-xs">
                  {filteredProducts.length} items
                </Badge>
              </div>
              <DialogDescription className="text-sm">
                Manage products within this category. {selectedCategory?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 sm:p-6">
                <div className="overflow-x-auto">
                  <DataTable
                    columns={productColumns}
                    data={filteredProducts}
                    selectable={false}
                    pagination={{ page: 1, pageSize: 10, total: filteredProducts.length, onPageChange: () => {} }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="p-4 sm:p-6 pt-3 sm:pt-4 border-t">
              <Button variant="outline" onClick={() => setIsProductsDialogOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}