import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrderProvider } from "@/context/OrderContext";
import { CustomerAuthProvider } from "@/customer/context/CustomerAuthContext";

import ScrollToTop from "./components/utils/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

// Category & Fashion Pages
import FashionCategoryPage from "./pages/FashionCategoryPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import BeautyPage from "./pages/BeautyPage";
import SportsPage from "./pages/SportsPage";
import GroceryPage from "./pages/Grocerypage";
import HomeLivingPage from "./pages/Home&livingPage";
import JewelleryPage from "./pages/JewelleryPage";
import PerfumePage from "./pages/PerfumePage";
import BooksPage from "./pages/BooksPage";

// Payment Pages
import SBIPayment from "./pages/payment/SBIPayment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailed from "./pages/payment/PaymentFailed";
import PaymentHistory from "./pages/payment/PaymentHistory";

// Dashboard
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

// Admin
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminWarehouses from "./pages/admin/AdminWarehouses";
import AdminWarehouseCart from "./pages/admin/AdminWarehouseCart";
import AdminWarehouseInvoices from "./pages/admin/AdminWarehouseInvoices";
import AdminWarehouseProducts from "./pages/admin/AdminWarehouseProducts";
import AdminWarehouseManagement from "./pages/admin/AdminWarehouseManagement";
import AdminWarehouseReferEarn from "./pages/admin/AdminWarehouseReferEarn";
import AdminWarehouseReturns from "./pages/admin/AdminWarehouseReturns";
import AdminRacks from "./pages/admin/AdminRacks";
import AdminRackProducts from "./pages/admin/AdminRackProducts";
import AdminScratchCards from "./pages/admin/AdminScratchCards";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminSalaries from "./pages/admin/AdminSalaries";
import AdminLeaves from "./pages/admin/AdminLeaves";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import Analytics from "./pages/admin/Analytics";
import StaffAttendance from "./pages/admin/Attendence";

// Integrations
import AmazonIntegration from "./pages/admin/integrations/AmazonIntegration";
import ShopifyIntegration from "./pages/admin/integrations/ShopifyIntegration";
import EbayIntegration from "./pages/admin/integrations/EbayIntegration";
import WalmartIntegration from "./pages/admin/integrations/WalmartIntegration";
import FlipkartIntegration from "./pages/admin/integrations/FlipkartIntegration";
import WooCommerceIntegration from "./pages/admin/integrations/WooCommerceIntegration";
import RazorpayIntegration from "./pages/admin/integrations/RazorpayIntegration";
import WhatsAppIntegration from "./pages/admin/integrations/WhatsAppIntegration";

// Customer / Warehouse
import CustomerRoutes from "./customer/routes/CustomerRoutes";
<<<<<<< HEAD
import WarehouseRoutes from "./warehouse/WarehouseRoutes";
=======
import WarehouseRoutes from "./WarehouseRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerSupportDashboard from "./pages/admin/CustomerSupport";
>>>>>>> a2ff3f4e2f90fc98b4fd046df5faf81b73cf3390

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomerAuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    {/* PUBLIC PAGES */}
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/fashion" element={<FashionCategoryPage />} />
                    <Route path="/fashion/:type" element={<FashionCategoryPage />} />
                    <Route path="/electronics" element={<ElectronicsPage />} />
                    <Route path="/grocery" element={<GroceryPage />} />
                    <Route path="/homeliving" element={<HomeLivingPage />} />
                    <Route path="/beauty" element={<BeautyPage />} />
                    <Route path="/sports" element={<SportsPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/jewellery" element={<JewelleryPage />} />
                    <Route path="/perfumes" element={<PerfumePage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* DASHBOARD */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<DashboardProducts />} />
                      <Route path="orders" element={<DashboardOrders />} />
                      <Route path="checkout" element={<DashboardCheckout />} />
                      <Route path="settings" element={<DashboardSettings />} />
                      <Route path="refer-earn" element={<ReferEarn />} />
                      <Route path="rewards" element={<Rewards />} />
                      <Route path="attendence" element={<StaffAttendance/>} />
                      <Route path="employees" element={<AdminEmployees/>} />
                      <Route path="departments" element={<AdminDepartments/>} />
                      <Route path="leaves" element={<AdminLeaves/>} />
                      <Route path="salaries" element={<AdminSalaries/>} />
                      <Route path="racks" element={<AdminRacks/>} />
                      <Route path="warehouses" element={<AdminWarehouses/>} />
                      <Route path="notifications" element={<AdminNotifications/>} />
                      <Route path="transactions" element={<AdminTransactions/>} />
                      <Route path="returns" element={<AdminReturns/>} />
                      <Route path="invoices" element={<AdminInvoices/>} />
                      <Route path="coupons" element={<AdminCoupons/>} />
                      <Route path="reviews" element={<AdminReviews/>} />
                      <Route path="categories" element={<AdminCategories/>} />
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
                      <Route path="customersupport" element={<CustomerSupportDashboard />} />

                      {/* ADMIN */}
                      <Route path="attendance" element={<StaffAttendance />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="integrations" element={<AdminIntegrations />} />
                    </Route>

                    {/* MODULE ROUTES */}
                    <Route path="/customer/*" element={<CustomerRoutes />} />
                    <Route path="/warehouse/*" element={<WarehouseRoutes />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </CustomerAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
