export interface Product {
  variants?: { name: string; options: { value: string; stock: number; priceModifier?: number; }[]; }[];
  subCategoryId?: string;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images360?: string[];
  category: string;
  subcategory?: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
  inStock: boolean;
  stock?: number;
  images360?: string[];
  specifications?: { name: string; value: string }[];
  detailedReviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  discount?: number;
  brand?: string;
  author?: string;
  publisher?: string;
  pages?: number;
  language?: string;
  isbn?: string;
  publicationYear?: number;
  stock?: number;
  specifications?: { name: string; value: string }[];
  detailedReviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  images360?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  sellerId?: string;
  createdAt: string;
  updatedAt: string;
}
