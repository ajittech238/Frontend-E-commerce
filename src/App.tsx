import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrderProvider } from "@/context/OrderContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
// import Category from "./pages/BeautyCategory";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardOrders from "./pages/dashboard/DashboardOrders";
import DashboardCheckout from "./pages/dashboard/DashboardCheckout";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import SellerOrders from "./pages/dashboard/SellerOrders";
import ReferEarn from "./pages/dashboard/ReferEarn";
import Rewards from "./pages/dashboard/Rewards";
import QA from "./pages/dashboard/QA";
import Shops from "./pages/dashboard/Shops";
import Roles from "./pages/dashboard/Roles";
import EventLogs from "./pages/dashboard/EventLogs";
import EmailTemplates from "./pages/dashboard/EmailTemplates";
import Chatbot from "./pages/dashboard/Chatbot";
import WhatsAppMessaging from "./pages/dashboard/WhatsAppMessaging";
import AmazonDashboard from "./pages/dashboard/AmazonDashboard";
import ShopifyDashboard from "./pages/dashboard/ShopifyDashboard";
import RazorpayDashboard from "./pages/dashboard/RazorpayDashboard";
// Admin modules
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminWarehouses from "./pages/admin/AdminWarehouses";
import AdminRacks from "./pages/admin/AdminRacks";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminSalaries from "./pages/admin/AdminSalaries";
import AdminLeaves from "./pages/admin/AdminLeaves";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRackProducts from "./pages/admin/AdminRackProducts";
import AdminScratchCards from "./pages/admin/AdminScratchCards";
import AdminWarehouseCart from "./pages/admin/AdminWarehouseCart";
import AdminWarehouseInvoices from "./pages/admin/AdminWarehouseInvoices";
import AdminWarehouseProducts from "./pages/admin/AdminWarehouseProducts";
import AdminWarehouseManagement from "./pages/admin/AdminWarehouseManagement";
import AdminWarehouseReferEarn from "./pages/admin/AdminWarehouseReferEarn";
import AdminWarehouseReturns from "./pages/admin/AdminWarehouseReturns";
import Analytics from "./pages/admin/Analytics";
// Integration pages
import AmazonIntegration from "./pages/admin/integrations/AmazonIntegration";
import ShopifyIntegration from "./pages/admin/integrations/ShopifyIntegration";
import EbayIntegration from "./pages/admin/integrations/EbayIntegration";
import WalmartIntegration from "./pages/admin/integrations/WalmartIntegration";
import FlipkartIntegration from "./pages/admin/integrations/FlipkartIntegration";
import WooCommerceIntegration from "./pages/admin/integrations/WooCommerceIntegration";
import RazorpayIntegration from "./pages/admin/integrations/RazorpayIntegration";
import WhatsAppIntegration from "./pages/admin/integrations/WhatsAppIntegration";
import FashionCategoryPage from "./pages/FashionCategoryPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import BeautyPage from "./pages/BeautyPage";
import GroceryPage from "./pages/Grocerypage";
import HomeLivingPage from "./pages/Home&livingPage";
import MenTopWear from "./pages/fashion/MenTopWear";
import MenBottomWear from "./pages/fashion/MenBottomWear";
import MenFootwear from "./pages/fashion/MenFootwear";
import WomenDresses from "./pages/fashion/WomenDresses";
import WomenEthnic from "./pages/fashion/WomenEthnic";
import WomenWestern from "./pages/fashion/WomenWestern";
import WomenFootwear from "./pages/fashion/WomenFootwear";
import KidsWear from "./pages/fashion/KidsWear";
import Accessories from "./pages/fashion/Accessories";
import SBIPayment from "./pages/payment/SBIPayment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailed from "./pages/payment/PaymentFailed";
import PaymentHistory from "./pages/payment/PaymentHistory";
import SportsPage from "./pages/SportsPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                {/* <Route path="/category/:id" element={<BeautyCategory />} /> */}
                <Route path="/fashion/:type" element={<FashionCategoryPage />} />
                <Route path="/fashion/men-top-wear" element={<MenTopWear />} />
                <Route path="/fashion/men-bottom-wear" element={<MenBottomWear />} />
                <Route path="/fashion/men-footwear" element={<MenFootwear />} />
                <Route path="/fashion/women-dresses" element={<WomenDresses />} />
                <Route path="/fashion/women-ethnic" element={<WomenEthnic />} />
                <Route path="/fashion/women-western" element={<WomenWestern />} />
                <Route path="/fashion/women-footwear" element={<WomenFootwear />} />
                <Route path="/fashion/kids" element={<KidsWear />} />
                <Route path="/fashion/accessories" element={<Accessories />} />
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/grocery" element={<GroceryPage />} />w
                <Route path="/homeliving" element={<HomeLivingPage />} />
                <Route path="/sports" element={<SportsPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/deals" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/payment/sbi" element={<SBIPayment />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failed" element={<PaymentFailed />} />
                <Route path="/payment-history" element={<PaymentHistory />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="orders" element={<DashboardOrders />} />
                <Route path="seller-orders" element={<SellerOrders />} />
                <Route path="checkout" element={<DashboardCheckout />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="refer-earn" element={<ReferEarn />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="qa" element={<QA />} />
                <Route path="shops" element={<Shops />} />
                <Route path="roles" element={<Roles />} />
                <Route path="events" element={<EventLogs />} />
                <Route path="emails" element={<EmailTemplates />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="whatsapp" element={<WhatsAppMessaging />} />
                <Route path="amazon" element={<AmazonDashboard />} />
                <Route path="shopify" element={<ShopifyDashboard />} />
                <Route path="razorpay" element={<RazorpayDashboard />} />
                {/* Admin modules */}
                <Route path="users" element={<AdminUsers />} />
                <Route path="admin-orders" element={<AdminOrders />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="returns" element={<AdminReturns />} />
                <Route path="invoices" element={<AdminInvoices />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="warehouses" element={<AdminWarehouses />} />
                <Route path="warehouse-cart" element={<AdminWarehouseCart />} />
                <Route path="warehouse-invoices" element={<AdminWarehouseInvoices />} />
                <Route path="warehouse-products" element={<AdminWarehouseProducts />} />
                <Route path="warehouse-management" element={<AdminWarehouseManagement />} />
                <Route path="warehouse-refer-earn" element={<AdminWarehouseReferEarn />} />
                <Route path="warehouse-returns" element={<AdminWarehouseReturns />} />
                <Route path="racks" element={<AdminRacks />} />
                <Route path="rack-products" element={<AdminRackProducts />} />
                <Route path="scratch-cards" element={<AdminScratchCards />} />
                <Route path="employees" element={<AdminEmployees />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="salaries" element={<AdminSalaries />} />
                <Route path="leaves" element={<AdminLeaves />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="integrations" element={<AdminIntegrations />} />
                <Route path="analytics" element={<Analytics />} />
                {/* Integration detail pages */}
                <Route path="integrations/amazon" element={<AmazonIntegration />} />
                <Route path="integrations/shopify" element={<ShopifyIntegration />} />
                <Route path="integrations/ebay" element={<EbayIntegration />} />
                <Route path="integrations/walmart" element={<WalmartIntegration />} />
                <Route path="integrations/flipkart" element={<FlipkartIntegration />} />
                <Route path="integrations/woocommerce" element={<WooCommerceIntegration />} />
                <Route path="integrations/razorpay" element={<RazorpayIntegration />} />
                <Route path="integrations/whatsapp" element={<WhatsAppIntegration />} />
              </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </WishlistProvider>

      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;