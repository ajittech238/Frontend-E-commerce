// import { Product, CartItem } from "@/types/product";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Star,
//   ShoppingCart,
//   Heart,
//   Minus,
//   Plus,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import React, { useEffect, useState, useMemo, useRef } from "react";

// interface ProductModalProps {
//   product: Product;
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
// }

// // Sub-component for the sticky mobile action bar
// const StickyMobileActions = ({ price, onAddToCart, disabled }: { price: string, onAddToCart: () => void, disabled: boolean }) => (
//   <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 shadow-lg z-50">
//     <div className="flex items-center justify-between gap-4">
//       <div className="flex flex-col">
//         <span className="text-xs text-muted-foreground">Price</span>
//         <span className="font-bold text-lg">{price}</span>
//       </div>
//       <Button 
//         size="lg" 
//         className="flex-1 bg-[#e91e63] hover:bg-[#d81b60] text-white" 
//         onClick={onAddToCart} 
//         disabled={disabled}
//       >
//         <ShoppingCart className="h-5 w-5 mr-2" />
//         {disabled ? "Out of Stock" : "Add to Cart"}
//       </Button>
//     </div>
//   </div>
// );

// const MAGNIFIER_SIZE = 150;

// export default function ProductModal({
//   product,
//   isOpen,
//   onOpenChange,
// }: ProductModalProps) {
//   const { addToCart } = useCart();
//   const { isInWishlist, toggleWishlist } = useWishlist();

//   const [selectedImage, setSelectedImage] = useState(product.image);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

//   const inWishlist = isInWishlist(product.id);

//   const imgRef = useRef<HTMLImageElement>(null);
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

//   // Effect to reset state when modal opens or product changes
//   useEffect(() => {
//     if (isOpen) {
//       setSelectedImage(product.image);
//       setQuantity(1);
//       const initialVariants: { [key: string]: string } = {};
//       product.variants?.forEach(variant => {
//         if (variant.options.length > 0) {
//           initialVariants[variant.name] = variant.options[0].value;
//         }
//       });
//       setSelectedVariants(initialVariants);
//     }
//   }, [isOpen, product]);
  
//   const handleVariantSelect = (variantName: string, value: string) => {
//     setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
//     setQuantity(1);
//   };

//   const dynamicPrice = useMemo(() => {
//     let finalPrice = product.price;
//     product.variants?.forEach(variant => {
//       const selectedOptionValue = selectedVariants[variant.name];
//       const selectedOption = variant.options.find(opt => opt.value === selectedOptionValue);
//       if (selectedOption?.priceModifier) {
//         finalPrice += selectedOption.priceModifier;
//       }
//     });
//     return finalPrice;
//   }, [product, selectedVariants]);

//   const effectiveStock = useMemo(() => {
//     if (!product.variants || product.variants.length === 0) {
//       return product.stock ?? (product.inStock ? 10 : 0);
//     }
    
//     let currentStock = Infinity;
//     product.variants.forEach(variant => {
//       const selectedOptionValue = selectedVariants[variant.name];
//       const selectedOption = variant.options.find(opt => opt.value === selectedOptionValue);
//       if (selectedOption) {
//         currentStock = Math.min(currentStock, selectedOption.stock);
//       }
//     });
    
//     return currentStock === Infinity ? 0 : currentStock;
//   }, [product, selectedVariants]);

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);

//   if (!product) return null;

//   const imageGallery = [product.image, ...(product.images360 || [])].filter(
//     Boolean
//   );

//   const discountPercent = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - dynamicPrice) / product.originalPrice) * 100
//       )
//     : 0;

