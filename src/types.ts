
export interface Kitchen {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  imageUrl: string;
  deliveryTime: number;
  deliveryFee: number;
  rating: number;
  location: string;
  // Order links
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
  imageUrl: string;
  category: string;
  vegetarian: boolean;
  tags?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Filters {
  cuisine?: string;
  rating?: number;
  price?: 'low' | 'medium' | 'high';
  deliveryTime?: number;
}

export interface LocationData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
