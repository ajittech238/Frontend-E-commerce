// import { Link } from "react-router-dom";
// import { ArrowRight, Sparkles } from "lucide-react";
// import { categories } from "@/data/products";
// import { cn } from "@/lib/utils";

// const categoryImages: Record<string, string> = {
//   electronics:
//     "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
//   fashion: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
//   home: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
//   beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
//   sports: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
//   books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
//   toys: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
//   grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
// };

// const CategorySection = () => {
//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-accent/5 relative overflow-hidden">
//       {/* Decorative background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
//         <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
//       </div>

//       <div className="container relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
//             <Sparkles className="h-4 w-4 text-primary" />
//             <span className="text-sm font-semibold text-primary ">
//               Explore Collections
//             </span>
//           </div>
//           <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
//             Shop by{" "}
//             <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//               Category
//             </span>
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
//             Discover handcrafted treasures and curated collections from
//             independent artisans around the world
//           </p>
//         </div>

//         {/* Category Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12">
//           {categories.slice(0, 8).map((category, index) => (
//             <Link
//               key={category.id}
//               to={`/category/${category.id}`}
//               className={cn(
//                 "group relative bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-border hover:border-primary",
//                 "animate-in fade-in slide-in-from-bottom-4 duration-500"
//               )}
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               {/* Image Container */}
//               <div className="aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-primary/10 to-primary/5">
//                 <img
//                   src={
//                     categoryImages[category.id] ||
//                     "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400"
//                   }
//                   alt={category.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                 />

//                 {/* Overlay with gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

//                 {/* Badge */}
//                 <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20  backdrop-blur-md border border-white/30 text-black text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   New
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
//                 <div className="transform group-hover:translate-y-0 transition-transform duration-300">
//                   <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 leading-tight">
//                     {category.name}
//                   </h3>
//                   <p className="text-white/70 text-xs md:text-sm mb-3 font-light">
//                     {Math.floor(Math.random() * 500 + 100)}+ unique items
//                   </p>
//                   <span className="relative inline-flex items-center gap-2 px-5 py-2 text-white font-semibold text-sm overflow-hidden group">
//                     {/* fluid baby-pink bg */}
//                     <span className="absolute inset-0 bg-pink-200/70 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-3xl " />

//                     {/* content */}
//                     <span className="relative z-10 inline-flex items-center gap-2 ">
//                       Explore
//                       <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     </span>
//                   </span>
//                 </div>

//                 {/* Shimmer effect on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* View All Section */}
//         <div className="flex justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
//           <Link to="/products">
//             <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//               <span>View All Categories</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;










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
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
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
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay.start();
  };

  return (
    <section className="py-10 bg-gradient-to-b from-background to-accent/5 ml-10">
      <div className="container">
        {/* HEADER */}
      <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 ">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Explore Collections
            </span>
          </div>
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





