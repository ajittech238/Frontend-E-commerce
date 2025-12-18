export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Rahul Sharma",
    email: "rahul@example.com",
    items: [
      { productId: "1", name: "iPhone 15 Pro Max", quantity: 1, price: 129999 },
      { productId: "4", name: "Sony WH-1000XM5", quantity: 1, price: 29999 }
    ],
    total: 159998,
    status: "delivered",
    date: "2024-01-15",
    address: "123 MG Road, Mumbai, Maharashtra"
  },
  {
    id: "ORD-002",
    customerName: "Priya Patel",
    email: "priya@example.com",
    items: [
      { productId: "8", name: "Designer Silk Saree", quantity: 2, price: 17998 }
    ],
    total: 17998,
    status: "shipped",
    date: "2024-01-18",
    address: "456 Park Street, Delhi, Delhi"
  },
  {
    id: "ORD-003",
    customerName: "Amit Kumar",
    email: "amit@example.com",
    items: [
      { productId: "3", name: "MacBook Pro 16\" M3 Max", quantity: 1, price: 349999 }
    ],
    total: 349999,
    status: "processing",
    date: "2024-01-20",
    address: "789 Lake View, Bangalore, Karnataka"
  },
  {
    id: "ORD-004",
    customerName: "Sneha Reddy",
    email: "sneha@example.com",
    items: [
      { productId: "17", name: "Dyson Airwrap Complete", quantity: 1, price: 45999 },
      { productId: "18", name: "La Mer Moisturizing Cream", quantity: 1, price: 28999 }
    ],
    total: 74998,
    status: "pending",
    date: "2024-01-22",
    address: "101 Jubilee Hills, Hyderabad, Telangana"
  },
  {
    id: "ORD-005",
    customerName: "Vikram Singh",
    email: "vikram@example.com",
    items: [
      { productId: "29", name: "PlayStation 5 Console", quantity: 1, price: 49999 }
    ],
    total: 49999,
    status: "delivered",
    date: "2024-01-10",
    address: "222 Civil Lines, Jaipur, Rajasthan"
  },
  {
    id: "ORD-006",
    customerName: "Ananya Gupta",
    email: "ananya@example.com",
    items: [
      { productId: "25", name: "Atomic Habits", quantity: 3, price: 1497 },
      { productId: "26", name: "The Psychology of Money", quantity: 2, price: 898 }
    ],
    total: 2395,
    status: "shipped",
    date: "2024-01-19",
    address: "333 Salt Lake, Kolkata, West Bengal"
  },
  {
    id: "ORD-007",
    customerName: "Karan Mehta",
    email: "karan@example.com",
    items: [
      { productId: "21", name: "Peloton Bike+", quantity: 1, price: 249999 }
    ],
    total: 249999,
    status: "processing",
    date: "2024-01-21",
    address: "444 Koramangala, Bangalore, Karnataka"
  },
  {
    id: "ORD-008",
    customerName: "Neha Joshi",
    email: "neha@example.com",
    items: [
      { productId: "13", name: "Ergonomic Office Chair", quantity: 2, price: 69998 }
    ],
    total: 69998,
    status: "cancelled",
    date: "2024-01-08",
    address: "555 Viman Nagar, Pune, Maharashtra"
  }
];
