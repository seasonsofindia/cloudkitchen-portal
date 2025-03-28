
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import KitchenList from "@/components/KitchenList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import data from "@/data";

const KitchensPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredKitchens = data.kitchens.filter(
    (kitchen) =>
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
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by kitchen name or cuisine"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <KitchenList kitchens={filteredKitchens} />
      </div>
    </Layout>
  );
};

export default KitchensPage;
