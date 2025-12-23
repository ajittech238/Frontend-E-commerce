// Import necessary hooks and components from React and other libraries.
import React, { useState, useEffect } from "react";
import { Filter, Home, Plus, Minus } from "lucide-react";

// Import UI components and utilities.
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

// Import data for the page.
import { groceryCategories,groceryProducts } from "@/data/Grocery";
import { Product } from "@/types/product";

// Define an interface for the object that will hold products grouped by sub-category.
interface GroupedProducts {
    [key: string]: Product[];
}

export default function Grocerypage() {
    // State for the price range filter.
    const [priceRange, setPriceRange] = useState(100000);
    // State for the selected category filter.
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    // State to hold the products grouped by sub-category.
    const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
    // State to hold the total count of filtered products.
    const [productCount, setProductCount] = useState(0);
    // State to control the collapsed/expanded state of the category list.
    const [isExpanded, setIsExpanded] = useState(false);

    // This effect re-calculates filtering and grouping whenever the filters change.
    useEffect(() => {
        // First, filter by price and selected category.
        const filtered = groceryProducts.filter((product) => {
            const matchesPrice = product.price <= priceRange;
            // The category matches if 'all' is selected or if the product's subCategoryId matches.
            const matchesCategory = selectedCategory === "all" || product.subCategoryId === selectedCategory;
            return matchesPrice && matchesCategory;
        });

        // Update the total product count.
        setProductCount(filtered.length);

        // Now, group the filtered products by their sub-category name.
        const grouped: GroupedProducts = {};
        filtered.forEach((product) => {
            // Find the name of the sub-category from the categories array.
            const subcatName = groceryCategories.find(c => c.id === product.subCategoryId)?.name || "Other";
            if (!grouped[subcatName]) {
                grouped[subcatName] = [];
            }
            grouped[subcatName].push(product);
        });
        setGroupedProducts(grouped);
    }, [selectedCategory, priceRange]); // The effect depends on these two filter states.

    // Helper function to format numbers as Indian Rupees.
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            {/* Page Header Section */}
            <section className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-b border-border/50 py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3">
                                <Home className="h-10 w-10 text-green-700" />
                                Home & Living
                            </h1>
                            <p className="text-muted-foreground mt-2 text-lg">
                                Everything to make your home a better place.
                            </p>
                        </div>
                        <Badge className="text-base px-4 py-2 bg-green-600 text-white">
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
                            {/* Filter Header */}
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Filter className="h-5 w-5" />
                                    Filters
                                </h3>
                            </div>

                            {/* Price Range Slider */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-foreground">Price Range</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-sm text-muted-foreground">
                                    Up to {formatPrice(priceRange)}
                                </div>
                            </div>

                            {/* Category Filter Buttons */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-foreground">Category</label>
                                <div className={cn("space-y-2", isExpanded && "max-h-48 overflow-y-auto scrollbar-hide pr-2")}>
                                    {/* Show all categories, or just the first few if not expanded */}
                                    {groceryCategories.map((cat, index) => {
                                        if (!isExpanded && index >= 5) return null; // Only show first 4 if not expanded
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={cn(
                                                    "w-full px-3 py-2 rounded  text-sm font-medium transition-all text-left",
                                                    selectedCategory === cat.id
                                                        ? " text-primary"
                                                        : " text-foreground "
                                                )}
                                            >
                                                {cat.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Button to toggle the expanded state */}
                                {groceryCategories.length > 5 && ( // Only show button if there are more than 4 categories
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 pt-2"
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

                            {/* Reset Filters Button */}
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

                    {/* Product Display Section */}
                    <div className="lg:col-span-4 space-y-12">
                        {Object.keys(groupedProducts).length === 0 ? (
                            // Message to show when no products match the filters.
                            <div className="text-center py-16">
                                <p className="text-xl text-muted-foreground">No products found with the selected filters.</p>
                            </div>
                        ) : (
                            // Map over the grouped products and render a section for each group.
                            Object.entries(groupedProducts).map(([subcategory, products]) => (
                                <div key={subcategory} className="space-y-4">
                                    {/* Do not show the sub-category header if a specific category is selected */}
                                    {selectedCategory === "all" && (
                                        <div className="flex items-center gap-3 pb-3 border-b-2 border-green-500/30">
                                            <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                                                {subcategory}
                                            </h2>
                                            <Badge className="bg-green-500/20 text-green-600">{products.length}</Badge>
                                        </div>
                                    )}

                                    {/* Grid of products for the sub-category. */}
                                    <div className={cn(
                                        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                                        selectedCategory !== "all" && "lg:grid-cols-3"
                                    )}>
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
