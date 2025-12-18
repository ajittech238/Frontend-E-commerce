import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fashionProducts } from "@/data/fashion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface GroupedProducts {
  [key: string]: typeof fashionProducts;
}

const FashionCategoryPage = () => {
  const { type } = useParams<{ type: "men" | "women" | "kids" }>();
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categoryMap: Record<string, string> = {
    men: "Men",
    women: "Women",
    kids: "Kids",
  };

  const categoryEmoji: Record<string, string> = {
    men: "👕",
    women: "👗",
    kids: "👶",
  };

  const filteredProducts = fashionProducts
    .filter(
      (p) => p.subcategory?.includes(type || "men") && p.price <= priceRange
    )
    .slice(0, 5);

  const groupedBySubcategory: GroupedProducts = {};
  filteredProducts.forEach((product) => {
    const subcat = product.subcategory?.find((s) => s !== type);
    if (subcat) {
      if (!groupedBySubcategory[subcat]) {
        groupedBySubcategory[subcat] = [];
      }
      groupedBySubcategory[subcat].push(product);
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderProductCard = (product: any) => {
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Wishlist Button */}
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

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
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

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  className="text-xs border border-border/50 rounded px-2 py-1 hover:border-primary hover:text-primary transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className="w-full mt-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  };

  const categoryName = categoryMap[type || "men"];
  const categoryEmoj = categoryEmoji[type || "men"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">{categoryEmoj}</span>
                {categoryName}'s Fashion
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover the latest trends in {categoryName?.toLowerCase()}'s fashion
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-primary text-primary-foreground">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </div>
              </div>

              {/* Size Filter */}
              {type === "men" && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Size</label>
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={cn(
                          "w-full px-3 py-2 rounded border text-sm font-medium transition-all",
                          selectedSize === size
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 text-foreground hover:border-primary/50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(10000);
                  setSelectedSize(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedBySubcategory).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found with the selected filters.</p>
              </div>
            ) : (
              Object.entries(groupedBySubcategory).map(([subcategory, products]) => (
                <div key={subcategory} className="space-y-4">
                  {/* Subcategory Header */}
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                      {subcategory.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <Badge className="bg-primary/20 text-primary">{products.length}</Badge>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => renderProductCard(product))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground mt-16 py-8">
        <div className="container text-center space-y-3">
          <h3 className="text-3xl font-bold">Enjoy Free Shipping!</h3>
          <p className="text-lg opacity-90">On all orders over ₹999</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FashionCategoryPage;
