
import { ExternalLink, Phone } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Kitchen } from "@/types";

interface OrderOptionsPopoverProps {
  kitchen: Kitchen;
}

const OrderOptionsPopover = ({ kitchen }: OrderOptionsPopoverProps) => {
  const {
    directOrderLink,
    phoneNumber,
    uberEatsLink,
    doorDashLink,
    postmatesLink,
    grubhubLink
  } = kitchen;

  const handlePhoneCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 md:text-lg px-6">
          Order Online
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-5">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-center mb-4">Order Options</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {directOrderLink && (
              <a 
                href={directOrderLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <ExternalLink className="mb-1 h-6 w-6" />
                <span className="text-sm font-medium">Direct</span>
              </a>
            )}
            
            {phoneNumber && (
              <button 
                onClick={handlePhoneCall}
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <Phone className="mb-1 h-6 w-6" />
                <span className="text-sm font-medium">Call-in</span>
              </button>
            )}
            
            {uberEatsLink && (
              <a 
                href={uberEatsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Uber_Eats_2020_logo.svg" 
                  alt="UberEats" 
                  className="h-6 mb-1 object-contain" 
                />
                <span className="text-sm font-medium">UberEats</span>
              </a>
            )}
            
            {doorDashLink && (
              <a 
                href={doorDashLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/26/DoorDash_logo_and_wordmark.svg" 
                  alt="DoorDash" 
                  className="h-6 mb-1 object-contain" 
                />
                <span className="text-sm font-medium">DoorDash</span>
              </a>
            )}
            
            {postmatesLink && (
              <a 
                href={postmatesLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Postmates_logo_and_wordmark.svg" 
                  alt="Postmates" 
                  className="h-6 mb-1 object-contain" 
                />
                <span className="text-sm font-medium">Postmates</span>
              </a>
            )}
            
            {grubhubLink && (
              <a 
                href={grubhubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Grubhub_logo_2016.svg" 
                  alt="Grubhub" 
                  className="h-6 mb-1 object-contain" 
                />
                <span className="text-sm font-medium">Grubhub</span>
              </a>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderOptionsPopover;
