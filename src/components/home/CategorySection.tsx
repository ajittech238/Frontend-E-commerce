import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const CategorySection = () => {
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (swiper.realIndex === index) {
      swiper.autoplay?.stop();
    }
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <Sparkles className="h-4 w-4 text-pink-600" />
            <span className="text-sm font-semibold text-pink-600">
              Explore Collections
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Shop by{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Discover handcrafted treasures and curated collections from
            independent artisans around the world
          </p>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="py-12"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id} className="w-[280px] md:w-[320px]">
                <Link
                  to={`/category/${category.id}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={cn(
                    "group relative block rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-border transition-all duration-500 hover:shadow-2xl hover:border-pink-500/50",
                    "aspect-[4/5]"
                  )}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      New
                    </div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform transition-transform duration-300">
                      <h3 className="font-display font-bold text-xl text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 font-light">
                        {Math.floor(Math.random() * 500 + 100)}+ Unique Items
                      </p>

                      <div className="relative inline-flex items-center gap-2 py-2 text-white font-semibold text-sm group/btn">
                        <span className="relative z-10 flex items-center gap-2">
                          Explore
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <Link to="/products">
            <button className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-border hover:border-pink-500 text-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span>View All Categories</span>
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center transition-colors group-hover:bg-pink-500">
                <ArrowRight className="h-4 w-4 text-pink-600 transition-colors group-hover:text-white" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
