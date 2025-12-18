import { useParams, Navigate } from "react-router-dom";
import { products, categories } from "@/data/products";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";

const Category = () => {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);
  const categoryProducts = products.filter((p) => p.category === id);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {category.name}
          </h1>
          <p className="text-muted-foreground">
            {categoryProducts.length} products in this category
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products in this category yet.
            </p>
          </div>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Category;
