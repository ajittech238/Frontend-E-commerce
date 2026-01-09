import { useState, useMemo, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  Grid,
  List,
  Download,
  Upload,
  Eye,
  Copy,
  Star,
  TrendingUp,
  Package,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { products, categories } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { AddProductForm } from "@/components/dashboard/AddProductForm";

export default function DashboardProducts() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [previewProduct, setPreviewProduct] = useState<typeof products[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [search, category, sortBy]);

  const toggleSelectAll = useCallback(() => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  }, [selectedProducts.length, filteredProducts]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }, []);

  const handleBulkDelete = () => {
    toast({
      title: "Products Deleted",
      description: `${selectedProducts.length} products have been deleted.`,
    });
    setSelectedProducts([]);
  };

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => !p.badge?.includes("Out")).length,
    lowStock: 5,
    outOfStock: 2,
  }), []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tighter">Products</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium tracking-tight">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 font-bold text-xs uppercase tracking-widest border-border/50 hover:bg-accent">
            <Upload className="w-3.5 h-3.5 mr-2" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 font-bold text-xs uppercase tracking-widest border-border/50 hover:bg-accent">
            <Download className="w-3.5 h-3.5 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          {/*  */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] rounded-md sm:max-w-[900px] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <AddProductForm onFormSubmit={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Products", value: stats.total, icon: Package, color: "text-blue-500", bgColor: "bg-blue-500/10" },
          { label: "Active", value: stats.active, icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
          { label: "Low Stock", value: stats.lowStock, icon: AlertCircle, color: "text-amber-500", bgColor: "bg-amber-500/10" },
          { label: "Out of Stock", value: stats.outOfStock, icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color} shrink-0`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-foreground tabular-nums tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-9 sm:h-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-40 h-9 sm:h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-36 h-9 sm:h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-pink-gradient/10 rounded-lg border border-primary/20 animate-fade-in">
          <span className="text-sm font-medium text-foreground">
            {selectedProducts.length} products selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
              Clear
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
                selectedProducts.includes(product.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-accent/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleSelect(product.id)}
                    className="bg-background/80 backdrop-blur-sm"
                  />
                </div>
                {product.badge && (
                  <Badge className="absolute top-3 right-3 bg-pink-gradient text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setPreviewProduct(product)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-black text-foreground text-sm sm:text-base truncate tracking-tight">{product.name}</h3>
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base sm:text-xl font-black text-primary tabular-nums tracking-tighter">₹{product.price.toLocaleString()}</span>
                  <div className="flex items-center gap-1 text-[11px] font-black text-amber-500 tabular-nums bg-amber-500/10 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-current" />
                    {product.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40 border-b border-border/50">
                <tr>
                  <th className="p-3 sm:p-4 text-left w-12">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px]">Product</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px] hidden md:table-cell">Category</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px]">Price</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px] hidden sm:table-cell">Rating</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px] hidden lg:table-cell">Status</th>
                  <th className="p-3 sm:p-4 text-left font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-[10px] w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-accent/20 transition-colors group ${
                      selectedProducts.includes(product.id) ? 'bg-pink-gradient/5' : ''
                    }`}
                  >
                    <td className="p-3 sm:p-4">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelect(product.id)}
                      />
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="font-black text-foreground text-sm truncate max-w-[150px] sm:max-w-none tracking-tight">{product.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground/50 md:hidden uppercase tracking-widest">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden md:table-cell">
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border-border/50">{product.category}</Badge>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="font-black text-primary text-sm tabular-nums tracking-tighter">₹{product.price.toLocaleString()}</span>
                    </td>
                    <td className="p-3 sm:p-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-amber-500 text-[11px] font-black tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {product.rating}
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden lg:table-cell">
                      {product.badge ? (
                        <Badge className="bg-pink-gradient/10 text-primary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border-primary/20">{product.badge}</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">In Stock</Badge>
                      )}
                    </td>
                    <td className="p-3 sm:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setPreviewProduct(product)}>
                            <Eye className="w-4 h-4 mr-2" /> Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="text-xs sm:text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Product Preview Dialog */}
      <Dialog open={!!previewProduct} onOpenChange={() => setPreviewProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Preview</DialogTitle>
            <DialogDescription>Quick view of product details</DialogDescription>
          </DialogHeader>
          {previewProduct && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="aspect-square rounded-xl overflow-hidden bg-accent">
                <img
                  src={previewProduct.image}
                  alt={previewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{previewProduct.name}</h3>
                  <p className="text-muted-foreground capitalize">{previewProduct.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">₹{previewProduct.price.toLocaleString()}</span>
                  {previewProduct.originalPrice && (
                    <span className="text-muted-foreground line-through">₹{previewProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{previewProduct.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({previewProduct.reviews} reviews)</span>
                </div>
                {previewProduct.badge && (
                  <Badge className="bg-pink-gradient">{previewProduct.badge}</Badge>
                )}
                <p className="text-sm text-muted-foreground">{previewProduct.description}</p>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-pink-gradient">
                    <Edit className="w-4 h-4 mr-2" /> Edit Product
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" /> View Live
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
