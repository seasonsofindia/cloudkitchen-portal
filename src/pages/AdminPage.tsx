
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAdminState } from "@/hooks/use-admin-state";
import KitchenPanel from "@/components/admin/KitchenPanel";
import MenuItemPanel from "@/components/admin/MenuItemPanel";
import KitchenDialog from "@/components/admin/dialogs/KitchenDialog";
import MenuItemDialog from "@/components/admin/dialogs/MenuItemDialog";
import { getLocationName } from "@/utils/admin";

const AdminPage = () => {
  const {
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
  } = useAdminState();

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
              onAddKitchen={openAddKitchenDialog}
              onEditKitchen={openEditKitchenDialog}
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
              onAddMenuItem={openAddMenuItemDialog}
              onEditMenuItem={openEditMenuItemDialog}
              onDeleteMenuItem={handleDeleteMenuItem}
            />
          </TabsContent>
        </Tabs>
        
        <KitchenDialog
          isOpen={isKitchenDialogOpen}
          setIsOpen={setIsKitchenDialogOpen}
          selectedKitchen={selectedKitchen}
          onSave={selectedKitchen ? handleEditKitchen : handleAddKitchen}
          onCancel={closeKitchenDialog}
        />
        
        <MenuItemDialog
          isOpen={isMenuItemDialogOpen}
          setIsOpen={setIsMenuItemDialogOpen}
          selectedMenuItem={selectedMenuItem}
          kitchenId={selectedKitchenId}
          onSave={selectedMenuItem ? handleEditMenuItem : handleAddMenuItem}
          onCancel={closeMenuItemDialog}
        />
      </div>
    </Layout>
  );
};

export default AdminPage;
