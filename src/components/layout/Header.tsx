
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/hooks/use-cart";

const Header = () => {
  const isMobile = useIsMobile();
  const { items } = useCart();
  const cartItemsCount = items.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Home
                  </Link>
                  <Link to="/kitchens" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Kitchens
                  </Link>
                  <Link to="/orders" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    My Orders
                  </Link>
                  <Link to="/admin" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Admin
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-orange-500">CloudKitchen</span>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:flex">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/kitchens"
              className="text-sm font-medium transition-colors hover:text-orange-500"
            >
              Kitchens
            </Link>
            <Link
              to="/orders"
              className="text-sm font-medium transition-colors hover:text-orange-500"
            >
              My Orders
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-orange-500"
            >
              Admin
            </Link>
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
