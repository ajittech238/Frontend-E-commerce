import { useState } from "react";
import { Filter, Smartphone, Laptop, Headphones, Watch, Zap, Package, Tablet, Camera, Speaker, Monitor, Truck, Shield, RotateCcw, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { electronicsProducts } from "@/data/electronics";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";

const ElectronicsPage = () => {
  const [priceRange, setPriceRange] = useState([10000, 500000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [isExpanded, setIsExpanded] = useState(false);

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

  const brands = Array.from(new Set(electronicsProducts.map((p) => p.brand))).filter(Boolean) as string[];

  const filteredProducts = electronicsProducts.filter((p) => {
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesCategory = !selectedCategory || p.subcategory?.includes(selectedCategory);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand || "");
    return matchesPrice && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (b.discount || 0) - (a.discount || 0);
      default:
        return b.reviews - a.reviews;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <Header />
      </div>

      {/* Page Header Section */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <Laptop className="h-10 w-10 text-blue-600" />
                Electronics
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover the latest in tech and gadgets.
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-blue-600 text-white">
              {sortedProducts.length} Products
            </Badge>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange[1])}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Category</label>
                <div className={cn("space-y-2", isExpanded && "max-h-48 overflow-y-auto scrollbar-hide pr-2")}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "w-full px-3 py-2 rounded text-sm font-medium transition-all text-left",
                      selectedCategory === null ? "text-primary" : "text-foreground"
                    )}
                  >
                    All Electronics
                  </button>
                  {categories.map((cat, index) => {
                    if (!isExpanded && index >= 5) return null;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full px-3 py-2 rounded text-sm font-medium transition-all text-left",
                          selectedCategory === cat.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
                {categories.length > 5 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 pt-2"
                  >
                    {isExpanded ? (
                      <>
                        <Minus className="h-4 w-4" /> Show Less
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Show More
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Top Brands</label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() =>
                        setSelectedBrands(
                          selectedBrands.includes(brand)
                            ? selectedBrands.filter((b) => b !== brand)
                            : [...selectedBrands, brand]
                        )
                      }
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        selectedBrands.includes(brand)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([10000, 500000]);
                  setSelectedBrands([]);
                  setSelectedCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Discover <span className="text-purple-600">Electronics</span> ({sortedProducts.length})
              </h2>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Package size={64} className="mx-auto text-slate-200 dark:text-slate-700 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No gear found</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999", color: "text-purple-600" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions", color: "text-blue-600" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy", color: "text-pink-600" },
              { icon: Zap, title: "Fast Delivery", desc: "24-48 hours delivery", color: "text-amber-600" },
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:scale-105 transition-transform">
                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm mb-4">
                  <benefit.icon className={cn("h-7 w-7", benefit.color)} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ElectronicsPage;
