
import { useState } from "react";
import { Kitchen } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface KitchenFormProps {
  kitchen?: Kitchen;
  onSave: (kitchen: Omit<Kitchen, "id">) => void;
  onCancel: () => void;
}

const CUISINES = [
  "Indian",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Thai",
  "American",
  "Mediterranean",
  "Middle Eastern",
  "Vietnamese",
];

const LOCATIONS = [
  { id: "18nd", name: "18 N D", address: "18 N D" },
  { id: "105orange", name: "South Orange", address: "105 S Orange Ave" },
];

const KitchenForm = ({ kitchen, onSave, onCancel }: KitchenFormProps) => {
  const [form, setForm] = useState({
    name: kitchen?.name || "",
    description: kitchen?.description || "",
    cuisine: kitchen?.cuisine || "",
    imageUrl: kitchen?.imageUrl || "",
    deliveryTime: kitchen?.deliveryTime || 30,
    deliveryFee: kitchen?.deliveryFee || 2.99,
    rating: kitchen?.rating || 4.5,
    location: kitchen?.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isDecimal = false
  ) => {
    const { name, value } = e.target;
    const numValue = isDecimal ? parseFloat(value) : parseInt(value);
    if (!isNaN(numValue)) {
      setForm({ ...form, [name]: numValue });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Kitchen Name
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="cuisine" className="text-sm font-medium">
            Cuisine
          </label>
          <Select
            value={form.cuisine}
            onValueChange={(value) => handleSelectChange("cuisine", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              {CUISINES.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="imageUrl" className="text-sm font-medium">
          Image URL
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="deliveryTime" className="text-sm font-medium">
            Delivery Time (min)
          </label>
          <Input
            id="deliveryTime"
            name="deliveryTime"
            type="number"
            value={form.deliveryTime}
            onChange={(e) => handleNumberChange(e)}
            min={5}
            max={120}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryFee" className="text-sm font-medium">
            Delivery Fee ($)
          </label>
          <Input
            id="deliveryFee"
            name="deliveryFee"
            type="number"
            step="0.01"
            value={form.deliveryFee}
            onChange={(e) => handleNumberChange(e, true)}
            min={0}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rating" className="text-sm font-medium">
            Rating (0-5)
          </label>
          <Input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => handleNumberChange(e, true)}
            min={0}
            max={5}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium">
          Location
        </label>
        <Select
          value={form.location}
          onValueChange={(value) => handleSelectChange("location", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
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

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {kitchen ? "Update Kitchen" : "Create Kitchen"}
        </Button>
      </div>
    </form>
  );
};

export default KitchenForm;
