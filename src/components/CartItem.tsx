
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const { incrementQuantity, decrementQuantity, removeItem } = useCart();

  return (
    <div className="flex items-start gap-4 py-4 border-b">
      <div className="w-20 h-20 rounded-md overflow-hidden">
        <img 
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">{item.kitchenName}</p>
        
        <div className="flex items-center mt-3 justify-between">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-r-none"
              onClick={() => decrementQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-l-none"
              onClick={() => incrementQuantity(item.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
