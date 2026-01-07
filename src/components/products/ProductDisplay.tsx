// import { useState, useMemo, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Star,
//   Heart,
//   ShoppingCart,
//   Truck,
//   Shield,
//   RotateCcw,
//   Share2,
//   Minus,
//   Plus,
//   Check,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { cn } from "@/lib/utils";

// const MAGNIFIER_SIZE = 100;
// const ZOOM_LEVEL = 2;

// // Define the props interface for the component
// interface ProductDisplayProps {
//   product: any; // You should replace 'any' with a proper Product type
// }

// const ProductDisplay = ({ product }: ProductDisplayProps) => {
//   const { addToCart } = useCart();
//   const { isInWishlist, toggleWishlist } = useWishlist();
  
//   // State for managing the UI
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

//   // State for the image magnifier
//   const imgRef = useRef<HTMLImageElement>(null);
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

//   // Effect to reset state when the product prop changes
//   useEffect(() => {
//     setSelectedImage(0);
//     setQuantity(1);
    
//     // Initialize variants when product changes
//     if (product.variants && Object.keys(product.variants).length > 0) {
//       const initialVariants: { [key: string]: string } = {};
//       product.variants.forEach((variant: any) => {
//         if (variant.options.length > 0) {
//           initialVariants[variant.name] = variant.options[0].value;
//         }
//       });
//       setSelectedVariants(initialVariants);
//     } else {
//       setSelectedVariants({});
//     }
//   }, [product]);


//   const inWishlist = isInWishlist(product.id);

//   const handleVariantSelect = (variantName: string, value: string) => {
//     setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
//     setQuantity(1);
//   };

//   const dynamicPrice = useMemo(() => {
//     let finalPrice = product.price;
//     product.variants?.forEach((variant:any) => {
//       const selectedOptionValue = selectedVariants[variant.name];
//       const selectedOption = variant.options.find((opt:any) => opt.value === selectedOptionValue);
//       if (selectedOption?.priceModifier) {
//         finalPrice += selectedOption.priceModifier;
//       }
//     });
//     return finalPrice;
//   }, [product, selectedVariants]);

//   const effectiveStock = useMemo(() => {
//     if (!product.variants || product.variants.length === 0) {
//       return product.stock ?? 999;
//     }
//     let currentStock = 999;
//     const primaryVariant = product.variants[0];
//     const selectedOptionValue = selectedVariants[primaryVariant.name];
//     const selectedOption = primaryVariant.options.find((opt:any) => opt.value === selectedOptionValue);
//     currentStock = selectedOption?.stock ?? 999;

//     if (product.variants.length > 1) {
//       const secondaryVariant = product.variants[1];
//       const selectedOptionValue2 = selectedVariants[secondaryVariant.name];
//       const selectedOption2 = secondaryVariant.options.find((opt:any) => opt.value === selectedOptionValue2);
//       if (selectedOption2) {
//         currentStock = Math.min(currentStock, selectedOption2.stock);
//       }
//     }
//     return currentStock;
//   }, [product, selectedVariants]);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addToCart({ ...product, selectedVariants });
//     }
//   };

//   const imageGallery = [product.image, ...(product.images360 || []), product.image, product.image].filter(Boolean).slice(0, 5);

//   const discountPercent = product.originalPrice
//     ? Math.round(((product.originalPrice - dynamicPrice) / product.originalPrice) * 100)
//     : 0;

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!imgRef.current) return;
//     const rect = imgRef.current.getBoundingClientRect();
//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top;
//     x = Math.max(0, Math.min(x, rect.width));
//     y = Math.max(0, Math.min(y, rect.height));
//     setMagnifierPosition({ x, y });
//   };

//   const handleMouseOver = () => setShowMagnifier(true);
//   const handleMouseLeave = () => setShowMagnifier(false);

//   const StockStatus = () => {
//     if (effectiveStock <= 0) {
//       return (
//         <div className="flex items-center gap-2 font-medium text-red-600">
//           <XCircle className="h-4 w-4" /> Out of Stock
//         </div>
//       );
//     }
//     if (effectiveStock < 10) {
//       return (
//         <div className="flex items-center gap-2 font-medium text-yellow-600">
//           <CheckCircle className="h-4 w-4" /> Only {effectiveStock} left!
//         </div>
//       );
//     }
//     return (
//       <div className="flex items-center gap-2 font-medium text-green-600">
//         <CheckCircle className="h-4 w-4" /> In Stock
//       </div>
//     );
//   };

