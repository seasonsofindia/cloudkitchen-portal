
import { useState } from "react";
import KitchenCard from "./KitchenCard";
import KitchenListItem from "./KitchenListItem";
import ViewToggle from "./ViewToggle";
import { Kitchen } from "@/types";

interface KitchenListProps {
  kitchens: Kitchen[];
}

const KitchenList = ({ kitchens }: KitchenListProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Our Kitchens</h2>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchens.map((kitchen) => (
            <KitchenCard key={kitchen.id} kitchen={kitchen} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {kitchens.map((kitchen) => (
            <KitchenListItem key={kitchen.id} kitchen={kitchen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KitchenList;
