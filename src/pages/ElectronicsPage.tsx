import { useState, useRef } from "react";
import { Filter, Smartphone, Laptop, Headphones, Watch, Zap, Package, Tablet, Camera, Speaker, Monitor, Truck, Shield, RotateCcw, X } from "lucide-react";
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
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      <Header />

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-indigo-600/20 dark:to-blue-600/20 blur-3xl" />
        
        <div className="relative mx-auto px-4 py-12 md:py-16 text-center z-10">
          <div className="inline-block mb-6">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold rounded-full border-none">
              ✨ 2025 Latest Collection
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Latest <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">Electronics</span> & Smart Gadgets
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Top brands • Best deals • Future technology • Free shipping on all orders
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToProducts}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                setSortBy("newest");
                scrollToProducts();
              }}
              className="border-2 border-purple-500/50 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              View Deals
            </button>
          </div>
        </div>
      </div>

      <div ref={productsSectionRef} className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-600" />
                  Explore Gear
                </h3>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                        selectedCategory === cat.id
                          ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20"
                          : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <cat.icon size={18} />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price Range</label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-400">Up to</span>
                    <span className="text-purple-600 dark:text-purple-400">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Brands</label>
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
                        "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                        selectedBrands.includes(brand)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-gray-400 hover:border-purple-400"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setPriceRange([10000, 500000]);
                  setSelectedBrands([]);
                  setSelectedCategory(null);
                }}
                className="w-full text-xs font-bold text-slate-400 hover:text-purple-600 transition-colors pt-4 border-t border-slate-100 dark:border-slate-800"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
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

                <button
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="lg:hidden p-2 bg-purple-600 text-white rounded-xl"
                >
                  <Filter size={20} />
                </button>
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

      {/* Mobile Filter Overlay */}
      {isFilterMobileOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Filter size={20} className="text-purple-600" />
                Filters
              </h2>
              <button onClick={() => setIsFilterMobileOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all border",
                        selectedCategory === cat.id
                          ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 border-transparent"
                      )}
                    >
                      <cat.icon size={14} />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Price Range</label>
                <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="text-purple-600 font-bold text-lg">Up to {formatPrice(priceRange[1])}</div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setIsFilterMobileOpen(false)}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold shadow-lg"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setPriceRange([10000, 500000]);
                    setSelectedBrands([]);
                    setSelectedCategory(null);
                  }}
                  className="w-full py-3 text-slate-400 text-sm font-bold mt-2"
                >
                  Reset All
                </button>
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
