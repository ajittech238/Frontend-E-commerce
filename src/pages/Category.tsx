

import { useParams, Navigate } from "react-router-dom";
import { products, categories } from "@/data/products";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductCard from "@/components/products/ProductCard";
import fashionmain from "/public/a/fashionmain.png";
import whitelehnga from "/public/a/whitelehnga.png";
import greenshirt from "/public/a/greenshirt.png";
import orangedress from "/public/a/orangedress.png";
import fashioncategorylogo from "/public/a/fashioncategorylogo.png";
import image from "/public/a/image.png";
import bgvidep from "../../public/a/video.mp4";

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
        {/* Header Section with Video Background */}
        <div className="relative overflow-hidden rounded-lg shadow-lg h-[600px] mb-[80px] mt-12">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover blur"
          >
            <source src={bgvidep} type="video/mp4" />
          </video>

          {/* Overlay for better text visibility */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

          {/* Content on Video */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
            {/* Title */}
            <h1 className="text-5xl text-white text-center pb-8 font-bold">
              Fashion Categories
            </h1>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
              {/* Left Side - Text with Image */}
              <div className="flex flex-col items-center justify-center gap-4 bg-white/5    0 backdrop-blur-sm rounded-lg p-6">
                <div className="w-32 h-32">
                  <img
                    src={image}
                    className="object-cover w-full h-full rounded-full shadow-md"
                    alt="Fashion Category Logo"
                  />
                </div>
                <p className="text-[#3b0310] italic font-semibold text-lg text-center">
                  Fashion categories for boys, girls, and kids are designed to
                  balance style, comfort, and practicality while meeting the
                  needs of different age groups.
                </p>
              </div>

              {/* Right Side - Three Images */}
              <div className="flex gap-4 items-center justify-center">
                {/* Girls Fashion */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Girls Fashion
                  </h2>
                  <img
                    src={whitelehnga}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Girls Fashion"
                  />
                </div>

                {/* Boys Fashion */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Boys Fashion
                  </h2>
                  <img
                    src={greenshirt}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Boys Fashion"
                  />
                </div>

                {/* Kids Fashion */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-center text-white font-bold text-lg italic bg-black/50 py-1 rounded">
                    Kids Fashion
                  </h2>
                  <img
                    src={orangedress}
                    className="object-cover w-full h-[280px] border-4 border-white rounded-2xl shadow-lg"
                    alt="Kids Fashion"
                  />
                </div>
              </div>
            </div>
          </div>
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
