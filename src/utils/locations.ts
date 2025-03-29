
// Location data with contact information
export interface LocationData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const LOCATIONS: LocationData[] = [
  { 
    id: "18nd", 
    name: "18 N D", 
    address: "18 N D Street, Flavor City", 
    email: "18nd@cloudkitchen.com",
    phone: "(123) 456-7890"
  },
  { 
    id: "105orange", 
    name: "South Orange", 
    address: "105 S Orange Ave, Flavor City", 
    email: "southorange@cloudkitchen.com",
    phone: "(987) 654-3210"
  },
];

// Default location when none is selected
export const DEFAULT_LOCATION: LocationData = {
  id: "default",
  name: "CloudKitchen",
  address: "123 Food St, Flavor City",
  email: "info@cloudkitchen.com",
  phone: "(123) 456-7890"
};

// Get location data by ID
export const getLocationById = (locationId: string | null): LocationData => {
  if (!locationId) return DEFAULT_LOCATION;
  return LOCATIONS.find(loc => loc.id === locationId) || DEFAULT_LOCATION;
};