//   return (
//     <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
//             {/* Product Images with Magnifier */}
//             <div className="space-y-4 w-full sm:max-w-md sm:mx-auto lg:max-w-full lg:mx-0">
//                       <div
//                         className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/50 cursor-crosshair"
//                         onMouseMove={handleMouseMove}
//                         onMouseOver={handleMouseOver}
//                         onMouseLeave={handleMouseLeave}
//                       >          <img
//             ref={imgRef}
//             src={imageGallery[selectedImage]}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//           {showMagnifier && (
//             <div
//               className="hidden md:block absolute border-2 border-primary rounded-full pointer-events-none z-10"
//               style={{
//                 width: MAGNIFIER_SIZE,
//                 height: MAGNIFIER_SIZE,
//                 left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
//                 top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
//                 backgroundImage: `url(${imageGallery[selectedImage]})`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: `${imgRef.current!.width * ZOOM_LEVEL}px ${imgRef.current!.height * ZOOM_LEVEL}px`,
//                 backgroundPosition: `${-magnifierPosition.x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px ${-magnifierPosition.y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px`,
//               }}
//             />
//           )}
//           {product.badge && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.badge}</Badge>}
//           {discountPercent > 0 && <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">-{discountPercent}% OFF</Badge>}
//         </div>
//         <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
//           {imageGallery.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => setSelectedImage(i)}
//               className={cn(
//                 "w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
//                 selectedImage === i ? "border-accent ring-2 ring-accent/50" : "border-border hover:border-accent/50"
//               )}
//             >
//               <img src={img} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         <div>
//           <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
//           <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center gap-1">
//               {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />)}
//             </div>
//             <span className="text-sm font-medium">{product.rating}</span>
//             <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
//           </div>
//         </div>

//         <div className="flex items-baseline gap-4 flex-wrap">
//           <span className="text-3xl sm:text-4xl font-bold text-foreground">{formatPrice(dynamicPrice)}</span>
//           {product.originalPrice && (
//             <>
//               <span className="text-lg sm:text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
//               <Badge variant="secondary" className="bg-green-100 text-green-700">Save {formatPrice(product.originalPrice - dynamicPrice)}</Badge>
//             </>
//           )}
//         </div>

//         <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{product.description || "Experience premium quality with this exceptional product."}</p>
//         <StockStatus />

//         {product.variants && product.variants.map((variant:any) => (
//           <div key={variant.name} className="space-y-3 pt-4 border-t border-border">
//             <label className="text-sm font-semibold text-foreground">{variant.name}: <span className="text-muted-foreground font-normal">{selectedVariants[variant.name]}</span></label>
//             <div className="flex flex-wrap gap-2">
//               {variant.options.map((option:any) => (
//                 <button
//                   key={option.value}
//                   onClick={() => handleVariantSelect(variant.name, option.value)}
//                   disabled={option.stock <= 0}
//                   className={cn(
//                     "relative px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 font-medium transition-all text-sm",
//                     selectedVariants[variant.name] === option.value ? "border-accent bg-accent text-accent-foreground ring-2 ring-accent/50" : "border-border bg-background text-foreground hover:border-accent/50",
//                     option.stock <= 0 && "opacity-50 cursor-not-allowed"
//                   )}
//                 >
//                   {option.value}
//                   {option.stock <= 0 && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
//           <div className="flex items-center gap-4 flex-1 sm:flex-none">
//             <div className="flex items-center border border-border rounded-xl">
//               <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1 || effectiveStock <= 0}><Minus className="h-4 w-4" /></Button>
//               <span className="w-12 text-center font-semibold">{quantity}</span>
//               <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(effectiveStock, quantity + 1))} disabled={effectiveStock <= 0 || quantity >= effectiveStock}><Plus className="h-4 w-4" /></Button>
//             </div>
//             <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold gap-2" onClick={handleAddToCart} disabled={effectiveStock <= 0}>
//               <ShoppingCart className="h-5 w-5" />
//               {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
//             </Button>
//           </div>
//           <div className="flex gap-2 sm:flex-none">
//             <Button size="lg" variant="outline" className="flex-1 sm:flex-none h-12" onClick={() => toggleWishlist(product)}>
//               <Heart className={cn("h-5 w-5", inWishlist && "fill-destructive text-destructive")} />
//             </Button>
//             <Button size="lg" variant="outline" className="flex-1 sm:flex-none h-12"><Share2 className="h-5 w-5" /></Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
//           {[
//             { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
//             { icon: Shield, title: "1 Year Warranty", desc: "Official warranty" },
//             { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy" },
//           ].map((feature, i) => (
//             <div key={i} className="flex items-start sm:items-center gap-3">
//               <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><feature.icon className="h-5 w-5 text-accent" /></div>
//               <div>
//                 <p className="text-sm font-medium">{feature.title}</p>
//                 <p className="text-xs text-muted-foreground">{feature.desc}</p>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//     </div>

