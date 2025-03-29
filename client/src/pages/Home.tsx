import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSlider from "@/components/HeroSlider";
import SearchFilter from "@/components/SearchFilter";
import FeaturedCarousel from "../components/FeaturedCarousel"; // Using relative path
import GalleryGrid from "@/components/GalleryGrid";
import Lightbox from "@/components/Lightbox";
import { EventCategory } from "@/lib/utils";
import { Event } from "@shared/schema";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { theme } = useTheme(); // Use theme context

  // Fetch all events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  // Get featured events (first 5 for carousel)
  const featuredEvents = events.slice(0, 5);
  
  // Get hero slide events (first 3)
  const heroEvents = events.slice(0, 3);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategory(category);
  };

  const handleEventClick = (eventId: number) => {
    const event = events.find(e => e.id === eventId) || null;
    setSelectedEvent(event);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className={`pt-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}`}>
      {/* Hero section */}
      <HeroSlider slides={heroEvents} />
      
      {/* Featured Events Carousel */}
      <FeaturedCarousel events={featuredEvents} />
      
      {/* Search & Filter - Moved below featured events */}
      <SearchFilter 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange} 
        currentCategory={selectedCategory} 
      />
      
      {/* Gallery Grid */}
      <GalleryGrid 
        events={events} 
        onEventClick={handleEventClick} 
        filteredCategory={selectedCategory}
        searchQuery={searchQuery}
      />
      
      {/* Lightbox */}
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={closeLightbox} 
        event={selectedEvent} 
        events={events} 
      />
    </div>
  );
}
