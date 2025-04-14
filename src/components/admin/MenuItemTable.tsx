
import { MenuItem } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface MenuItemTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const MenuItemTable = ({ items, onEdit, onDelete }: MenuItemTableProps) => {
  return (
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
        {items.map((item) => (
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
                  onClick={() => onEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {items.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
              No menu items found. Add your first item!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MenuItemTable;
