import { useState } from "react";
import { Heart, ShoppingCart, Filter, BookOpen, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { booksProducts } from "@/data/books";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface GroupedProducts {
  [key: string]: typeof booksProducts;
}

const BooksPage = () => {
  const [priceRange, setPriceRange] = useState(900);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof booksProducts[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const mainCategories = Array.from(
    new Set(booksProducts.flatMap((p) => p.subcategory?.[0] || "other"))
  ).sort();

  const filteredProducts = booksProducts.filter((p) => {
    const matchesPrice = p.price <= priceRange;
    const matchesCategory = 
      !selectedMainCategory || p.subcategory?.[0] === selectedMainCategory;
    return matchesPrice && matchesCategory;
  });

  const groupedByMainCategory: { [key: string]: typeof booksProducts } = {};
  filteredProducts.forEach((product) => {
    const mainCat = product.subcategory?.[0] || "other";
    if (!groupedByMainCategory[mainCat]) {
      groupedByMainCategory[mainCat] = [];
    }
    groupedByMainCategory[mainCat].push(product);
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderProductCard = (product: typeof booksProducts[0]) => {
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

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
              onClick={() => toggleWishlist(product)}
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
              className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md dark:bg-slate-900/90"
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
            >
              <Eye className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
          </div>

          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
              {product.badge}
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}   
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
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
            className="w-full mt-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <span className="text-5xl">📚</span>
                Books
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Explore a world of books at unbeatable prices
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-amber-600 text-white">
              {filteredProducts.length} Books
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 p-6 rounded-xl max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="900"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedMainCategory(null)}
                    className={cn(
                      "w-full px-2.5 py-1.5 rounded border text-xs font-medium transition-all text-left",
                      !selectedMainCategory
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 text-foreground"
                    )}
                  >
                    All Categories
                  </button>
                  {mainCategories.slice(0, expandedCategories ? mainCategories.length : 4).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedMainCategory(selectedMainCategory === cat ? null : cat)}
                      className={cn(
                        "w-full px-2.5 py-1.5 rounded border text-xs font-medium transition-all text-left capitalize",
                        selectedMainCategory === cat
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 text-foreground"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                  {mainCategories.length > 4 && (
                    <button
                      onClick={() => setExpandedCategories(!expandedCategories)}
                      className="w-full px-3 py-2 rounded border border-dashed border-border/50 text-sm font-medium transition-all text-left text-primary hover:bg-primary/5"
                    >
                      {expandedCategories ? "See Less" : `See More (${mainCategories.length - 4})`}
                    </button>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(900);
                  setSelectedMainCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No books found with the selected filters.</p>
              </div>
            ) : selectedMainCategory ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-500/30">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                    {selectedMainCategory.replace(/([A-Z])/g, " $1").replace(/-/g, " ").trim()}
                  </h2>
                  <Badge className="bg-amber-500/20 text-amber-600">{filteredProducts.length}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => renderProductCard(product))}
                </div>
              </div>
            ) : (
              Object.entries(groupedByMainCategory).map(([mainCategory, products]) => (
                <div key={mainCategory} className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-500/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                      {mainCategory.replace(/([A-Z])/g, " $1").replace(/-/g, " ").trim()}
                    </h2>
                    <Badge className="bg-amber-500/20 text-amber-600">{products.length}</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => renderProductCard(product))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
              <h2 className="text-2xl font-bold text-foreground">{selectedProduct.name}</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 aspect-square overflow-hidden rounded-lg bg-secondary/30">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-lg",
                          i < Math.floor(selectedProduct.rating) ? "text-yellow-400" : "text-gray-300"
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  {selectedProduct.discount && (
                    <Badge className="bg-destructive text-white">
                      Save {selectedProduct.discount}%
                    </Badge>
                  )}
                </div>

                {selectedProduct.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {selectedProduct.author && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Author</p>
                      <p className="text-sm font-medium text-foreground">{selectedProduct.author}</p>
                    </div>
                  )}

                  {selectedProduct.publisher && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Publisher</p>
                      <p className="text-sm font-medium text-foreground">{selectedProduct.publisher}</p>
                    </div>
                  )}

                  {selectedProduct.pages && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Pages</p>
                      <p className="text-sm font-medium text-foreground">{selectedProduct.pages}</p>
                    </div>
                  )}

                  {selectedProduct.language && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Language</p>
                      <p className="text-sm font-medium text-foreground">{selectedProduct.language}</p>
                    </div>
                  )}

                  {selectedProduct.publicationYear && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Published</p>
                      <p className="text-sm font-medium text-foreground">{selectedProduct.publicationYear}</p>
                    </div>
                  )}

                  {selectedProduct.isbn && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">ISBN</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedProduct.isbn}</p>
                    </div>
                  )}
                </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setShowModal(false);
                      }}
                      disabled={!selectedProduct.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => toggleWishlist(selectedProduct)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          isInWishlist(selectedProduct.id) ? "fill-primary text-primary" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BooksPage;
