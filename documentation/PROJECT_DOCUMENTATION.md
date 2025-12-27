# Zenith Shopper - Project Documentation

## 1. Cover Page

- **Project Title:** Zenith Shopper – A Modern eCommerce Platform
- **Technology Stack:** React.js, TypeScript, Vite, Tailwind CSS, Shadcn/UI, Zustand
- **Prepared By:** AI Development Assistant
- **Date:** December 27, 2025

---

## 2. Project Overview

### What is the project?
**Zenith Shopper** is a high-performance, feature-rich eCommerce web application designed to provide a seamless shopping experience for customers and a robust management system for administrators and sellers.

### Purpose of the application
The application aims to bridge the gap between complex retail operations and digital shopping. It provides a scalable solution for managing products, warehouses, orders, and customer relationships in a single unified dashboard.

### Target Users
- **Customers:** Individuals looking for electronics, fashion, and accessories.
- **Sellers/Vendors:** Businesses managing their inventory, orders, and sales performance.
- **Administrators:** Platform owners overseeing users, logistics, financial transactions, and system integrations.

### Key Features
- **Modern Shopping UI:** Glassmorphism design, advanced filtering, and responsive layouts.
- **Comprehensive Admin Suite:** Tools for warehouse management, employee tracking, and invoice generation.
- **Multi-Channel Integration:** Built-in support for Amazon, Shopify, Flipkart, and more.
- **Advanced Logistics:** Rack-level product management and return processing.
- **Secure Checkout:** Integrated payment simulation and order tracking.

---

## 3. Technology Stack

### Frontend
- **React (Vite):** Core framework for building a fast, component-based user interface.
- **TypeScript:** Ensures type safety and reduces runtime errors.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Shadcn/UI & Lucide React:** High-quality accessible components and modern icons.
- **Framer Motion:** Used for smooth animations and transitions.

### Backend (Proposed/Ready for Integration)
- **Node.js / Express:** Scalable server environment.
- **MongoDB:** NoSQL database for flexible product and user data storage.
- **Axios:** For handling asynchronous API requests.

### Other Tools & Libraries
- **Zustand:** Lightweight state management for admin and global data.
- **TanStack Query:** Efficient data fetching, caching, and synchronization.
- **React Router Dom:** Comprehensive routing system.

---

## 4. Folder Structure Explanation

```
src/
├── components/          # Reusable UI building blocks
│   ├── admin/           # Modules for the Admin Panel
│   ├── cart/            # Shopping cart components and sidebars
│   ├── dashboard/       # Seller and user dashboard layouts
│   ├── layout/          # Global Header, Footer, and Navbar
│   ├── products/        # Product cards and display components
│   └── ui/              # Shadcn/UI primitive components
├── context/             # React Context providers (Cart, Order, Wishlist)
├── data/                # Mock data and static content for the UI
├── hooks/               # Custom React hooks (e.g., use-toast, use-mobile)
├── lib/                 # Core utilities and API client configuration
├── pages/               # Main application views/routes
│   ├── admin/           # Admin-specific pages (Warehouses, Analytics)
│   ├── dashboard/       # Seller-specific pages (Shops, Roles)
│   ├── fashion/         # Category-specific fashion pages
│   └── payment/         # Payment gateway and history pages
├── stores/              # Zustand stores for global state
├── types/               # TypeScript interface and type definitions
├── App.tsx              # Main application entry point and routing
└── main.tsx             # React DOM rendering entry point
```

---

## 5. File Responsibility Mapping

### Authentication Related Files
- `src/pages/Login.tsx`: User login interface and logic.
- `src/pages/Signup.tsx`: New user registration.

### Product Related Files
- `src/pages/Products.tsx`: Main product listing with filters.
- `src/pages/ProductDetail.tsx`: Detailed view of a single product.
- `src/data/products.ts`: Mock data for the product catalog.

### Cart & Order Related Files
- `src/context/CartContext.tsx`: Logic for adding/removing items from the cart.
- `src/pages/Cart.tsx`: Shopping cart overview.
- `src/pages/Checkout.tsx`: Shipping and payment details entry.
- `src/pages/OrderConfirmation.tsx`: Post-purchase summary.

### Admin Related Files
- `src/pages/admin/AdminWarehouses.tsx`: Warehouse facility management.
- `src/pages/admin/AdminRackProducts.tsx`: Specific inventory location tracking.
- `src/pages/admin/Analytics.tsx`: Sales and user data visualization.

---

