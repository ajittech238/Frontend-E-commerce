import { ArrowRight, Truck, RotateCcw, Shield, Heart, Leaf, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container space-y-12">
        {/* Main Promotional Banners */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Gifts Banner with 3D effect */}
          <Link
            to="/category/home"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative p-8 md:p-10 z-10 ">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-Red/20 backdrop-blur-md border border-white/30 mb-6 bg-red-100/100 ">
                <Heart className="h-5 w-5 text-white  fill-pink-400 " />
                <span className="text-sm font-semibold text-red-400">Perfect Gifts</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-pink-500 mb-3 leading-tight">
                Unique Gift Ideas
              </h3>
              <p className="text-Black/80 text-lg mb-6 max-w-xs font-light">
                Thoughtful, handcrafted presents they'll actually love
              </p>
              <Button className="group/btn bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 hover:-translate-y-1">
                <span>Shop Gift Guide</span>
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Image section */}
            <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-tl-3xl">
              <img
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400"
                alt="Gift ideas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Link>

          {/* Sustainable Banner with 3D effect */}
          <Link
            to="/products"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100/20 via-emerald-50/10 to-emerald-100/5 border-2 border-emerald-200/30 hover:border-emerald-200/50 transition-all duration-300 hover:shadow-xl"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/5 to-emerald-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative p-8 md:p-10 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 mb-6">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Eco-Friendly</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
                Sustainable Choices
              </h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-xs font-light">
                Shop consciously with our eco-friendly collection
              </p>
              <Button className="group/btn bg-emerald-600 text-white hover:bg-emerald-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 hover:-translate-y-1">
                <span>Explore Sustainable</span>
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Image section */}
            <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-tl-3xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
                alt="Sustainable products"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Trust Features Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-border/50">
          {[
            { 
              icon: Truck, 
              title: "Free Shipping", 
              desc: "On orders over ₹999", 
              color: "from-blue-500 to-cyan-500",
              bgColor: "from-blue-500/10 to-cyan-500/10"
            },
            { 
              icon: RotateCcw, 
              title: "Easy Returns", 
              desc: "30-day return policy", 
              color: "from-purple-500 to-pink-500",
              bgColor: "from-purple-500/10 to-pink-500/10"
            },
            { 
              icon: Shield, 
              title: "Secure Checkout", 
              desc: "100% protected", 
              color: "from-green-500 to-emerald-500",
              bgColor: "from-green-500/10 to-emerald-500/10"
            },
            { 
              icon: Award, 
              title: "Verified Artisans", 
              desc: "Quality guaranteed", 
              color: "from-orange-500 to-red-500",
              bgColor: "from-orange-500/10 to-red-500/10"
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-5 md:p-6 rounded-2xl bg-gradient-to-br ${feature.bgColor} border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 md:p-12 text-white shadow-xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Stay Updated on New Arrivals 
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Get exclusive offers and be the first to discover new handcrafted treasures
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-all"
              />
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn gap-2 hover:-translate-y-1 whitespace-nowrap">
                <Check className="h-5 w-5" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
