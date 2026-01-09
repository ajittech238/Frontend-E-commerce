import { useState } from "react";
import { Filter, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jewelleryCategories, jewelleryProducts } from "@/data/Jewellery";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";

interface GroupedProducts {
  [key: string]: typeof jewelleryProducts;
}

const JewelleryPage = () => {
  const [priceRange, setPriceRange] = useState(500000);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const mainCategories = jewelleryCategories.map(category => category.name);

  const filteredProducts = jewelleryProducts.filter((p) => {
    const priceMatch = p.price <= priceRange;
    const categoryMatch = selectedMainCategory
      ? jewelleryCategories.find(c => c.name === selectedMainCategory)?.id === p.subCategoryId
      : true;
    return priceMatch && categoryMatch;
  });

  const groupedBySubcategory: GroupedProducts = {};
  filteredProducts.forEach((product) => {
    const subcat = jewelleryCategories.find(c => c.id === product.subCategoryId)?.name;
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-100/50 to-amber-100/50 border-b border-border/50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <Gem className="h-10 w-10 text-yellow-600" />
                Exquisite Jewellery
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover our stunning collection of fine jewellery.
              </p>
              <Badge className="text-base px-4 py-2 bg-primary text-primary-foreground mt-4">
                {filteredProducts.length} Products
              </Badge>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://i.pinimg.com/736x/7c/38/7f/7c387fc9653e32d07d4175308a3f18d3.jpg"
                alt="Jewellery"
                className="rounded-xl shadow-lg w-full h-[280px] object-cover"
              />
            </div>
            <div className="block lg:hidden">
              <img
                src="https://i.pinimg.com/736x/59/83/e5/5983e51a49f2bd629f6e1e3a493e132d.jpg"
                alt="Jewellery"
                className="rounded-xl shadow-lg w-full h-[220px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[85vh] overflow-y-auto space-y-6 bg-card p-6 rounded-xl border border-border/50 scrollbar-hide">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
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

              <div className="space-y-3">
                <label className="text-lg font-[1000] text-foreground text-pink-400 hover:underline decoration-2 underline-offset-4">
                  Category
                </label>

                <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 border border-border/40 rounded-md p-2 scrollbar-hide">
                  {(showMore ? mainCategories : mainCategories.slice(0, 4)).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedMainCategory(selectedMainCategory === cat ? null : cat)}
                      className={cn(
                        "w-full px-3 py-2 text-sm font-medium transition-all text-left capitalize",
                        selectedMainCategory === cat
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 text-foreground hover:border-primary/50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {mainCategories.length > 4 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedBySubcategory).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No products found with the selected filters.
                </p>
              </div>
            ) : (
              Object.entries(groupedBySubcategory).map(([subcategory, products]) => (
                <div key={subcategory} className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                      {subcategory.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <Badge className="bg-primary/20 text-primary">
                      {products.length}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
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
          <h3 className="text-3xl font-bold">Premium Jewellery</h3>
          <p className="text-lg opacity-90">
            Get 20% off on your first purchase with code JEWEL20
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JewelleryPage;