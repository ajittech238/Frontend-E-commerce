// Import necessary hooks and components from React and other libraries.
import React, { useState, useEffect } from "react";
import { Filter, Plus, Minus } from "lucide-react";

// Import UI components and utilities.
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

// Import data for the page.
import { womensCategories, womensProducts } from "../data/Womenfashion";
import { Product } from "@/types/product";

interface GroupedProducts {
  [key: string]: Product[];
}

export default function WomenFashionPage() {
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [productCount, setProductCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const filtered = womensProducts.filter((product) => {
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
        womensCategories.find((c) => c.id === product.subCategoryId)?.name ||
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

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b py-8">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <img src="/a/womenlogo1.png" className="h-18 w-20" />
              Women's Fashion
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Style That Defines You
            </p>
          </div>
          <Badge className="text-base px-4 py-2 bg-[#9d4855d1] hover:shadow-md  text-white">
            {productCount} Products
          </Badge>
        </div>
      </section>

      {/* Main */}
      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-card p-6 rounded-xl border">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Filter className="h-5 w-5" /> Filters
              </h3>

              {/* Price */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(+e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">Category</label>

                <div
                  className={cn(
                    "space-y-2",
                    isExpanded && "max-h-48 overflow-y-auto pr-2"
                  )}
                >
                  {womensCategories.map((cat, index) => {
                    if (!isExpanded && index >= 5) return null;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full px-3 py-2 rounded text-sm text-left transition",
                          selectedCategory === cat.id
                            ? "text-primary font-semibold"
                            : "text-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {womensCategories.length > 5 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-primary flex items-center gap-1"
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
            {Object.keys(groupedProducts).length === 0 ? (
              <p className="text-center text-xl text-muted-foreground py-16">
                No products found
              </p>
            ) : (
              Object.entries(groupedProducts).map(([subcategory, products]) => (
                <div key={subcategory} className="space-y-4">
                  {selectedCategory === "all" && (
                    <div className="flex items-center gap-3 border-b pb-2">
                      <h2 className="text-2xl font-bold">{subcategory}</h2>
                      <Badge>{products.length}</Badge>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
