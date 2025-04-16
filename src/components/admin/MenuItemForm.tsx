
import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MenuItem } from "@/types";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import FormField from "./form/FormField";
import TagInput from "./form/TagInput";
import ImageUpload from "./form/ImageUpload";

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
  const [tags, setTags] = useState<string[]>(item?.tags || []);
  
  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setDescription(item.description || "");
      setPrice(item.price?.toString() || "");
      setCategory(item.category || "");
      setImageUrl(item.imageUrl || "");
      setVegetarian(item.vegetarian || false);
      setTags(item.tags || []);
    } else {
      // Reset form for new items
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageUrl("");
      setVegetarian(false);
      setTags([]);
    }
  }, [item]);
  
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
    
    // Use default image if none provided
    const finalImageUrl = imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
    
    onSave({
      name,
      description,
      price: parsedPrice,
      category,
      imageUrl: finalImageUrl,
      vegetarian,
      tags,
      kitchenId
    });
  };

  const handleTagsChange = (updatedTags: string[]) => {
    setTags(updatedTags);
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="name" label="Name" required>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        
        <FormField id="price" label="Price" required>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormField>
      </div>
      
      <FormField id="description" label="Description">
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="category" label="Category" required>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </FormField>
      </div>
      
      <ImageUpload 
        currentImageUrl={imageUrl}
        onImageUpload={handleImageUpload}
      />
      
      <TagInput tags={tags} onChange={handleTagsChange} />
      
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
