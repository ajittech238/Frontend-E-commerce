// Import necessary hooks and components from React and other libraries.
import React, { useState, useEffect } from "react";
import { Filter, Sparkles, Plus, Minus } from "lucide-react";

// Import UI components and utilities.
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

// Import data for the page.
import { beautyCategories, beautyProducts } from "@/data/beauty";
import { Product } from "@/types/product";

// Grouped products interface
interface GroupedProducts {
  [key: string]: Product[];
}

export default function BeautyPage() {
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [productCount, setProductCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const filtered = beautyProducts.filter((product) => {
      const matchesPrice = product.price <= priceRange;
      const matchesCategory =
        selectedCategory === "all" ||
        product.subCategoryId === selectedCategory;
      return matchesPrice && matchesCategory;
    });

    setProductCount(filtered.length);

    const grouped: GroupedProducts = {};
    filtered.forEach((product) => {
      const subcatName =
        beautyCategories.find((c) => c.id === product.subCategoryId)?.name ||
        "Other";

      if (!grouped[subcatName]) grouped[subcatName] = [];
      grouped[subcatName].push(product);
    });

    setGroupedProducts(grouped);
  }, [selectedCategory, priceRange]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-b py-8">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <Sparkles className="h-10 w-10 text-pink-600" />
              Beauty
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Makeup, Skincare & Self Care Essentials
            </p>
          </div>
          <Badge className="bg-pink-600 text-white px-4 py-2 text-base">
            {productCount} Products
          </Badge>
        </div>
      </section>

      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card p-6 rounded-xl border space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Filter className="h-5 w-5" /> Filters
              </h3>

              {/* Price */}
              <div>
                <label className="text-sm font-semibold">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold">Category</label>
                <div
                  className={cn(
                    "space-y-2",
                    isExpanded && "max-h-48 overflow-y-auto pr-2"
                  )}
                >
                  {beautyCategories.map((cat, index) => {
                    if (!isExpanded && index >= 5) return null;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full px-3 py-2 text-left rounded text-sm",
                          selectedCategory === cat.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {beautyCategories.length > 5 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary text-sm flex items-center gap-1 pt-2"
                  >
                    {isExpanded ? (
                      <>
                        <Minus className="h-4 w-4" /> Show Less
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Show More
                      </>
                    )}
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(100000);
                  setSelectedCategory("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedProducts).map(([subcategory, products]) => (
              <div key={subcategory}>
                {selectedCategory === "all" && (
                  <div className="flex items-center gap-3 pb-3 border-b border-pink-400/30">
                    <h2 className="text-2xl font-bold">{subcategory}</h2>
                    <Badge className="bg-pink-500/20 text-pink-600">
                      {products.length}
                    </Badge>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
