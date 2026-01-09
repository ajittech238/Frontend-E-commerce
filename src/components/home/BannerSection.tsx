import { ArrowRight, Truck, RotateCcw, Shield, Heart, Leaf, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container space-y-24">
        {/* Main Promotional Banners */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Gifts Banner */}
          <Link
            to="/category/home"
            className="group relative overflow-hidden rounded-[2.5rem] bg-pink-50 border border-pink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative p-10 md:p-14 z-10 h-full flex flex-col justify-center min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6 w-fit">
                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Gift Guide</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Perfect <span className="text-pink-500">Presents</span> <br /> for Everyone
              </h3>
              <p className="text-slate-600 text-lg mb-8 max-w-xs font-light">
                Thoughtful, handcrafted treasures they'll cherish forever.
              </p>
              <Button className="w-fit h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl gap-2 font-bold shadow-lg transition-all">
                Shop Now <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Image section */}
            <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 md:w-80 md:h-80 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600"
                alt="Gift ideas"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </Link>

          {/* Sustainable Banner */}
          <Link
            to="/products"
            className="group relative overflow-hidden rounded-[2.5rem] bg-emerald-50 border border-emerald-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative p-10 md:p-14 z-10 h-full flex flex-col justify-center min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6 w-fit">
                <Leaf className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Eco-Friendly</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Sustainable <br /> <span className="text-emerald-500">Living</span>
              </h3>
              <p className="text-slate-600 text-lg mb-8 max-w-xs font-light">
                Shop consciously with our verified eco-friendly collection.
              </p>
              <Button className="w-fit h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-bold shadow-lg transition-all">
                Explore More <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Image section */}
            <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 md:w-80 md:h-80 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
                alt="Sustainable products"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </Link>
        </div>

        {/* Trust Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: Truck, 
              title: "Global Shipping", 
              desc: "Fast delivery to your doorstep", 
              color: "text-blue-500",
              bgColor: "bg-blue-50"
            },
            { 
              icon: RotateCcw, 
              title: "Easy Returns", 
              desc: "30-day hassle-free policy", 
              color: "text-purple-500",
              bgColor: "bg-purple-50"
            },
            { 
              icon: Shield, 
              title: "Secure Payment", 
              desc: "100% encrypted transactions", 
              color: "text-emerald-500",
              bgColor: "bg-emerald-50"
            },
            { 
              icon: Award, 
              title: "Quality Assurance", 
              desc: "Verified premium products", 
              color: "text-orange-500",
              bgColor: "bg-orange-50"
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-6 rounded-3xl border border-border hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-2xl ${feature.bgColor} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section (Refined) */}
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-10 md:p-20 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Join our <br /> <span className="text-primary">Community</span>
              </h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
                Get exclusive access to new arrivals, secret sales, and handcrafted 
                stories delivered straight to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-14 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-all"
              />
              <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all gap-2">
                Subscribe <Check className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
