
import { useState, useEffect } from "react";
import { Kitchen, MenuItem } from "@/types";
import { toast } from "sonner";
import data from "@/data";
import { useQueryClient } from "@tanstack/react-query";

export function useAdminState() {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isKitchenDialogOpen, setIsKitchenDialogOpen] = useState(false);
  const [isMenuItemDialogOpen, setIsMenuItemDialogOpen] = useState(false);
  const [selectedKitchenId, setSelectedKitchenId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    setKitchens(data.kitchens);
    setMenuItems(data.menuItems);
    
    if (data.kitchens.length > 0 && !selectedKitchenId) {
      setSelectedKitchenId(data.kitchens[0].id);
    }
  }, []);
  
  // Helper function to invalidate all relevant queries
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["kitchens"] });
    queryClient.invalidateQueries({ queryKey: ["kitchen"] }); 
    queryClient.invalidateQueries({ queryKey: ["menuItems"] });
  };
  
  const handleAddKitchen = (kitchenData: Omit<Kitchen, "id">) => {
    const newKitchen: Kitchen = {
      ...kitchenData,
      id: `k${kitchens.length + 1}`,
    };
    
    const updatedKitchens = [...kitchens, newKitchen];
    setKitchens(updatedKitchens);
    
    data.kitchens = updatedKitchens;
    invalidateQueries();
    
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
    
    data.kitchens = updatedKitchens;
    invalidateQueries();
    
    setSelectedKitchen(null);
    setIsKitchenDialogOpen(false);
    toast.success("Kitchen updated successfully");
  };
  
  const handleDeleteKitchen = (id: string) => {
    const updatedKitchens = kitchens.filter((kitchen) => kitchen.id !== id);
    setKitchens(updatedKitchens);
    
    const updatedMenuItems = menuItems.filter((item) => item.kitchenId !== id);
    setMenuItems(updatedMenuItems);
    
    data.kitchens = updatedKitchens;
    data.menuItems = updatedMenuItems;
    
    invalidateQueries();
    
    if (selectedKitchenId === id && kitchens.length > 1) {
      const remainingKitchens = kitchens.filter((kitchen) => kitchen.id !== id);
      setSelectedKitchenId(remainingKitchens[0].id);
    }
    
    toast.success("Kitchen deleted successfully");
  };
  
  const handleAddMenuItem = (itemData: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `i${menuItems.length + 1}`,
    };
    
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);
    
    data.menuItems = updatedItems;
    invalidateQueries();
    
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
    
    data.menuItems = updatedItems;
    invalidateQueries();
    
    setSelectedMenuItem(null);
    setIsMenuItemDialogOpen(false);
    toast.success("Menu item updated successfully");
  };
  
  const handleDeleteMenuItem = (id: string) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
    
    data.menuItems = updatedItems;
    invalidateQueries();
    
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
