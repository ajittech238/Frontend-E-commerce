import { useState } from "react";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fashionProducts } from "@/data/fashion";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MenFootwear = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(10000);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredProducts = fashionProducts.filter(
    (p) => p.subcategory?.includes("men") && p.subcategory?.includes("footwear") && p.price <= priceRange
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderProductCard = (product: any) => {
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

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-pink-gradient/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

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
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

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

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-primary hover:text-primary/80 mb-2 flex items-center gap-1 text-sm font-medium"
              >
                ← Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">👞</span>
                Men's Footwear
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Sneakers, formal shoes, loafers, and more
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-pink-gradient text-primary-foreground">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
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
                <div className="text-sm text-muted-foreground">Up to {formatPrice(priceRange)}</div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setPriceRange(10000)}>
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found with the selected filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => renderProductCard(product))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground mt-16 py-8">
        <div className="container text-center space-y-3">
          <h3 className="text-3xl font-bold">Enjoy Free Shipping!</h3>
          <p className="text-lg opacity-90">On all orders over ₹999</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MenFootwear;