//   const handleAddToCart = () => {
//     addToCart({ ...product, quantity } as CartItem); 
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!imgRef.current) return;
//     const rect = imgRef.current.getBoundingClientRect();
//     setMagnifierPosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   const StockStatus = () => {
//     if (effectiveStock <= 0) {
//       return (
//         <span className="text-red-600 font-medium flex items-center gap-1">
//           <XCircle className="h-4 w-4" />
//           Out of Stock
//         </span>
//       );
//     }
//     if (effectiveStock < 10) {
//       return (
//         <span className="text-[#d4a017] font-medium flex items-center gap-1">
//           <CheckCircle className="h-4 w-4" />
//           Only {effectiveStock} left!
//         </span>
//       );
//     }
//     return (
//       <span className="text-green-600 font-medium flex items-center gap-1">
//         <CheckCircle className="h-4 w-4" />
//         In Stock
//       </span>
//     );
//   };

//   // Mock specifications if not present (for books)
//   const displaySpecs = product.specifications || (product.author ? [
//     { name: "Author", value: product.author },
//     { name: "Publisher", value: product.publisher || "N/A" },
//     { name: "Pages", value: product.pages?.toString() || "N/A" },
//     { name: "Language", value: product.language || "English" },
//   ] : []);

//   // Mock reviews if not present
//   const displayReviews = product.detailedReviews || [
//     { id: "r1", author: "Amit V.", rating: 5, comment: "Absolutely stunning. High quality and exactly as described.", date: "2023-09-01" },
//     { id: "r2", author: "Sunita G.", rating: 5, comment: "Very comfortable and looks amazing. Highly recommended!", date: "2023-08-28" },
//     { id: "r3", author: "Karan P.", rating: 4, comment: "Great quality, but the delivery was slightly delayed.", date: "2023-08-25" },
//   ];

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-3xl lg:max-w-5xl w-full p-0 flex flex-col max-h-[90vh] overflow-hidden">
//         <DialogHeader className="p-6 pb-2 border-b flex flex-row items-center justify-between">
//           <DialogTitle className="text-2xl font-serif font-bold leading-tight">
//             {product.name}
//           </DialogTitle>
//         </DialogHeader>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto p-6 pb-24 md:pb-6 custom-scrollbar">
//           {/* LEFT SIDE - IMAGES & SPECS */}
//           <div className="space-y-8">
//             <div 
//               className="relative w-full bg-secondary/30 rounded-xl overflow-hidden border cursor-crosshair group"
//               onMouseMove={handleMouseMove}
//               onMouseEnter={() => setShowMagnifier(true)}
//               onMouseLeave={() => setShowMagnifier(false)}
//             >
//               <img
//                 ref={imgRef}
//                 src={selectedImage}
//                 alt={product.name}
//                 className="block w-full h-[400px] object-contain"
//               />

//               {showMagnifier && (
//                 <div
//                   className="absolute border border-gray-400 rounded-full pointer-events-none z-10"
//                   style={{
//                     left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
//                     top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
//                     width: MAGNIFIER_SIZE,
//                     height: MAGNIFIER_SIZE,
//                     backgroundImage: `url(${selectedImage})`,
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: `${imgRef.current?.width ? imgRef.current.width * 2 : 100}% ${imgRef.current?.height ? imgRef.current.height * 2 : 100}%`,
//                     backgroundPositionX: `${-magnifierPosition.x * 2 + MAGNIFIER_SIZE / 2}px`,
//                     backgroundPositionY: `${-magnifierPosition.y * 2 + MAGNIFIER_SIZE / 2}px`,
//                   }}
//                 ></div>
//               )}
//             </div>
            
//             <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//               {imageGallery.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(img)}
//                   className={cn(
//                     "w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
//                     selectedImage === img
//                       ? "border-[#e91e63] shadow-md"
//                       : "border-border hover:border-muted-foreground/50"
//                   )}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.name} thumbnail ${idx + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* Specifications */}
//             {displaySpecs.length > 0 && (
//                 <div className="pt-8 border-t">
//                     <h3 className="font-serif font-bold text-xl mb-4">Specifications</h3>
//                     <div className="space-y-3">
//                         {displaySpecs.map(spec => (
//                         <div key={spec.name} className="flex justify-between border-b border-dashed pb-2 text-sm">
//                             <span className="font-medium text-foreground">{spec.name}</span>
//                             <span className="text-muted-foreground">{spec.value}</span>
//                         </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//           </div>

