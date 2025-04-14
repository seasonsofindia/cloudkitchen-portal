
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Kitchen } from "@/types";

interface KitchenCardProps {
  kitchen: Kitchen;
}

const KitchenCard = ({ kitchen }: KitchenCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={kitchen.imageUrl}
          alt={kitchen.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-bold text-xl">{kitchen.name}</h3>
          <span className="text-sm bg-muted px-2 py-1 rounded-full">
            {kitchen.cuisine}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {kitchen.description}
        </p>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>{kitchen.deliveryTime} min</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/kitchen/${kitchen.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Menu
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default KitchenCard;
