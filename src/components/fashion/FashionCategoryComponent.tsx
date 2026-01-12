import { useState } from "react";
import { ChevronDown, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { fashionProducts } from "@/data/fashion";
import { Link } from "react-router-dom";

interface TabsState {
  men: boolean;
  women: boolean;
  kids: boolean;
}

const FashionCategoryComponent = () => {
  const [openTabs, setOpenTabs] = useState<TabsState>({
    men: false,
    women: false,
    kids: false,
  });
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const toggleTab = (tab: keyof TabsState) => {
    setOpenTabs((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };


  const renderProductCard = (product: any, index: number) => {
    const inWishlist = isInWishlist(product.id);
    
    return (
      <div
        key={product.id}
        className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
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

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2  text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-grow space-y-2">
          <Link to={`/product/${product.id}`}>
            <h4 className="text-xs font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[1.5rem]">
              {product.name}
            </h4>
          </Link>

          <div className="flex gap-2 items-baseline">
            <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {product.sizes.slice(0, 3).map((size: string) => (
                <button
                  key={size}
                  className="text-xs border border-border rounded px-2 py-1 hover:border-primary transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full text-xs mt-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  };

  const renderSubcategorySection = (
    title: string,
    subcategoryKey: string,
    products: any[]
  ) => {
    const isHovered = hoveredSubcategory === subcategoryKey;

    return (
      <div
        key={subcategoryKey}
        className="pb-4"
        onMouseEnter={() => setHoveredSubcategory(subcategoryKey)}
        onMouseLeave={() => setHoveredSubcategory(null)}
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <span className="text-xs text-muted-foreground">({products.length})</span>
        </div>

        {/* Grid for products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {products.slice(0, 4).map((product, index) => renderProductCard(product, index))}
        </div>
      </div>
    );
  };

  const menProducts = fashionProducts.filter((p) => p.category === "fashion" && p.subcategory?.includes("men"));
  const womenProducts = fashionProducts.filter(
    (p) => p.category === "fashion" && p.subcategory?.includes("women")
  );
  const kidsProducts = fashionProducts.filter((p) => p.category === "fashion" && p.subcategory?.includes("kids"));

  return (
    <div className="w-full">
      {/* Desktop View - Dropdown */}
      <div className="hidden lg:block">
        <div className="flex gap-2 items-center h-full">
          {/* Men Tab */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium flex items-center gap-1 rounded-lg"
              onClick={() => toggleTab("men")}
            >
              Men
              <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.men && "rotate-180")} />
            </Button>

            <div
              className={cn(
                "absolute top-full left-0 bg-white dark:bg-card border border-border rounded-xl shadow-xl mt-2 z-50 hidden group-hover:block w-screen max-w-4xl",
                "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
              )}
            >
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {renderSubcategorySection("Top Wear", "men-topwear", menProducts.filter((p) => p.subcategory?.includes("top")))}
                {renderSubcategorySection("Bottom Wear", "men-bottomwear", menProducts.filter((p) => p.subcategory?.includes("bottom")))}
                {renderSubcategorySection("Ethnic Wear", "men-ethnic", menProducts.filter((p) => p.subcategory?.includes("ethnic")))}
                {renderSubcategorySection("Footwear", "men-footwear", menProducts.filter((p) => p.subcategory?.includes("footwear")))}
                {renderSubcategorySection("Accessories", "men-accessories", menProducts.filter((p) => p.subcategory?.includes("accessories")))}
              </div>
            </div>
          </div>

          {/* Women Tab */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium flex items-center gap-1 rounded-lg"
              onClick={() => toggleTab("women")}
            >
              Women
              <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.women && "rotate-180")} />
            </Button>

            <div
              className={cn(
                "absolute top-full left-0 bg-white dark:bg-card border border-border rounded-xl shadow-xl mt-2 z-50 hidden group-hover:block w-screen max-w-4xl",
                "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
              )}
            >
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {renderSubcategorySection("Dresses", "women-dresses", womenProducts.filter((p) => p.subcategory?.includes("dress")))}
                {renderSubcategorySection("Tops & Kurtis", "women-tops", womenProducts.filter((p) => p.subcategory?.includes("top") || p.subcategory?.includes("kurti")))}
                {renderSubcategorySection("Sarees & Ethnic", "women-saree", womenProducts.filter((p) => p.subcategory?.includes("saree") || p.subcategory?.includes("ethnic")))}
                {renderSubcategorySection("Jeans & Skirts", "women-bottoms", womenProducts.filter((p) => p.subcategory?.includes("jeans") || p.subcategory?.includes("skirt")))}
                {renderSubcategorySection("Footwear", "women-footwear", womenProducts.filter((p) => p.subcategory?.includes("footwear")))}
                {renderSubcategorySection("Jewelry & Accessories", "women-jewelry", womenProducts.filter((p) => p.subcategory?.includes("jewelry") || p.subcategory?.includes("accessories")))}
              </div>
            </div>
          </div>

          {/* Kids Tab */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium flex items-center gap-1 rounded-lg"
              onClick={() => toggleTab("kids")}
            >
              Kids
              <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.kids && "rotate-180")} />
            </Button>

            <div
              className={cn(
                "absolute top-full left-0 bg-white dark:bg-card border border-border rounded-xl shadow-xl mt-2 z-50 hidden group-hover:block w-screen max-w-4xl",
                "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
              )}
            >
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {renderSubcategorySection("Boys Clothing", "kids-boys", kidsProducts.filter((p) => p.subcategory?.includes("boys")))}
                {renderSubcategorySection("Girls Clothing", "kids-girls", kidsProducts.filter((p) => p.subcategory?.includes("girls")))}
                {renderSubcategorySection("Baby Wear", "kids-baby", kidsProducts.filter((p) => p.subcategory?.includes("baby")))}
                {renderSubcategorySection("Kids Footwear", "kids-footwear", kidsProducts.filter((p) => p.subcategory?.includes("footwear")))}
                {renderSubcategorySection("Toys & Accessories", "kids-toys", kidsProducts.filter((p) => p.subcategory?.includes("toys") || p.subcategory?.includes("accessories")))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Accordion */}
      <div className="lg:hidden space-y-2">
        {/* Men Accordion */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleTab("men")}
            className="w-full flex items-center justify-between p-3 bg-accent/50 hover:bg-accent transition-colors font-semibold text-sm"
          >
            <span>Men</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.men && "rotate-180")} />
          </button>
          {openTabs.men && (
            <div className="p-4 space-y-4 bg-card border-t">
              {renderSubcategorySection("Top Wear", "m-topwear", menProducts.filter((p) => p.subcategory?.includes("top")))}
              {renderSubcategorySection("Bottom Wear", "m-bottomwear", menProducts.filter((p) => p.subcategory?.includes("bottom")))}
              {renderSubcategorySection("Ethnic Wear", "m-ethnic", menProducts.filter((p) => p.subcategory?.includes("ethnic")))}
              {renderSubcategorySection("Footwear", "m-footwear", menProducts.filter((p) => p.subcategory?.includes("footwear")))}
              {renderSubcategorySection("Accessories", "m-accessories", menProducts.filter((p) => p.subcategory?.includes("accessories")))}
            </div>
          )}
        </div>

        {/* Women Accordion */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleTab("women")}
            className="w-full flex items-center justify-between p-3 bg-accent/50 hover:bg-accent transition-colors font-semibold text-sm"
          >
            <span>Women</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.women && "rotate-180")} />
          </button>
          {openTabs.women && (
            <div className="p-4 space-y-4 bg-card border-t">
              {renderSubcategorySection("Dresses", "w-dresses", womenProducts.filter((p) => p.subcategory?.includes("dress")))}
              {renderSubcategorySection("Tops & Kurtis", "w-tops", womenProducts.filter((p) => p.subcategory?.includes("top") || p.subcategory?.includes("kurti")))}
              {renderSubcategorySection("Sarees & Ethnic", "w-saree", womenProducts.filter((p) => p.subcategory?.includes("saree") || p.subcategory?.includes("ethnic")))}
              {renderSubcategorySection("Jeans & Skirts", "w-bottoms", womenProducts.filter((p) => p.subcategory?.includes("jeans") || p.subcategory?.includes("skirt")))}
              {renderSubcategorySection("Footwear", "w-footwear", womenProducts.filter((p) => p.subcategory?.includes("footwear")))}
              {renderSubcategorySection("Jewelry & Accessories", "w-jewelry", womenProducts.filter((p) => p.subcategory?.includes("jewelry") || p.subcategory?.includes("accessories")))}
            </div>
          )}
        </div>

        {/* Kids Accordion */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleTab("kids")}
            className="w-full flex items-center justify-between p-3 bg-accent/50 hover:bg-accent transition-colors font-semibold text-sm"
          >
            <span>Kids</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openTabs.kids && "rotate-180")} />
          </button>
          {openTabs.kids && (
            <div className="p-4 space-y-4 bg-card border-t">
              {renderSubcategorySection("Boys Clothing", "k-boys", kidsProducts.filter((p) => p.subcategory?.includes("boys")))}
              {renderSubcategorySection("Girls Clothing", "k-girls", kidsProducts.filter((p) => p.subcategory?.includes("girls")))}
              {renderSubcategorySection("Baby Wear", "k-baby", kidsProducts.filter((p) => p.subcategory?.includes("baby")))}
              {renderSubcategorySection("Kids Footwear", "k-footwear", kidsProducts.filter((p) => p.subcategory?.includes("footwear")))}
              {renderSubcategorySection("Toys & Accessories", "k-toys", kidsProducts.filter((p) => p.subcategory?.includes("toys") || p.subcategory?.includes("accessories")))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FashionCategoryComponent;
