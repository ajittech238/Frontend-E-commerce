import { useState } from "react";
import { Heart, ShoppingCart, Filter, Eye, X, Truck, Shield, RotateCcw, Smartphone, Laptop, Tablet, Headphones, Watch, Zap, Camera, Speaker, Monitor, Maximize2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { electronicsProducts } from "@/data/electronics";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ElectronicsPage = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(500000);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof electronicsProducts[0] | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categories = [
    { id: "smartphones", name: "Smartphones", icon: Smartphone },
    { id: "laptops", name: "Laptops", icon: Laptop },
    { id: "tablets", name: "Tablets", icon: Tablet },
    { id: "headphones", name: "Headphones", icon: Headphones },
    { id: "smartwatches", name: "Smart Watches", icon: Watch },
    { id: "gaming", name: "Gaming", icon: Zap },
    { id: "cameras", name: "Cameras", icon: Camera },
    { id: "speakers", name: "Speakers", icon: Speaker },
    { id: "monitors", name: "Monitors", icon: Monitor },
  ];

  const filteredProducts = electronicsProducts.filter((p) => {
    const matchesPrice = p.price <= priceRange;
    const matchesCategory = !selectedCategory || p.subcategory?.includes(selectedCategory);
    return matchesPrice && matchesCategory;
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
        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />

          {/* Action Buttons Stack */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-30">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
            >
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
          >
            <Eye className="h-4 w-4 text-muted-foreground" />
          </button>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-pink-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
              {product.badge}
            </div>
          )}

          {/* Hover Add to Cart Button on Image */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-40">
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs h-10 shadow-xl shadow-pink-900/20 rounded-xl backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2 relative">
          <div className="flex flex-col">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{product.brand}</span>
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-[10px]",
                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-primary hover:text-primary/80 mb-2 flex items-center gap-1 text-sm font-medium"
              >
                ← Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">⚡</span>
                Electronics
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Explore the latest gadgets, smartphones, laptops and more
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-pink-gradient text-primary-foreground">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8 bg-card p-6 rounded-xl border border-border/50 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </h3>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Categories</label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                        selectedCategory === cat.id
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <cat.icon className="h-4 w-4" />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-muted-foreground">Up to</span>
                  <span className="text-primary font-bold">{formatPrice(priceRange)}</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/5 text-primary" 
                onClick={() => {
                  setPriceRange(500000);
                  setSelectedCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                <div className="bg-secondary/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  className="mt-6 bg-pink-gradient"
                  onClick={() => {
                    setPriceRange(500000);
                    setSelectedCategory(null);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => renderProductCard(product))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-secondary/30 border-y border-border/50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Zap, title: "Fast Delivery", desc: "24-48 hours delivery" },
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-white dark:bg-card flex items-center justify-center shadow-sm">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-secondary/20 p-8 md:p-12 flex items-center justify-center relative group">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-auto object-contain max-h-[400px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                {quickViewProduct.discount && (
                  <div className="absolute top-8 left-8 bg-destructive text-white font-black px-4 py-2 rounded-2xl shadow-xl -rotate-12 animate-pulse">
                    SAVE {quickViewProduct.discount}%
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center bg-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                      {quickViewProduct.brand}
                    </Badge>
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 size={14} />
                      {quickViewProduct.inStock ? "In Stock" : "Limited Stock"}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-foreground leading-[1.1] tracking-tight">
                    {quickViewProduct.name}
                  </h2>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={cn("text-lg", i < Math.floor(quickViewProduct.rating) ? "text-yellow-400" : "text-gray-300")}>★</span>
                      ))}
                      <span className="ml-2 text-sm font-bold text-foreground">{quickViewProduct.rating}</span>
                    </div>
                    <div className="h-4 w-[1px] bg-border" />
                    <span className="text-sm text-muted-foreground font-medium">{quickViewProduct.reviews} Verified Reviews</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-foreground tracking-tighter">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through decoration-destructive/40">
                        {formatPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {quickViewProduct.description}. This premium device from {quickViewProduct.brand} offers cutting-edge technology and exceptional build quality.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-border/50">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Express Delivery</p>
                      <p className="text-[10px] text-muted-foreground">Ships within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-border/50">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">1 Year Warranty</p>
                      <p className="text-[10px] text-muted-foreground">Genuine Brand Warranty</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-pink-200 hover:scale-[1.02] transition-transform active:scale-95"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-3" />
                    ADD TO CART
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 w-14 rounded-2xl border-border hover:bg-secondary transition-colors"
                    onClick={() => toggleWishlist(quickViewProduct)}
                  >
                    <Heart className={cn("h-6 w-6", isInWishlist(quickViewProduct.id) && "fill-primary text-primary")} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ElectronicsPage;
