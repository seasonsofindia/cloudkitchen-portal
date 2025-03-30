
export interface Kitchen {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  deliveryTime: number;
  deliveryFee: number;
  rating: number;
  location: string;
  // Delivery platform links
  directOrderLink?: string;
  phoneNumber?: string;
  uberEatsLink?: string;
  doorDashLink?: string;
  postmatesLink?: string;
  grubhubLink?: string;
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

export interface DataType {
  user: {
    id: string;
    name: string;
    email: string;
    address: string;
  };
  kitchens: Kitchen[];
  menuItems: MenuItem[];
  orders: Order[];
}
