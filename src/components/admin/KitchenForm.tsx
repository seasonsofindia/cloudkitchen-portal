
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Kitchen } from "@/types";
import { LOCATIONS } from "@/utils/locations";

interface KitchenFormProps {
  kitchen?: Kitchen;
  onSave: (kitchenData: Omit<Kitchen, "id">) => void;
  onCancel: () => void;
}

const KitchenForm = ({ kitchen, onSave, onCancel }: KitchenFormProps) => {
  const [formData, setFormData] = useState({
    name: kitchen?.name || "",
    cuisine: kitchen?.cuisine || "",
    description: kitchen?.description || "",
    imageUrl: kitchen?.imageUrl || "",
    deliveryTime: kitchen?.deliveryTime || 30,
    deliveryFee: kitchen?.deliveryFee || 3.99,
    rating: kitchen?.rating || 4.5,
    location: kitchen?.location || "18nd",
    // New fields for delivery links
    directOrderLink: kitchen?.directOrderLink || "",
    phoneNumber: kitchen?.phoneNumber || "",
    uberEatsLink: kitchen?.uberEatsLink || "",
    doorDashLink: kitchen?.doorDashLink || "",
    postmatesLink: kitchen?.postmatesLink || "",
    grubhubLink: kitchen?.grubhubLink || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "deliveryTime" || name === "deliveryFee" || name === "rating"
        ? parseFloat(value)
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Kitchen Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Input
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            {LOCATIONS.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deliveryTime">Delivery Time (minutes)</Label>
          <Input
            id="deliveryTime"
            name="deliveryTime"
            type="number"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
          <Input
            id="deliveryFee"
            name="deliveryFee"
            type="number"
            step="0.01"
            value={formData.deliveryFee}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Order Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="directOrderLink">Direct Order Link</Label>
            <Input
              id="directOrderLink"
              name="directOrderLink"
              value={formData.directOrderLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="555-123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="uberEatsLink">UberEats Link</Label>
            <Input
              id="uberEatsLink"
              name="uberEatsLink"
              value={formData.uberEatsLink}
              onChange={handleChange}
              placeholder="https://ubereats.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="doorDashLink">DoorDash Link</Label>
            <Input
              id="doorDashLink"
              name="doorDashLink"
              value={formData.doorDashLink}
              onChange={handleChange}
              placeholder="https://doordash.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postmatesLink">Postmates Link</Label>
            <Input
              id="postmatesLink"
              name="postmatesLink"
              value={formData.postmatesLink}
              onChange={handleChange}
              placeholder="https://postmates.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grubhubLink">Grubhub Link</Label>
            <Input
              id="grubhubLink"
              name="grubhubLink"
              value={formData.grubhubLink}
              onChange={handleChange}
              placeholder="https://grubhub.com/..."
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Kitchen</Button>
      </div>
    </form>
  );
};

export default KitchenForm;
