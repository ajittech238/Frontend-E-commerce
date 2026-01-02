import { useState } from "react";
import { Heart, ShoppingCart, Filter, Eye, X, Minus, Plus, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { beautyProducts } from "@/data/Jewellery";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import skincaren from "/a/skincaren.png";
import skincare2 from "/a/skincare2.png";
import beautylogo from "/a/beautylogo.png";

interface GroupedProducts {
  [key: string]: typeof beautyProducts;
}

const JewelleryPage = () => {
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Default");
  const [selectedSize, setSelectedSize] = useState("");
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

  const renderProductCard = (product: (typeof beautyProducts)[0]) => {
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

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
              onClick={() => {
                setSelectedProductModal(product);
                setModalQuantity(1);
                setSelectedSize(product.sizes?.[0] || "");
              }}
            >
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
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
          </div>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </div>
          )}

          <Button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
            {product.description && (
             <div className="text-sm text-muted-foreground line-clamp-1">
              {product.description}
             </div>
          )}
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-xs",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
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

          {/* {product.description && (
             <div className="text-sm text-muted-foreground line-clamp-1">
              {product.description}
             </div>
          )} */}
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
                <span className="text-5xl">
                  <img src={beautylogo} alt="" width={70} height={70} />
                </span>
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
                src={skincaren}
                alt="Beauty and Skincare"
                className="rounded-xl shadow-lg w-full h-[280px]"
              />
            </div>
            <div className="block lg:hidden">
              <img
                src={skincare2}
                alt="Beauty and Skincare"
                className="rounded-xl shadow-lg w-full h-[220px]"
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

              <div className="space-y-3">
                <label
                  className="  text-lg font-[1000]  text-foreground text-pink-400
 hover:underline   decoration-2  underline-offset-4"
                >
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

                  {(showMore ? mainCategories : mainCategories.slice(0, 4)).map(
                    (cat) => (
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
                    )
                  )}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

      {selectedProductModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                {selectedProductModal.name}
              </h2>
              <button
                onClick={() => setSelectedProductModal(null)}
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
                      src={selectedProductModal.image}
                      alt={selectedProductModal.name}
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
                        <img src={selectedProductModal.image} alt="" className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium">
                      <Zap size={18} className="fill-amber-500" />
                      <span>Only 5 left in stock!</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={20} 
                            className={cn(
                              i < Math.floor(selectedProductModal.rating) ? "fill-pink-500 text-pink-500" : "text-slate-200 dark:text-slate-700"
                            )} 
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 text-sm">({selectedProductModal.reviews} reviews)</span>
                    </div>

                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-bold text-slate-900 dark:text-white">
                        ₹{selectedProductModal.price.toLocaleString()}
                      </span>
                      {selectedProductModal.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-slate-400 line-through">
                            ₹{selectedProductModal.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-pink-600 font-bold">({selectedProductModal.discount}% off)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Description</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedProductModal.description || "Premium quality product designed for your needs. Experience the best in beauty and luxury."}
                    </p>
                  </div>

                  {/* Size Selection */}
                  {selectedProductModal.sizes && selectedProductModal.sizes.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold">Option: <span className="font-normal text-slate-500">{selectedSize}</span></h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProductModal.sizes.map((size) => (
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
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="p-3 hover:text-pink-600 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{modalQuantity}</span>
                      <button 
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="p-3 hover:text-pink-600 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <Button
                      className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-pink-600/20 border-none"
                      onClick={() => {
                        for(let i=0; i<modalQuantity; i++) {
                          addToCart(selectedProductModal);
                        }
                        setSelectedProductModal(null);
                      }}
                    >
                      <ShoppingCart size={22} />
                      Add to Cart
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full h-12 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => toggleWishlist(selectedProductModal)}
                  >
                    <Heart className={cn("h-5 w-5", isInWishlist(selectedProductModal.id) && "fill-pink-600 text-pink-600")} />
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
                      { label: "Category", value: selectedProductModal.category },
                      { label: "Type", value: selectedProductModal.subcategory?.[0] || "Premium" },
                      { label: "Origin", value: "Imported" },
                      { label: "Warranty", value: "Authenticity Guaranteed" },
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
                      { name: "Amit V.", date: "01/09/2023", rating: 5, text: "Excellent quality and packaging. Highly recommended!" },
                      { name: "Sunita G.", date: "28/08/2023", rating: 5, text: "Absolutely loved it. The results are amazing." },
                      { name: "Karan P.", date: "25/08/2023", rating: 4, text: "Great product, slightly late delivery but the quality is worth it." },
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

      <Footer />
    </div>
  );
};

export default JewelleryPage;
