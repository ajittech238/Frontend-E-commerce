import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { newArrivals, products } from "@/data/products";
import { Link } from "react-router-dom";

const NewArrivalsSection = () => {
  const arrivals = newArrivals.length >= 4 ? newArrivals : products.slice(6, 14);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-gradient/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Just Arrived</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                New Arrivals
              </h2>
            </div>
          </div>
          <Link to="/products">
            <Button className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 hover:-translate-y-1 whitespace-nowrap">
              <span>Browse All New</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-12">
          {arrivals.slice(0, 5).map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative group">
                <ProductCard product={product} index={index} />
                {/* New badge */}
                <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-white text-primary text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-slate-800">
                  ✨ New
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 text-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <p className="text-foreground font-semibold mb-2">
            🎉 Fresh products added every week
          </p>
          <p className="text-sm text-muted-foreground">
            Stay updated on the latest handcrafted items from our community of artisans
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
