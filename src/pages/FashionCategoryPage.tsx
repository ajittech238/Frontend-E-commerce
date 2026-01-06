import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, ChevronDown, Filter, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fashionProducts } from "@/data/fashion";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HiTruck } from "react-icons/hi";

interface GroupedProducts {
  [key: string]: typeof fashionProducts;
}

const FashionCategoryPage = () => {
  const { type } = useParams<{ type: "men" | "women" | "kids" }>();
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const renderProductCard = (product: Product) => {
    console.log(product);
    const inWishlist = isInWishlist(product.id);

    return (
      <div
        key={product.id}
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-pink-500/50 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowModal(true);
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Eye className="h-6 w-6 text-pink-500" />
            </div>
          </button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg dark:bg-slate-900/80 hover:scale-110 transition-transform duration-300 z-10"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
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

          {/* Add to Cart Button - Show on Hover */}
          <div className="absolute bottom-3 left-3 right-3 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <Button
              className={`w-full text-primary-foreground font-semibold text-sm
      ${buttonGradientMap[categoryName as Category]}
      transition-all duration-300 hover:shadow-lg`}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Description... */}
          <div>
            <p className="text-md font-semibold text-gray-600 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-xs",
                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <button
                  key={size}
                  className="text-xs border border-border/50 rounded-lg px-2 py-1 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-all duration-300"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">{categoryEmoj}</span>
                {categoryName}'s Fashion
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover the latest trends in {categoryName?.toLowerCase()}'s fashion
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-primary text-primary-foreground">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
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
              {type === "men" && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Size</label>
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={cn(
                          "w-full px-3 py-2 rounded border text-sm font-medium transition-all",
                          selectedSize === size
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 text-foreground hover:border-primary/50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(10000);
                  setSelectedSize(null);
                }}
              >
                Reset Filters
              </Button>
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
                  {/* Subcategory Header */}
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                      {subcategory.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <Badge className="bg-primary/20 text-primary">{products.length}</Badge>
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
            <h3 className="text-3xl font-bold">Enjoy Free Shipping!</h3>
            <p className="text-lg opacity-90">On all orders over ₹999</p>
          </div>
        </div>

      {renderQuickViewModal()}
      <Footer />
    </div>
  );
};

export default FashionCategoryPage;
