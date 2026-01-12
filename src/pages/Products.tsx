import { useState, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";
import orangedress from "/public/a/orangedress.png";
import videoplayback from "../../public/a/videoplayback.mp4";
import restyle from "/public/a/restyle.png";
import greenshirt from "/public/a/greenshirt.png";
import whitelehnga from "/public/a/whitelehnga.png";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 350000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 350000]);
    setSortBy("featured");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-display font-bold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display font-bold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={350000}
          step={1000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* <div className="relative overflow-hidden rounded-lg shadow-lg h-[600px] mb-[80px] mt-12">
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover "
          >
            <source src={videoplayback} type="video/mp4" />
          </video>

          
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

        
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
           
            <h1 className="text-5xl text-white text-center pb-8 font-bold">
              Fashion Categories
            </h1>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
              
              <div className="flex flex-col items-center justify-center gap-4 bg-white/5    0 backdrop-blur-sm rounded-lg p-6">
                <div className="w-32 h-32">
                  <img
                    src={restyle}
                    className="object-cover w-full h-full rounded-full shadow-md"
                    alt="Fashion Category Logo"
                  />
                </div>
                <p className="text-[#3b0310] italic font-semibold text-lg text-center">
                  Fashion categories for boys, girls, and kids are designed to
                  balance style, comfort, and practicality while meeting the
                  needs of different age groups.
                </p>
              </div>

             
              <div className="flex gap-4 items-center justify-center">
           
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Girls Fashion
                  </h2>
                  <img
                    src={whitelehnga}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Girls Fashion"
                  />
                </div>

       
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Boys Fashion
                  </h2>
                  <img
                    src={greenshirt}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Boys Fashion"
                  />
                </div>

               
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Kids Fashion
                  </h2>
                  <img
                    src={orangedress}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Kids Fashion"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* ================= ULTRA LUXURY HERO SECTION ================= */}
        <section className="relative min-h-[95vh] w-full overflow-hidden rounded-[40px] mt-12 mb-28">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoplayback} type="video/mp4" />
          </video>

          {/* Dark Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Light Gradient Glow */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/30 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-400/30 blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 lg:px-20 py-20 gap-16">
            {/* LEFT – TEXT */}
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm tracking-widest mb-6">
                PREMIUM FASHION 2026
              </span>

              <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                Wear Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300">
                  Confidence
                </span>
              </h1>

              <p className="mt-8 text-lg text-white/80 leading-relaxed">
                Discover trend-setting fashion for boys, girls & kids. Designed
                for comfort. Styled for impact.
              </p>

              <div className="mt-10 flex gap-5 justify-center lg:justify-start">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:scale-105 transition">
                  Shop Collection
                </button>
                <button className="px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition">
                  Explore Trends
                </button>
              </div>
            </div>

            {/* RIGHT – FLOATING FASHION CARDS */}
            <div className="relative grid grid-cols-3 gap-8">
              {/* Girls */}
              <div className="relative translate-y-10 hover:-translate-y-2 transition duration-500">
                <img
                  src={whitelehnga}
                  className="w-[220px] h-[320px] object-cover rounded-[30px] shadow-2xl border border-white/20"
                />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold">
                  Girls
                </p>
              </div>

              {/* Boys */}
              <div className="relative -translate-y-6 hover:-translate-y-12 transition duration-500">
                <img
                  src={greenshirt}
                  className="w-[240px] h-[360px] object-cover rounded-[30px] shadow-2xl border border-white/20"
                />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold">
                  Boys
                </p>
              </div>

              {/* Kids */}
              <div className="relative translate-y-16 hover:translate-y-6 transition duration-500">
                <img
                  src={orangedress}
                  className="w-[220px] h-[320px] object-cover rounded-[30px] shadow-2xl border border-white/20"
                />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold">
                  Kids
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategories.length === 1
                ? categories.find((c) => c.id === selectedCategories[0])?.name
                : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden md:flex items-center border border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === "grid" && "bg-accent text-accent-foreground"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === "list" && "bg-accent text-accent-foreground"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 350000) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {selectedCategories.map((catId) => (
              <Button
                key={catId}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => toggleCategory(catId)}
              >
                {categories.find((c) => c.id === catId)?.name}
                <X className="h-3 w-3 ml-1" />
              </Button>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 350000) && (
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPriceRange([0, 350000])}
              >
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Products;
