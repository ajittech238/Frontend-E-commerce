import { useEffect, useState } from "react";
import { ArrowRight, Award, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  "/images/exp-1.jpg",
  "/images/exp-2.jpg",
  "/images/exp-3.jpg",
];

const stats = [
  { icon: Briefcase, value: "5+", label: "Years Experience" },
  { icon: Users, value: "120+", label: "Happy Clients" },
  { icon: Award, value: "300+", label: "Projects Delivered" },
];

const ExperienceSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
        <section className="bg-[#020b2d] py-24 rounded-3xl ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT – Experience Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Experience That Drives
              <span className="text-primary"> Real Results</span>
            </h2>

            <p className="mt-5 text-white/70 max-w-lg">
              We craft high-performing digital experiences with a focus on
              scalability, performance, and modern design principles.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5"
                  >
                    <Icon className="text-primary mb-3" size={22} />
                    <h3 className="text-2xl font-bold text-white">
                      {item.value}
                    </h3>
                    <p className="text-sm text-white/70">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <Button className="mt-10 group">
              Explore Work
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Button>
          </div>

          {/* RIGHT – Image Carousel */}
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Experience"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  current === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>
    </div>
  );
};

export default ExperienceSection;
