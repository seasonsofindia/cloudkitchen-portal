
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedKitchens from "@/components/FeaturedKitchens";
import HowItWorks from "@/components/HowItWorks";
import data from "@/data";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Filter kitchens by selected location if one is set
  const filteredKitchens = selectedLocation
    ? data.kitchens.filter(kitchen => kitchen.location === selectedLocation)
    : data.kitchens;

  return (
    <Layout>
      <HeroSection />
      <FeaturedKitchens kitchens={filteredKitchens} />
      <HowItWorks />
    </Layout>
  );
};

export default Index;
