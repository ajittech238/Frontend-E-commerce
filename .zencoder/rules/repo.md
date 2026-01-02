---
description: Repository Information Overview
alwaysApply: true
---

# Zenith Shopper Information

## Summary
Zenith Shopper is a modern React-based e-commerce platform built with Vite, TypeScript, and Tailwind CSS. The UI is designed using Radix UI components (Shadcn UI) and features a responsive, fashion-oriented aesthetic. It includes various sections such as a Hero slider, Category exploration, and detailed product listings.

## Structure
- **public/**: Contains static assets such as the logo (`yahmart.png`), apple-touch icons, and a `robots.txt` file.
- **src/**: The heart of the application, organized into several key subdirectories:
  - **components/**:
    - **admin/**: Components for the administrative interface (DataTable, etc.).
    - **dashboard/**: Sidebar and layout components for the user/seller dashboard.
    - **fashion/**: Specific components for fashion-related categories.
    - **home/**: Homepage sections like `HeroSection`, `CategorySection`, and `BannerSection`.
    - **layout/**: Shared layout components like `Header` and `Footer`.
    - **products/**: Product-related UI like `ProductCard` and `ProductModal`.
    - **ui/**: Atomic UI components built with Radix UI and styled with Tailwind (Shadcn UI).
  - **context/**: State management via React Context for `Cart`, `Wishlist`, and `Orders`.
  - **data/**: Mock data for products and categories.
  - **hooks/**: Custom hooks for handling cart logic, mobile responsiveness, etc.
  - **lib/**: Utility libraries, including API configurations and the Shadcn `cn` utility.
  - **pages/**:
    - **admin/**: Extensive management pages for Users, Categories, Coupons, Returns, Warehouses, etc.
    - **dashboard/**: User-centric pages like Orders, Refer & Earn, Rewards, and Settings.
    - **fashion/**: Category-specific pages (Men, Women, Kids, Accessories).
    - **payment/**: Payment integration pages (SBI, success/fail/history).
  - **stores/**: Zustand stores for state management (e.g., `useAdminStore`).
  - **types/**: Centralized TypeScript interfaces for Products, Orders, Users, etc.

## Language & Runtime
**Language**: TypeScript  
**Version**: ^5.8.3 (Compiler target: ES2020)  
**Runtime**: Node.js environment using Vite as the build tool and development server.  
**Build System**: Vite (version ^5.4.19)  
**Package Manager**: npm is the primary package manager (verified by `package-lock.json`), though `bun.lockb` suggests compatibility with Bun.

## Dependencies
**Main Dependencies**:
- **React**: ^18.3.1 (Core library)
- **React Router DOM**: ^6.30.1 (Routing)
- **Swiper**: ^12.0.3 (Modern carousel/slider component)
- **Lucide React**: ^0.462.0 (Icon library)
- **Tanstack React Query**: ^5.83.0 (Data fetching and caching)
- **Zustand**: ^5.0.9 (Lightweight state management)
- **Radix UI**: Various primitives for accessible UI components.
- **Axios**: ^1.13.2 (HTTP client)
- **Zod**: ^3.25.76 (Schema validation)

**Development Dependencies**:
- **Tailwind CSS**: ^3.4.17 (Utility-first CSS framework)
- **ESLint**: ^9.32.0 (with TypeScript and React plugins)
- **PostCSS** & **Autoprefixer**: For CSS processing.

## Build & Installation
```bash
# Install all project dependencies
npm install

# Launch the development server (default: http://localhost:5173)
npm run dev

# Bundle the application for production deployment
npm run build

# Run static code analysis with ESLint
npm run lint

# Preview the production build locally
npm run preview
```

## Application Entry Points
- **Main Entry**: `src/main.tsx` - Initializes the React root and renders the `<App />` component.
- **Root Component**: `src/App.tsx` - Defines the routing structure and global providers (QueryClient, Tooltip, Cart, Wishlist, Orders).
- **Styles**: `src/index.css` - Contains Tailwind directives and global CSS variables.


## Testing
No testing framework (Jest, Vitest, etc.) was found in the repository configuration.

## Main Files & Resources
- **Entry Point**: `src/main.tsx`
- **Main Component**: `src/App.tsx`
- **Global Styles**: `src/index.css`
- **Vite Config**: `vite.config.ts`
- **Tailwind Config**: `tailwind.config.ts`
