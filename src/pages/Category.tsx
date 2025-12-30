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
import image from "/public/a/image.png"

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center justify-center gap-6 mt-12 mb-[80px]">
          <div className="">
            <h1 className="text-5xl text-[#6f4327] text-center pb-6">Fashion Categories..</h1>
            <div className="flex gap-4 mt-6 items-center justify-center">
              <div className="w-[30%] mt-4 ">
                <img src={image} className="object-cover w-[95%] h-[200px] rounded-full" />
              </div>

              <div className="w-[70%]">
                <p className="ps-5 pr-6 text-[#3b0310a6] italic font-semibold text-lg">
                  Fashion categories for boys, girls, and kids are designed to
                  balance style, comfort, and practicality while meeting the
                  needs of different age groups.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-md shadow-sm">
            {/* Image */}
            <img
              src={fashionmain}
              className="w-full h-[400px] rounded-md object-cover blur-sm"
              alt=""
            />

            {/* Text on Image */}
            <div className="absolute top-12 left-5 z-20 flex gap-8 p-4">
              <div className="w-[50%]">
                <h1 className="py-1 text-center text-white font-bold text-xl italic">
                  Girls Fashion
                </h1>
                <img
                  src={whitelehnga}
                  className="object-cover w-full  h-[250px] border-2 rounded-2xl shadow-lg"
                />
              </div>
              <div className="w-[50%]">
                <img
                  src={greenshirt}
                  className="object-cover w-full h-[250px] border-2 rounded-2xl shadow-lg"
                />
                <h1 className="py-1 text-center text-white font-bold text-xl italic">
                  Boy's Fashion
                </h1>
              </div>
              <div className="w-[50%]">
                <h1 className="py-1 text-center text-white font-bold text-xl italic">
                  kid's Fashion
                </h1>
                <img
                  src={orangedress}
                  className="object-cover w-full h-[250px] border-2 rounded-2xl shadow-lg"
                />
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
