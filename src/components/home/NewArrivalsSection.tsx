import { useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { newArrivals, products } from "@/data/products";
import { Link } from "react-router-dom";

const NewArrivalsSection = () => {
  const arrivals =
    newArrivals.length >= 4 ? newArrivals : products.slice(6, 14);

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
                <span className="text-sm font-semibold text-primary">
                  Just Arrived
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                New Arrivals
              </h2>
            </div>
          </div>

          <Link to="/products">
            <Button className="group bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all gap-2 hover:-translate-y-1 whitespace-nowrap">
              Browse All New
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* 🔥 Scrollable Products */}
        <div className="relative mb-12">
          {/* Left Button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>

          {/* Products Row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
          >
            {arrivals.slice(0, 10).map((product, index) => (
              <div
                key={product.id}
                className="min-w-[260px] animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative group">
                  <ProductCard product={product} index={index} />
                  {/* New badge */}
                  <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-white text-primary text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity dark:bg-slate-800">
                    ✨ New
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* Info Section */}
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 text-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <p className="font-semibold mb-2">
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
