
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

const ViewToggle = ({ view, onChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center space-x-2 bg-muted rounded-md p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className={view === "grid" ? "bg-orange-500 hover:bg-orange-600" : ""}
      >
        <Grid2X2 className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className={view === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  );
};

export default ViewToggle;
