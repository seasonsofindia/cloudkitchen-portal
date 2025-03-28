
import { useState } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuItemListView from "./MenuItemListView";
import ViewToggle from "./ViewToggle";
import { MenuItem } from "@/types";

interface MenuListProps {
  items: MenuItem[];
  kitchenId: string;
}

const MenuList = ({ items, kitchenId }: MenuListProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<string>("all");

  const categories = ["all", ...new Set(items.map((item) => item.category))];
  
  const filteredItems = category === "all" 
    ? items 
    : items.filter((item) => item.category === category);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm ${
                category === cat
                  ? "bg-orange-500 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} kitchenId={kitchenId} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <MenuItemListView key={item.id} item={item} kitchenId={kitchenId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
