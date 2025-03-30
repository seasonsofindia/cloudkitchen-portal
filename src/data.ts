import { Kitchen, MenuItem, Order, DataType } from "./types";

// Sample user data (you might fetch this from an API in a real app)
export const user = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Anytown",
};

// Updated kitchen data to include location and ordering options
const kitchens: Kitchen[] = [
  {
    id: "k1",
    name: "Taste of India",
    description: "Authentic Indian cuisine featuring a variety of regional dishes.",
    cuisine: "Indian",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    deliveryTime: 30,
    deliveryFee: 4.99,
    rating: 4.7,
    location: "18nd",
    directOrderLink: "https://tasteofindia.com/order",
    phoneNumber: "+1 (555) 123-4567",
    uberEatsLink: "https://ubereats.com/restaurant/taste-of-india",
    doorDashLink: "https://doordash.com/store/taste-of-india",
    grubhubLink: "https://grubhub.com/restaurant/taste-of-india"
  },
  {
    id: "k2",
    name: "Burger Joint",
    description: "Gourmet burgers made with fresh, locally-sourced ingredients.",
    cuisine: "American",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    deliveryTime: 25,
    deliveryFee: 3.99,
    rating: 4.5,
    location: "105orange",
    directOrderLink: "https://burgerjoint.com/order",
    phoneNumber: "+1 (555) 987-6543",
    uberEatsLink: "https://ubereats.com/restaurant/burger-joint",
    postmatesLink: "https://postmates.com/restaurant/burger-joint"
  },
  {
    id: "k3",
    name: "Sushi Express",
    description: "Fresh, made-to-order sushi and Japanese dishes.",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    deliveryTime: 35,
    deliveryFee: 5.99,
    rating: 4.8,
    location: "18nd",
    directOrderLink: "https://sushiexpress.com/order",
    phoneNumber: "+1 (555) 789-0123",
    doorDashLink: "https://doordash.com/store/sushi-express",
    grubhubLink: "https://grubhub.com/restaurant/sushi-express"
  },
  {
    id: "k4",
    name: "Pizza Palace",
    description: "Artisanal pizzas with unique toppings and homemade sauce.",
    cuisine: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    deliveryTime: 28,
    deliveryFee: 4.49,
    rating: 4.6,
    location: "105orange",
    phoneNumber: "+1 (555) 456-7890",
    uberEatsLink: "https://ubereats.com/restaurant/pizza-palace",
    doorDashLink: "https://doordash.com/store/pizza-palace"
  },
  {
    id: "k5",
    name: "Taco Fiesta",
    description: "Authentic Mexican street food with a modern twist.",
    cuisine: "Mexican",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3xlbnwwfHwwfHx8MA%3D%3D",
    deliveryTime: 22,
    deliveryFee: 3.49,
    rating: 4.4,
    location: "18nd",
    directOrderLink: "https://tacofiesta.com/order",
    phoneNumber: "+1 (555) 234-5678",
    postmatesLink: "https://postmates.com/restaurant/taco-fiesta",
    grubhubLink: "https://grubhub.com/restaurant/taco-fiesta"
  },
  {
    id: "k6",
    name: "Pho Delight",
    description: "Traditional Vietnamese cuisine specializing in pho and banh mi.",
    cuisine: "Vietnamese",
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvfGVufDB8fDB8fHww",
    deliveryTime: 32,
    deliveryFee: 4.79,
    rating: 4.5,
    location: "105orange",
    phoneNumber: "+1 (555) 345-6789",
    uberEatsLink: "https://ubereats.com/restaurant/pho-delight",
    doorDashLink: "https://doordash.com/store/pho-delight"
  },
];

