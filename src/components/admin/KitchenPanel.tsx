
import { Kitchen } from "@/types";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KitchenTable from "./KitchenTable";

interface KitchenPanelProps {
  kitchens: Kitchen[];
  onAddKitchen: () => void;
  onEditKitchen: (kitchen: Kitchen) => void;
  onDeleteKitchen: (id: string) => void;
  getLocationName: (locationId: string) => string;
}

const KitchenPanel = ({
  kitchens,
  onAddKitchen,
  onEditKitchen,
  onDeleteKitchen,
  getLocationName,
}: KitchenPanelProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Cloud Kitchens</CardTitle>
          <CardDescription>
            Manage your cloud kitchens here. Add, edit, or remove kitchens.
          </CardDescription>
        </div>
        <Button
          onClick={onAddKitchen}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Kitchen
        </Button>
      </CardHeader>
      <CardContent>
        <KitchenTable 
          kitchens={kitchens}
          onEdit={onEditKitchen}
          onDelete={onDeleteKitchen}
          getLocationName={getLocationName}
        />
      </CardContent>
    </Card>
  );
};

export default KitchenPanel;
