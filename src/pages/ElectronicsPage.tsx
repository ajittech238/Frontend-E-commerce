import { useState } from "react";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { electronicsProducts } from "@/data/electronics";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface GroupedProducts {
  [key: string]: typeof electronicsProducts;
}

const ElectronicsPage = () => {
  const [priceRange, setPriceRange] = useState(500000);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const mainCategories = Array.from(
    new Set(electronicsProducts.flatMap((p) => p.subcategory?.[0] || "other"))
  ).sort();

  const filteredProducts = electronicsProducts.filter((p) => {
    const matchesPrice = p.price <= priceRange;
    const matchesCategory = 
      !selectedMainCategory || p.subcategory?.[0] === selectedMainCategory;
    return matchesPrice && matchesCategory;
  });

  const groupedByMainCategory: { [key: string]: typeof electronicsProducts } = {};
  filteredProducts.forEach((product) => {
    const mainCat = product.subcategory?.[0] || "other";
    if (!groupedByMainCategory[mainCat]) {
      groupedByMainCategory[mainCat] = [];
    }
    groupedByMainCategory[mainCat].push(product);
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderProductCard = (product: typeof electronicsProducts[0]) => {
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-xs",
                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== "Free" && (
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <button
                  key={size}
                  className="text-xs border border-border/50 rounded px-2 py-1 hover:border-primary hover:text-primary transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <Button
            className="w-full mt-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">⚡</span>
                Electronics
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Latest gadgets and tech devices at best prices
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-blue-600 text-white">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedMainCategory(null)}
                    className={cn(
                      "w-full px-3 py-2 rounded border text-sm font-medium transition-all text-left",
                      !selectedMainCategory
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 text-foreground hover:border-primary/50"
                    )}
                  >
                    All Categories
                  </button>
                  {mainCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedMainCategory(selectedMainCategory === cat ? null : cat)}
                      className={cn(
                        "w-full px-3 py-2 rounded border text-sm font-medium transition-all text-left capitalize",
                        selectedMainCategory === cat
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 text-foreground hover:border-primary/50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(500000);
                  setSelectedMainCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedByMainCategory).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found with the selected filters.</p>
              </div>
            ) : (
              Object.entries(groupedByMainCategory).map(([mainCategory, products]) => (
                <div key={mainCategory} className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                      {mainCategory.replace(/([A-Z])/g, " $1").replace(/-/g, " ").trim()}
                    </h2>
                    <Badge className="bg-blue-500/20 text-blue-600">{products.length}</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => renderProductCard(product))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white mt-16 py-8">
        <div className="container text-center space-y-3">
          <h3 className="text-3xl font-bold">Premium Electronics at Best Prices!</h3>
          <p className="text-lg opacity-90">Fast delivery on most items | Easy returns</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ElectronicsPage;