//           {/* RIGHT SIDE - DETAILS & REVIEWS */}
//           <div className="flex flex-col space-y-6">
//             <div className="flex items-center justify-between">
//                 <StockStatus />
//                 <div className="flex items-center gap-1">
//                     <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                         <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "text-[#e91e63] fill-[#e91e63]" : "text-muted fill-muted")} />
//                         ))}
//                     </div>
//                     <span className="text-sm text-muted-foreground ml-2">
//                         ({product.reviews.toLocaleString()} reviews)
//                     </span>
//                 </div>
//             </div>
            
//             {/* Price */}
//             <div className="flex items-baseline gap-3">
//               <span className="text-4xl font-bold">
//                 {formatPrice(dynamicPrice)}
//               </span>
//               {product.originalPrice && (
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-xl line-through text-muted-foreground">
//                     {formatPrice(product.originalPrice)}
//                   </span>
//                   {discountPercent > 0 && (
//                     <span className="text-lg font-semibold text-[#e91e63]">
//                       ({discountPercent}% off)
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <h3 className="font-serif font-bold text-xl mb-2">Description</h3>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                   {product.description || "A high-quality product that meets your needs."}
//               </p>
//             </div>

//             {/* Variants Section */}
//             {product.variants && product.variants.map(variant => (
//               <div key={variant.name} className="space-y-3">
//                 <span className="font-semibold text-md">{variant.name}: <span className="text-muted-foreground font-normal">{selectedVariants[variant.name]}</span></span>
//                 <div className="flex flex-wrap gap-2">
//                   {variant.options.map(option => (
//                     <Button
//                       key={option.value}
//                       variant="outline"
//                       onClick={() => handleVariantSelect(variant.name, option.value)}
//                       className={cn(
//                         "transition-all rounded-lg px-6", 
//                         selectedVariants[variant.name] === option.value && "border-[#e91e63] bg-[#e91e63]/5 text-[#e91e63] ring-1 ring-[#e91e63]"
//                       )}
//                       disabled={option.stock <= 0}
//                     >
//                       {option.value}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             ))}
            
//             {/* Quantity & Actions */}
//             <div className="hidden md:flex items-center gap-4 pt-4">
//               <div className="flex items-center gap-2 border rounded-lg p-1 bg-secondary/20">
//                 <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={effectiveStock <= 0}>
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
//                 <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.min(effectiveStock, q + 1))} disabled={effectiveStock <= 0 || quantity >= effectiveStock}>
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               <Button size="lg" className="flex-1 bg-[#e91e63] hover:bg-[#d81b60] text-white font-bold h-12" onClick={handleAddToCart} disabled={effectiveStock <= 0}>
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
//               </Button>
//             </div>

//             {/* Wishlist */}
//             <div className="hidden md:flex items-center pt-2">
//               <Button variant="ghost" className="text-muted-foreground hover:text-[#e91e63] hover:bg-[#e91e63]/5" onClick={() => toggleWishlist(product)}>
//                 <Heart className={cn("h-5 w-5 mr-2 transition-colors", inWishlist && "text-[#e91e63] fill-[#e91e63]")} />
//                 {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
//               </Button>
//             </div>
            
//             {/* Reviews Section */}
//             <div className="pt-8 border-t">
//                 <h3 className="font-serif font-bold text-xl mb-6">Reviews ({displayReviews.length})</h3>
//                 <div className="space-y-8">
//                 {displayReviews.map(review => (
//                   <div key={review.id} className="border-b border-border/50 pb-6 last:border-b-0">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="font-bold text-foreground">{review.author}</span>
//                         <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
//                     </div>
//                     <div className="flex items-center gap-0.5 mb-3">
//                         {[...Array(5)].map((_, i) => (
//                             <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-[#e91e63] fill-[#e91e63]" : "text-muted fill-muted")} />
//                         ))}
//                     </div>
//                     <p className="text-sm text-muted-foreground italic leading-relaxed">
//                         "{review.comment}"
//                     </p>
//                   </div>
//                 ))}
//                 </div>
//             </div>
//           </div>
//         </div>

