
import { useState, FormEvent, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MenuItem } from "@/types";
import { toast } from "sonner";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(item?.tags || []);
  
  useEffect(() => {
    // This ensures we update tags if the item prop changes (e.g., when switching between items)
    if (item) {
      setTags(item.tags || []);
    }
  }, [item]);
  
  const handleAddTag = () => {
    if (tagInput.trim()) {
      // Add the tag if it doesn't already exist
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
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
    
    onSave({
      name,
      description,
      price: parsedPrice,
      category,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      vegetarian,
      tags,
      kitchenId
    });
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
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
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <Label htmlFor="tagInput">Custom Tags</Label>
        </div>
        <div className="flex gap-2">
          <Input
            id="tagInput"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter a tag and press Enter or Add"
            onKeyDown={handleKeyDown}
          />
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleAddTag}
          >
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Add custom tags that will be displayed with the menu item.
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="secondary" className="flex items-center gap-1 pr-1">
                {tag}
                <button 
                  type="button"
                  className="ml-1 rounded-full hover:bg-muted p-1"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
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
