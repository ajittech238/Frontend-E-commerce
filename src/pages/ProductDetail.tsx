import { useState, useMemo, useRef, useEffect } from "react";
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import ProductDisplay from "@/components/products/ProductDisplay"; // <-- Import the new component

// ========================================
// STEP 1: Import all your product arrays
// ========================================
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


const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2;
const ProductDetail = () => {
  const { id } = useParams();

  // ========================================
// STEP 2: Combine all product arrays
// ========================================
  const allProductArrays = [
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
    // Add more arrays here
  ];

  // Find the product from the combined list
  const product = useMemo(() => {
    for (const productArray of allProductArrays) {
      const foundProduct = productArray.find((p) => p.id === id);
      if (foundProduct) return foundProduct;
    }
    return null;
  }, [id]);

  // Find related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const allProducts = allProductArrays.flat();

    let filtered = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );

    if (filtered.length < 4) {
      const moreProducts = allProducts.filter(
        (p) => !filtered.some(fp => fp.id === p.id) && p.id !== product.id
      ).sort(() => Math.random() - 0.5);
      filtered = [...filtered, ...moreProducts.slice(0, 4 - filtered.length)];
    }

    return filtered.slice(0, 4);
  }, [product]);

  // Initialize variants on mount
  useEffect(() => {
    if (product?.variants && Object.keys(selectedVariants).length === 0) {
      const initialVariants: { [key: string]: string } = {};
      product.variants.forEach(variant => {
        if (variant.options.length > 0) {
          initialVariants[variant.name] = variant.options[0].value;
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [product, selectedVariants]);

  // Calculate dynamic price based on variants
  const dynamicPrice = useMemo(() => {
    if (!product) return 0;
    let finalPrice = product.price;
    product.variants?.forEach(variant => {
      const selectedOptionValue = selectedVariants[variant.name];
      const selectedOption = variant.options.find(opt => opt.value === selectedOptionValue);
      if (selectedOption?.priceModifier) {
        finalPrice += selectedOption.priceModifier;
      }
    });
    return finalPrice;
  }, [product, selectedVariants]);

  // Calculate effective stock based on variants
  const effectiveStock = useMemo(() => {
    if (!product) return 0;
    if (!product.variants || product.variants.length === 0) {
      return product.stock ?? 999;
    }
    let currentStock = 999;
    const primaryVariant = product.variants[0];
    const selectedOptionValue = primaryVariant ? selectedVariants[primaryVariant.name] : undefined;
    const selectedOption = primaryVariant?.options.find(opt => opt.value === selectedOptionValue);
    currentStock = selectedOption?.stock ?? 999;

    if (product.variants.length > 1) {
      const secondaryVariant = product.variants[1];
      const selectedOptionValue2 = secondaryVariant ? selectedVariants[secondaryVariant.name] : undefined;
      const selectedOption2 = secondaryVariant?.options.find(opt => opt.value === selectedOptionValue2);
      if (selectedOption2) {
        currentStock = Math.min(currentStock, selectedOption2.stock);
      }
    }
    return currentStock;
  }, [product, selectedVariants]);

  // Product not found case
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

  const inWishlist = isInWishlist(product.id);

  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
    setQuantity(1);
  };

  // Combine all products for related products
  const allProducts = allProductArrays.flat();

  let relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  if (relatedProducts.length === 0) {
    relatedProducts = allProducts.filter(
      (p) => p.subcategory?.some(sub => product.subcategory?.includes(sub)) && p.id !== product.id
    ).slice(0, 4);
  }

  if (relatedProducts.length === 0) {
    relatedProducts = allProducts
      .filter((p) => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const imageGallery = [product.image, ...(product.images360 || []), product.image, product.image].filter(Boolean).slice(0, 5);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - dynamicPrice) / product.originalPrice) * 100)
    : 0;

  // Magnifier handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setMagnifierPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseOver = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const StockStatus = () => {
    if (effectiveStock <= 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="font-medium text-red-600 flex items-center gap-1">
            <XCircle className="h-4 w-4" />
            Out of Stock
          </span>
        </div>
      );
    }
    if (effectiveStock < 10) {
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="font-medium text-yellow-600 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Only {effectiveStock} left!
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="font-medium text-green-600 flex items-center gap-1">
          <CheckCircle className="h-4 w-4" />
          In Stock
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 sm:py-8 px-4 sm:px-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/category/${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Use the new shared component to display product details */}
        <ProductDisplay product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">Related Products</h2>
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




