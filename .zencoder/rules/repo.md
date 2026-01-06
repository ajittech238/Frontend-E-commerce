---
description: Repository Information Overview
alwaysApply: true
---

# Zenith Shopper Information

## Summary
Zenith Shopper is a modern e-commerce platform built with React, Vite, and TypeScript. It features a responsive UI using Tailwind CSS and Radix UI (Shadcn), with dedicated sections for customers and an electronics category.

## Structure
- **src/components**: Reusable UI components including layout (Header, Footer) and product-specific components.
- **src/customer**: Customer-specific dashboard, components, and pages.
- **src/pages**: Main application pages (Home, Category pages, etc.).
- **src/hooks**: Custom React hooks.
- **src/stores**: State management (likely using Zustand).
- **src/types**: TypeScript type definitions.
- **public**: Static assets like images and icons.

## Language & Runtime
**Language**: TypeScript  
**Version**: ESNext (Vite target)  
**Build System**: Vite  
**Package Manager**: npm/bun

## Dependencies
**Main Dependencies**:
- `react`: ^18.3.1
- `react-router-dom`: ^6.30.1
- `lucide-react`: ^0.462.0
- `tailwind-merge`: ^2.6.0
- `zustand`: ^5.0.9
- `@tanstack/react-query`: ^5.83.0
- `shadcn/ui` components (various Radix UI primitives)

**Development Dependencies**:
- `vite`: ^5.4.19
- `typescript`: ^5.8.3
- `tailwindcss`: ^3.4.17
- `eslint`: ^9.32.0

## Build & Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Main Files & Resources
- **Entry Point**: `src/main.tsx`
- **Main App**: `src/App.tsx`
- **Customer Dashboard**: `src/customer/pages/CustomerDashboard.tsx`
- **Customer Header**: `src/customer/components/CustomerHeader.tsx`
- **Global Styles**: `src/index.css`
- **Tailwind Config**: `tailwind.config.ts`

## Testing
**Framework**: Not explicitly configured in `package.json` (no test scripts).
