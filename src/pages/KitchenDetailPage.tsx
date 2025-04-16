
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MenuList from "@/components/MenuList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import data from "@/data";
import { Kitchen, MenuItem } from "@/types";
import OrderOptionsPopover from "@/components/OrderOptionsPopover";

const KitchenDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [kitchen, setKitchen] = useState<Kitchen | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Always fetch the latest data from the data source when the component mounts or id changes
  useEffect(() => {
    if (id) {
      const foundKitchen = data.kitchens.find(k => k.id === id);
      // Make sure we're getting the freshest menu items from the data source
      const kitchenItems = data.menuItems.filter(item => item.kitchenId === id);
      
      if (foundKitchen) {
        setKitchen(foundKitchen);
        setMenuItems(kitchenItems);
      }
    }
  }, [id]);
  
  // Add this additional effect to force a refresh every 2 seconds to detect changes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (id) {
        const freshItems = data.menuItems.filter(item => item.kitchenId === id);
        setMenuItems(prevItems => {
          // Only update if there's a change to avoid unnecessary re-renders
          if (JSON.stringify(prevItems) !== JSON.stringify(freshItems)) {
            console.log("Menu items updated:", freshItems);
            return freshItems;
          }
          return prevItems;
        });
      }
    }, 2000); // Check for updates every 2 seconds
    
    return () => clearInterval(refreshInterval);
  }, [id]);
  
  if (!kitchen) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Kitchen not found</h2>
          <Link to="/kitchens">
            <Button>Back to Kitchens</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Link to="/kitchens" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Kitchens
        </Link>
        
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={kitchen.imageUrl}
            alt={kitchen.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{kitchen.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {kitchen.cuisine}
              </span>
              <span>{kitchen.deliveryTime} min</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-start mb-8">
          <p className="text-muted-foreground">{kitchen.description}</p>
          <OrderOptionsPopover kitchen={kitchen} />
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          {menuItems.length > 0 ? (
            <MenuList items={menuItems} kitchenId={kitchen.id} />
          ) : (
            <p className="text-center py-12 text-muted-foreground">
              No menu items available for this kitchen.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default KitchenDetailPage;
