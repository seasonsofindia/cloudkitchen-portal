
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import CartItemComponent from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

const CartPage = () => {
  const { items, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-1">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div>
              <OrderSummary onCheckout={handleCheckout} />
              <Button 
                variant="outline" 
                onClick={clearCart} 
                className="w-full mt-4"
                disabled={items.length === 0 || isCheckingOut}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/kitchens">
              <Button className="bg-orange-500 hover:bg-orange-600">Browse Kitchens</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
