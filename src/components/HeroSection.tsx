
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    navigate(`/kitchens?location=${locationId}`);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
          alt="Food background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Multiple Kitchens,<br />
            <span className="text-orange-500">One Delivery</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Order from multiple cloud kitchens in a single delivery.
            Choose from a variety of cuisines, all prepared in our state-of-the-art facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <LocationSelector 
              selectedLocation={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
            <Link to={selectedLocation ? `/kitchens?location=${selectedLocation}` : "/kitchens"}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Browse Kitchens
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
