import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Handcrafted with Love",
    subtitle: "Discover unique artisan treasures made just for you",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
    cta: "Shop Handmade",
    link: "/products",
    overlay: "bg-gradient-to-r from-black/70 via-black/50 to-black/30",
    badge: "✨ Trending",
    color: "from-primary to-purple-600",
  },
  {
    title: "Vintage & One-of-a-Kind",
    subtitle: "Find rare pieces with stories to tell",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600",
    cta: "Explore Vintage",
    link: "/category/fashion",
    overlay: "bg-gradient-to-r from-black/70 via-black/50 to-black/30",
    badge: "🔥 Limited",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Support Small Artisans",
    subtitle: "Every purchase helps independent creators thrive",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600",
    cta: "Meet Makers",
    link: "/category/home",
    overlay: "bg-gradient-to-r from-black/70 via-black/50 to-black/30",
    badge: "💝 Premium",
    color: "from-emerald-500 to-teal-600",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className={cn("absolute inset-0", slide.overlay)} />

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4">
                <div
                  className={cn(
                    "max-w-2xl transition-all duration-1000",
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  )}
                >
                  {/* Badge */}
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
                    <span className="text-white text-xs font-semibold">{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-gray-200 text-lg md:text-xl max-w-lg mb-8">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <Link to={slide.link}>
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 group gap-2 text-base"
                    >
                      {slide.cta}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Categories Strip - Modern Interactive */}
      <div className="bg-gradient-to-r from-background via-primary/5 to-background border-b border-border/50 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { label: "Jewelry & Accessories", icon: "💍", count: "12,000+ items", delay: 0 },
              { label: "Home & Living", icon: "🏠", count: "8,500+ items", delay: 100 },
              { label: "Clothing & Shoes", icon: "👗", count: "15,000+ items", delay: 200 },
              { label: "Art & Collectibles", icon: "🎨", count: "6,000+ items", delay: 300 },
            ].map((item, i) => (
              <Link
                key={i}
                to="/products"
                style={{ animationDelay: `${item.delay}ms` }}
                className="group relative flex flex-col items-center md:flex-row md:items-center md:gap-4 p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 animate-in fade-in slide-in-from-bottom-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <span className="text-4xl md:text-5xl group-hover:scale-135 transition-transform duration-300 relative z-10">{item.icon}</span>
                <div className="text-center md:text-left mt-3 md:mt-0 relative z-10">
                  <p className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">{item.label}</p>
                  <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">{item.count}</p>
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
