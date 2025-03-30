
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  kitchenId: string;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {item.vegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Veg
          </span>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-base">{item.name}</h3>
          <span className="font-bold">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
