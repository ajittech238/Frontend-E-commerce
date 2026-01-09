import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import ProductDisplay from "@/components/products/ProductDisplay";
import { products } from "@/data/products";
import { electronicsProducts } from "@/data/electronics";
import { homeLivingProducts } from "@/data/Home&living";
import { groceryProducts } from "@/data/grocery";
import { booksProducts } from "@/data/books";
import { perfumeProducts } from "@/data/perfume";
import { jewelleryProducts } from "@/data/Jewellery";
import { sportsProducts } from "@/data/Sports";
import { fashionProducts } from "@/data/fashion";
import { beautyProducts } from "@/data/beauty";
import { mensProducts } from "@/data/Menfashion";

const ProductDetail = () => {
  const { id } = useParams();

  const allProductArrays = useMemo(() => [
    products,
    electronicsProducts,
    homeLivingProducts,
    groceryProducts,
    booksProducts,
    perfumeProducts,
    jewelleryProducts,
    sportsProducts,
    fashionProducts,
    beautyProducts,
    mensProducts,
  ], []);

  const product = useMemo(() => {
    for (const productArray of allProductArrays) {
      const foundProduct = productArray.find((p) => p.id === id);
      if (foundProduct) return foundProduct;
    }
    return null;
  }, [id, allProductArrays]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const allProducts = allProductArrays.flat();
    let filtered = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );

    if (filtered.length < 4) {
      const moreProducts = allProducts
        .filter(
          (p) => !filtered.some((fp) => fp.id === p.id) && p.id !== product.id
        )
        .sort(() => Math.random() - 0.5);
      filtered = [...filtered, ...moreProducts.slice(0, 4 - filtered.length)];
    }

    return filtered.slice(0, 4);
  }, [product, allProductArrays]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 sm:py-8 px-4 sm:px-0">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to="/products"
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/category/${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <ProductDisplay product={product} />

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default ProductDetail;
