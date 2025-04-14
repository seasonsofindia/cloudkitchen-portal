import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Plus, Trash2, MapPin } from "lucide-react";
import KitchenForm from "@/components/admin/KitchenForm";
import MenuItemForm from "@/components/admin/MenuItemForm";
import data from "@/data";
import { Kitchen, MenuItem } from "@/types";
import { toast } from "sonner";

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
  
  const filteredMenuItems = selectedKitchenId
    ? menuItems.filter((item) => item.kitchenId === selectedKitchenId)
    : [];

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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Cloud Kitchens</CardTitle>
                  <CardDescription>
                    Manage your cloud kitchens here. Add, edit, or remove kitchens.
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedKitchen(null);
                    setIsKitchenDialogOpen(true);
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Kitchen
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Delivery Time</TableHead>
                      <TableHead>Delivery Fee</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kitchens.map((kitchen) => (
                      <TableRow key={kitchen.id}>
                        <TableCell className="font-medium">{kitchen.name}</TableCell>
                        <TableCell>{kitchen.cuisine}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {getLocationName(kitchen.location)}
                          </div>
                        </TableCell>
                        <TableCell>{kitchen.deliveryTime} min</TableCell>
                        <TableCell>${kitchen.deliveryFee.toFixed(2)}</TableCell>
                        <TableCell>{kitchen.rating}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedKitchen(kitchen);
                                setIsKitchenDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteKitchen(kitchen.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {kitchens.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No kitchens found. Add your first kitchen!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Menu Items</CardTitle>
                  <CardDescription>
                    Manage menu items for each kitchen. Add, edit, or remove items.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={selectedKitchenId || ""}
                    onChange={(e) => setSelectedKitchenId(e.target.value)}
                  >
                    {kitchens.map((kitchen) => (
                      <option key={kitchen.id} value={kitchen.id}>
                        {kitchen.name}
                      </option>
                    ))}
                  </select>
                  <Button 
                    onClick={() => {
                      if (!selectedKitchenId) {
                        toast.error("Please select a kitchen first");
                        return;
                      }
                      setSelectedMenuItem(null);
                      setIsMenuItemDialogOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={!selectedKitchenId}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Vegetarian</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMenuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.vegetarian ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedMenuItem(item);
                                setIsMenuItemDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredMenuItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          {selectedKitchenId
                            ? "No menu items found for this kitchen. Add your first item!"
                            : "Please select a kitchen to view its menu items."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
