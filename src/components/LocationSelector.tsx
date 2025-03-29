
import { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const LOCATIONS = [
  { id: "18nd", name: "18 N D", address: "18 N D" },
  { id: "105orange", name: "South Orange", address: "105 S Orange Ave" },
];

interface LocationSelectorProps {
  selectedLocation: string | null;
  onLocationSelect: (locationId: string) => void;
}

const LocationSelector = ({ 
  selectedLocation, 
  onLocationSelect 
}: LocationSelectorProps) => {
  const [open, setOpen] = useState(!selectedLocation);
  const [tempLocation, setTempLocation] = useState(selectedLocation || "");

  const handleApply = () => {
    if (tempLocation) {
      onLocationSelect(tempLocation);
      setOpen(false);
    }
  };

  const selectedLocationName = LOCATIONS.find(loc => loc.id === selectedLocation)?.name || "";

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 bg-background text-foreground"
        onClick={() => setOpen(true)}
      >
        <MapPin className="h-4 w-4" />
        <span>{selectedLocationName || "Select location"}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select your location</DialogTitle>
            <DialogDescription>
              Choose a location to see available kitchens in that area.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Select value={tempLocation} onValueChange={setTempLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} - {location.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600" 
              onClick={handleApply}
              disabled={!tempLocation}
            >
              View Kitchens
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationSelector;
