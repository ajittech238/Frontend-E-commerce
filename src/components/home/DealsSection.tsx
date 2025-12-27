// import { useState, useEffect } from "react";
// import { ArrowRight, Clock, Zap, Gift, TrendingUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ProductCard from "@/components/products/ProductCard";
// import { deals } from "@/data/products";
// import { Link } from "react-router-dom";

// const DealsSection = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 23,
//     minutes: 59,
//     seconds: 59,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev.seconds > 0) {
//           return { ...prev, seconds: prev.seconds - 1 };
//         } else if (prev.minutes > 0) {
//           return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
//         } else if (prev.hours > 0) {
//           return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
//         }
//         return { hours: 23, minutes: 59, seconds: 59 };
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
//       </div>

//       <div className="container relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top duration-700">
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
//               <Zap className="h-8 w-8 text-white animate-pulse" />
//             </div>
//             <div>
//               <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground flex items-center gap-2">
//                 <span>Flash Deals</span>
//                 <span className="text-2xl">🔥</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Limited time offers on handpicked collections
//               </p>
//             </div>
//           </div>

//           {/* Countdown Timer */}
//           <div className="group flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-lg">
//             <Clock className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '2s' }} />
//             <div>
//               <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Ends in</p>
//               <div className="flex gap-2 mt-1">
//                 {Object.entries(timeLeft).map(([unit, value], idx) => (
//                   <div key={unit} className="flex items-center gap-1">
//                     <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-3 py-1.5 rounded-lg text-sm font-bold min-w-[3rem] text-center shadow-md">
//                       {String(value).padStart(2, "0")}
//                     </div>
//                     {idx < 2 && <span className="text-foreground font-bold text-lg">:</span>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid with smooth animations */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-12">
//           {deals.slice(0, 5).map((product, index) => (
//             <div
//               key={product.id}
//               className="animate-in fade-in slide-in-from-bottom-4 duration-500"
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               <ProductCard product={product} index={index} />
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
//           <div className="flex items-center gap-4">
//             <TrendingUp className="h-8 w-8 text-primary" />
//             <div>
//               <p className="font-semibold text-foreground text-lg">
//                 Don't miss these amazing deals!
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 New limited-time offers added every hour
//               </p>
//             </div>
//           </div>
//           <Link to="/deals" className="whitespace-nowrap">
//             <Button className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 hover:-translate-y-1">
//               <span>View All Deals</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>

//         {/* Success message */}
//         <div className="text-center mt-8 text-sm text-muted-foreground font-medium animate-in fade-in duration-700 delay-500">
//           💝 Free shipping on orders over ₹999 — Use code FLASH20 for extra 20% off
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DealsSection;





import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { deals } from "@/data/products";
import { Link } from "react-router-dom";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const scrollRef = useRef(null);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll Handler
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Zap className="h-8 w-8 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-2">
                Flash Deals <span>🔥</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Limited time offers on handpicked collections
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 border border-primary/20 shadow-lg">
            <Clock className="h-6 w-6 text-primary animate-spin" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">
                Ends in
              </p>
              <div className="flex gap-2 mt-1">
                {Object.entries(timeLeft).map(([_, value], idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="bg-primary text-white px-3 py-1 rounded-lg font-bold">
                      {String(value).padStart(2, "0")}
                    </span>
                    
                    {idx < 2 && <span className="font-bold">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            {deals.slice(0, 10).map((product, index) => (
              <div
                key={product.id}
                className="min-w-[260px] animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} index={index} />
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

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-lg">
                Don't miss these amazing deals!
              </p>
              <p className="text-sm text-muted-foreground">
                New offers added every hour
              </p>
            </div>
          </div>

          <Link to="/deals">
            <Button className="gap-2 px-8 py-3">
              View All Deals
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          💝 Free shipping on orders over ₹999 — Use code FLASH20
        </p>
      </div>
    </section>
  );
};

export default DealsSection;
