import { useState, useRef } from "react";
import { Heart, ShoppingCart, Filter, Eye, X, Truck, Shield, RotateCcw, Star, ChevronRight, ChevronLeft, Smartphone, Laptop, Tv, Headphones, Watch, Zap, Package, Check, Tablet, Camera, Speaker, Monitor, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { electronicsProducts } from "@/data/electronics";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ElectronicsPage = () => {
  const [priceRange, setPriceRange] = useState([10000, 500000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [quickViewProduct, setQuickViewProduct] = useState<typeof electronicsProducts[0] | null>(null);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
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

  const brands = Array.from(new Set(electronicsProducts.map((p) => p.brand))).filter(Boolean);

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

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      {/* hello */}
      <div className="relative w-full overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-indigo-600/20 dark:to-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />

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

        {/* Floating Icons Animation */}
        <div className="relative h-32 md:h-40 flex items-center justify-center gap-12 mt-8 mb-8">
          {[Smartphone, Laptop, Headphones].map((Icon, idx) => (
            <div
              key={idx}
              className="text-purple-500/30 dark:text-purple-400/40 hover:text-purple-500/60 dark:hover:text-purple-400/80 transition-all duration-300"
              style={{
                animation: `float ${3 + idx * 0.5}s ease-in-out infinite`,
              }}
            >
              <Icon size={40} />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-purple-500/20 py-4">
        <div className="mx-auto px-4 text-center">
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            Expertly Curated Tech Selection
          </p>
        </div>
      </div>

      <div ref={productsSectionRef} className="flex min-h-screen">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:flex w-80 flex-col bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200 dark:border-purple-500/20 p-6 gap-8 overflow-y-auto sticky top-32 h-[calc(100vh-8rem)] custom-scrollbar">
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Filter size={22} className="text-purple-600 dark:text-purple-400" />
              Explore Gear
            </h3>
          </div>

          {/* Categories / Subcategories */}
          <div>
            <label className="text-slate-900 dark:text-white font-bold text-sm mb-4 block uppercase tracking-wider">Categories</label>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300",
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                        : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
                    )}
                  >
                    <Icon size={18} className={cn(isSelected ? "text-white" : "text-slate-400")} />
                    {cat.name}
                    {isSelected && <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-slate-900 dark:text-white font-bold text-sm mb-4 block uppercase tracking-wider">Price Range</label>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 space-y-4 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-purple-600 dark:text-purple-400 font-bold text-lg">
                <span>₹{(priceRange[0] / 1000).toFixed(0)}k</span>
                <span>₹{(priceRange[1] / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
                Showing gear up to {formatPrice(priceRange[1])}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="text-slate-900 dark:text-white font-bold text-sm mb-4 block uppercase tracking-wider">Top Brands</label>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
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
                    "w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between group",
                    selectedBrands.includes(brand)
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                      : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  )}
                >
                  <span>{brand}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                    selectedBrands.includes(brand) ? "bg-purple-600 border-purple-600" : "border-slate-300 dark:border-slate-700 group-hover:border-purple-400"
                  )}>
                    {selectedBrands.includes(brand) && <Check size={12} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-slate-700 dark:text-gray-300 font-semibold text-sm mb-3 block">Min Rating</label>
            <div className="space-y-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2",
                    minRating === rating
                      ? "bg-purple-100 dark:bg-purple-600/30 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500"
                      : "bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                  )}
                >
                  {rating === 0 ? "All Products" : (
                    <div className="flex items-center gap-1">
                      {rating} <Star size={12} className="fill-amber-400 text-amber-400" /> & Above
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setPriceRange([10000, 500000]);
              setSelectedBrands([]);
              setMinRating(0);
              setSelectedCategory(null);
            }}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-3 rounded-lg font-bold transition-all border border-slate-200 dark:border-slate-700"
          >
            Reset Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-transparent p-4 md:p-8">
          {/* Sort & View Options */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-slate-600 dark:text-gray-300 font-semibold">
                Showing <span className="text-purple-600 dark:text-purple-400">{sortedProducts.length}</span> products
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setIsFilterMobileOpen(true)}
                className="lg:hidden flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inWishlist={isInWishlist(product.id)}
                onWishlist={() => toggleWishlist(product)}
                onQuickView={() => setQuickViewProduct(product)}
                onAddCart={() => addToCart(product)}
                formatPrice={formatPrice}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Package size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No products found</p>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or category</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Filter size={20} className="text-purple-600" />
                Filters
              </h2>
              <button onClick={() => setIsFilterMobileOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Categories */}
              <div>
                <label className="text-slate-900 dark:text-white font-bold mb-4 block uppercase tracking-wider text-xs">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all border",
                        selectedCategory === cat.id
                          ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-slate-700"
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
                <label className="text-slate-900 dark:text-white font-bold mb-4 block uppercase tracking-wider text-xs">Price Range</label>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4">
                  <div className="text-purple-600 font-bold text-xl">
                    ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L
                  </div>
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

              {/* Brands */}
              <div>
                <label className="text-slate-900 dark:text-white font-bold mb-4 block">Brands</label>
                <div className="grid grid-cols-2 gap-2">
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
                        "text-left px-3 py-2 rounded-lg text-xs transition-all border",
                        selectedBrands.includes(brand)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-slate-900 dark:text-white font-bold mb-4 block">Min Rating</label>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between border",
                        minRating === rating
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <span>{rating === 0 ? "All Products" : `${rating}★ & Above`}</span>
                      {minRating === rating && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <button
                  onClick={() => setIsFilterMobileOpen(false)}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setPriceRange([10000, 500000]);
                    setSelectedBrands([]);
                    setMinRating(0);
                    setSelectedCategory(null);
                  }}
                  className="w-full text-slate-500 font-bold py-2"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-purple-500/20 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Check, title: "Original Products", desc: "100% authentic gadgets" },
            { icon: Zap, title: "Fast Delivery", desc: "Express 24h shipping" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day money back" },
            { icon: Shield, title: "Secure Payment", desc: "Encrypted transactions" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12 group-hover:scale-110">
                  <Icon size={36} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-gray-400">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          inWishlist={isInWishlist(quickViewProduct.id)}
          onWishlist={() => toggleWishlist(quickViewProduct)}
          onAddCart={() => addToCart(quickViewProduct)}
          formatPrice={formatPrice}
        />
      )}

      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: typeof electronicsProducts[0];
  inWishlist: boolean;
  onWishlist: () => void;
  onQuickView: () => void;
  onAddCart: () => void;
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  inWishlist,
  onWishlist,
  onQuickView,
  onAddCart,
  formatPrice,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Product Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/50 flex flex-col h-full"
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {/* Overlay Actions */}
          <div className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-3",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <button
              onClick={onQuickView}
              className="bg-white text-slate-900 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
              title="Quick View"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={onWishlist}
              className="bg-white text-slate-900 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
              title="Add to Wishlist"
            >
              <Heart
                size={20}
                className={inWishlist ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2 z-10">
            {product.discount && (
              <Badge className="bg-red-600 text-white border-none font-bold">
                -{product.discount}%
              </Badge>
            )}
            {product.badge && (
              <Badge className="bg-purple-600 text-white border-none font-bold">
                {product.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col gap-1">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-[9px] text-purple-600 dark:text-purple-400 uppercase font-bold tracking-widest mb-0">{product.brand}</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
            {product.badge && (
              <Badge className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 border-none text-[8px] px-1.5 py-0 shrink-0">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Specs / Details */}
          <div className="flex flex-wrap gap-1">
            {product.sizes?.slice(0, 1).map((size, idx) => (
              <span key={idx} className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1 py-0 rounded font-medium">
                {size}
              </span>
            ))}
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-50 dark:border-slate-800/50">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={8}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 dark:text-slate-700"
                    )}
                  />
                ))}
              </div>
              <span className="text-[9px] text-slate-400 font-medium">{product.rating}</span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[9px] text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Animated Add to Cart Button */}
          <div className={cn(
            "transition-all duration-300 overflow-hidden",
            isHovered ? "max-h-10 mt-1 opacity-100" : "max-h-0 opacity-0"
          )}>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddCart();
              }}
              disabled={!product.inStock}
              className={cn(
                "w-full h-8 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-purple-500/40",
                product.inStock
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              )}
            >
              <ShoppingCart size={14} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickViewModalProps {
  product: typeof electronicsProducts[0];
  onClose: () => void;
  inWishlist: boolean;
  onWishlist: () => void;
  onAddCart: () => void;
  formatPrice: (price: number) => string;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  inWishlist,
  onWishlist,
  onAddCart,
  formatPrice,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-gray-400 transition-all z-20"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8 transform transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Details */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-xs uppercase font-bold tracking-widest mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{product.name}</h1>
              {product.description && (
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 dark:text-green-400 font-bold mt-2 flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 border-none">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
                  <span>Off on this item</span>
                </p>
              )}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
              {[
                { icon: Truck, text: "Free express delivery" },
                { icon: Shield, text: "1 year manufacturer warranty" },
                { icon: RotateCcw, text: "30-day easy returns policy" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                      <Icon size={16} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  onAddCart();
                  onClose();
                }}
                disabled={!product.inStock}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={onWishlist}
                className="px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-4 rounded-xl font-bold transition-all"
              >
                <Heart size={20} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsPage;
