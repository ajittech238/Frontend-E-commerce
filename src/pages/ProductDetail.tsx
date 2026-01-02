import { useState } from "react";
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
  Package,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { electronicsProducts } from "@/data/electronics";
import { beautyProducts } from "@/data/beauty";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const product = 
    products.find((p) => p.id === id) || 
    electronicsProducts.find((p) => p.id === id) ||
    beautyProducts.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  
  const allProducts = [...products, ...electronicsProducts, ...beautyProducts];
  let relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  
  if (relatedProducts.length === 0) {
    relatedProducts = allProducts.filter(
      (p) => p.subcategory?.some(sub => product.subcategory?.includes(sub)) && p.id !== product.id
    ).slice(0, 4);
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

  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  {product.badge}
                </Badge>
              )}
              {product.discount && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                  -{product.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i ? "border-accent" : "border-border hover:border-accent/50"
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
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
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
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description || "Experience premium quality with this exceptional product. Designed for performance and built to last, this item delivers outstanding value and satisfaction."}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-3 w-3 rounded-full",
                product.inStock ? "bg-green-500" : "bg-red-500"
              )} />
              <span className={cn(
                "font-medium",
                product.inStock ? "text-green-600" : "text-red-600"
              )}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== "Free" && (
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-sm font-semibold text-foreground">Select Size/Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm",
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-background text-foreground hover:border-accent/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border border-border rounded-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold gap-2  bg-pink-500 hover:bg-pink-400"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart 
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12  hover:bg-pink-400"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    inWishlist && "fill-destructive text-destructive"
                  )}
                />
              </Button>

              <Button size="lg" variant="outline" className="h-12  hover:bg-pink-400">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border   ">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
                { icon: Shield, title: "1 Year Warranty", desc: "Official warranty" },
                { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {(product.sizes || product.discount || product.badge) && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-2xl font-bold mb-6">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
                  {product.inStock !== undefined && (
                    <li className="flex justify-between items-center">
                      <span>Availability</span>
                      <span className={cn(
                        "font-medium",
                        product.inStock ? "text-green-600" : "text-red-600"
                      )}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </li>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <li className="flex justify-between items-start">
                      <span>Available Sizes</span>
                      <div className="flex flex-wrap gap-1 justify-end">
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
