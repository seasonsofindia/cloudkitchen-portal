
export interface Kitchen {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  deliveryTime: number;
  deliveryFee: number;
  rating: number;
  location: string; // Added location field
}

export interface MenuItem {
  id: string;
  kitchenId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  vegetarian: boolean;
  tags?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  kitchenName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: "pending" | "processing" | "delivered" | "cancelled";
  date: string;
  deliveryAddress: string;
  total: number;
}
