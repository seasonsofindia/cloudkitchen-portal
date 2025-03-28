
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Header = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

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
                  <Link to="/admin" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Admin
                  </Link>
                  {isAuthenticated && (
                    <Button 
                      variant="ghost" 
                      className="flex justify-start gap-2 text-lg font-medium hover:text-orange-500 transition-colors p-0"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  )}
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
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-orange-500"
            >
              Admin
            </Link>
          </nav>
        )}
        
        <div className="flex items-center">
          {isAuthenticated && !isMobile && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
