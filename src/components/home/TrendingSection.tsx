// import { ArrowRight, TrendingUp, Flame } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ProductCard from "@/components/products/ProductCard";
// import { trending, products } from "@/data/products";
// import { Link } from "react-router-dom";

// const TrendingSection = () => {
//   const trendingProducts = trending.length >= 4 ? trending : products.slice(0, 8);

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
//       <div className="container">
//         {/* Header with badge */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top duration-700">
//           <div>
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
//               <Flame className="h-4 w-4 text-primary animate-pulse" />
//               <span className="text-sm font-semibold text-primary">Hot This Week</span>
//             </div>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
//               Trending Now
//             </h2>
//             <p className="text-muted-foreground mt-2">Discover what's hot and what customers love</p>
//           </div>
//           <Link to="/products">
//             <Button className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 hover:-translate-y-1">
//               <span>Explore Trending</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>

//         {/* Products Grid with hover effects */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
//           {trendingProducts.slice(0, 5).map((product, index) => (
//             <div
//               key={product.id}
//               className="animate-in fade-in slide-in-from-bottom-4 duration-500 hover:scale-105 transition-transform"
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               <div className="relative group">
//                 <ProductCard product={product} index={index} />
//                 {/* Trending badge */}
//                 <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   🔥 Trending
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-14 text-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
//           <p className="text-muted-foreground mb-6">
//             💡 New trending items are discovered every day!
//           </p>
//           <Link to="/products">
//             <Button variant="outline" className="rounded-xl border-2 font-semibold px-8 py-3 group">
//               <TrendingUp className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
//               View All Trending Products
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;
import { useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { trending, products } from "@/data/products";
import { Link } from "react-router-dom";

const TrendingSection = () => {
  const trendingProducts =
    trending.length >= 4 ? trending : products.slice(0, 8);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* ================= MANUAL SCROLL ================= */
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const isMobile = window.innerWidth < 640;
    const scrollAmount = isMobile
      ? window.innerWidth * 0.75
      : 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const isMobile = window.innerWidth < 640;
      const scrollAmount = isMobile
        ? window.innerWidth * 0.75
        : 300;

      const container = scrollRef.current;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - scrollAmount
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:py-10 bg-gradient-to-b from-background to-accent/5">
      <div className="container">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-gradient/10 border border-primary/20 mb-4">
              <Flame className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">
                Hot This Week
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">
              Trending Now
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover what's hot and what customers love
            </p>
          </div>

          <Link to="/products">
            <Button className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl shadow-lg gap-2">
              Explore Trending
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative">

          {/* LEFT BUTTON (DESKTOP ONLY) */}
          <button
            onClick={() => handleScroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>

          {/* CARDS */}
          <div
            ref={scrollRef}
            className="
              flex items-center
              gap-3 md:gap-4
              overflow-x-auto overflow-y-visible
              scrollbar-hide scroll-smooth
              px-2 md:px-2
              snap-x snap-mandatory
            "
          >
            {trendingProducts.slice(0, 10).map((product, index) => (
              <div
                key={product.id}
                className="
                  w-[75vw]
                  min-w-[75vw]
                  sm:w-auto
                  sm:min-w-[220px]
                  md:min-w-[300px]
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

        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            💡 New trending items are discovered every day!
          </p>

          <Link to="/products">
            <Button
              variant="outline"
              className="rounded-xl border-2 font-semibold px-8 py-3"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              View All Trending Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
