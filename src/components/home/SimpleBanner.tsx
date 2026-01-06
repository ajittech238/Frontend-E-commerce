import React from "react";

const SimpleBanner = () => {
  const banners = [
    {
      title: "Smart Shopping",
      description: "Made Simple",
      image: "/a/black-friday-elements-assortment.jpg",
      link: "#",
    },
    {
      title: "Fashion Trends",
      description: "Modern & Stylish",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
      link: "#",
    },
    {
      title: "Tech Gadgets",
      description: "Latest Innovation",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
      link: "#",
    },
    {
      title: "Summer Sale",
      description: "Up to 70% off",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
      link: "#",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {banners.map((banner, index) => (
            <div
              key={index}
              className="group relative h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Background Image with Fluid Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${banner.image})` }}
              />

              {/* Overlay with Fluid Opacity */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {banner.title}
                  </h2>
                  <p className="mt-2 text-white/90 text-sm md:text-base">
                    {banner.description}
                  </p>
                  <div className="mt-4 inline-block h-1 w-0 bg-white group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleBanner;
