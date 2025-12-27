---
description: Repository Information Overview
alwaysApply: true
---

# Zenith Shopper Information

## Summary
Zenith Shopper is a modern e-commerce platform built with React, TypeScript, Vite, and Tailwind CSS. It features a comprehensive electronics and fashion shopping experience with glassmorphism UI elements, mobile-responsive filters, and persistent shopping cart/wishlist functionality.

## Structure
- `src/components/`: Reusable UI components, including shadcn/ui components.
- `src/context/`: React Context providers for Cart and Wishlist management.
- `src/data/`: Static product data for electronics and fashion categories.
- `src/hooks/`: Custom React hooks for various functionalities.
- `src/lib/`: Utility functions and shared library configurations (e.g., tailwind-merge).
- `src/pages/`: Main application pages like `ElectronicsPage`, `FashionPage`, etc.
- `src/stores/`: Global state management using Zustand.
- `src/types/`: TypeScript interface and type definitions.
- `public/`: Static assets including images and icons.

## Language & Runtime
**Language**: TypeScript  
**Version**: ^5.8.3  
**Build System**: Vite ^5.4.19  
**Package Manager**: Bun (detected via `bun.lockb`) / npm

## Dependencies
**Main Dependencies**:
- `react`: ^18.3.1
- `react-router-dom`: ^6.30.1
- `lucide-react`: ^0.462.0 (Icons)
- `@tanstack/react-query`: ^5.83.0 (Data fetching)
- `zustand`: ^5.0.9 (State management)
- `tailwind-merge`: ^2.6.0
- `class-variance-authority`: ^0.7.1
- `framer-motion`: (implicitly used for animations)
- `shadcn/ui`: Collection of accessible components

**Development Dependencies**:
- `vite`: ^5.4.19
- `tailwindcss`: ^3.4.17
- `typescript`: ^5.8.3
- `eslint`: ^9.32.0

## Build & Installation
```bash
# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev

# Build for production
bun run build
# or
npm run build
```

## Testing
**Framework**: Vitest (standard for Vite projects, though not explicitly in devDeps, often configured in `vite.config.ts`)
**Configuration**: `vite.config.ts`

**Run Command**:
```bash
npm test
```

## Project Structure
The repository follows a standard Vite-React-TS structure with a focus on component-driven development. It utilizes shadcn/ui for consistent styling and accessibility. The product data is managed through static files in `src/data/`, which are typed using interfaces in `src/types/`. Global state is handled via a combination of React Context (for cart/wishlist) and Zustand.
