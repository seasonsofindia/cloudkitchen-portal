
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import KitchenForm from "@/components/admin/KitchenForm";
import MenuItemForm from "@/components/admin/MenuItemForm";
import data from "@/data";
import { Kitchen, MenuItem } from "@/types";
import { toast } from "sonner";
import KitchenPanel from "@/components/admin/KitchenPanel";
import MenuItemPanel from "@/components/admin/MenuItemPanel";

const LOCATIONS = [
  { id: "18nd", name: "18 N D", address: "18 N D" },
  { id: "105orange", name: "South Orange", address: "105 S Orange Ave" },
];

const AdminPage = () => {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isKitchenDialogOpen, setIsKitchenDialogOpen] = useState(false);
  const [isMenuItemDialogOpen, setIsMenuItemDialogOpen] = useState(false);
  const [selectedKitchenId, setSelectedKitchenId] = useState<string | null>(null);
  
  useEffect(() => {
    setKitchens(data.kitchens);
    setMenuItems(data.menuItems);
    
    if (data.kitchens.length > 0 && !selectedKitchenId) {
      setSelectedKitchenId(data.kitchens[0].id);
    }
  }, []);
  
  // Kitchen handlers
  const handleAddKitchen = (kitchenData: Omit<Kitchen, "id">) => {
    const newKitchen: Kitchen = {
      ...kitchenData,
      id: `k${kitchens.length + 1}`,
    };
    
    setKitchens([...kitchens, newKitchen]);
    setIsKitchenDialogOpen(false);
    toast.success("Kitchen added successfully");
  };
  
  const handleEditKitchen = (kitchenData: Omit<Kitchen, "id">) => {
    if (!selectedKitchen) return;
    
    const updatedKitchens = kitchens.map((kitchen) =>
      kitchen.id === selectedKitchen.id
        ? { ...kitchen, ...kitchenData }
        : kitchen
    );
    
    setKitchens(updatedKitchens);
    setSelectedKitchen(null);
    setIsKitchenDialogOpen(false);
    toast.success("Kitchen updated successfully");
  };
  
  const handleDeleteKitchen = (id: string) => {
    setKitchens(kitchens.filter((kitchen) => kitchen.id !== id));
    
    // Also delete all menu items for this kitchen
    setMenuItems(menuItems.filter((item) => item.kitchenId !== id));
    
    if (selectedKitchenId === id && kitchens.length > 1) {
      const remainingKitchens = kitchens.filter((kitchen) => kitchen.id !== id);
      setSelectedKitchenId(remainingKitchens[0].id);
    }
    
    toast.success("Kitchen deleted successfully");
  };
  
  // Menu item handlers
  const handleAddMenuItem = (itemData: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `i${menuItems.length + 1}`,
    };
    
    setMenuItems([...menuItems, newItem]);
    setIsMenuItemDialogOpen(false);
    toast.success("Menu item added successfully");
  };
  
  const handleEditMenuItem = (itemData: Omit<MenuItem, "id">) => {
    if (!selectedMenuItem) return;
    
    const updatedItems = menuItems.map((item) =>
      item.id === selectedMenuItem.id
        ? { ...item, ...itemData }
        : item
    );
    
    setMenuItems(updatedItems);
    setSelectedMenuItem(null);
    setIsMenuItemDialogOpen(false);
    toast.success("Menu item updated successfully");
  };
  
  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Menu item deleted successfully");
  };
  
  const getLocationName = (locationId: string) => {
    const location = LOCATIONS.find(loc => loc.id === locationId);
    return location ? location.name : 'Not set';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="kitchens">
          <TabsList className="mb-8">
            <TabsTrigger value="kitchens">Kitchens</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kitchens">
            <KitchenPanel
              kitchens={kitchens}
              onAddKitchen={() => {
                setSelectedKitchen(null);
                setIsKitchenDialogOpen(true);
              }}
              onEditKitchen={(kitchen) => {
                setSelectedKitchen(kitchen);
                setIsKitchenDialogOpen(true);
              }}
              onDeleteKitchen={handleDeleteKitchen}
              getLocationName={getLocationName}
            />
          </TabsContent>
          
          <TabsContent value="menu">
            <MenuItemPanel
              kitchens={kitchens}
              menuItems={menuItems}
              selectedKitchenId={selectedKitchenId}
              onSelectKitchen={setSelectedKitchenId}
              onAddMenuItem={() => {
                setSelectedMenuItem(null);
                setIsMenuItemDialogOpen(true);
              }}
              onEditMenuItem={(item) => {
                setSelectedMenuItem(item);
                setIsMenuItemDialogOpen(true);
              }}
              onDeleteMenuItem={handleDeleteMenuItem}
            />
          </TabsContent>
        </Tabs>
        
        <Dialog open={isKitchenDialogOpen} onOpenChange={setIsKitchenDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedKitchen ? "Edit Kitchen" : "Add Kitchen"}
              </DialogTitle>
            </DialogHeader>
            <KitchenForm
              kitchen={selectedKitchen || undefined}
              onSave={selectedKitchen ? handleEditKitchen : handleAddKitchen}
              onCancel={() => {
                setSelectedKitchen(null);
                setIsKitchenDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
        
        <Dialog open={isMenuItemDialogOpen} onOpenChange={setIsMenuItemDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedMenuItem ? "Edit Menu Item" : "Add Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <MenuItemForm
              item={selectedMenuItem || undefined}
              kitchenId={selectedMenuItem?.kitchenId || selectedKitchenId || ""}
              onSave={selectedMenuItem ? handleEditMenuItem : handleAddMenuItem}
              onCancel={() => {
                setSelectedMenuItem(null);
                setIsMenuItemDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminPage;
