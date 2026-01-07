import { useState, useMemo, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  ChevronRight,
  Check,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

// ========================================
// STEP 1: Import all your product arrays
// ========================================
import { products } from "@/data/products";
import { electronicsProducts } from "@/data/electronics";
import { homeLivingProducts } from "@/data/Home&living";
// import { groceryProducts } from "@/data/grocery";
// Add your other imports below:
// import { fashionProducts } from "@/data/fashion";
// import { beautyProducts } from "@/data/beauty";

const MAGNIFIER_SIZE = 150;

const ProductDetail = () => {
  const { id } = useParams();
  
  // ========================================
  // STEP 2: Combine all product arrays
  // ========================================
  const allProductArrays = [
    products,
    electronicsProducts,
    homeLivingProducts,
    
    // Add more arrays here
  ];
  
  // ========================================
  // STEP 3: Search product in all arrays
  // ========================================
  let product: any = null;
  for (const productArray of allProductArrays) {
    product = productArray.find((p) => p.id === id);
    if (product) break;
  }
  
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  
  // Magnifier states
  const imgRef = useRef<HTMLImageElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  // Initialize variants on mount
  useEffect(() => {
    if (product?.variants && Object.keys(selectedVariants).length === 0) {
      const initialVariants: { [key: string]: string } = {};
      product.variants.forEach(variant => {
        if (variant.options.length > 0) {
          initialVariants[variant.name] = variant.options[0].value;
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [product, selectedVariants]);

  // Calculate dynamic price based on variants
  const dynamicPrice = useMemo(() => {
    if (!product) return 0;
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

  // Calculate effective stock based on variants
  const effectiveStock = useMemo(() => {
    if (!product) return 0;
    if (!product.variants || product.variants.length === 0) {
      return product.stock ?? 999;
    }
    let currentStock = 999;
    const primaryVariant = product.variants[0];
    const selectedOptionValue = primaryVariant ? selectedVariants[primaryVariant.name] : undefined;
    const selectedOption = primaryVariant?.options.find(opt => opt.value === selectedOptionValue);
    currentStock = selectedOption?.stock ?? 999;
    
    if (product.variants.length > 1) {
      const secondaryVariant = product.variants[1];
      const selectedOptionValue2 = secondaryVariant ? selectedVariants[secondaryVariant.name] : undefined;
      const selectedOption2 = secondaryVariant?.options.find(opt => opt.value === selectedOptionValue2);
      if (selectedOption2) {
        currentStock = Math.min(currentStock, selectedOption2.stock);
      }
    }
    return currentStock;
  }, [product, selectedVariants]);

  // Product not found case
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  
  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
    setQuantity(1);
  };
  
  // Combine all products for related products
  const allProducts = allProductArrays.flat();
  
  let relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  
  if (relatedProducts.length === 0) {
    relatedProducts = allProducts.filter(
      (p) => p.subcategory?.some(sub => product.subcategory?.includes(sub)) && p.id !== product.id
    ).slice(0, 4);
  }
  
  if (relatedProducts.length === 0) {
    relatedProducts = allProducts
      .filter((p) => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const imageGallery = [product.image, ...(product.images360 || []), product.image, product.image].filter(Boolean).slice(0, 5);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - dynamicPrice) / product.originalPrice) * 100)
    : 0;

  // Magnifier handlers
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
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const StockStatus = () => {
    if (effectiveStock <= 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="font-medium text-red-600 flex items-center gap-1">
            <XCircle className="h-4 w-4" />
            Out of Stock
          </span>
        </div>
      );
    }
    if (effectiveStock < 10) {
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="font-medium text-yellow-600 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Only {effectiveStock} left!
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="font-medium text-green-600 flex items-center gap-1">
          <CheckCircle className="h-4 w-4" />
          In Stock
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 sm:py-8 px-4 sm:px-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/category/${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images with Magnifier */}
          <div className="space-y-4 w-full">
            <div 
              className="relative w-full max-w-full aspect-square rounded-2xl overflow-hidden bg-secondary/50 cursor-crosshair"
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
              
              {/* Magnifier Lens */}
              {showMagnifier && (
                <div
                  className="hidden md:block absolute border-2 border-primary rounded-full pointer-events-none z-10"
                  style={{
                    left: magnifierPosition.x - MAGNIFIER_SIZE / 2,
                    top: magnifierPosition.y - MAGNIFIER_SIZE / 2,
                    width: MAGNIFIER_SIZE,
                    height: MAGNIFIER_SIZE,
                    backgroundImage: `url(${imageGallery[selectedImage]})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${imgRef.current?.width ? imgRef.current.width * 2 : 100}% ${imgRef.current?.height ? imgRef.current.height * 2 : 100}%`,
                    backgroundPositionX: `${-magnifierPosition.x * 2 + MAGNIFIER_SIZE / 2}px`,
                    backgroundPositionY: `${-magnifierPosition.y * 2 + MAGNIFIER_SIZE / 2}px`,
                  }}
                ></div>
              )}
              
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  {product.badge}
                </Badge>
              )}
              {discountPercent > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                  -{discountPercent}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
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
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">
                {formatPrice(dynamicPrice)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save {formatPrice(product.originalPrice - dynamicPrice)}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {product.description || "Experience premium quality with this exceptional product. Designed for performance and built to last, this item delivers outstanding value and satisfaction."}
            </p>

            {/* Stock Status */}
            <StockStatus />

            {/* Variants Section */}
            {product.variants && product.variants.map(variant => (
              <div key={variant.name} className="space-y-3 pt-4 border-t border-border">
                <label className="text-sm font-semibold text-foreground">
                  {variant.name}: <span className="text-muted-foreground font-normal">{selectedVariants[variant.name]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleVariantSelect(variant.name, option.value)}
                      disabled={option.stock <= 0}
                      className={cn(
                        "relative px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 font-medium transition-all text-sm",
                        selectedVariants[variant.name] === option.value
                          ? "border-accent bg-accent text-accent-foreground ring-2 ring-accent/50"
                          : "border-border bg-background text-foreground hover:border-accent/50",
                        option.stock <= 0 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {option.value}
                      {option.stock <= 0 && (
                        <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity & Actions */}
            <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex items-center gap-4 flex-1 sm:flex-none">
                <div className="flex items-center border border-border rounded-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || effectiveStock <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(effectiveStock, quantity + 1))}
                    disabled={effectiveStock <= 0 || quantity >= effectiveStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold gap-2"
                  onClick={handleAddToCart}
                  disabled={effectiveStock <= 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {effectiveStock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              <div className="flex gap-2 sm:flex-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-none h-12"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      inWishlist && "fill-destructive text-destructive"
                    )}
                  />
                </Button>

                <Button size="lg" variant="outline" className="flex-1 sm:flex-none h-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border   ">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
                { icon: Shield, title: "1 Year Warranty", desc: "Official warranty" },
                { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start sm:items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
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
          <section className="mt-12 border-t border-border pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {product.specifications && (
                <div className="w-full">
                  <h2 className="font-display text-2xl font-bold mb-6">Specifications</h2>
                  <div className="space-y-3 overflow-hidden">
                    {product.specifications.map(spec => (
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
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Customer Reviews ({product.detailedReviews.length})
                  </h2>
                  <div className="space-y-6">
                    {product.detailedReviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                          <span className="font-semibold text-foreground">{review.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "text-primary fill-primary" : "text-muted fill-muted"
                              )}
                            />
                          ))}
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

        {/* Product Details - Generic Fallback */}
        {!product.specifications && (product.sizes || product.discount || product.badge) && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-2xl font-bold mb-6">Product Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Specifications</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {product.badge && (
                    <li className="flex justify-between items-center">
                      <span>Badge</span>
                      <Badge>{product.badge}</Badge>
                    </li>
                  )}
                  {product.discount && (
                    <li className="flex justify-between items-center">
                      <span>Discount</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">{product.discount}% OFF</Badge>
                    </li>
                  )}
                  {product.rating && (
                    <li className="flex justify-between items-center">
                      <span>Rating</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </li>
                  )}
                  {effectiveStock !== undefined && (
                    <li className="flex justify-between items-center">
                      <span>Availability</span>
                      <span className={cn(
                        "font-medium",
                        effectiveStock > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {effectiveStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </li>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <li className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                      <span>Available Sizes</span>
                      <div className="flex flex-wrap gap-1 justify-start sm:justify-end mt-1 sm:mt-0">
                        {product.sizes.map((size) => (
                          <Badge key={size} variant="outline">{size}</Badge>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Why Choose This?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Official product with authentic warranty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Fast and secure delivery across India</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">30-day easy return policy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default ProductDetail;