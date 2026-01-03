
import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Edit, Trash2, FolderTree, ShoppingCart, DollarSign, PackageCheck, X, Star } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  description: string;
  productCount: number;
  status: string;
}

const mockCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", parent: null, description: "Electronic devices and gadgets", productCount: 156, status: "active" },
  { id: "2", name: "Fashion", slug: "fashion", parent: null, description: "Clothing and accessories", productCount: 234, status: "active" },
  { id: "3", name: "Home & Living", slug: "home-living", parent: null, description: "Home decor and furniture", productCount: 89, status: "active" },
  { id: "4", name: "Smartphones", slug: "smartphones", parent: "Electronics", description: "Mobile phones", productCount: 45, status: "active" },
  { id: "5", name: "Laptops", slug: "laptops", parent: "Electronics", description: "Laptop computers", productCount: 32, status: "draft" },
];

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

const mockProducts: Product[] = [
  { id: "p1", name: "iPhone 15 Pro", slug: "iphone-15-pro", category: "smartphones", price: 99999, stock: 25, status: "active", image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro" },
  { id: "p2", name: "Samsung Galaxy S24", slug: "samsung-galaxy-s24", category: "smartphones", price: 79999, stock: 15, status: "active", image: "https://via.placeholder.com/300x300?text=Samsung+S24" },
  { id: "p3", name: "MacBook Pro 14\"", slug: "macbook-pro-14", category: "laptops", price: 199999, stock: 8, status: "draft", image: "https://via.placeholder.com/300x300?text=MacBook+Pro" },
  { id: "p4", name: "Dell XPS 13", slug: "dell-xps-13", category: "laptops", price: 129999, stock: 12, status: "active", image: "https://via.placeholder.com/300x300?text=Dell+XPS" },
  { id: "p5", name: "T-Shirt Casual", slug: "tshirt-casual", category: "fashion", price: 999, stock: 100, status: "active", image: "https://via.placeholder.com/300x300?text=T-Shirt" },
  { id: "p6", name: "Jeans Slim Fit", slug: "jeans-slim-fit", category: "fashion", price: 2499, stock: 50, status: "active", image: "https://via.placeholder.com/300x300?text=Jeans" },
  { id: "p7", name: "Sofa Modern", slug: "sofa-modern", category: "home-living", price: 29999, stock: 5, status: "active", image: "https://via.placeholder.com/300x300?text=Sofa" },
  { id: "p8", name: "LED TV 55\"", slug: "led-tv-55", category: "electronics", price: 49999, stock: 20, status: "active", image: "https://via.placeholder.com/300x300?text=LED+TV" },
];

export default function AdminCategories() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
      width: "300px",
      render: (item: Category) => (
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
      width: "150px",
      render: (item: Category) => item.parent || <span className="text-muted-foreground">—</span>,
    },
    { 
      key: "productCount", 
      header: "Products",
      width: "120px",
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: Category) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      width: "200px",
      render: (item: Category) => (
        <div className="flex items-center gap-1">
          <div className="hidden lg:flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(item); 
                setIsProductsDialogOpen(true); 
              }}
              className="h-8 px-2 text-xs"
            >
              <Eye className="w-3 h-3 mr-1" /> View
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                setEditingItem(item); 
                setIsDialogOpen(true); 
              }}
              className="h-8 px-2 text-xs"
            >
              <Edit className="w-3 h-3 mr-1" /> Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-3 h-3 mr-1" /> Delete
            </Button>
          </div>
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(item); 
                    setIsProductsDialogOpen(true); 
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" /> View Products
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingItem(item); 
                    setIsDialogOpen(true); 
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ),
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
      {/* DataTable for categories */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        pagination={{ page: 1, pageSize: 10, total: filteredData.length, onPageChange: () => {} }}
      />
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
        <DialogContent className="w-[95vw] max-w-6xl h-[90vh] overflow-hidden p-0 rounded-2xl shadow-2xl">
          <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <DialogHeader className="p-6 border-b border-border/20 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <PackageCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      Products in {selectedCategory?.name}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      {selectedCategory?.description} • {filteredProducts.length} items found
                    </DialogDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {filteredProducts.length} items
                </Badge>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-1">
                      <Input placeholder="Search products..." className="h-10" />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <Button variant="outline" className="flex-1 h-10">Filter by Status</Button>
                      <Button variant="outline" className="h-10 w-32">Sort by Price</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden bg-accent/30">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {product.status === "draft" && (
                            <Badge className="absolute top-3 right-3 bg-pink-gradient text-primary-foreground">
                              Draft
                            </Badge>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="secondary" className="h-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="secondary" className="h-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" className="h-8">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{product.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">{product.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-base sm:text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-500">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                              <span>4.5</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="mt-2 w-full justify-center">
                            Stock: {product.stock}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="p-6 pt-0 border-t border-border/20 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsProductsDialogOpen(false)}>
                <X className="w-4 h-4" />
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}