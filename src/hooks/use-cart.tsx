
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, CartItem } from "@/types";
import data from "@/data";

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem & { kitchenId: string }) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        // Find the kitchen name from our data
        const kitchen = data.kitchens.find(k => k.id === item.kitchenId);
        const kitchenName = kitchen?.name || "Unknown Kitchen";
        
        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            ...item,
            quantity: 1,
            kitchenName
          };
          set({ items: [...currentItems, newItem] });
        }
      },
      
      removeItem: (id) => {
        const filteredItems = get().items.filter((item) => item.id !== id);
        set({ items: filteredItems });
      },
      
      incrementQuantity: (id) => {
        const updatedItems = get().items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ items: updatedItems });
      },
      
      decrementQuantity: (id) => {
        const item = get().items.find((item) => item.id === id);
        
        if (item && item.quantity > 1) {
          const updatedItems = get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          set({ items: updatedItems });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      get subtotal() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getDeliveryFee: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        
        // Get unique kitchens in cart
        const kitchenIds = new Set(items.map(item => item.kitchenId));
        
        // Find delivery fee for each kitchen
        let totalFee = 0;
        kitchenIds.forEach(id => {
          const kitchen = data.kitchens.find(k => k.id === id);
          if (kitchen) {
            totalFee += kitchen.deliveryFee;
          }
        });
        
        return totalFee;
      },
      
      getTotal: () => {
        return get().subtotal + get().getDeliveryFee();
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