//     {/* Specifications and Reviews Section */}
//     {(product.specifications || product.detailedReviews) && (
//       <section className="mt-12 border-t border-border pt-8 col-span-1 lg:col-span-2">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {product.specifications && (
//             <div className="w-full">
//               <h2 className="font-display text-2xl font-bold mb-6">Specifications</h2>
//               <div className="space-y-3 overflow-hidden">
//                 {product.specifications.map((spec:any) => (
//                   <div key={spec.name} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b pb-3 last:border-b-0">
//                     <span className="font-medium text-foreground mb-1 sm:mb-0">{spec.name}</span>
//                     <span className="text-muted-foreground text-sm truncate">{spec.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {product.detailedReviews && (
//             <div className="w-full">
//               <h2 className="font-display text-2xl font-bold mb-6">
//                 Customer Reviews ({product.detailedReviews.length})
//               </h2>
//               <div className="space-y-6">
//                 {product.detailedReviews.map((review:any) => (
//                   <div key={review.id} className="border-b pb-6 last:border-b-0">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
//                       <span className="font-semibold text-foreground">{review.author}</span>
//                       <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
//                     </div>
//                     <div className="flex items-center gap-0.5 mb-2">
//                        {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted fill-muted")} />)}
//                     </div>
//                     <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     )}
//   </>
//   );
// };

// export default ProductDisplay;











import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  Check,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ReviewForm from "./ReviewForm"; // Import the new form component


const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2;

// Define the props interface for the component
interface ProductDisplayProps {
  product: any; // You should replace 'any' with a proper Product type
}

