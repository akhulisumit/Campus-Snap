import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Event } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import SearchFilter from "@/components/home/search-filter";
import FeaturedCarousel from "@/components/home/featured-carousel";
import EventGallery from "@/components/home/event-gallery";
import Lightbox from "@/components/home/lightbox";
import { useLightbox } from "@/hooks/use-lightbox";
import { EventWithPhotos } from "@/types/event";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isOpen, selectedEvent, selectedPhotoIndex, openLightbox, closeLightbox, nextPhoto, prevPhoto, goToPhoto } = useLightbox();

  // Fetch all events with filtering
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/events', selectedCategory, searchQuery],
    queryFn: () => api.events.getAll(selectedCategory, searchQuery)
  });

  // Fetch featured events
  const { data: featuredEvents = [], isLoading: featuredLoading } = useQuery({
    queryKey: ['/api/events/featured'],
    queryFn: api.events.getFeatured
  });

  // Hero section slides (use featured events)
  const heroSlides = featuredEvents.slice(0, 3).map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    imageUrl: event.thumbnailUrl
  }));

  // Handle event click to open lightbox
  const handleEventClick = async (event: Event) => {
    try {
      const eventWithPhotos = await api.events.getWithPhotos(event.id);
      openLightbox(eventWithPhotos);
    } catch (error) {
      console.error("Failed to load event photos:", error);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        {!featuredLoading && heroSlides.length > 0 && (
          <HeroSection slides={heroSlides} />
        )}
        
        {/* Search & Filter */}
        <SearchFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {/* Featured Events Carousel */}
        {!featuredLoading && featuredEvents.length > 0 && (
          <FeaturedCarousel 
            events={featuredEvents} 
            onEventClick={handleEventClick}
          />
        )}
        
        {/* Event Gallery Grid */}
        <EventGallery 
          events={events} 
          loading={eventsLoading} 
          onEventClick={handleEventClick}
        />
      </main>
      
      {/* Lightbox for viewing photos */}
      {isOpen && selectedEvent && (
        <Lightbox
          event={selectedEvent as EventWithPhotos}
          currentIndex={selectedPhotoIndex}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrev={prevPhoto}
          onSelectPhoto={goToPhoto}
        />
      )}
      
      <Footer />
    </div>
  );
}
