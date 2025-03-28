
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Kitchen } from "@/types";
import { toast } from "sonner";

interface KitchenFormProps {
  kitchen?: Kitchen;
  onSave: (kitchen: Omit<Kitchen, "id">) => void;
  onCancel: () => void;
}

const KitchenForm = ({ kitchen, onSave, onCancel }: KitchenFormProps) => {
  const [name, setName] = useState(kitchen?.name || "");
  const [description, setDescription] = useState(kitchen?.description || "");
  const [cuisine, setCuisine] = useState(kitchen?.cuisine || "");
  const [imageUrl, setImageUrl] = useState(kitchen?.imageUrl || "");
  const [deliveryTime, setDeliveryTime] = useState(kitchen?.deliveryTime?.toString() || "30");
  const [deliveryFee, setDeliveryFee] = useState(kitchen?.deliveryFee?.toString() || "3.99");
  const [rating, setRating] = useState(kitchen?.rating?.toString() || "4.5");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !cuisine) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const parsedDeliveryTime = parseInt(deliveryTime);
    const parsedDeliveryFee = parseFloat(deliveryFee);
    const parsedRating = parseFloat(rating);
    
    if (isNaN(parsedDeliveryTime) || parsedDeliveryTime <= 0) {
      toast.error("Please enter a valid delivery time");
      return;
    }
    
    if (isNaN(parsedDeliveryFee) || parsedDeliveryFee < 0) {
      toast.error("Please enter a valid delivery fee");
      return;
    }
    
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      toast.error("Please enter a valid rating between 0 and 5");
      return;
    }
    
    onSave({
      name,
      description,
      cuisine,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: parsedDeliveryTime,
      deliveryFee: parsedDeliveryFee,
      rating: parsedRating
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Kitchen Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cuisine">Cuisine Type *</Label>
          <Input
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deliveryTime">Delivery Time (minutes)</Label>
          <Input
            id="deliveryTime"
            type="number"
            min="1"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
          <Input
            id="deliveryFee"
            type="number"
            min="0"
            step="0.01"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {kitchen ? "Update" : "Add"} Kitchen
        </Button>
      </div>
    </form>
  );
};

export default KitchenForm;
