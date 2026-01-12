import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, Award, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils"; 
import ProductModal from "./ProductModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { HomeLivingProduct } from "@/data/Home&living";

interface ProductCardProps {
  product: any;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  
  
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      navigate(`/product/${product.id}`);
    } else {
      setIsDetailModalOpen(true);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const shortDescription = product.description
    ? `${product.description.substring(0, 80)}${product.description.length > 80 ? "..." : ""}`
    : "";

  return (
    <>
      <div
        className={cn(
          "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
          "hover:shadow-card-hover hover:border-primary/20",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          {/* Image with Link */}
          <Link to={`/product/${product.id}`} className="block h-full">
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                isHovered && "scale-105"
              )}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="badge-handmade flex items-center gap-1">
                <Award className="h-3 w-3" />
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="badge-sale bg-[#4b5563]">
                {discountPercent}% off
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-3 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border",
              "absolute top-3 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border z-10",
              isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>

          {/* Quick View (Eye) Button */}
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-14 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border z-10",
              isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"
            )}
            onClick={handleQuickViewClick}
          >
            <Eye className={cn(
                "h-4 w-4 transition-colors",
                "text-muted-foreground")}/>
          </Button>

          {/* Add to Cart Button */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0 text-center" : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            <Button
              className={cn(
                "w-full text text-sm h-10 transition-colors",
                (product.category === "mens" || product.subcategory?.includes("men")) ? "bg-[#ac9e8c] bg-gradient-to-r from-[#ac9e8c] to-[#e2d2bd] hover:from-[#e2d2bd] to-[#ac9e8c] text-white border-none" :
                (product.category === "womens" || product.subcategory?.includes("women")) ? "bg-[#ac5662] hover:bg-[#8e4651] text-white border-none" :
                (product.category === "kids" || product.subcategory?.includes("kids")) ? "bg-[#436191] hover:bg-[#364e75] text-white border-none" :
                "btn-etsy"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2.5">
          {/* Shop Name */}
          <div className="flex justify-between items-start">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {product.brand || "Premium Brand"}
            </p>
          </div>

          {/* Product Name with Link */}
          <Link to={`/product/${product.id}`} className="block mt-1.5">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem] leading-snug">
              {product.name}
            </h3>
          </Link>
         

          {/* Product size.... */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Available Sizes:
              </label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string) => (
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

          {/* Product Description - Single Line */}
          <div className="text-xs text-muted-foreground gap-1.5 leading-relaxed">
            {product.description || "High-quality product with exceptional features."}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap mt-1.5">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
            <Truck className="h-3.5 w-3.5" />
            <span>FREE delivery</span>
          </div>
        </div>
      </div>

      {/* Product Modal - Dialog for Quick View */}
      {!isMobile && (
        <ProductModal 
          product={product}
          isOpen={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      )}
    </>
  );
};

export default ProductCard;