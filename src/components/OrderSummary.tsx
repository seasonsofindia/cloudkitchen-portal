
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";

interface OrderSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ onCheckout, showCheckoutButton = true }: OrderSummaryProps) => {
  const { items, subtotal, getDeliveryFee, getTotal } = useCart();
  
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default OrderSummary;
