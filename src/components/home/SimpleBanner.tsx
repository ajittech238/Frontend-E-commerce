import { url } from "inspector";
import { useEffect, useRef } from "react";
import bgimg from "../../../public/a/black-friday-elements-assortment.jpg"

const SimpleBanner = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();``
  }, []);

  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-white ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center container rounded-3xl "
        style={{   backgroundImage:
            "url(/a/black-friday-elements-assortment.jpg)" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Text */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <div
            ref={textRef}
            className="max-w-xl opacity-0 translate-y-6 transition-all duration-700 ease-out"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Smart Shopping,
              <br />
              Made Simple
            </h1>

            <p className="mt-4 text-white/90 text-lg">
              Discover modern products curated for everyday life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleBanner;
