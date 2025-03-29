import { useState } from "react";
import { motion } from "framer-motion";
import { Event } from "@shared/schema";
import { EventCard } from "@/components/ui/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface EventGalleryProps {
  events: Event[];
  loading: boolean;
  onEventClick: (event: Event) => void;
}

export default function EventGallery({ events, loading, onEventClick }: EventGalleryProps) {
  const [visibleEvents, setVisibleEvents] = useState(8);
  
  const handleLoadMore = () => {
    setVisibleEvents((prev) => Math.min(prev + 8, events.length));
  };
  
  // Check if there are more events to load
  const hasMoreEvents = visibleEvents < events.length;
  
  return (
    <section id="events" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-montserrat font-bold mb-12 text-center"
        >
          <span className="relative inline-block">
            Event Gallery
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"></span>
          </span>
        </motion.h2>
        
        {loading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No events found. Try a different search or category.</p>
          </div>
        ) : (
          // Event grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.slice(0, visibleEvents).map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEventClick={onEventClick}
                delay={index * 0.05} // Staggered animation
              />
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {hasMoreEvents && !loading && (
          <div className="flex justify-center mt-12">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
