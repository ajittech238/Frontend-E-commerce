---
description: Repository Information Overview
alwaysApply: true
---

# Zenith Shopper (MegaStore) Information

## Summary
Zenith Shopper is a modern, full-featured e-commerce web application built with React and TypeScript. It provides a comprehensive shopping platform with product browsing, cart management, wishlist functionality, and extensive admin/dashboard capabilities including inventory management, order processing, multi-channel integrations (Amazon, Shopify, eBay, Walmart, Flipkart, WooCommerce), and employee/warehouse management.

## Structure
- **`src/`** - Source code containing React components, pages, and utilities
  - **`components/`** - Reusable UI components (admin, cart, dashboard, home, layout, products, ui)
  - **`pages/`** - Page-level components and routing (public pages and admin modules)
  - **`context/`** - React Context providers (CartContext, WishlistContext)
  - **`stores/`** - Zustand state management (useAdminStore)
  - **`hooks/`** - Custom React hooks
  - **`data/`** - Mock data for products and orders
  - **`lib/`** - Utility functions and API client
  - **`types/`** - TypeScript type definitions
- **`public/`** - Static assets
- **Root config files** - Vite, TypeScript, ESLint, Tailwind, PostCSS configurations

## Language & Runtime
**Language**: TypeScript  
**Version**: 5.8.3  
**Runtime**: Node.js  
**Build System**: Vite 5.4.19  
**Package Manager**: Bun (bun.lockb present)

## Dependencies
**Main Dependencies**:
- **React Ecosystem**: react@18.3.1, react-dom@18.3.1, react-router-dom@6.30.1, react-hook-form@7.61.1
- **State Management**: zustand@5.0.9, @tanstack/react-query@5.83.0
- **UI Components**: @radix-ui/* (25+ components), shadcn/ui components
- **Styling**: tailwindcss@3.4.17, tailwindcss-animate@1.0.7, tailwind-merge@2.6.0
- **Forms & Validation**: zod@3.25.76, @hookform/resolvers@3.10.0
- **Utilities**: axios@1.13.2, date-fns@3.6.0, lucide-react@0.462.0, clsx@2.1.1
- **UI Enhancements**: embla-carousel-react@8.6.0, recharts@2.15.4, sonner@1.7.4, next-themes@0.3.0

**Development Dependencies**:
- **Build & Bundling**: vite@5.4.19, @vitejs/plugin-react-swc@3.11.0
- **Linting**: eslint@9.32.0, typescript-eslint@8.38.0, eslint-plugin-react-hooks@5.2.0, eslint-plugin-react-refresh@0.4.20
- **Styling**: tailwindcss@3.4.17, postcss@8.5.6, autoprefixer@10.4.21, @tailwindcss/typography@0.5.16
- **Type Checking**: @types/react@18.3.23, @types/react-dom@18.3.7, @types/node@22.16.5
- **Tools**: lovable-tagger@1.1.11, typescript@5.8.3

## Build & Installation
```bash
# Install dependencies with Bun
bun install

# Start development server (runs on http://localhost:8080)
bun run dev

# Build for production
bun run build

# Build in development mode
bun run build:dev

# Lint code
bun run lint

# Preview production build
bun run preview
```

## Testing
No explicit testing framework is currently configured in the project. Manual testing and development validation through the Vite dev server are the primary approaches.

## Main Files & Resources
**Entry Points**:
- **`src/main.tsx`** - React application root, creates DOM root and renders App component
- **`src/App.tsx`** - Main application component with routing setup and provider hierarchy
- **`index.html`** - HTML entry point (title: "MegaStore - Best Online Shopping in India")

**Key Configuration Files**:
- **`vite.config.ts`** - Vite build configuration with React SWC plugin and path alias
- **`tsconfig.json`** - TypeScript configuration with base path alias (`@` → `./src`)
- **`tailwind.config.ts`** - Tailwind CSS configuration with custom theme, colors, animations
- **`eslint.config.js`** - ESLint rules for TypeScript and React
- **`components.json`** - shadcn/ui component configuration and path aliases
- **`postcss.config.js`** - PostCSS configuration for Tailwind processing

## Routing Architecture
- **Public Routes**: `/`, `/products`, `/product/:id`, `/category/:id`, `/wishlist`, `/deals`
- **Dashboard Routes**: `/dashboard/*` with nested modules for products, orders, checkout, settings
- **Admin Modules**: users, categories, coupons, returns, invoices, reviews, warehouses, racks, employees, departments, salaries, leaves, notifications, transactions
- **Integration Pages**: Amazon, Shopify, eBay, Walmart, Flipkart, WooCommerce, Razorpay, WhatsApp

## Server Configuration
- **Host**: `::`
- **Port**: 8080
- **Development Server**: Vite dev server with hot module replacement

## Project Type
Single-project traditional React web application with TypeScript, designed as a feature-rich e-commerce platform with admin dashboard and multi-channel marketplace integrations.