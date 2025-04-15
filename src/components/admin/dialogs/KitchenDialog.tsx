
import { Kitchen } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import KitchenForm from "@/components/admin/KitchenForm";

interface KitchenDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedKitchen: Kitchen | null;
  onSave: (kitchenData: Omit<Kitchen, "id">) => void;
  onCancel: () => void;
}

const KitchenDialog = ({
  isOpen,
  setIsOpen,
  selectedKitchen,
  onSave,
  onCancel,
}: KitchenDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedKitchen ? "Edit Kitchen" : "Add Kitchen"}
          </DialogTitle>
        </DialogHeader>
        <KitchenForm
          kitchen={selectedKitchen || undefined}
          onSave={onSave}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default KitchenDialog;