const ProductDisplay = ({ product }: ProductDisplayProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // State for managing the UI
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false); // State for review dialog

  // State for the image magnifier
  const imgRef = useRef<HTMLImageElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  // Effect to reset state when the product prop changes
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);

    // Initialize variants when product changes
    if (product.variants && Object.keys(product.variants).length > 0) {
      const initialVariants: { [key: string]: string } = {};
      product.variants.forEach((variant: any) => {
        if (variant.options.length > 0) {
          initialVariants[variant.name] = variant.options[0].value;
        }
      });
      setSelectedVariants(initialVariants);
    } else {
      setSelectedVariants({});
    }
  }, [product]);


  const inWishlist = isInWishlist(product.id);

  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
    setQuantity(1);
  };

  const dynamicPrice = useMemo(() => {
    let finalPrice = product.price;
    product.variants?.forEach((variant: any) => {
      const selectedOptionValue = selectedVariants[variant.name];
      const selectedOption = variant.options.find((opt: any) => opt.value === selectedOptionValue);
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
    let currentStock = 999;
    const primaryVariant = product.variants[0];
    const selectedOptionValue = selectedVariants[primaryVariant.name];
    const selectedOption = primaryVariant.options.find((opt: any) => opt.value === selectedOptionValue);
    currentStock = selectedOption?.stock ?? 999;

    if (product.variants.length > 1) {
      const secondaryVariant = product.variants[1];
      const selectedOptionValue2 = selectedVariants[secondaryVariant.name];
      const selectedOption2 = secondaryVariant.options.find((opt: any) => opt.value === selectedOptionValue2);
      if (selectedOption2) {
        currentStock = Math.min(currentStock, selectedOption2.stock);
      }
    }
    return currentStock;
  }, [product, selectedVariants]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, selectedVariants });
    }
  };

  const imageGallery = [product.image, ...(product.images360 || []), product.image, product.image].filter(Boolean).slice(0, 5);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - dynamicPrice) / product.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));
    setMagnifierPosition({ x, y });
  };

  const handleMouseOver = () => setShowMagnifier(true);
  const handleMouseLeave = () => setShowMagnifier(false);

  const StockStatus = () => {
    if (effectiveStock <= 0) {
      return (
        <div className="flex items-center gap-2 font-medium text-red-600">
          <XCircle className="h-4 w-4" /> Out of Stock
        </div>
      );
    }
    if (effectiveStock < 10) {
      return (
        <div className="flex items-center gap-2 font-medium text-yellow-600">
          <CheckCircle className="h-4 w-4" /> Only {effectiveStock} left!
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 font-medium text-green-600">
        <CheckCircle className="h-4 w-4" /> In Stock
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Images with Magnifier */}
        <div className="space-y-4 w-full sm:max-w-sm sm:mx-auto lg:max-w-full lg:mx-0">
          <div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/50 cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imgRef}
              src={imageGallery[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {showMagnifier && (
              <div
                className="hidden md:block absolute border-2 border-primary rounded-full pointer-events-none z-10"
                style={{
                  width: MAGNIFIER_SIZE,
                  height: MAGNIFIER_SIZE,
                  left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
                  top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
                  backgroundImage: `url(${imageGallery[selectedImage]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${imgRef.current!.width * ZOOM_LEVEL}px ${imgRef.current!.height * ZOOM_LEVEL}px`,
                  backgroundPosition: `${-magnifierPosition.x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px ${-magnifierPosition.y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px`,
                }}
              />
            )}
            {product.badge && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.badge}</Badge>}
            {discountPercent > 0 && <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">-{discountPercent}% OFF</Badge>}
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {imageGallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                  selectedImage === i ? "border-accent ring-2 ring-accent/50" : "border-border hover:border-accent/50"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />)}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="text-3xl sm:text-4xl font-bold text-foreground">{formatPrice(dynamicPrice)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg sm:text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Save {formatPrice(product.originalPrice - dynamicPrice)}</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{product.description || "Experience premium quality with this exceptional product."}</p>
          <StockStatus />

          {product.variants && product.variants.map((variant: any) => (
            <div key={variant.name} className="space-y-3 pt-4 border-t border-border">
              <label className="text-sm font-semibold text-foreground">{variant.name}: <span className="text-muted-foreground font-normal">{selectedVariants[variant.name]}</span></label>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option: any) => (
                  <button
                    key={option.value}
                    onClick={() => handleVariantSelect(variant.name, option.value)}
                    disabled={option.stock <= 0}
                    className={cn(
                      "relative px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 font-medium transition-all text-sm",
                      selectedVariants[variant.name] === option.value ? "border-accent bg-accent text-accent-foreground ring-2 ring-accent/50" : "border-border bg-background text-foreground hover:border-accent/50",
                      option.stock <= 0 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option.value}
                    {option.stock <= 0 && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex items-center gap-4 flex-1 sm:flex-none">
              <div className="flex items-center border border-border rounded-xl">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1 || effectiveStock <= 0}><Minus className="h-4 w-4" /></Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(effectiveStock, quantity + 1))} disabled={effectiveStock <= 0 || quantity >= effectiveStock}><Plus className="h-4 w-4" /></Button>
              </div>
              <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold gap-2" onClick={handleAddToCart} disabled={effectiveStock <= 0}>
                <ShoppingCart className="h-5 w-5" />
                {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
            <div className="flex gap-2 sm:flex-none">
              <Button size="lg" variant="outline" className="flex-1 sm:flex-none h-12" onClick={() => toggleWishlist(product)}>
                <Heart className={cn("h-5 w-5", inWishlist && "fill-destructive text-destructive")} />
              </Button>
              <Button size="lg" variant="outline" className="flex-1 sm:flex-none h-12"><Share2 className="h-5 w-5" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
              { icon: Shield, title: "1 Year Warranty", desc: "Official warranty" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start sm:items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><feature.icon className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="text-sm font-medium">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications and Reviews Section */}
      {(product.specifications || product.detailedReviews) && (
        <section className="mt-12 border-t border-border pt-8 col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {product.specifications && (
              <div className="w-full">
                <h2 className="font-display text-2xl font-bold mb-6">Specifications</h2>
                <div className="space-y-3 overflow-hidden">
                  {product.specifications.map((spec: any) => (
                    <div key={spec.name} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b pb-3 last:border-b-0">
                      <span className="font-medium text-foreground mb-1 sm:mb-0">{spec.name}</span>
                      <span className="text-muted-foreground text-sm truncate">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
                        {product.detailedReviews && (
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-6">
                              <h2 className="font-display text-2xl font-bold">
                                Customer Reviews ({product.detailedReviews.length})
                              </h2>
                              <Button variant="outline" onClick={() => setIsReviewDialogOpen(true)}>Write a Review</Button>
                            </div>
                            <div className="space-y-6">
                              {product.detailedReviews.map((review:any) => (
                                <div key={review.id} className="border-b pb-6 last:border-b-0">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                                    <span className="font-semibold text-foreground">{review.author}</span>
                                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-0.5 mb-2">
                                     {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted fill-muted")} />)}
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
            
                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <ReviewForm productName={product.name} onOpenChange={setIsReviewDialogOpen} />
                    </DialogContent>
                  </Dialog>
                </>
              );
            };

export default ProductDisplay;