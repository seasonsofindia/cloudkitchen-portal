
import { useState, useEffect } from "react";
import { Kitchen, MenuItem } from "@/types";
import { toast } from "sonner";
import data from "@/data";

export function useAdminState() {
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

  const openAddKitchenDialog = () => {
    setSelectedKitchen(null);
    setIsKitchenDialogOpen(true);
  };

  const openEditKitchenDialog = (kitchen: Kitchen) => {
    setSelectedKitchen(kitchen);
    setIsKitchenDialogOpen(true);
  };

  const openAddMenuItemDialog = () => {
    setSelectedMenuItem(null);
    setIsMenuItemDialogOpen(true);
  };

  const openEditMenuItemDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsMenuItemDialogOpen(true);
  };

  const closeKitchenDialog = () => {
    setSelectedKitchen(null);
    setIsKitchenDialogOpen(false);
  };
  
  const closeMenuItemDialog = () => {
    setSelectedMenuItem(null);
    setIsMenuItemDialogOpen(false);
  };

  return {
    kitchens,
    menuItems,
    selectedKitchen,
    selectedMenuItem,
    isKitchenDialogOpen,
    isMenuItemDialogOpen,
    selectedKitchenId,
    setSelectedKitchenId,
    handleAddKitchen,
    handleEditKitchen,
    handleDeleteKitchen,
    handleAddMenuItem,
    handleEditMenuItem,
    handleDeleteMenuItem,
    openAddKitchenDialog,
    openEditKitchenDialog,
    openAddMenuItemDialog,
    openEditMenuItemDialog,
    closeKitchenDialog,
    closeMenuItemDialog,
    setIsKitchenDialogOpen,
    setIsMenuItemDialogOpen,
  };
}