// Sample menu items
const menuItems: MenuItem[] = [
  {
    id: "m1",
    kitchenId: "k1",
    name: "Chicken Tikka Masala",
    description: "Classic Indian dish with creamy tomato sauce.",
    price: 14.99,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1564759372454-f97711b52596?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thJTIwbWFzYWxhfGVufDB8fDB8fHww",
    vegetarian: false,
    tags: ["popular", "spicy"],
  },
  {
    id: "m2",
    kitchenId: "k1",
    name: "Vegetable Biryani",
    description: "Fragrant rice dish with mixed vegetables and spices.",
    price: 12.99,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1635133422458-6ca994474503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlJTIwYmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
    vegetarian: true,
    tags: ["vegetarian", "spicy"],
  },
  {
    id: "m3",
    kitchenId: "k2",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, and tomato.",
    price: 9.99,
    category: "Burgers",
    imageUrl: "https://images.unsplash.com/photo-1568901342037-24c7e8a8c50f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8fHww",
    vegetarian: false,
    tags: ["popular"],
  },
  {
    id: "m4",
    kitchenId: "k2",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh toppings.",
    price: 10.99,
    category: "Burgers",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZ2llJTIwYnVyZ2VyfGVufDB8fDB8fHww",
    vegetarian: true,
    tags: ["vegetarian"],
  },
  {
    id: "m5",
    kitchenId: "k3",
    name: "Salmon Nigiri",
    description: "Fresh salmon on sushi rice.",
    price: 6.99,
    category: "Sushi",
    imageUrl: "https://images.unsplash.com/photo-1611130763153-938046b89c43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9uJTIwbmlnaXJpfGVufDB8fDB8fHww",
    vegetarian: false,
  },
  {
    id: "m6",
    kitchenId: "k3",
    name: "Avocado Roll",
    description: "Creamy avocado rolled in sushi rice and seaweed.",
    price: 5.99,
    category: "Sushi",
    imageUrl: "https://images.unsplash.com/photo-1613769049917-bb4381ca6a38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHJvbGx8ZW58MHx8MHx8fDA%3D",
    vegetarian: true,
  },
  {
    id: "m7",
    kitchenId: "k4",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil.",
    price: 12.99,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1548611635-c6b0a3c39998?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww",
    vegetarian: true,
  },
  {
    id: "m8",
    kitchenId: "k4",
    name: "Pepperoni Pizza",
    description: "Pizza with tomato sauce, mozzarella, and pepperoni.",
    price: 13.99,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
    vegetarian: false,
  },
  {
    id: "m9",
    kitchenId: "k5",
    name: "Tacos al Pastor",
    description: "Marinated pork tacos with pineapple and cilantro.",
    price: 11.99,
    category: "Tacos",
    imageUrl: "https://images.unsplash.com/photo-1562408372-6091c724aa5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3MlMjBhbCUyMHBhc3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    vegetarian: false,
  },
  {
    id: "m10",
    kitchenId: "k5",
    name: "Vegetarian Tacos",
    description: "Tacos filled with grilled vegetables and black beans.",
    price: 10.99,
    category: "Tacos",
    imageUrl: "https://images.unsplash.com/photo-1607936484440-f153f4f3c997?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhcmlhbiUyMHRhY29zfGVufDB8fDB8fHww",
    vegetarian: true,
  },
  {
    id: "m11",
    kitchenId: "k6",
    name: "Pho",
    description: "Traditional Vietnamese noodle soup with beef or chicken.",
    price: 13.99,
    category: "Soup",
    imageUrl: "https://images.unsplash.com/photo-1610017440784-954471451056?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvfGVufDB8fDB8fHww",
    vegetarian: false,
  },
  {
    id: "m12",
    kitchenId: "k6",
    name: "Banh Mi",
    description: "Vietnamese sandwich with pickled vegetables and meat.",
    price: 11.99,
    category: "Sandwich",
    imageUrl: "https://images.unsplash.com/photo-1623493334284-45c7a2544c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuaCUyMG1pfGVufDB8fDB8fHww",
    vegetarian: false,
  },
];

// Sample orders
const orders: Order[] = [
  {
    id: "o1",
    items: [
      {
        id: "m1",
        kitchenId: "k1",
        name: "Chicken Tikka Masala",
        description: "Classic Indian dish with creamy tomato sauce.",
        price: 14.99,
        category: "Main Course",
        imageUrl: "https://images.unsplash.com/photo-1564759372454-f97711b52596",
        vegetarian: false,
        quantity: 2,
        kitchenName: "Taste of India"
      },
      {
        id: "m2",
        kitchenId: "k1",
        name: "Vegetable Biryani",
        description: "Fragrant rice dish with mixed vegetables and spices.",
        price: 12.99,
        category: "Main Course",
        imageUrl: "https://images.unsplash.com/photo-1635133422458-6ca994474503",
        vegetarian: true,
        quantity: 1,
        kitchenName: "Taste of India"
      }
    ],
    status: "delivered",
    date: "2023-11-05T15:30:00Z",
    deliveryAddress: "123 Main St, Anytown",
    total: 42.97
  },
  {
    id: "o2",
    items: [
      {
        id: "m3",
        kitchenId: "k2",
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheese, lettuce, and tomato.",
        price: 9.99,
        category: "Burgers",
        imageUrl: "https://images.unsplash.com/photo-1568901342037-24c7e8a8c50f",
        vegetarian: false,
        quantity: 1,
        kitchenName: "Burger Joint"
      }
    ],
    status: "processing",
    date: "2023-11-10T18:45:00Z",
    deliveryAddress: "123 Main St, Anytown",
    total: 9.99
  }
];

const data: DataType = {
  user,
  kitchens,
  menuItems,
  orders
};

export default data;
