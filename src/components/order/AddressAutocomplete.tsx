import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressSuggestion {
  display_name: string;
  address: {
    house_number?: string;
    building?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (street: string, city?: string, state?: string, zip?: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

// Map state names to abbreviations
const stateAbbreviations: Record<string, string> = {
  "New Jersey": "NJ",
  "Pennsylvania": "PA",
  "New York": "NY",
  "Delaware": "DE",
  "Maryland": "MD",
  "District of Columbia": "DC",
  "Washington, D.C.": "DC",
};

export const AddressAutocomplete = ({
  value,
  onChange,
  placeholder = "Start typing an address...",
  className,
  error,
}: AddressAutocompleteProps) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Use Nominatim (OpenStreetMap) - free, no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&limit=5&q=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            "Accept": "application/json",
            "User-Agent": "GrillyCheese-Catering-App",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      }
    } catch (err) {
      console.error("Address search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);

    // Debounce API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchAddresses(newValue);
    }, 300);
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    const addr = suggestion.address;
    
    // Try multiple fields for house number
    const houseNumber = addr.house_number || addr.building || "";
    const road = addr.road || "";
    
    // Build street address
    let street = "";
    if (houseNumber && road) {
      street = `${houseNumber} ${road}`;
    } else if (road) {
      // Fallback: try to extract number from display_name
      // display_name often starts with "123, Main Street, ..."
      const displayParts = suggestion.display_name.split(",");
      const firstPart = displayParts[0]?.trim() || "";
      
      // Check if first part is a number (house number)
      if (/^\d+$/.test(firstPart) && displayParts.length > 1) {
        const secondPart = displayParts[1]?.trim() || "";
        if (secondPart.toLowerCase().includes(road.toLowerCase()) || 
            road.toLowerCase().includes(secondPart.toLowerCase())) {
          street = `${firstPart} ${road}`;
        } else {
          street = `${firstPart} ${secondPart}`;
        }
      } else if (firstPart.match(/^\d+\s+\w/)) {
        // First part looks like "123 Main Street"
        street = firstPart;
      } else {
        street = road;
      }
    } else {
      // Last resort: use first meaningful part of display_name
      street = suggestion.display_name.split(",")[0]?.trim() || "";
    }
    
    const city = addr.city || addr.town || addr.village || "";
    const stateRaw = addr.state || "";
    const state = stateAbbreviations[stateRaw] || stateRaw.substring(0, 2).toUpperCase();
    const zip = addr.postcode || "";

    setQuery(street);
    onChange(street, city, state, zip);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={cn("pl-10 pr-10", className, error && "border-destructive")}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="line-clamp-2">{suggestion.display_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
