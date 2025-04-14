
import { Kitchen, MenuItem } from "@/types";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MenuItemTable from "./MenuItemTable";
import { toast } from "sonner";

interface MenuItemPanelProps {
  kitchens: Kitchen[];
  menuItems: MenuItem[];
  selectedKitchenId: string | null;
  onSelectKitchen: (id: string) => void;
  onAddMenuItem: () => void;
  onEditMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
}

const MenuItemPanel = ({
  kitchens,
  menuItems,
  selectedKitchenId,
  onSelectKitchen,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
}: MenuItemPanelProps) => {
  const filteredMenuItems = selectedKitchenId
    ? menuItems.filter((item) => item.kitchenId === selectedKitchenId)
    : [];
  
  return (
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
            onChange={(e) => onSelectKitchen(e.target.value)}
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
              onAddMenuItem();
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
        <MenuItemTable
          items={filteredMenuItems}
          onEdit={onEditMenuItem}
          onDelete={onDeleteMenuItem}
        />
      </CardContent>
    </Card>
  );
};

export default MenuItemPanel;
