
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MenuItem } from "@/types";
import { toast } from "sonner";

interface MenuItemFormProps {
  item?: MenuItem;
  kitchenId: string;
  onSave: (item: Omit<MenuItem, "id">) => void;
  onCancel: () => void;
}

const MenuItemForm = ({ item, kitchenId, onSave, onCancel }: MenuItemFormProps) => {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [category, setCategory] = useState(item?.category || "");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [vegetarian, setVegetarian] = useState(item?.vegetarian || false);
  const [tags, setTags] = useState(item?.tags?.join(", ") || "");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !price || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    const tagsArray = tags ? tags.split(",").map(tag => tag.trim()).filter(Boolean) : [];
    
    onSave({
      name,
      description,
      price: parsedPrice,
      category,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      vegetarian,
      tags: tagsArray,
      kitchenId
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. spicy, popular, new"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="vegetarian"
          checked={vegetarian}
          onCheckedChange={(checked) => setVegetarian(checked as boolean)}
        />
        <Label htmlFor="vegetarian">Vegetarian</Label>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {item ? "Update" : "Add"} Item
        </Button>
      </div>
    </form>
  );
};

export default MenuItemForm;
