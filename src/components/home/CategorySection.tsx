import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useRef } from "react";

/* ===== IMAGES ===== */
const categoryImages: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  fashion: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
  home: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
  sports: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
  books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
  toys: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
};

const CategorySection = () => {
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // ✅ stop only if center card
    if (swiper.realIndex === index) {
      swiper.autoplay?.stop();
    }
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
  };

  return (
    <section className="py-10 bg-gradient-to-b from-background to-accent/5 ml-10">
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary ">
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

        {/* SLIDER */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect="coverflow"
          centeredSlides
          grabCursor
          slidesPerView="auto"
          loop
          speed={900}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 25,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="py-16"
        >
          {categories.slice(0, 8).map((category, index) => (
            <SwiperSlide key={category.id} className="w-[280px] md:w-[300px]">
              <Link
                to={`/category/${category.id}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="group relative block rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border transition-all hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="aspect-[5/7] relative">
                  <img
                    src={categoryImages[category.id]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="text-white text-xl font-bold">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {Math.floor(Math.random() * 500 + 100)}+ items
                  </p>

                  <span className="relative inline-flex items-center gap-2 px-5 py-2 text-white font-semibold text-sm overflow-hidden">
                    <span className="absolute inset-0 bg-pink-200/70 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-3xl" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Explore
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;
