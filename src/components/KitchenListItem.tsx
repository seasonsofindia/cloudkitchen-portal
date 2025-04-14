
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Kitchen } from "@/types";

interface KitchenListItemProps {
  kitchen: Kitchen;
}

const KitchenListItem = ({ kitchen }: KitchenListItemProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="md:w-1/4 h-[200px] md:h-auto">
        <img
          src={kitchen.imageUrl}
          alt={kitchen.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">{kitchen.name}</h3>
              <span className="text-sm bg-muted px-2 py-1 rounded-full">
                {kitchen.cuisine}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mt-1">
                <span>{kitchen.deliveryTime} min</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground my-2">{kitchen.description}</p>
        </div>
        <div className="flex justify-end mt-2">
          <Link to={`/kitchen/${kitchen.id}`}>
            <Button variant="outline">View Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KitchenListItem;
