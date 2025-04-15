
import { MenuItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MenuItemForm from "@/components/admin/MenuItemForm";

interface MenuItemDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedMenuItem: MenuItem | null;
  kitchenId: string | null;
  onSave: (itemData: Omit<MenuItem, "id">) => void;
  onCancel: () => void;
}

const MenuItemDialog = ({
  isOpen,
  setIsOpen,
  selectedMenuItem,
  kitchenId,
  onSave,
  onCancel,
}: MenuItemDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedMenuItem ? "Edit Menu Item" : "Add Menu Item"}
          </DialogTitle>
        </DialogHeader>
        <MenuItemForm
          item={selectedMenuItem || undefined}
          kitchenId={selectedMenuItem?.kitchenId || kitchenId || ""}
          onSave={onSave}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
