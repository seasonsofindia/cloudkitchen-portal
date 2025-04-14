
import { Kitchen } from "@/types";
import { Edit, MapPin, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface KitchenTableProps {
  kitchens: Kitchen[];
  onEdit: (kitchen: Kitchen) => void;
  onDelete: (id: string) => void;
  getLocationName: (locationId: string) => string;
}

const KitchenTable = ({ kitchens, onEdit, onDelete, getLocationName }: KitchenTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Delivery Time</TableHead>
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
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(kitchen)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  onClick={() => onDelete(kitchen.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {kitchens.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
              No kitchens found. Add your first kitchen!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default KitchenTable;