## 6. Application Flow Explanation

### App Entry Point
The application starts at `main.tsx`, which renders the `App` component wrapped in several **Context Providers** (QueryClient, Cart, Wishlist, Order).

### Routing Flow
1. **Public Routes:** Home (`/`), Products (`/products`), and Login/Signup.
2. **Customer Routes:** Cart (`/cart`), Wishlist (`/wishlist`), and Checkout (`/checkout`).
3. **Dashboard Routes:** All routes under `/dashboard/*` are nested within the `DashboardLayout`, providing a consistent sidebar and navigation.

---

## 7. Function Call Flow

1. **User Action:** User clicks "Add to Cart" on a `ProductCard`.
2. **Context Call:** The `useCart` hook is triggered, calling `addToCart(product)` inside `CartContext.tsx`.
3. **State Update:** The `cart` state is updated, which automatically refreshes the `CartSidebar` and `Cart` page.
4. **Persistence:** The update is saved to `localStorage` to ensure the cart persists after a page reload.

---

## 8. State Management

### Global State (Zustand)
Used in `src/stores/useAdminStore.ts` to manage administrative preferences and global dashboard settings.

### Cart & User State (Context API)
- **CartContext:** Tracks items, quantities, and totals.
- **OrderContext:** Manages the history of orders placed by the user.
- **WishlistContext:** Stores user's favorite items.

---

## 9. API Integration

The application uses **Axios** and **TanStack Query** for data fetching.

- **API Client:** Configured in `src/lib/api.ts` with interceptors for handling authentication tokens.
- **Endpoint Mapping:** All endpoints are centralized in the `endpoints` object (Users, Products, Orders, Warehouses).
- **Data Flow:**
    1. Component calls a `useQuery` hook.
    2. Axios fetches data from the `/api` base URL.
    3. Data is cached by TanStack Query and returned to the UI.

---

## 10. Core Features Explanation

### Product Listing & Filtering
The `Products.tsx` page uses a sophisticated filtering system that allows users to narrow down items by category, price range, and rating using a sidebar or mobile-friendly sheet.

### Checkout Flow
1. **Cart Review:** User confirms items.
2. **Address Entry:** User provides shipping details.
3. **Payment Simulation:** Integrated with an SBI payment gateway simulation.
4. **Confirmation:** Unique Order ID generated and displayed.

---

## 11. Flow Diagrams (Text-Based)

### Login Flow
`User Input Credentials` -> `Validate with Zod` -> `Send API Request` -> `Save JWT to LocalStorage` -> `Redirect to Dashboard`

### Add to Cart Flow
`Click Button` -> `Check if Item Exists` -> `If yes, increment quantity` -> `If no, add new item` -> `Update Subtotal` -> `Show Toast Notification`

---

## 12. Error Handling & Validation

- **Form Validation:** Handled by `react-hook-form` and `Zod` schemas (e.g., in `Signup.tsx`).
- **API Errors:** Caught by Axios interceptors and displayed via **Sonner** or **Shadcn Toast** notifications.
- **404 Pages:** A custom `NotFound.tsx` page handles invalid routes.

---

## 13. Security Considerations

- **JWT Authentication:** Tokens are stored securely and sent in the `Authorization` header for all protected API calls.
- **Input Sanitization:** TypeScript and Zod ensure that only valid data types are processed by the application.
- **Route Protection:** Integration of protected routes to prevent unauthorized access to the Admin Panel.

---

## 14. How to Run the Project

### Installation Steps
1. Clone the repository.
2. Run `npm install` to install dependencies.

### Environment Variables
Create a `.env` file in the root:
```env
VITE_API_URL=http://localhost:5000/api
```

### Start Commands
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

---

## 15. How to Add New Features

### Add a New Page
1. Create a new file in `src/pages/`.
2. Import the page in `src/App.tsx`.
3. Add a `<Route />` entry in the `Routes` component.

### Add a New Component
1. Create a `.tsx` file in the relevant subfolder of `src/components/`.
2. Export the component and use it in your pages.

---

## 16. Future Enhancements
- **Live Chat:** Integrate a real-time customer support system.
- **Multi-Currency Support:** Automatic price conversion based on user location.
- **Dark Mode:** Full theme customization for better accessibility.

---

## 17. Conclusion
**Zenith Shopper** is a state-of-the-art eCommerce solution that combines a beautiful frontend with a complex administrative backend. Its modular architecture makes it easy to maintain and expand, making it an ideal choice for large-scale retail operations.
