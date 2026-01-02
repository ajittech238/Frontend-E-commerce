 import { useState, useRef } from "react";
import { Heart, ShoppingCart, Filter, Eye, X, Truck, Shield, RotateCcw, Star, Smartphone, Laptop, Headphones, Watch, Zap, Package, Check, Tablet, Camera, Speaker, Monitor, Maximize2, CheckCircle2, Minus, Plus } from "lucide-react";
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
  const [priceRange, setPriceRange] = useState([10000, 500000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [quickViewProduct, setQuickViewProduct] = useState<typeof electronicsProducts[0] | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

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
    const matchesRating = p.rating >= minRating;
    return matchesPrice && matchesCategory && matchesBrand && matchesRating;
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

  const renderProductCard = (product: typeof electronicsProducts[0]) => {
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950">
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
                  inWishlist ? "fill-pink-600 text-pink-600" : "text-muted-foreground"
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
                setQuickViewQuantity(1);
                setSelectedSize(product.sizes?.[0] || "");
              }}
            >
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
              {product.badge}
            </div>
          )}

          {/* Hover Add to Cart Button on Image */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-40">
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs h-10 shadow-xl shadow-pink-900/20 rounded-xl backdrop-blur-sm border-none"
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
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">{product.brand}</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={cn(
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2 pt-1 mt-auto">
            <span className="text-base font-black text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through decoration-red-500/50">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-indigo-600/20 dark:to-blue-600/20 blur-3xl" />
        
        <div className="relative mx-auto px-4 py-16 md:py-24 text-center z-10">
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
                  setMinRating(0);
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => renderProductCard(product))}
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                {quickViewProduct.name}
              </h2>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Images */}
                <div className="space-y-6">
                  <div className="aspect-[4/3] rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center p-8">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 shrink-0 flex items-center justify-center p-2 cursor-pointer",
                          i === 1 ? "border-pink-500" : "border-transparent"
                        )}
                      >
                        <img src={quickViewProduct.image} alt="" className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium">
                      <Zap size={18} className="fill-amber-500" />
                      <span>Only {quickViewProduct.stock || 5} left!</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={20} 
                            className={cn(
                              i < Math.floor(quickViewProduct.rating) ? "fill-pink-500 text-pink-500" : "text-slate-200 dark:text-slate-700"
                            )} 
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 text-sm">({quickViewProduct.reviews} reviews)</span>
                    </div>

                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-bold text-slate-900 dark:text-white">
                        ₹{quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-slate-400 line-through">
                            ₹{quickViewProduct.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-pink-600 font-bold">({quickViewProduct.discount}% off)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Description</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {quickViewProduct.description}. Experience premium quality and cutting-edge performance with the latest {quickViewProduct.brand} technology.
                    </p>
                  </div>

                  {/* Color Selection */}
                  <div className="space-y-3">
                    <h3 className="font-bold">Color: <span className="font-normal text-slate-500">{selectedColor}</span></h3>
                    <div className="flex gap-3">
                      {["Black", "Silver", "White"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "px-6 py-2 rounded-xl border-2 transition-all font-medium",
                            selectedColor === color 
                              ? "border-pink-500 bg-pink-50/50 dark:bg-pink-900/10 text-pink-600" 
                              : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold">Size: <span className="font-normal text-slate-500">{selectedSize}</span></h3>
                      <div className="flex flex-wrap gap-3">
                        {quickViewProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "px-6 py-2 rounded-xl border-2 transition-all font-medium",
                              selectedSize === size 
                                ? "border-pink-500 bg-pink-50/50 dark:bg-pink-900/10 text-pink-600" 
                                : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Add to Cart */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-950 rounded-xl p-1 border border-slate-100 dark:border-slate-800">
                      <button 
                        onClick={() => setQuickViewQuantity(Math.max(1, quickViewQuantity - 1))}
                        className="p-3 hover:text-pink-600 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quickViewQuantity}</span>
                      <button 
                        onClick={() => setQuickViewQuantity(quickViewQuantity + 1)}
                        className="p-3 hover:text-pink-600 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <Button
                      className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-pink-600/20 border-none"
                      onClick={() => {
                        for(let i=0; i<quickViewQuantity; i++) {
                          addToCart(quickViewProduct);
                        }
                        setQuickViewProduct(null);
                      }}
                    >
                      <ShoppingCart size={22} />
                      Add to Cart
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full h-12 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => toggleWishlist(quickViewProduct)}
                  >
                    <Heart className={cn("h-5 w-5", isInWishlist(quickViewProduct.id) && "fill-pink-600 text-pink-600")} />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Bottom Section: Specifications and Reviews */}
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-slate-100 dark:border-slate-800">
                {/* Specifications */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif font-bold">Specifications</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Brand", value: quickViewProduct.brand },
                      { label: "Category", value: quickViewProduct.category },
                      { label: "Connectivity", value: "Wireless/Wired" },
                      { label: "Warranty", value: "1 Year Manufacturer" },
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between py-4 border-b border-slate-50 dark:border-slate-800 text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">{spec.label}</span>
                        <span className="text-slate-500">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif font-bold">Reviews (3)</h3>
                  <div className="space-y-8">
                    {[
                      { name: "Amit V.", date: "01/09/2023", rating: 5, text: "Absolutely stunning performance. The build quality is top-notch." },
                      { name: "Sunita G.", date: "28/08/2023", rating: 5, text: "Very comfortable and looks amazing on my desk. Highly recommended!" },
                      { name: "Karan P.", date: "25/08/2023", rating: 4, text: "Great quality, but the delivery was slightly delayed. Still worth it." },
                    ].map((review, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{review.name}</span>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j} 
                              size={12} 
                              className={cn(j < review.rating ? "fill-pink-500 text-pink-500" : "text-slate-200")} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
