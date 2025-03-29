import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCategory } from "@/lib/utils";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: EventCategory) => void;
  currentCategory: EventCategory;
}

export default function SearchFilter({ 
  onSearch, 
  onCategoryChange, 
  currentCategory 
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  
  const categories: EventCategory[] = [
    "All", 
    "Cultural", 
    "Technical", 
    "Sports", 
    "Academic"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > window.innerHeight - 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCategoryClick = (category: EventCategory) => {
    onCategoryChange(category);
  };

  return (
    <section className={cn(
      "py-8 bg-secondary z-40 transition-all duration-300",
      isSticky ? "sticky top-16" : ""
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-xl">
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search events..." 
              className="w-full py-3 px-4 pl-12 bg-primary rounded-full text-light border border-gray-700 focus:border-accent focus:outline-none transition-colors duration-300"
            />
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto py-2 md:py-0">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-300",
                  currentCategory === category 
                    ? "bg-accent text-white" 
                    : "bg-primary text-light hover:bg-gray-800"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
