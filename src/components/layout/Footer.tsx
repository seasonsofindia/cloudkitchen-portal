
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocationById } from "@/utils/locations";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "info@cloudkitchen.com",
    phone: "(123) 456-7890",
    address: "123 Food St, Flavor City"
  });

  useEffect(() => {
    // Get selected location from localStorage
    const storedLocation = localStorage.getItem("selectedLocation");
    const locationData = getLocationById(storedLocation);
    
    setContactInfo({
      email: locationData.email,
      phone: locationData.phone,
      address: locationData.address
    });
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CloudKitchen</h3>
            <p className="text-sm text-gray-300">
              Your favorite food from multiple kitchens, all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/kitchens" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Kitchens
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: {contactInfo.email}</li>
              <li>Phone: {contactInfo.phone}</li>
              <li>Address: {contactInfo.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-sm text-center text-gray-300">
            &copy; {new Date().getFullYear()} CloudKitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
