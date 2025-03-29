import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, EVENT_CATEGORIES } from "@/lib/utils";
import { api } from "@/lib/api";

interface SearchFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchFilter({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}: SearchFilterProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // Fetch categories from API
  const { data: categories = EVENT_CATEGORIES } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: api.categories.getAll
  });
  
  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);
  
  return (
    <section className="py-8 bg-secondary sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-grow max-w-xl">
            <Input
              type="text"
              placeholder="Search events..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full py-3 px-4 pl-12 bg-primary rounded-full text-foreground border border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>
          
          {/* Category pills */}
          <div className="flex items-center space-x-2 overflow-x-auto py-2 md:py-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
