import { useState } from "react";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { beautyProducts } from "@/data/beauty";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import skincare from "/a/skincare.png";

interface GroupedProducts {
  [key: string]: typeof beautyProducts;
}

const BeautyPage = () => {
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);
  const mainCategories = Array.from(
    new Set(beautyProducts.flatMap((p) => p.subcategory?.[0] || "other"))
  ).sort();

  // const filteredProducts = beautyProducts.filter((p) => p.price <= priceRange);

  const filteredProducts = beautyProducts.filter((p) => {
  const priceMatch = p.price <= priceRange;

  const categoryMatch = selectedMainCategory
    ? p.subcategory?.[0] === selectedMainCategory
    : true;

  return priceMatch && categoryMatch;
});

  // const [showMore, setShowMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const groupedBySubcategory: GroupedProducts = {};
  filteredProducts.forEach((product) => {
    const subcat = product.subcategory?.[0];
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
                inWishlist
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
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
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews || 0})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section with Skincare Image */}
      <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 border-b border-border/50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">💄</span>
                Beauty & Skincare
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover premium beauty products and skincare essentials for
                your glowing skin
              </p>
              <Badge className="text-base px-4 py-2 bg-primary text-primary-foreground mt-4">
                {filteredProducts.length} Products
              </Badge>
            </div>
            <div className="hidden lg:block">
              <img
                src={skincare}
                alt="Beauty and Skincare"
                className="rounded-xl shadow-lg w-full h-[280px]"
              />
            </div>
            {/* <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                Category
              </label>
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
                    onClick={() =>
                      setSelectedMainCategory(
                        selectedMainCategory === cat ? null : cat
                      )
                    }
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
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
          {/* old text niche wali line  */}
            {/* <div className="sticky top-20 space-y-6 bg-card p-6 rounded-xl border border-border/50"> */}
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
                  max="3000"
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
                  setPriceRange(3000);
                  setSelectedSubcategory(null);
                }}
              >
                Reset Filters
              </Button>

              {/* <div className="space-y-3">
  <label className="text-sm font-semibold text-foreground">
    Category
  </label>

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

    {(showMore ? mainCategories : mainCategories.slice(0, 4)).map((cat) => (
      <button
        key={cat}
        onClick={() =>
          setSelectedMainCategory(
            selectedMainCategory === cat ? null : cat
          )
        }
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

    {mainCategories.length > 4 && (
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-sm font-semibold text-primary hover:underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    )}
  </div>
              </div> */}


                {/* <div className="space-y-3">
  <label className="text-sm font-semibold text-foreground">
    Category
  </label>

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

    {(showMore ? mainCategories : mainCategories.slice(0, 4)).map((cat) => (
      <button
        key={cat}
        onClick={() =>
          setSelectedMainCategory(
            selectedMainCategory === cat ? null : cat
          )
        }
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

    {mainCategories.length > 4 && (
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-sm font-semibold text-primary hover:underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    )}
  </div>
                </div> */}

    
              <div className="space-y-3">
  <label className="  text-lg font-[1000]  text-foreground text-pink-400
 hover:underline  underline decoration-2 underline underline-offset-4">
    Category
  </label>

  {/* Scrollable Category List */}
  {/* this is old line  */}
  {/* <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 border border-border/40 rounded-md p-2"> */}
  {/* this one is new line  */}
  <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 border border-border/40 rounded-md p-2 scrollbar-hide">

  {/* <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 border border-border/40 rounded-md p-2 scrollbar-light"> */}

    {/* <button
      onClick={() => setSelectedMainCategory(null)}
      className={cn(
        "w-full px-3 py-2 rounded border text-sm font-medium transition-all text-left",
        !selectedMainCategory
          ? "border-primary bg-primary/10 text-primary"
          : "border-border/50 text-foreground hover:border-primary/50"
      )}
    >
      All Categories
    </button> */}

    {(showMore ? mainCategories : mainCategories.slice(0, 4)).map((cat) => (
      <button
        key={cat}
        onClick={() =>
          setSelectedMainCategory(
            selectedMainCategory === cat ? null : cat
          )
        }
        className={cn(
          "w-full px-3 py-2  text-sm font-medium transition-all text-left capitalize",
          selectedMainCategory === cat
            ? "border-primary bg-primary/10 text-primary"
            : "border-border/50 text-foreground hover:border-primary/50"
        )}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* Show More / Less Button */}
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

          {/* subcategories  */}

          {/* Products Grid */}
          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedBySubcategory).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No products found with the selected filters.
                </p>
              </div>
            ) : (
              Object.entries(groupedBySubcategory).map(
                ([subcategory, products]) => (
                  <div key={subcategory} className="space-y-4">
                    {/* Subcategory Header */}
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/30">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                        {subcategory.replace(/([A-Z])/g, " $1").trim()}
                      </h2>
                      <Badge className="bg-primary/20 text-primary">
                        {products.length}
                      </Badge>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {products.map((product) => renderProductCard(product))}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground mt-16 py-8">
        <div className="container text-center space-y-3">
          <h3 className="text-3xl font-bold">Premium Beauty Products</h3>
          <p className="text-lg opacity-90">
            Get 20% off on your first beauty purchase with code BEAUTY20
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BeautyPage;
