import React, { useEffect, useState } from "react";
import { Filter, Trophy, Plus, Minus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sportsProducts, sportsCategories, SportsProduct } from "@/data/Sports";

interface GroupedProducts {
  [key: string]: SportsProduct[];
}

export default function SportsPage() {
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [productCount, setProductCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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
        sportsCategories.find((c) => c.id === product.subCategoryId)?.name ||
        "Other";
      grouped[subcatName] = grouped[subcatName] || [];
      grouped[subcatName].push(product);
    });

    setGroupedProducts(grouped);
  }, [priceRange, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* HEADER */}
      <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-8 border-b">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Trophy className="h-9 w-9 text-orange-600" />
              Sports
            </h1>
            <p className="text-muted-foreground mt-2">
              Gear up for every game.
            </p>
          </div>
          <Badge className="bg-orange-600 text-white px-4 py-2">
            {productCount} Products
          </Badge>
        </div>
      </section>

      {/* CONTENT */}
      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FILTER */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card p-6 rounded-xl border space-y-6">
              <h3 className="font-bold flex items-center gap-2">
                <Filter className="h-5 w-5" /> Filters
              </h3>

              {/* PRICE */}
              <div>
                <label className="text-sm font-semibold">Price</label>
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onChange={(e) => setPriceRange(+e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Up to ₹{priceRange}
                </p>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-semibold">Category</label>
                <div className={cn("space-y-2", isExpanded && "max-h-48 overflow-y-auto")}>
                  {sportsCategories.map((cat, i) =>
                    !isExpanded && i >= 6 ? null : (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded text-sm",
                          selectedCategory === cat.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    )
                  )}
                </div>

                {sportsCategories.length > 6 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary text-sm flex items-center gap-1 mt-2"
                  >
                    {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange(50000);
                  setSelectedCategory("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-4 space-y-12">
            {Object.entries(groupedProducts).map(([group, products]) => (
              <div key={group} className="space-y-4">
                {selectedCategory === "all" && (
                  <div className="flex gap-3 items-center border-b pb-2">
                    <h2 className="text-2xl font-bold">{group}</h2>
                    <Badge>{products.length}</Badge>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
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
