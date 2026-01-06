import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Zap,
  X,
  Shield,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { HomeLivingProduct } from "@/data/Home&living";
import { useWishlist } from "@/context/WishlistContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

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

  // Zoom functionality states and ref
  const imgRef = useRef<HTMLImageElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magnifierStyle, setMagnifierStyle] = useState({});

  // Constants for zoom
  const ZOOM_FACTOR = 2; // How much to zoom in
  const MAGNIFIER_SIZE = 150; // Size of the magnifier circle
  const MAGNIFIER_OFFSET = MAGNIFIER_SIZE / 2; // Offset to center the magnifier

  const inWishlist = isInWishlist(product.id);

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
  ).slice(0, 5);

  const discountPercent = product.originalPrice
    ? Math.round(
      ((product.originalPrice - dynamicPrice) / product.originalPrice) * 100
    )
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });

    const backgroundX = -(x * ZOOM_FACTOR - MAGNIFIER_OFFSET);
    const backgroundY = -(y * ZOOM_FACTOR - MAGNIFIER_OFFSET);

    const magnifierLeft = x - MAGNIFIER_OFFSET;
    const magnifierTop = y - MAGNIFIER_OFFSET;

    setMagnifierStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: `${width * ZOOM_FACTOR}px ${height * ZOOM_FACTOR}px`,
      backgroundPosition: `${backgroundX}px ${backgroundY}px`,
      left: `${magnifierLeft}px`,
      top: `${magnifierTop}px`,
      width: `${MAGNIFIER_SIZE}px`,
      height: `${MAGNIFIER_SIZE}px`,
    });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden rounded-3xl border-none bg-white dark:bg-slate-900 shadow-2xl">
        <div className="flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Modal Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white truncate pr-8">
              {product.name}
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors shrink-0"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Images */}
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center p-8 border border-slate-100 dark:border-slate-800 relative">
                  <div
                    className="relative w-full h-full flex items-center justify-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    <img
                      ref={imgRef}
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500"
                    />
                    {isZooming && (
                      <div
                        className="absolute rounded-full pointer-events-none border-2 border-gray-400 overflow-hidden z-10"
                        style={magnifierStyle}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {imageGallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={cn(
                        "w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 shrink-0 flex items-center justify-center p-2 transition-all",
                        selectedImage === img ? "border-pink-500 shadow-md" : "border-slate-100 dark:border-slate-800"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium">
                    <Zap size={18} className="fill-amber-500" />
                    <span>{effectiveStock < 10 ? `Only ${effectiveStock} left!` : 'In Stock'}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={cn(
                            i < Math.floor(product.rating) ? "fill-pink-500 text-pink-500" : "text-slate-200 dark:text-slate-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {formatPrice(dynamicPrice)}
                    </span>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-pink-600 font-bold">({discountPercent}% off)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Description</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {product.description || "Experience the perfect blend of style and performance with this premium quality product."}
                  </p>
                </div>

                {/* Variants Section */}
                {product.variants && product.variants.map(variant => (
                  <div key={variant.name} className="space-y-3">
                    <h3 className="font-bold">{variant.name}: <span className="font-normal text-slate-500">{selectedVariants[variant.name]}</span></h3>
                    <div className="flex flex-wrap gap-3">
                      {variant.options.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleVariantSelect(variant.name, option.value)}
                          className={cn(
                            "px-6 py-2 rounded-xl border-2 transition-all font-medium",
                            selectedVariants[variant.name] === option.value
                              ? "border-pink-500 bg-pink-50/50 dark:bg-pink-900/10 text-pink-600"
                              : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                          )}
                          disabled={option.stock <= 0}
                        >
                          {option.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity and Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center bg-slate-50 dark:bg-slate-950 rounded-xl p-1 border border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:text-pink-600 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:text-pink-600 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <Button
                    className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-pink-600/20 border-none transition-transform active:scale-95"
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addToCart(product);
                      }
                      onOpenChange(false);
                    }}
                    disabled={effectiveStock <= 0}
                  >
                    <ShoppingCart size={22} />
                    {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full h-12 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-pink-600 text-pink-600")} />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
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
                    { label: "Material", value: "Premium Grade" },
                    { label: "Warranty", value: "1 Year Standard" },
                    { label: "Shipping", value: "Fast & Free" },
                    { label: "Returns", value: "30-Day Policy" },
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
                <h3 className="text-2xl font-serif font-bold">Recent Reviews</h3>
                <div className="space-y-8">
                  {[
                    { name: "Amit V.", rating: 5, text: "Exceeded my expectations! The quality is amazing and fits perfectly." },
                    { name: "Sunita G.", rating: 5, text: "Beautiful design and very practical. Highly recommend this to everyone." },
                  ].map((review, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{review.name}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              size={12}
                              className={cn(j < review.rating ? "fill-pink-500 text-pink-500" : "text-slate-200")}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}