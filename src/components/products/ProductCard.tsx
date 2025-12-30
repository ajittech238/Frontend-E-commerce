// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart, Star, Truck, Award, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { cn } from "@/lib/utils"; 
// import ProductModal from "./ProductModal";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { HomeLivingProduct } from "@/data/Home&living";

// interface ProductCardProps {
//   product: HomeLivingProduct;
//   index?: number;
// }

// const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
//   const { addToCart } = useCart();
//   const { isInWishlist, toggleWishlist } = useWishlist();
//   const inWishlist = isInWishlist(product.id);
  
//   const isMobile = useIsMobile();
//   const navigate = useNavigate();

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const handleQuickViewClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isMobile) {
//       navigate(`/product/${product.id}`);
//     } else {
//       setIsDetailModalOpen(true);
//     }
//   };

//   const discountPercent = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   const shortDescription = product.description
//     ? `${product.description.substring(0, 80)}${product.description.length > 80 ? "..." : ""}`
//     : "";

//   return (
//     <>
//       <div
//         className={cn(
//           "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
//           "hover:shadow-card-hover hover:border-primary/20",
//           "animate-fade-in opacity-0"
//         )}
//         style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="relative aspect-square overflow-hidden bg-secondary/30">
//           <Link to={`/product/${product.id}`} className="block h-full">
//             <img
//               src={product.image}
//               alt={product.name}
//               className={cn(
//                 "w-full h-full object-cover transition-transform duration-500",
//                 isHovered && "scale-105"
//               )}
//             />
//           </Link>

//           <div className="absolute top-3 left-3 flex flex-col gap-2">
//             {product.badge && (
//               <span className="badge-handmade flex items-center gap-1">
//                 <Award className="h-3 w-3" />
//                 {product.badge}
//               </span>
//             )}
//             {discountPercent > 0 && (
//               <span className="badge-sale">
//                 {discountPercent}% off
//               </span>
//             )}
//           </div>

//           <Button
//             size="icon"
//             variant="ghost"
//             className={cn(
//               "absolute top-3 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border",
//               isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"
//             )}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               toggleWishlist(product);
//             }}
//           >
//             <Heart
//               className={cn(
//                 "h-4 w-4 transition-colors",
//                 inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
//               )}
//             />
//           </Button>

//           <Button
//             size="icon"
//             variant="ghost"
//             className={cn(
//               "absolute top-14 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border",
//               isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"
//             )}
//             onClick={handleQuickViewClick}
//           >
//             <Eye className={cn(
//                 "h-4 w-4 transition-colors",
//                 "text-muted-foreground")}/>
//           </Button>

//           <div
//             className={cn(
//               "absolute bottom-3 left-3 right-3 transition-all duration-300",
//               isHovered ? "opacity-100 translate-y-0 text-center" : "opacity-0 translate-y-4 pointer-events-none"
//             )}
//           >
//             <Button
//               className="w-auto text btn-etsy text-sm h-10"
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 addToCart(product);
//               }}
//             >
//               <ShoppingCart className="h-4 w-4 mr-2" />
//               Add to Cart
//             </Button>
//           </div>
//         </div>

//         <div className="p-4">
//           <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
//             Artisan Shop
//           </p>

//           <Link to={`/product/${product.id}`} className="block mt-1.5">
//             <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem] leading-snug">
//               {product.name}
//             </h3>
//           </Link>

//           {shortDescription && (
//             <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-0.5">
//               {shortDescription}
//             </p>
//           )}

//           <div className="flex items-center gap-1.5 mt-1.5">
//             <div className="flex items-center gap-0.5">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={cn(
//                     "h-3 w-3",
//                     i < Math.floor(product.rating)
//                       ? "fill-primary text-primary"
//                       : "text-muted-foreground"
//                   )}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
//           </div>

//           <div className="flex items-baseline gap-2 flex-wrap mt-1.5">
//             <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
//             {product.originalPrice && (
//               <span className="text-sm text-muted-foreground line-through">
//                 {formatPrice(product.originalPrice)}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-1.5 text-xs text-accent font-medium mt-1.5">
//             <Truck className="h-3.5 w-3.5" />
//             <span>FREE delivery</span>
//           </div>
//         </div>
//       </div>
//       {!isMobile && isDetailModalOpen && <ProductModal 
//         product={product}
//         isOpen={isDetailModalOpen}
//         onOpenChange={setIsDetailModalOpen}
//       />}
//     </>
//   );
// };

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
  product: HomeLivingProduct;
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

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const shortDescription = product.description
    ? `${product.description.substring(0, 80)}${product.description.length > 80 ? "..." : ""}`
    : "";

  return (
    
      <div
        className={cn(
          "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 cursor-pointer",
          "hover:shadow-card-hover hover:border-primary/20",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="badge-handmade flex items-center gap-1">
                <Award className="h-3 w-3" />
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="badge-sale">
                {discountPercent}% off
              </span>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-3 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border",
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

          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-14 right-3 rounded-full h-9 w-9 bg-card/90 hover:bg-card shadow-sm transition-all border border-border",
              isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"
            )}
            onClick={handleQuickViewClick}
          >
            <Eye className={cn(
                "h-4 w-4 transition-colors",
                "text-muted-foreground")}/>
          </Button>

          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0 text-center" : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            <Button
              className="w-auto text btn-etsy text-sm h-10"
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

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Shop Name */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Artisan Shop
        </p>

          <div className="block mt-1.5">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem] leading-snug">
              {product.name}
            </h3>
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
  );
};

export default ProductCard;