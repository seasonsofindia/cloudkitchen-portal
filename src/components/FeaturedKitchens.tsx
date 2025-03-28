
import { Kitchen } from "@/types";
import KitchenCard from "./KitchenCard";

interface FeaturedKitchensProps {
  kitchens: Kitchen[];
}

const FeaturedKitchens = ({ kitchens }: FeaturedKitchensProps) => {
  return (
    <section className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Featured Kitchens</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our most popular cloud kitchens, each specializing in their own unique cuisine.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kitchens.slice(0, 3).map((kitchen) => (
          <KitchenCard key={kitchen.id} kitchen={kitchen} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedKitchens;
