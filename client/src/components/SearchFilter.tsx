import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCategory } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();
  
  const categories: EventCategory[] = [
    "All", 
    "Cultural", 
    "Technical", 
    "Sports", 
    "Academic"
  ];

  // Dynamic theme classes
  const bgClass = theme === 'light' 
    ? 'bg-gray-100' 
    : 'bg-gray-800';
  
  const inputBgClass = theme === 'light'
    ? 'bg-white text-gray-800 border-gray-300'
    : 'bg-gray-900 text-white border-gray-700';
  
  const categoryBgClass = theme === 'light'
    ? 'bg-white text-gray-800 hover:bg-gray-200'
    : 'bg-gray-900 text-white hover:bg-gray-700';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Make sticky after featured section
      if (offset > window.innerHeight + 200) {
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
      `py-2 ${bgClass} shadow-md z-40 transition-all duration-300`,
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
              className={`w-full py-3 px-4 pl-12 rounded-full ${inputBgClass} border focus:border-accent focus:outline-none transition-colors duration-300 shadow-sm`}
            />
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto py-2 md:py-0">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-300 shadow-sm",
                  currentCategory === category 
                    ? "bg-accent text-white hover:bg-accent-hover" 
                    : categoryBgClass
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
