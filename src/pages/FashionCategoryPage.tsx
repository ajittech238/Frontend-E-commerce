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
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categoryMap: Record<string, string> = {
    men: "Men",
    women: "Women",
    kids: "Kids",
  };

  const categoryImage: Record<string, string> = {
    men: "/a/menslogo.png",
    women: "/a/womenlogo1.png",
    kids: "/a/kidslogo.png",
  };

  type Category = "Men" | "Women" | "Kids";

  const badgeBgMap: Record<Category, string> = {
    Women: "bg-[#9d4855d1]",
    Men: "bg-[#A89968]",
    Kids: "bg-[#436191]",
  };

  const buttonGradientMap: Record<Category, string> = {
    Women:
      "bg-gradient-to-r from-[#f16878] to-[#ed9aa2cf] hover:from-[#ed9aa2cf] hover:to-[#f16878]",
    Men: "bg-gradient-to-r from-[#cfc1a2] to-[#a08d63] hover:from-[#a08d63] hover:to-[#cfc1a2]",
    Kids: "bg-gradient-to-r from-[#436191] to-[#274060] hover:from-[#274060] hover:to-[#436191]",
  };

  const discountBgMap: Record<Category, string> = {
    Women: "bg-[#ac5662]",
    Men: "bg-[#4b5563]",
    Kids: "bg-[#436191]",
  };

  const categoryName = categoryMap[type || "men"];
  const categoryEmoj = categoryImage[type || "men"];

  const filteredProducts = fashionProducts
    .filter(
      (p) => p.subcategory?.includes(type || "men") && p.price <= priceRange
    )
    .slice(0, 8);

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

  const renderQuickViewModal = () => {
    if (!showModal || !selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <div className="sticky top-0 flex justify-end p-4 bg-white dark:bg-slate-900 border-b border-border/20">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => {
                setShowModal(false);
                setSelectedProduct(null);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="font-bold text-2xl ps-6">Product Details..</h1>

          {/* Modal Content */}
          <div className="p-6 space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Product Image */}
            <div className="w-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover object-center rounded-xl"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              {/* Title */}
              <h2 className="text-xl font-bold text-foreground">
                {selectedProduct.name}
              </h2>

              {/* Description */}
              <p className="text-[15px] text-gray-600">
                {selectedProduct.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-lg",
                        i < Math.floor(selectedProduct.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({selectedProduct.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-[15px] font-bold text-foreground">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-[15px] text-muted-foreground line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                {selectedProduct.discount && (
                  <span className="text-sm font-bold text-green-600">
                    Save {selectedProduct.discount}%
                  </span>
                )}
              </div>

              {/* Sizes */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-foreground">
                    Available Sizes:
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size: string) => (
                      <button
                        key={size}
                        className="text-[12px] px-2 border border-border/50 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Badge */}
              {selectedProduct.badge && (
                <div className="inline-block bg-[#c9ae80] text-white text-sm font-bold px-3 py-1 rounded-lg">
                  {selectedProduct.badge}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 ">
                <Button
                  className={`flex-1 text-primary-foreground font-semibold text-base h-10
            ${buttonGradientMap[categoryName as Category]}
            transition-all duration-300 hover:shadow-lg`}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setShowModal(false);
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-lg hover:scale-110 transition-transform"
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isInWishlist(selectedProduct.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductCard = (product: any) => {
    console.log(product);
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30 w-full">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Wishlist Button */}
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

          {/* Quick View Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-14 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
            onClick={() => {
              setSelectedProduct(product);
              setShowModal(true);
            }}
          >
            <Eye className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>

          {/* Discount Badge */}
          {product.discount && (
            <div
              className={`absolute top-3 left-3 text-white text-xs font-bold
      px-2.5 py-1 rounded-lg
      ${discountBgMap[categoryName as Category] || "bg-gray-600"}
    `}
            >
              -{product.discount}%
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-[#c9ae80] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl text-[#4b4532] font-bold  text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Description... */}
          <div>
            <p className="text-md font-semibold text-gray-600 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating */}
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

          {/* Price */}
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

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  className="text-xs border border-border/50 rounded px-2 py-1 hover:border-primary hover:text-primary transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className={`w-full mt-auto text-primary-foreground font-semibold text-sm
    ${buttonGradientMap[categoryName as Category]}
    transition-all duration-300 hover:shadow-lg`}
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
      {/* Header Banner */}
      {/* <div className="bg-[#EDE8D0]  border-b border-border/50 py-8"> */}
      <div
        className={
          categoryName === "Women"
            ? "bg-gradient-to-r from-[#ed9aa2cf] to-[#ed7a83cf] border-b border-border/50 py-5"
            : categoryName === "Men"
            ? "bg-[#EDE8D0] border-b border-border/50 py-8"
            : categoryName === "Kids"
            ? "bg-gradient-to-r from-[#e3dbd9] to-[#b8bab8] border-b border-border/50 py-8"
            : "bg-[#EDE8D0] border-b border-border/50 py-8"
        }
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-600 flex items-center gap-3">
                <img
                  src={categoryEmoj}
                  alt={categoryName}
                  className="h-15 w-20 object-container text-[#A89968]"
                />
                {categoryName}'s Fashion
              </h1>
              <p className=" text-gray-500 mt-2 text-lg ">
                Discover the latest trends in {categoryName?.toLowerCase()}'s
                fashion
              </p>
            </div>
            <Badge
              className={cn(
                "text-base px-4 py-2 text-primary-foreground transition-all duration-300 hover:shadow-xl hover:scale-105",
                badgeBgMap[categoryName as Category] ?? "bg-[#A89968]",
                categoryName === "Women"
                  ? "hover:bg-[#9d4855]"
                  : categoryName === "Men"
                  ? "hover:bg-[#92845a]"
                  : categoryName === "Kids"
                  ? "hover:bg-[#324a73]"
                  : "hover:bg-[#92845a]"
              )}
            >
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="sticky top-20"> */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-0 h-[calc(100vh-120px)] flex flex-col bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
              <div className="flex-grow overflow-y-auto scrollbar-hide p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h3>
                </div>

                {/* Price Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">
                    Price Range
                  </label>
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
                {/* { type === "men" && ( */}
                <div className="space-y-3">
                  <label className="text-m font-semibold text-foreground">
                    Category....
                  </label>

                  {!showMoreCategories && (
                    <div className="space-y-3">
                      {[
                        "👕 Clothing",
                        "👟 Footwear",
                        "🧥 Winter Wear",
                        "🕶️ Accessories",
                      ].map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setSelectedSize(selectedSize === size ? null : size)
                          }
                          className={cn(
                            "w-full px-3 py-1 rounded border text-m font-semibold transition-all",
                            selectedSize === size
                              ? categoryName === "Women"
                                ? "border-[#9d4855] bg-[#9d4855]/10 text-[#9d4855]"
                                : categoryName === "Men"
                                ? "border-[#A89968] bg-[#A89968]/10 text-[#A89968]"
                                : categoryName === "Kids"
                                ? "border-[#436191] bg-[#436191]/10 text-[#436191]"
                                : "border-primary bg-primary/10 text-primary"
                              : "border-border/50 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  {showMoreCategories && (
                    <div className="space-y-3 text-start">
                      {[
                        "👕 Clothing",
                        "👟 Footwear",
                        "🧥 Winter Wear",
                        "🕶️ Accessories",
                        "🏋️ Sports & Activewear",
                        "🧦 Innerwear & Sleepwear",
                        "👜 Bags",
                        "👖 Jeans",
                        "⌚ Watches",
                      ].map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setSelectedSize(selectedSize === size ? null : size)
                          }
                          className={cn(
                            "w-full px-3 py-2 rounded border text-sm font-semibold transition-all",
                            "flex items-center justify-start text-left", // 🔥 FIX
                            selectedSize === size
                              ? categoryName === "Women"
                                ? "border-[#9d4855] bg-[#9d4855]/10 text-[#9d4855]"
                                : categoryName === "Men"
                                ? "border-[#A89968] bg-[#A89968]/10 text-[#A89968]"
                                : categoryName === "Kids"
                                ? "border-[#436191] bg-[#436191]/10 text-[#436191]"
                                : "border-primary bg-primary/10 text-primary"
                              : "border-border/50 text-foreground duration-300 hover:scale-105 hover:shadow-lg"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className={cn(
                      "w-full text-white transition-all duration-300 hover:shadow-xl hover:scale-105",
                      categoryName === "Women"
                        ? "bg-[#9d4855d1] hover:bg-[#9d4855]"
                        : categoryName === "Men"
                        ? "bg-[#A89968] hover:bg-[#92845a]"
                        : categoryName === "Kids"
                        ? "bg-[#436191] hover:bg-[#324a73]"
                        : "bg-[#A89968] hover:bg-[#92845a]"
                    )}
                    onClick={() => setShowMoreCategories(!showMoreCategories)}
                  >
                    {showMoreCategories ? "Show Less" : "Show More.."}
                  </Button>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className="lg:col-span-4 space-y-12 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide rounded-lg"
            style={{
              backgroundImage: 'url("/a/fashion-bg.jpg")',
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
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
      {/* </div> */}

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground mt-16 py-8">
        <div className="container text-center space-y-3">
          <h3 className="text-3xl font-bold">Enjoy Free Shipping!</h3>
          <p className="text-lg opacity-90">On all orders over ₹999</p>
        </div>
      </div>

      <Footer />

      {/* Quick View Modal */}
      {renderQuickViewModal()}
    </div>
  );
};

export default FashionCategoryPage;
