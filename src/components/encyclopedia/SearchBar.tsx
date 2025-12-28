import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  cheeseGuideData, 
  breadGuideData, 
  regionalSandwiches, 
  internationalSandwiches,
  encyclopediaSections
} from "@/data/encyclopediaData";

interface SearchResult {
  type: "cheese" | "bread" | "sandwich" | "section";
  name: string;
  description: string;
  sectionId?: string;
}

interface SearchBarProps {
  onResultClick: (sectionId: string) => void;
}

const SearchBar = ({ onResultClick }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    
    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    // Search cheeses
    cheeseGuideData.forEach(cheese => {
      if (cheese.name.toLowerCase().includes(q) || 
          cheese.flavor.toLowerCase().includes(q) ||
          cheese.category.toLowerCase().includes(q)) {
        matches.push({
          type: "cheese",
          name: cheese.name,
          description: cheese.flavor,
          sectionId: "cheese-guide"
        });
      }
    });

    // Search breads
    breadGuideData.forEach(bread => {
      if (bread.name.toLowerCase().includes(q) || 
          bread.characteristics.toLowerCase().includes(q)) {
        matches.push({
          type: "bread",
          name: bread.name,
          description: bread.characteristics,
          sectionId: "bread-guide"
        });
      }
    });

    // Search sandwiches
    [...regionalSandwiches, ...internationalSandwiches].forEach(sandwich => {
      if (sandwich.name.toLowerCase().includes(q) || 
          sandwich.origin.toLowerCase().includes(q) ||
          sandwich.description.toLowerCase().includes(q)) {
        const isRegional = regionalSandwiches.includes(sandwich);
        matches.push({
          type: "sandwich",
          name: `${sandwich.flag} ${sandwich.name}`,
          description: sandwich.origin,
          sectionId: isRegional ? "regional" : "international"
        });
      }
    });

    // Search sections
    encyclopediaSections.forEach(section => {
      if (section.title.toLowerCase().includes(q)) {
        matches.push({
          type: "section",
          name: section.title,
          description: "Section",
          sectionId: section.id
        });
      }
    });

    return matches.slice(0, 8);
  }, [query]);

  const handleResultClick = (sectionId: string) => {
    onResultClick(sectionId);
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search cheeses, breads, sandwiches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {results.map((result, index) => (
            <button
              key={`${result.type}-${result.name}-${index}`}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
              onClick={() => handleResultClick(result.sectionId || "")}
            >
              <span className="text-xs uppercase font-medium text-muted-foreground w-16 shrink-0">
                {result.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{result.name}</p>
                <p className="text-xs text-muted-foreground truncate">{result.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isFocused && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center text-sm text-muted-foreground">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
