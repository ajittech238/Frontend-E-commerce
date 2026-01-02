import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, ChevronDown, Filter, Eye, X } from "lucide-react";
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
  const [quickViewProduct, setQuickViewProduct] = useState<typeof fashionProducts[0] | null>(null);
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
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-pink-500/50 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1"
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
            />
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={() => setQuickViewProduct(product)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Eye className="h-6 w-6 text-pink-500" />
            </div>
          </button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg dark:bg-slate-900/80 hover:scale-110 transition-transform duration-300 z-10"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all duration-300",
                inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )}
            />
          </Button>

          {product.discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-pink-500 transition-colors min-h-[2.5rem] group-hover:text-pink-500">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-sm leading-none",
                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <button
                  key={size}
                  className="text-xs border border-border/50 rounded-lg px-2 py-1 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-all duration-300"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <Button
            className="w-full mt-auto h-10 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart nandani
          </Button>
        </div>
      </div>
    );
  };

  const categoryName = categoryMap[type || "men"];
  const categoryEmoj = categoryEmoji[type || "men"];

  const QuickViewModal = () => {
    if (!quickViewProduct) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-card rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in scale-95 duration-300">
          <div className="sticky top-0 flex justify-between items-center p-6 border-b border-border/50 bg-card">
            <h2 className="text-2xl font-bold text-foreground">Quick View</h2>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-foreground">{quickViewProduct.name}</h1>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-xl",
                            i < Math.floor(quickViewProduct.rating) ? "text-yellow-400" : "text-gray-300"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground font-semibold">({quickViewProduct.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2 py-4 border-t border-b border-border/50">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-foreground">{formatPrice(quickViewProduct.price)}</span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  {quickViewProduct.originalPrice && (
                    <span className="text-lg font-semibold text-pink-600">
                      Save {Math.round((1 - quickViewProduct.price / quickViewProduct.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold",
                      quickViewProduct.inStock
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {quickViewProduct.inStock ? "✓ In Stock" : "Out of Stock"}
                    </span>
                    {quickViewProduct.badge && (
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                        {quickViewProduct.badge}
                      </span>
                    )}
                  </div>

                  {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Available Sizes</h3>
                      <div className="flex gap-2 flex-wrap">
                        {quickViewProduct.sizes.map((size) => (
                          <button
                            key={size}
                            className="px-4 py-2 border-2 border-border rounded-lg font-semibold text-sm hover:border-pink-500 hover:bg-pink-500/5 transition-all duration-300"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 px-6 text-lg hover:scale-110 transition-transform"
                    onClick={() => toggleWishlist(quickViewProduct)}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-all",
                        isInWishlist(quickViewProduct.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      )}
                    />
                  </Button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.id}`}
                  className="block text-center text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuickViewModal />
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
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
              <Badge className="text-base px-4 py-2 bg-pink-gradient text-primary-foreground">
                {filteredProducts.length} Products
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Filters */}
      <div className="fixed left-0 top-[280px] bottom-0 w-full lg:w-[20%] z-40 lg:pl-8 hidden lg:block pt-8">
        <div className="bg-card p-6 rounded-xl border border-border/50 h-fit space-y-6 sticky top-[300px]">
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
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={cn(
                      "w-full px-3 py-2 rounded border text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-primary bg-pink-gradient/10 text-primary"
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

      {/* Main Content */}
      <div className="pt-[280px] overflow-y-auto flex-1 lg:ml-[20%]">
        <div className="container py-8 lg:pr-0">
          <div className="space-y-12">
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
                    <Badge className="bg-pink-gradient/20 text-primary">{products.length}</Badge>
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

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground mt-16 py-8">
          <div className="container text-center space-y-3">
            <h3 className="text-3xl font-bold">Enjoy Free Shipping!</h3>
            <p className="text-lg opacity-90">On all orders over ₹999</p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FashionCategoryPage;
