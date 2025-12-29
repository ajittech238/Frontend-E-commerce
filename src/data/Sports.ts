import { Product } from "@/types/product";

/* ===== SPORTS PRODUCT TYPES ===== */
export interface ProductVariantOption {
  value: string;
  priceModifier?: number;
  stock: number;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface SportsProduct extends Product {
  stock: number;
  variants?: ProductVariant[];
  specifications?: { name: string; value: string }[];
}

/* ===== SPORTS CATEGORIES ===== */
export const sportsCategories = [
  { id: "all", name: "All Sports" },
  { id: "cricket", name: "Cricket" },
  { id: "football", name: "Football" },
  { id: "gym", name: "Gym & Fitness" },
  { id: "badminton", name: "Badminton" },
  { id: "running", name: "Running" },
  { id: "cycling", name: "Cycling" },
  { id: "outdoor", name: "Outdoor Sports" },
];

/* ===== SPORTS PRODUCTS ===== */
export const sportsProducts: SportsProduct[] = [
  {
    id: "sp1",
    name: "Professional Cricket Bat",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07c?w=500",
    category: "sports",
    subCategoryId: "cricket",
    rating: 4.8,
    reviews: 1450,
    badge: "Top Seller",
    description: "Premium English willow cricket bat for professionals.",
    stock: 25,
    inStock: true,
    discount: 30,
    specifications: [
      { name: "Material", value: "English Willow" },
      { name: "Weight", value: "1.2 kg" },
    ],
  },
  {
    id: "sp2",
    name: "Football Match Ball",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=500",
    category: "sports",
    subCategoryId: "football",
    rating: 4.6,
    reviews: 2100,
    badge: "FIFA Approved",
    description: "High quality football suitable for match play.",
    stock: 40,
    inStock: true,
    discount: 33,
  },
  {
    id: "sp3",
    name: "Adjustable Dumbbell Set",
    price: 7999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500",
    category: "sports",
    subCategoryId: "gym",
    rating: 4.7,
    reviews: 1800,
    badge: "Best Value",
    description: "20kg adjustable dumbbell set for home workouts.",
    stock: 15,
    inStock: true,
    discount: 27,
  },
  {
    id: "sp4",
    name: "Badminton Racket Set",
    price: 2999,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500",
    category: "sports",
    subCategoryId: "badminton",
    rating: 4.5,
    reviews: 980,
    description: "Lightweight badminton rackets with full cover.",
    stock: 30,
    inStock: true,
    discount: 33,
  },
  {
    id: "sp5",
    name: "Running Shoes",
    price: 4599,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c45eb6b?w=500",
    category: "sports",
    subCategoryId: "running",
    rating: 4.8,
    reviews: 3200,
    badge: "Runner's Choice",
    description: "Breathable running shoes with shock absorption.",
    stock: 18,
    inStock: true,
    discount: 34,
    variants: [
      {
        name: "Size",
        options: [
          { value: "7", stock: 5 },
          { value: "8", stock: 6 },
          { value: "9", stock: 7 },
        ],
      },
    ],
  },
  {
    id: "sp6",
    name: "Mountain Bicycle",
    price: 18999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500",
    category: "sports",
    subCategoryId: "cycling",
    rating: 4.6,
    reviews: 850,
    badge: "Adventure",
    description: "Durable mountain bicycle with suspension.",
    stock: 6,
    inStock: true,
    discount: 24,
  },
];
