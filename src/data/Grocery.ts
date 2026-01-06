import { Product } from "@/types/product";

// Define the sub-categories for the "Grocery" section.
export const groceryCategories = [
  
  { id: "fruits_vegetables", name: "Fruits & Vegetables" },
  { id: "dairy_bakery", name: "Dairy & Bakery" },
  { id: "staples", name: "Atta, Rice & Dal" },
  { id: "snacks_drinks", name: "Snacks & Drinks" },
  { id: "personal_care", name: "Personal Care" },
  { id: "household", name: "Household Essentials" },
  { id: "meat_fish", name: "Meat, Fish & Eggs" },
  { id: "frozen_food", name: "Frozen Food" },
  { id: "gourmet", name: "Gourmet & World Food" },
  { id: "baby_care", name: "Baby Care" },
  { id: "pet_care", name: "Pet Care" },
];

// Define the products for the "Grocery" section.
export const groceryProducts: Product[] = [
  {
    id: "g1",
    name: "Fresh Apples (1kg)",
    price: 150,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1579613832107-cf68a6d09355?w=500", // Apples
    category: "grocery",
    subCategoryId: "fruits_vegetables",
    rating: 4.5,
    reviews: 500,
    badge: "Organic",
    description: "Farm-fresh organic apples, perfect for a healthy snack.",
    inStock: true,
    discount: 17,
    stock: 50
  },
  {
    id: "g2",
    name: "Milk (1 Litre)",
    price: 60,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1628153496924-1188330d075d?w=500", // Milk bottle
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.8,
    reviews: 1200,
    description: "Pure and fresh cow's milk, essential for your daily needs.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g3",
    name: "Basmati Rice (5kg)",
    price: 450,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1625937409477-fe1785f26943?w=500", // Rice bag
    category: "grocery",
    subCategoryId: "staples",
    rating: 4.7,
    reviews: 800,
    badge: "Bestseller",
    description: "Premium long-grain Basmati rice, ideal for biryani and pulao.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g4",
    name: "Chocolate Cookies (200g)",
    price: 80,
    originalPrice: 90,
    image: "https://images.unsplash.com/photo-1596700813083-d2a93b482753?w=500", // Cookies
    category: "grocery",
    subCategoryId: "snacks_drinks",
    rating: 4.6,
    reviews: 300,
    description: "Delicious chocolate chip cookies, perfect with tea or coffee.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g5",
    name: "Toothpaste (150g)",
    price: 120,
    originalPrice: 130,
    image: "https://images.unsplash.com/photo-1629810366472-1b1b1b1b1b1b?w=500", // Toothpaste (placeholder)
    category: "grocery",
    subCategoryId: "personal_care",
    rating: 4.4,
    reviews: 600,
    description: "Minty fresh toothpaste for complete oral hygiene.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g6",
    name: "Dishwashing Liquid (500ml)",
    price: 110,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1607567885375-3e2b2e2e2e2e?w=500", // Dishwashing liquid (placeholder)
    category: "grocery",
    subCategoryId: "household",
    rating: 4.3,
    reviews: 450,
    description: "Powerful dishwashing liquid for sparkling clean dishes.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g7",
    name: "Chicken Breast (500g)",
    price: 250,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1592659344405-b8e7e16d43b2?w=500", // Raw chicken breast
    category: "grocery",
    subCategoryId: "meat_fish",
    rating: 4.9,
    reviews: 700,
    badge: "Fresh",
    description: "Fresh and tender chicken breast, ideal for various recipes.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g8",
    name: "Frozen Green Peas (500g)",
    price: 90,
    originalPrice: 100,
    image: "https://images.unsplash.com/photo-1519708227418-c8dc8024d292?w=500", // Frozen peas (placeholder)
    category: "grocery",
    subCategoryId: "frozen_food",
    rating: 4.5,
    reviews: 200,
    description: "Convenient frozen green peas, ready to cook.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g9",
    name: "Olive Oil (1 Litre)",
    price: 800,
    originalPrice: 900,
    image: "https://images.unsplash.com/photo-1627918507850-d43063b5e4c0?w=500", // Olive oil bottle
    category: "grocery",
    subCategoryId: "gourmet",
    rating: 4.8,
    reviews: 350,
    description: "Extra virgin olive oil, perfect for cooking and salads.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g10",
    name: "Baby Diapers (Pack of 50)",
    price: 700,
    originalPrice: 750,
    image: "https://images.unsplash.com/photo-1600109520447-0e0e0e0e0e0e?w=500", // Diapers (placeholder)
    category: "grocery",
    subCategoryId: "baby_care",
    rating: 4.7,
    reviews: 1000,
    description: "Soft and absorbent baby diapers for your little one.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g11",
    name: "Dog Food (3kg)",
    price: 500,
    originalPrice: 550,
    image: "https://images.unsplash.com/photo-1588661601614-2c18d3c5e5c0?w=500", // Dog food bag
    category: "grocery",
    subCategoryId: "pet_care",
    rating: 4.6,
    reviews: 400,
    description: "Nutritious dry dog food for all breeds.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g12",
    name: "Tomatoes (1kg)",
    price: 40,
    originalPrice: 50,
    image: "https://images.unsplash.com/photo-1519708227418-c8dc8024d292?w=500", // Tomatoes
    category: "grocery",
    subCategoryId: "fruits_vegetables",
    rating: 4.2,
    reviews: 600,
    description: "Fresh red tomatoes, great for curries and salads.",
    inStock: true,
    discount: 20,
    stock: 50
  },
  {
    id: "g13",
    name: "Bread (White, Sliced)",
    price: 30,
    originalPrice: 35,
    image: "https://images.unsplash.com/photo-1618776856515-5e5d5e5e5e5e?w=500", // Sliced bread (placeholder)
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.5,
    reviews: 800,
    description: "Soft white sliced bread, perfect for sandwiches.",
    inStock: true,
    discount: 14,
    stock: 50
  },
  {
    id: "g14",
    name: "Sugar (1kg)",
    price: 50,
    originalPrice: 55,
    image: "https://images.unsplash.com/photo-1606995641772-f6e0b7b1b1b1?w=500", // Sugar bag (placeholder)
    category: "grocery",
    subCategoryId: "staples",
    rating: 4.6,
    reviews: 700,
    description: "Fine granulated sugar for all your cooking and baking needs.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g15",
    name: "Potato Chips (Large Pack)",
    price: 99,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1599482121703-a261f9d5e5e5?w=500", // Potato chips (placeholder)
    category: "grocery",
    subCategoryId: "snacks_drinks",
    rating: 4.7,
    reviews: 400,
    badge: "New",
    description: "Crispy and savory potato chips, perfect for snacking.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g16",
    name: "Shampoo (400ml)",
    price: 200,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1596462947477-e81812836267?w=500", // Shampoo bottle
    category: "grocery",
    subCategoryId: "personal_care",
    rating: 4.3,
    reviews: 550,
    description: "Nourishing shampoo for healthy and shiny hair.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g17",
    name: "Laundry Detergent (1kg)",
    price: 180,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1610488681729-2e2e2e2e2e2e?w=500", // Laundry detergent (placeholder)
    category: "grocery",
    subCategoryId: "household",
    rating: 4.5,
    reviews: 750,
    description: "Powerful laundry detergent for clean and fresh clothes.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g18",
    name: "Eggs (Tray of 12)",
    price: 90,
    originalPrice: 100,
    image: "https://images.unsplash.com/photo-1582845686001-c5e3d7e5d8b2?w=500", // Eggs carton
    category: "grocery",
    subCategoryId: "meat_fish",
    rating: 4.7,
    reviews: 900,
    description: "Farm-fresh eggs, a rich source of protein.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g19",
    name: "Frozen Pizza",
    price: 220,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1625937409477-fe1785f26943?w=500", // Frozen pizza (placeholder)
    category: "grocery",
    subCategoryId: "frozen_food",
    rating: 4.4,
    reviews: 300,
    description: "Delicious frozen pizza, quick and easy to prepare.",
    inStock: true,
    discount: 12,
    stock: 50
  },
  {
    id: "g20",
    name: "Coffee Beans (250g)",
    price: 350,
    originalPrice: 380,
    image: "https://images.unsplash.com/photo-1629810366472-1b1b1b1b1b1b?w=500", // Coffee beans
    category: "grocery",
    subCategoryId: "gourmet",
    rating: 4.8,
    reviews: 400,
    description: "Premium roasted coffee beans for a perfect brew.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g21",
    name: "Baby Wipes (Pack of 80)",
    price: 150,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1628153496924-1188330d075d?w=500", // Baby wipes (placeholder)
    category: "grocery",
    subCategoryId: "baby_care",
    rating: 4.6,
    reviews: 600,
    description: "Gentle and soft baby wipes for sensitive skin.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g22",
    name: "Cat Food (1kg)",
    price: 300,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1588661601614-2c18d3c5e5c0?w=500", // Cat food bag
    category: "grocery",
    subCategoryId: "pet_care",
    rating: 4.5,
    reviews: 250,
    description: "Complete and balanced nutrition for adult cats.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g23",
    name: "Onions (1kg)",
    price: 30,
    originalPrice: 40,
    image: "https://images.unsplash.com/photo-1592659344405-b8e7e16d43b2?w=500", // Onions
    category: "grocery",
    subCategoryId: "fruits_vegetables",
    rating: 4.1,
    reviews: 700,
    description: "Fresh onions, a staple for every kitchen.",
    inStock: true,
    discount: 25,
    stock: 50
  },
  {
    id: "g24",
    name: "Yogurt (500g)",
    price: 70,
    originalPrice: 75,
    image: "https://images.unsplash.com/photo-1607567885375-3e2b2e2e2e2e?w=500", // Yogurt (placeholder)
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.7,
    reviews: 900,
    description: "Creamy and delicious plain yogurt.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g25",
    name: "Wheat Flour (1kg)",
    price: 60,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1606995641772-f6e0b7b1b1b1?w=500", // Flour bag (placeholder)
    category: "grocery",
    subCategoryId: "staples",
    rating: 4.6,
    reviews: 850,
    description: "High-quality wheat flour for baking and cooking.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g26",
    name: "Soft Drink (2 Litre)",
    price: 90,
    originalPrice: 100,
    image: "https://images.unsplash.com/photo-1599482121703-a261f9d5e5e5?w=500", // Soft drink bottle (placeholder)
    category: "grocery",
    subCategoryId: "snacks_drinks",
    rating: 4.4,
    reviews: 500,
    description: "Refreshing soft drink, perfect for parties.",
    inStock: true,
    discount: 10,
    stock: 50
  },
  {
    id: "g27",
    name: "Soap Bar (Pack of 4)",
    price: 100,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1596462947477-e81812836267?w=500", // Soap bar (placeholder)
    category: "grocery",
    subCategoryId: "personal_care",
    rating: 4.5,
    reviews: 700,
    description: "Gentle and fragrant soap bars for daily use.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g28",
    name: "Toilet Paper (Roll of 4)",
    price: 130,
    originalPrice: 140,
    image: "https://images.unsplash.com/photo-1610488681729-2e2e2e2e2e2e?w=500", // Toilet paper (placeholder)
    category: "grocery",
    subCategoryId: "household",
    rating: 4.3,
    reviews: 650,
    description: "Soft and strong toilet paper rolls.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g29",
    name: "Fish Fillet (500g)",
    price: 300,
    originalPrice: 330,
    image: "https://images.unsplash.com/photo-1592659344405-b8e7e16d43b2?w=500", // Fish fillet (placeholder)
    category: "grocery",
    subCategoryId: "meat_fish",
    rating: 4.8,
    reviews: 500,
    description: "Fresh and boneless fish fillets.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g30",
    name: "Ice Cream (1 Litre)",
    price: 190,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1607567885375-3e2b2e2e2e2e?w=500", // Ice cream (placeholder)
    category: "grocery",
    subCategoryId: "frozen_food",
    rating: 4.6,
    reviews: 400,
    description: "Creamy vanilla ice cream, a perfect dessert.",
    inStock: true,
    discount: 5,
    stock: 50
  },
  {
    id: "g31",
    name: "Pasta (Italian, 500g)",
    price: 120,
    originalPrice: 130,
    image: "https://images.unsplash.com/photo-1629810366472-1b1b1b1b1b1b?w=500", // Pasta (placeholder)
    category: "grocery",
    subCategoryId: "gourmet",
    rating: 4.7,
    reviews: 300,
    description: "Authentic Italian pasta, quick and easy to cook.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g32",
    name: "Baby Food Cereal (200g)",
    price: 180,
    originalPrice: 190,
    image: "https://images.unsplash.com/photo-1600109520447-0e0e0e0e0e0e?w=500", // Baby food cereal (placeholder)
    category: "grocery",
    subCategoryId: "baby_care",
    rating: 4.5,
    reviews: 400,
    description: "Nutritious baby food cereal for growing infants.",
    inStock: true,
    discount: 5,
    stock: 50
  },
  {
    id: "g33",
    name: "Bird Food (1kg)",
    price: 150,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1588661601614-2c18d3c5e5c0?w=500", // Bird food (placeholder)
    category: "grocery",
    subCategoryId: "pet_care",
    rating: 4.4,
    reviews: 150,
    description: "High-quality bird food for all types of birds.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g34",
    name: "Potatoes (1kg)",
    price: 50,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1579613832107-cf68a6d09355?w=500", // Potatoes
    category: "grocery",
    subCategoryId: "fruits_vegetables",
    rating: 4.3,
    reviews: 550,
    description: "Fresh potatoes, versatile for many dishes.",
    inStock: true,
    discount: 17,
    stock: 50
  },
  {
    id: "g35",
    name: "Cheese Block (200g)",
    price: 180,
    originalPrice: 195,
    image: "https://images.unsplash.com/photo-1618776856515-5e5d5e5e5e5e?w=500", // Cheese block (placeholder)
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.8,
    reviews: 600,
    description: "Rich and creamy cheese block.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g36",
    name: "Lentils (Toor Dal, 500g)",
    price: 70,
    originalPrice: 75,
    image: "https://images.unsplash.com/photo-1625937409477-fe1785f26943?w=500", // Lentils (placeholder)
    category: "grocery",
    subCategoryId: "staples",
    rating: 4.5,
    reviews: 450,
    description: "High-quality Toor Dal, essential for Indian cuisine.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g37",
    name: "Fruit Juice (1 Litre)",
    price: 120,
    originalPrice: 130,
    image: "https://images.unsplash.com/photo-1599482121703-a261f9d5e5e5?w=500", // Fruit juice (placeholder)
    category: "grocery",
    subCategoryId: "snacks_drinks",
    rating: 4.6,
    reviews: 350,
    badge: "Refreshing",
    description: "Natural and refreshing fruit juice.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g38",
    name: "Hand Wash (250ml)",
    price: 80,
    originalPrice: 90,
    image: "https://images.unsplash.com/photo-1596462947477-e81812836267?w=500", // Hand wash (placeholder)
    category: "grocery",
    subCategoryId: "personal_care",
    rating: 4.7,
    reviews: 500,
    description: "Gentle hand wash for germ protection.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g39",
    name: "Floor Cleaner (1 Litre)",
    price: 150,
    originalPrice: 165,
    image: "https://images.unsplash.com/photo-1610488681729-2e2e2e2e2e2e?w=500", // Floor cleaner (placeholder)
    category: "grocery",
    subCategoryId: "household",
    rating: 4.4,
    reviews: 400,
    description: "Effective floor cleaner for a sparkling home.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g40",
    name: "Pork Sausages (500g)",
    price: 280,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1592659344405-b8e7e16d43b2?w=500", // Sausages (placeholder)
    category: "grocery",
    subCategoryId: "meat_fish",
    rating: 4.6,
    reviews: 200,
    description: "Delicious pork sausages, perfect for breakfast.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g41",
    name: "Frozen Vegetables Mix (1kg)",
    price: 160,
    originalPrice: 170,
    image: "https://images.unsplash.com/photo-1519708227418-c8dc8024d292?w=500", // Frozen vegetables (placeholder)
    category: "grocery",
    subCategoryId: "frozen_food",
    rating: 4.5,
    reviews: 250,
    description: "Mixed frozen vegetables, convenient for quick meals.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g42",
    name: "Exotic Cheese (200g)",
    price: 400,
    originalPrice: 430,
    image: "https://images.unsplash.com/photo-1618776856515-5e5d5e5e5e5e?w=500", // Exotic cheese (placeholder)
    category: "grocery",
    subCategoryId: "gourmet",
    rating: 4.9,
    reviews: 180,
    description: "Imported exotic cheese, a delightful treat.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g43",
    name: "Baby Oil (100ml)",
    price: 90,
    originalPrice: 95,
    image: "https://images.unsplash.com/photo-1600109520447-0e0e0e0e0e0e?w=500", // Baby oil (placeholder)
    category: "grocery",
    subCategoryId: "baby_care",
    rating: 4.7,
    reviews: 300,
    description: "Gentle baby oil for sensitive skin.",
    inStock: true,
    discount: 5,
    stock: 50
  },
  {
    id: "g44",
    name: "Fish Food (100g)",
    price: 70,
    originalPrice: 75,
    image: "https://images.unsplash.com/photo-1588661601614-2c18d3c5e5c0?w=500", // Fish food (placeholder)
    category: "grocery",
    subCategoryId: "pet_care",
    rating: 4.3,
    reviews: 100,
    description: "Nutritious fish food for all aquarium fish.",
    inStock: true,
    discount: 7,
    stock: 50
  },
  {
    id: "g45",
    name: "Grapes (500g)",
    price: 80,
    originalPrice: 90,
    image: "https://images.unsplash.com/photo-1579613832107-cf68a6d09355?w=500", // Grapes
    category: "grocery",
    subCategoryId: "fruits_vegetables",
    rating: 4.6,
    reviews: 400,
    badge: "Sweet",
    description: "Fresh and juicy grapes.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g46",
    name: "Butter (100g)",
    price: 50,
    originalPrice: 55,
    image: "https://images.unsplash.com/photo-1618776856515-5e5d5e5e5e5e?w=500", // Butter (placeholder)
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.8,
    reviews: 700,
    description: "Creamy butter, essential for cooking and breakfast.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g47",
    name: "Wheat Bread",
    price: 40,
    originalPrice: 45,
    image: "https://images.unsplash.com/photo-1618776856515-5e5d5e5e5e5e?w=500", // Wheat bread (placeholder)
    category: "grocery",
    subCategoryId: "dairy_bakery",
    rating: 4.5,
    reviews: 500,
    description: "Healthy and wholesome wheat bread.",
    inStock: true,
    discount: 11,
    stock: 50
  },
  {
    id: "g48",
    name: "Brown Sugar (500g)",
    price: 60,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1606995641772-f6e0b7b1b1b1?w=500", // Brown sugar (placeholder)
    category: "grocery",
    subCategoryId: "staples",
    rating: 4.7,
    reviews: 300,
    description: "Rich and moist brown sugar.",
    inStock: true,
    discount: 8,
    stock: 50
  },
  {
    id: "g49",
    name: "Cereal (Corn Flakes, 300g)",
    price: 150,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1599482121703-a261f9d5e5e5?w=500", // Cereal (placeholder)
    category: "grocery",
    subCategoryId: "snacks_drinks",
    rating: 4.6,
    reviews: 450,
    description: "Crunchy corn flakes for a healthy breakfast.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g50",
    name: "Body Lotion (200ml)",
    price: 170,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1596462947477-e81812836267?w=500", // Body lotion (placeholder)
    category: "grocery",
    subCategoryId: "personal_care",
    rating: 4.5,
    reviews: 350,
    description: "Moisturizing body lotion for soft skin.",
    inStock: true,
    discount: 6,
    stock: 50
  },
  {
    id: "g51",
    name: "Kitchen Towels (Roll of 2)",
    price: 100,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1610488681729-2e2e2e2e2e2e?w=500", // Kitchen towels (placeholder)
    category: "grocery",
    subCategoryId: "household",
    rating: 4.3,
    reviews: 300,
    description: "Absorbent kitchen towels for everyday cleaning.",
    inStock: true,
    discount: 9,
    stock: 50
  },
  {
    id: "g52",
    name: "Prawns (250g)",
    price: 200,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1592659344405-b8e7e16d43b2?w=500", // Prawns (placeholder)
    category: "grocery",
    subCategoryId: "meat_fish",
    rating: 4.7,
    reviews: 150,
    description: "Fresh prawns, great for stir-fries and curries.",
    inStock: true,
    discount: 9,
    stock: 50
  },
];