import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search monsters by name, element, or skill..." 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className={`
        relative flex items-center transition-all duration-300
        ${isFocused ? 'transform scale-105' : ''}
      `}>
        {/* Search Icon */}
        <div className="absolute left-4 z-10">
          <Search className={`
            w-5 h-5 transition-colors duration-200
            ${isFocused ? 'text-electric' : 'text-muted-foreground'}
          `} />
        </div>

        {/* Input Field */}
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            pl-12 pr-20 h-14 text-lg
            bg-card border-border
            focus:border-electric focus:ring-electric/20
            transition-all duration-300
            ${isFocused ? 'shadow-[0_0_20px_hsl(var(--electric)/0.2)]' : ''}
          `}
        />

        {/* Action Buttons */}
        <div className="absolute right-2 flex items-center gap-1">
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground hover:text-electric"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Glow effect on focus */}
      {isFocused && (
        <div className="absolute -inset-1 bg-gradient-to-r from-electric/20 to-primary/20 rounded-xl blur-sm -z-10 animate-glow-pulse" />
      )}
    </div>
  );
};