//         <StickyMobileActions 
//           price={formatPrice(dynamicPrice)} 
//           onAddToCart={handleAddToCart} 
//           disabled={effectiveStock <= 0} 
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }






import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useWishlist } from "@/context/WishlistContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// Sub-component for the sticky mobile action bar
const StickyMobileActions = ({ price, onAddToCart, disabled }: { price: string, onAddToCart: () => void, disabled: boolean }) => (
  <div className="md:hidden absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 shadow-lg">
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Price</span>
        <span className="font-bold text-lg">{price}</span>
      </div>
      <Button 
        size="lg" 
        className="flex-1 btn-etsy" 
        onClick={onAddToCart} 
        disabled={disabled}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {disabled ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  </div>
);

const MAGNIFIER_SIZE = 150; // Size of the magnifying glass lens

export default function ProductModal({
  product,
  isOpen,
  onOpenChange,
}: ProductModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  const inWishlist = isInWishlist(product.id);

  const imgRef = useRef<HTMLImageElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  // Effect to reset state when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(product.image);
      setQuantity(1);
      const initialVariants: { [key: string]: string } = {};
      product.variants?.forEach(variant => {
        if (variant.options.length > 0) {
          initialVariants[variant.name] = variant.options[0].value;
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [isOpen, product]);
  
  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
    setQuantity(1); // Reset quantity when variant changes
  };

  const dynamicPrice = useMemo(() => {
    let finalPrice = product.price;
    product.variants?.forEach(variant => {
      const selectedOptionValue = selectedVariants[variant.name];
      const selectedOption = variant.options.find(opt => opt.value === selectedOptionValue);
      if (selectedOption?.priceModifier) {
        finalPrice += selectedOption.priceModifier;
      }
    });
    return finalPrice;
  }, [product, selectedVariants]);

  const effectiveStock = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return product.stock ?? 999;
    }
    let currentStock = 0;
    const primaryVariant = product.variants[0];
    const selectedOptionValue = selectedVariants[primaryVariant.name];
    const selectedOption = primaryVariant.options.find(opt => opt.value === selectedOptionValue);
    currentStock = selectedOption?.stock ?? 0;
    
    if (product.variants.length > 1) {
        const secondaryVariant = product.variants[1];
        const selectedOptionValue2 = selectedVariants[secondaryVariant.name];
        const selectedOption2 = secondaryVariant.options.find(opt => opt.value === selectedOptionValue2);
        if (selectedOption2) {
            currentStock = Math.min(currentStock, selectedOption2.stock);
        }
    }
    
    return currentStock;
  }, [product, selectedVariants]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!product) return null;

  const imageGallery = [product.image, ...(product.images360 || [])].filter(
    Boolean
  );

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - dynamicPrice) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity } as any); 
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setMagnifierPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseOver = () => {
    setShowMagnifier(true);
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setImgOffset({ x: rect.left, y: rect.top });
    }
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };
  
  const StockStatus = () => {
    if (effectiveStock <= 0) {
      return (
        <span className="text-red-600 font-medium flex items-center gap-1">
          <XCircle className="h-4 w-4" />
          Out of Stock
        </span>
      );
    }
    if (effectiveStock < 10) {
      return (
        <span className="text-yellow-600 font-medium flex items-center gap-1">
          <CheckCircle className="h-4 w-4" />
          Only {effectiveStock} left!
        </span>
      );
    }
    return (
      <span className="text-green-600 font-medium flex items-center gap-1">
        <CheckCircle className="h-4 w-4" />
        In Stock
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl lg:max-w-5xl w-full p-0 flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-2xl font-bold leading-tight">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto scrollbar-hide">
          {/* LEFT SIDE - IMAGES */}
          <div className="p-6 pb-0 md:sticky top-0">
            <div 
              className="relative w-full bg-secondary/30 rounded-lg overflow-hidden border cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={selectedImage}
                alt={product.name}
                className="block w-full h-auto object-contain"
              />

              {showMagnifier && (
                <div
                  className="absolute border border-gray-400 rounded-full pointer-events-none z-10"
                  style={{
                    left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
                    top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
                    width: MAGNIFIER_SIZE,
                    height: MAGNIFIER_SIZE,
                    backgroundImage: `url(${selectedImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${imgRef.current?.width ? imgRef.current.width * 2 : 100}% ${imgRef.current?.height ? imgRef.current.height * 2 : 100}%`,
                    backgroundPositionX: `${-magnifierPosition.x * 2 + MAGNIFIER_SIZE / 2}px`,
                    backgroundPositionY: `${-magnifierPosition.y * 2 + MAGNIFIER_SIZE / 2}px`,
                  }}
                ></div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-3 mt-4">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "aspect-square rounded-md overflow-hidden border-2 transition-all",
                    selectedImage === img
                      ? "border-primary shadow-md"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Specifications - Moved to left column */}
            {product.specifications && (
                <div className="mt-8 border-t border-border/50 pt-5">
                    <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                    <ul className="text-sm text-muted-foreground space-y-3">
                        {product.specifications.map(spec => (
                        <li key={spec.name} className="flex justify-between border-b pb-2">
                            <span className="font-medium text-foreground">{spec.name}</span>
                            <span>{spec.value}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="flex flex-col space-y-5 px-6 pb-24 md:pb-6">
            <div className="flex items-center justify-between">
                <StockStatus />
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted fill-muted")} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                        ({product.reviews.toLocaleString()} reviews)
                    </span>
                </div>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                {formatPrice(dynamicPrice)}
              </span>
              {product.originalPrice && (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl line-through text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                  {discountPercent > 0 && <span className="text-md font-semibold text-destructive">
                    ({discountPercent}% off)
                  </span>}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description || "A high-quality product that meets your needs."}
              </p>
            </div>

            {/* Variants Section */}
            {product.variants && product.variants.map(variant => (
              <div key={variant.name} className="space-y-3">
                <span className="font-semibold text-md">{variant.name}: <span className="text-muted-foreground font-normal">{selectedVariants[variant.name]}</span></span>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(option => (
                    <Button
                      key={option.value}
                      variant={selectedVariants[variant.name] === option.value ? "secondary" : "outline"}
                      onClick={() => handleVariantSelect(variant.name, option.value)}
                      className={cn("transition-all", selectedVariants[variant.name] === option.value && "ring-2 ring-primary")}
                      disabled={option.stock <= 0}
                    >
                      {option.value}
                       {option.stock <= 0 && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Quantity & Actions */}
            <div className="hidden md:flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={effectiveStock <= 0}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.min(effectiveStock, q + 1))} disabled={effectiveStock <= 0 || quantity >= effectiveStock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 btn-etsy" onClick={handleAddToCart} disabled={effectiveStock <= 0}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Wishlist */}
            <div className="hidden md:flex items-center pt-2">
              <Button variant="ghost" className="text-muted-foreground border hover:text-white" onClick={() => toggleWishlist(product)}>
                <Heart className={cn("h-4 w-4 mr-2 transition-colors", inWishlist && "text-primary fill-primary")} />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
            
            {/* Reviews - Remains in right column */}
            {product.detailedReviews && (
                <div className="border-t border-border/50 pt-5 mt-5">
                    <h3 className="font-semibold text-lg mb-4">Reviews ({product.detailedReviews.length})</h3>
                    <div className="space-y-6">
                    {product.detailedReviews.map(review => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{review.author}</span>
                            <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted fill-muted")} />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                   </div>
                </div>
            )}
          </div>
        </div>
        <StickyMobileActions 
            price={formatPrice(dynamicPrice)} 
            onAddToCart={handleAddToCart}
            disabled={effectiveStock <= 0}
        />
      </DialogContent>
    </Dialog>
  );
}