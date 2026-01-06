import { TrendingUp } from "lucide-react";

const products = [
  {
    name: "Wireless Headphones Pro",
    category: "Electronics",
    sales: 1234,
    revenue: "$148,080",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
  },
  {
    name: "Premium Cotton T-Shirt",
    category: "Apparel",
    sales: 956,
    revenue: "$28,680",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
  },
  {
    name: "Smart Watch Series 5",
    category: "Electronics",
    sales: 847,
    revenue: "$254,100",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
  },
  {
    name: "Leather Crossbody Bag",
    category: "Accessories",
    sales: 723,
    revenue: "$86,760",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop",
  },
  {
    name: "Running Shoes Elite",
    category: "Footwear",
    sales: 698,
    revenue: "$104,700",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
  },
];

export function TopProducts() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Selling Products</h3>
          <p className="text-sm text-muted-foreground">Best performers this month</p>
        </div>
        <div className="flex items-center gap-1 text-success text-sm font-medium">
          <TrendingUp className="h-4 w-4" />
          <span>+12.5%</span>
        </div>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <span className="text-sm font-semibold text-muted-foreground w-5">
              {index + 1}
            </span>
            <img
              src={product.image}
              alt={product.name}
              className="h-12 w-12 rounded-lg object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{product.revenue}</p>
              <p className="text-sm text-muted-foreground">{product.sales} sales</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
