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

  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* ================= MANUAL SCROLL (SAME AS DEALS) ================= */
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const isMobile = window.innerWidth < 640;
    const scrollAmount = isMobile
      ? window.innerWidth * 0.75
      : 260;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 md:py-5 bg-gradient-to-r from-background via-accent/5 to-background relative overflow-hidden">
      <div className="container relative z-10">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Star className="h-6 w-6 text-white" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Just Arrived
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                New Arrivals
              </h2>
            </div>
          </div>

          <Link to="/products">
            <Button className="bg-gradient-to-r from-primary to-primary/90 text-white px-5 py-3 rounded-xl shadow-lg gap-2">
              Browse All
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative mb-12">

          {/* LEFT BUTTON (DESKTOP ONLY) */}
          <button
            onClick={() => handleScroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>

          {/* PRODUCTS ROW */}
          <div
            ref={scrollRef}
            className="
              flex items-center
              gap-3 md:gap-4
              overflow-x-auto overflow-y-visible
              scroll-smooth scrollbar-hide
              px-2 md:px-1
              snap-x snap-mandatory
            "
          >
            {arrivals.slice(0, 10).map((product, index) => (
              <div
                key={product.id}
                className="
                  w-[75vw]
                  min-w-[75vw]
                  sm:w-auto
                  sm:min-w-[200px]
                  md:min-w-[260px]
                  flex justify-center
                  snap-center
                "
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON (DESKTOP ONLY) */}
          <button
            onClick={() => handleScroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* ================= INFO ================= */}
        <div className="p-6 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
          <p className="font-semibold mb-1">
            🎉 Fresh products added every week
          </p>
          <p className="text-sm text-muted-foreground">
            Stay updated on the latest handcrafted items from our community
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
