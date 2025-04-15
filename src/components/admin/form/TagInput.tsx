
import { useState, KeyboardEvent } from "react";
import { Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput = ({ tags, onChange }: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim()) {
      // Add the tag if it doesn't already exist
      if (!tags.includes(tagInput.trim())) {
        onChange([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
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
  );
};

export default TagInput;
