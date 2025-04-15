
const LOCATIONS = [
  { id: "18nd", name: "18 N D", address: "18 N D" },
  { id: "105orange", name: "South Orange", address: "105 S Orange Ave" },
];

export const getLocationName = (locationId: string) => {
  const location = LOCATIONS.find(loc => loc.id === locationId);
  return location ? location.name : 'Not set';
};
