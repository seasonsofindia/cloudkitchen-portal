
import { MenuItem } from "@/types";
import { Badge } from "@/components/ui/badge";

interface MenuItemListViewProps {
  item: MenuItem;
  kitchenId: string;
}

const MenuItemListView = ({ item }: MenuItemListViewProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="sm:w-1/4 h-[200px] sm:h-auto relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.vegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Veg
          </span>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl">{item.name}</h3>
            <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-muted-foreground my-2">{item.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags && item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemListView;
