import { Star, Quote } from "lucide-react";

type Review = {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Amazing quality and super fast delivery! The UI and shopping experience is top-notch.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Happy Customer",
    rating: 4,
    comment:
      "Loved the products and the modern design. Definitely ordering again!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Regular Customer",
    rating: 5,
    comment:
      "One of the best e-commerce experiences I’ve had. Clean UI & great support.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Voices of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Community</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Discover why thousands of customers trust us for their premium shopping needs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* User */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                   <img
                     src={review.avatar}
                     alt={review.name}
                     className="relative h-16 w-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-lg"
                   />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {review.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-200 dark:text-slate-700"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-slate-600 dark:text-slate-400 text-lg font-light leading-relaxed italic">
                “{review.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
