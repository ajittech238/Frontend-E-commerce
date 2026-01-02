import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bgVideo from "/a/Ecommerce_Advertising_Video_720P.mp4";

/* ================= SLIDER DATA ================= */
const slides = [
  {
    title: "Handcrafted Jewelry",
    subtitle: "Made by independent artisans",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900",
  },
  {
    title: "Vintage Decor",
    subtitle: "Rare pieces with stories",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=900",
  },
  {
    title: "Modern Home Living",
    subtitle: "Minimal, elegant & timeless",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  /* ===== VIDEO REFS ===== */
  const bgVideoRef = useRef(null);
  const cardVideoRef = useRef(null);

  /* ===== SLIDER AUTOPLAY ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  /* ===== VIDEO SYNC LOGIC ===== */
  useEffect(() => {
    const bg = bgVideoRef.current;
    const card = cardVideoRef.current;
    if (!bg || !card) return;

    const syncVideos = () => {
      card.currentTime = bg.currentTime;
      card.play().catch(() => {});
    };

    bg.addEventListener("play", syncVideos);

    bg.addEventListener("timeupdate", () => {
      if (Math.abs(bg.currentTime - card.currentTime) > 0.05) {
        card.currentTime = bg.currentTime;
      }
    });

    return () => {
      bg.removeEventListener("play", syncVideos);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        ref={bgVideoRef}
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/90 z-10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* LEFT CARD */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 mx-auto max-w-md lg:max-w-none">
          {/* CARD VIDEO */}
          <video
            ref={cardVideoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[300px] sm:h-[380px] md:h-[460px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent" />

          <div className="absolute bottom-6 sm:bottom-10 left-6 right-6">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm">
              🛍 Premium Marketplace
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover Products <br /> That Tell Stories
            </h1>

            <p className="text-gray-300 mt-3 text-sm sm:text-base max-w-md">
              Explore curated collections from small brands & creators.
            </p>

            <Link to="/products">
              <Button className="mt-6 gap-2 text-lg px-8 py-6">
                Shop Collection <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative h-[360px] sm:h-[420px] md:h-[520px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "absolute rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-1000",
                "w-[220px] h-[300px] sm:w-[260px] sm:h-[360px] md:w-[380px] md:h-[480px]",
                index === activeSlide
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-90 z-10"
              )}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  {slide.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories Strip */}
      <div className="bg-white/5 dark:bg-slate-900/50 backdrop-blur-md border-t border-border/50 py-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Jewelry", icon: "💍", count: "12,000+" },
              { label: "Home & Living", icon: "🏠", count: "8,500+" },
              { label: "Clothing", icon: "👗", count: "15,000+" },
              { label: "Art", icon: "🎨", count: "6,000+" },
            ].map((item, i) => (
              <Link
                key={i}
                to="/products"
                className="flex flex-col items-center md:flex-row md:items-center md:gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-4xl mb-2 md:mb-0">{item.icon}</span>
                <div className="text-center md:text-left">
                  <p className="font-bold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
