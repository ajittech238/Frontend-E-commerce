import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import DealsSection from "@/components/home/DealsSection";
import TrendingSection from "@/components/home/TrendingSection";
import BannerSection from "@/components/home/BannerSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import ReviewsSection from "@/components/home/ReviewSection";
import SimpleBanner from "@/components/home/SimpleBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>

        <HeroSection />
        <CategorySection />
        <DealsSection />
        <TrendingSection />
        <SimpleBanner />
       
        <BannerSection />
        <NewArrivalsSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;
