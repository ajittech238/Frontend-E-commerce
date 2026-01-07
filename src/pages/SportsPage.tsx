// Import necessary hooks and components from React and other libraries.
import React, { useState, useEffect, useRef } from "react";
import { Filter, Gem, Plus, Minus, Dumbbell } from "lucide-react";

// Import UI components and utilities.
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

// Import data for the page.
import { sportsCategories, sportsProducts } from "@/data/Sports";
import { Product } from "@/types/product";

// Define an interface for the object that will hold products grouped by sub-category.
interface GroupedProducts {
  [key: string]: Product[];
}

export default function SportsPage() {
  // State for the price range filter.
  const [priceRange, setPriceRange] = useState(50000);
  // State for the selected category filter.
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // State to hold the products grouped by sub-category.
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  // State to hold the total count of filtered products.
  const [productCount, setProductCount] = useState(0);
  // State to control the collapsed/expanded state of the category list.
  const [isExpanded, setIsExpanded] = useState(false);

  // Recalculate filtering and grouping whenever filters change
  useEffect(() => {
    const filtered = sportsProducts.filter((product) => {
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
        sportsCategories.find(
          (c) => c.id === product.subCategoryId
        )?.name || "Other";

      if (!grouped[subcatName]) {
        grouped[subcatName] = [];
      }
      grouped[subcatName].push(product);
    });

    setGroupedProducts(grouped);
  }, [selectedCategory, priceRange]);

  // Format price as INR
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Page Header Section */}
      <section className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-b border-border/50 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                <Dumbbell className="h-10 w-10 text-blue-600" />
                Sports
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Gear up for your peak performance.
              </p>
            </div>
            <Badge className="text-base px-4 py-2 bg-blue-600 text-white">
              {productCount} Products
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar for Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Up to {formatPrice(priceRange)}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-sm font-semibold">Category</label>
                <div
                  className={cn(
                    "space-y-2",
                    isExpanded ? "max-h-48 overflow-y-auto scrollbar-hide pr-2" : ""
                  )}
                >
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "w-full px-3 py-2 rounded text-sm font-medium text-left transition-all",
                      selectedCategory === "all" ? "text-primary" : "text-foreground"
                    )}
                  >
                    All Sports
                  </button>
                  {sportsCategories.map((cat, index) => {
                    if (!isExpanded && index >= 4) return null; // Show 4 categories + 'All'
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full px-3 py-2 rounded text-sm font-medium text-left transition-all",
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

                {sportsCategories.length > 4 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm font-semibold text-primary flex items-center gap-1 pt-2"
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

              {/* Reset */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange(50000);
                  setSelectedCategory("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Product Display Section */}
          <div className="lg:col-span-4 space-y-12">
            {Object.keys(groupedProducts).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No sports gear found with the selected filters.
                </p>
              </div>
            ) : (
              Object.entries(groupedProducts).map(
                ([subcategory, products]) => (
                  <div key={subcategory} className="space-y-4">
                    {selectedCategory === "all" && (
                      <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500/30">
                        <h2 className="text-2xl md:text-3xl font-bold capitalize">
                          {subcategory}
                        </h2>
                        <Badge className="bg-blue-500/20 text-blue-700">
                          {products.length}
                        </Badge>
                      </div>
                    )}

                    <div
                      className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
                        selectedCategory === "all" ? "lg:grid-cols-4" : "lg:grid-cols-3"
                      )}
                    >
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}