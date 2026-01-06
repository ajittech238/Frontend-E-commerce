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
    <section className="py-16 md:py-10 bg-gradient-to-b from-background to-accent/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Customer Reviews
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Real reviews from real customers who love our products and experience
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-border shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20 group-hover:text-primary/40 transition" />

              {/* User */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {review.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-muted-foreground leading-relaxed">
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
