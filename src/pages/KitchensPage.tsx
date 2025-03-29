
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import KitchenList from "@/components/KitchenList";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import data from "@/data";
import LocationSelector from "@/components/LocationSelector";

const KitchensPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get("location");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(locationParam);
  
  useEffect(() => {
    if (locationParam) {
      setSelectedLocation(locationParam);
    }
  }, [locationParam]);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setSearchParams({ location: locationId });
  };
  
  const filteredKitchens = data.kitchens
    .filter(kitchen => 
      !selectedLocation || kitchen.location === selectedLocation || !kitchen.location
    )
    .filter(kitchen =>
      kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kitchen.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kitchen.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Cloud Kitchens</h1>
          <p className="text-muted-foreground">
            Browse our selection of specialized cloud kitchens, each offering unique cuisines and flavors.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by kitchen name or cuisine"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <LocationSelector 
              selectedLocation={selectedLocation} 
              onLocationSelect={handleLocationSelect} 
            />
            {selectedLocation && (
              <button 
                className="ml-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSelectedLocation(null);
                  setSearchParams({});
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        <KitchenList kitchens={filteredKitchens} />
      </div>
    </Layout>
  );
};

export default KitchensPage;
