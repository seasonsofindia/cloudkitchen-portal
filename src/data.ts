
import { Kitchen, MenuItem, Order } from "./types";

// Sample data for the cloud kitchen portal
const kitchens: Kitchen[] = [
  {
    id: "k1",
    name: "Spice Haven",
    description: "Authentic Indian flavors delivered fresh to your doorstep. From creamy curries to tandoori specials.",
    cuisine: "Indian",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 35,
    deliveryFee: 3.99,
    rating: 4.7
  },
  {
    id: "k2",
    name: "Pasta Palace",
    description: "Handmade pasta and authentic Italian sauces. Our chef brings traditional recipes straight from Naples.",
    cuisine: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 30,
    deliveryFee: 2.99,
    rating: 4.5
  },
  {
    id: "k3",
    name: "Burger Base",
    description: "Gourmet burgers made with premium ingredients. Our smashed patties and special sauce are legendary.",
    cuisine: "American",
    imageUrl: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 25,
    deliveryFee: 1.99,
    rating: 4.3
  },
  {
    id: "k4",
    name: "Sushi Sensation",
    description: "Fresh, high-quality sushi and Japanese favorites prepared by master chefs with decades of experience.",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 40,
    deliveryFee: 4.99,
    rating: 4.8
  },
  {
    id: "k5",
    name: "Taco Temple",
    description: "Authentic Mexican street food with a modern twist. Our handmade tortillas and fresh salsas are made daily.",
    cuisine: "Mexican",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 30,
    deliveryFee: 2.99,
    rating: 4.4
  },
  {
    id: "k6",
    name: "Green Bowl",
    description: "Healthy, nutritious bowls filled with superfoods and delicious proteins. Perfect for health-conscious foodies.",
    cuisine: "Healthy",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: 25,
    deliveryFee: 2.99,
    rating: 4.6
  }
];

const menuItems: MenuItem[] = [
  // Spice Haven (Indian) menu items
  {
    id: "i1",
    kitchenId: "k1",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices.",
    price: 14.99,
    category: "mains",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["popular", "spicy"]
  },
  {
    id: "i2",
    kitchenId: "k1",
    name: "Paneer Tikka Masala",
    description: "Grilled Indian cottage cheese in a spiced tomato gravy.",
    price: 13.99,
    category: "mains",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["popular", "vegetarian"]
  },
  {
    id: "i3",
    kitchenId: "k1",
    name: "Garlic Naan",
    description: "Soft flatbread with garlic and butter, baked in a tandoor oven.",
    price: 3.99,
    category: "sides",
    imageUrl: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["popular"]
  },
  {
    id: "i4",
    kitchenId: "k1",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken and aromatic spices.",
    price: 15.99,
    category: "mains",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["spicy"]
  },
  
  // Pasta Palace (Italian) menu items
  {
    id: "i5",
    kitchenId: "k2",
    name: "Spaghetti Carbonara",
    description: "Classic pasta with crispy pancetta, eggs, Pecorino Romano cheese, and black pepper.",
    price: 12.99,
    category: "pasta",
    imageUrl: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["popular"]
  },
  {
    id: "i6",
    kitchenId: "k2",
    name: "Margherita Pizza",
    description: "Traditional pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    price: 11.99,
    category: "pizza",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["classic", "vegetarian"]
  },
  {
    id: "i7",
    kitchenId: "k2",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: 6.99,
    category: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["dessert"]
  },
  
  // Burger Base (American) menu items
  {
    id: "i8",
    kitchenId: "k3",
    name: "Classic Smash Burger",
    description: "Double smashed patties, American cheese, lettuce, tomato, and special sauce on a toasted brioche bun.",
    price: 9.99,
    category: "burgers",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["bestseller"]
  },
  {
    id: "i9",
    kitchenId: "k3",
    name: "Truffle Fries",
    description: "Crispy fries tossed with truffle oil, parmesan cheese, and fresh herbs.",
    price: 5.99,
    category: "sides",
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["popular", "vegetarian"]
  },
  {
    id: "i10",
    kitchenId: "k3",
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce, tomato, pickles, and vegan aioli on a whole grain bun.",
    price: 10.99,
    category: "burgers",
    imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["vegetarian", "vegan-option"]
  },
  
  // Sushi Sensation (Japanese) menu items
  {
    id: "i11",
    kitchenId: "k4",
    name: "Dragon Roll",
    description: "Shrimp tempura, cucumber, topped with avocado and unagi sauce.",
    price: 14.99,
    category: "maki",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["popular", "chef's special"]
  },
  {
    id: "i12",
    kitchenId: "k4",
    name: "Salmon Nigiri (4 pcs)",
    description: "Fresh, premium salmon over seasoned sushi rice.",
    price: 10.99,
    category: "nigiri",
    imageUrl: "https://images.unsplash.com/photo-1584278859704-41a5b6d5b2ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["fresh"]
  },
  
  // Taco Temple (Mexican) menu items
  {
    id: "i13",
    kitchenId: "k5",
    name: "Street Tacos (3 pcs)",
    description: "Soft corn tortillas with choice of meat, onions, cilantro, and salsa.",
    price: 9.99,
    category: "tacos",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["authentic", "popular"]
  },
  {
    id: "i14",
    kitchenId: "k5",
    name: "Guacamole & Chips",
    description: "Freshly made guacamole with ripe avocados, lime, cilantro, and house-made tortilla chips.",
    price: 7.99,
    category: "starters",
    imageUrl: "https://images.unsplash.com/photo-1600322305530-45b79f7d4b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["vegetarian", "shareable"]
  },
  
  // Green Bowl (Healthy) menu items
  {
    id: "i15",
    kitchenId: "k6",
    name: "Power Bowl",
    description: "Quinoa, grilled chicken, roasted sweet potatoes, avocado, and tahini dressing.",
    price: 12.99,
    category: "bowls",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: false,
    tags: ["protein-rich", "gluten-free"]
  },
  {
    id: "i16",
    kitchenId: "k6",
    name: "Vegan Delight Bowl",
    description: "Brown rice, roasted vegetables, chickpeas, kale, and lemon-tahini dressing.",
    price: 11.99,
    category: "bowls",
    imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    vegetarian: true,
    tags: ["vegan", "gluten-free"]
  }
];

const orders: Order[] = [
  {
    id: "o1",
    items: [
      { ...menuItems[0], quantity: 1, kitchenName: "Spice Haven" },
      { ...menuItems[2], quantity: 2, kitchenName: "Spice Haven" }
    ],
    status: "delivered",
    date: "2023-06-15T18:30:00",
    deliveryAddress: "123 Main St, Anytown, USA",
    total: 22.97
  },
  {
    id: "o2",
    items: [
      { ...menuItems[7], quantity: 2, kitchenName: "Burger Base" },
      { ...menuItems[8], quantity: 1, kitchenName: "Burger Base" }
    ],
    status: "processing",
    date: "2023-06-16T19:15:00",
    deliveryAddress: "456 Oak Ave, Othertown, USA",
    total: 25.97
  }
];

export default {
  kitchens,
  menuItems,
  orders
};
