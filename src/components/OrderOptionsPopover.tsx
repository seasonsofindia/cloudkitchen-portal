
import React from "react";
import { Kitchen } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Phone, Globe, ExternalLink } from "lucide-react";

interface OrderOptionsPopoverProps {
  kitchen: Kitchen;
}

const deliveryPlatforms = [
  {
    name: "UberEats",
    linkKey: "uberEatsLink",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_Eats_2020_logo.svg/320px-Uber_Eats_2020_logo.svg.png",
  },
  {
    name: "DoorDash",
    linkKey: "doorDashLink",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Doordash_logo.svg/320px-Doordash_logo.svg.png",
  },
  {
    name: "Postmates",
    linkKey: "postmatesLink",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Postmates_logo.svg/320px-Postmates_logo.svg.png",
  },
  {
    name: "Grubhub",
    linkKey: "grubhubLink",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Grubhub_logo_2016.svg/320px-Grubhub_logo_2016.svg.png",
  },
];

const OrderOptionsPopover: React.FC<OrderOptionsPopoverProps> = ({ kitchen }) => {
  const hasOrderingOptions = kitchen.directOrderLink || 
    kitchen.phoneNumber || 
    kitchen.uberEatsLink || 
    kitchen.doorDashLink || 
    kitchen.postmatesLink || 
    kitchen.grubhubLink;

  if (!hasOrderingOptions) {
    return (
      <Button className="bg-orange-500 hover:bg-orange-600 mt-4">
        No Ordering Options Available
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 mt-4">
          Order Online
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="grid grid-cols-2 gap-2 p-4">
          {kitchen.directOrderLink && (
            <a
              href={kitchen.directOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-md border hover:bg-slate-100 transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>Direct</span>
            </a>
          )}
          
          {kitchen.phoneNumber && (
            <a
              href={`tel:${kitchen.phoneNumber}`}
              className="flex items-center justify-center gap-2 p-3 rounded-md border hover:bg-slate-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>Call-in</span>
            </a>
          )}
          
          {deliveryPlatforms.map((platform) => {
            const link = kitchen[platform.linkKey as keyof Kitchen] as string | undefined;
            if (!link) return null;
            
            return (
              <a
                key={platform.name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-md border hover:bg-slate-100 transition-colors"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-8 object-contain"
                />
                <span className="text-sm">{platform.name}</span>
              </a>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderOptionsPopover;
