import { useState } from "react";
import { motion } from "framer-motion";
import { EventCategory } from "@/lib/utils";
import { Event } from "@shared/schema";
import { useTheme } from "@/contexts/ThemeContext";

interface GalleryGridProps {
  events: Event[];
  onEventClick: (eventId: number) => void;
  filteredCategory: EventCategory;
  searchQuery: string;
}

export default function GalleryGrid({ 
  events, 
  onEventClick, 
  filteredCategory,
  searchQuery 
}: GalleryGridProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const { theme } = useTheme();

  // Dynamic theme classes
  const bgClass = theme === 'light' 
    ? 'bg-white' 
    : 'bg-gray-900';
  
  const cardBgClass = theme === 'light'
    ? 'bg-gray-50 shadow-md'
    : 'bg-gray-800 shadow-lg';
  
  const textClass = theme === 'light'
    ? 'text-gray-800'
    : 'text-white';
  
  const secondaryTextClass = theme === 'light'
    ? 'text-gray-600'
    : 'text-gray-300';

  // Filter events by category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = filteredCategory === "All" || event.category === filteredCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredEvents.length));
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      scale: 0.95, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="events" className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold mb-12 text-center ${textClass}`}
        >
          <span className="relative inline-block">
            Event Gallery
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"></span>
          </span>
        </motion.h2>
        
        {filteredEvents.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visibleEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`${cardBgClass} rounded-lg overflow-hidden hover:transform hover:translate-y-[-5px] hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={() => onEventClick(event.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.photos[0].url} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full w-max mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-gray-300">{new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={`flex justify-center items-center h-64 ${secondaryTextClass}`}>
            <p className="text-xl">No events found matching your criteria.</p>
          </div>
        )}
        
        {filteredEvents.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={loadMore}
              className="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
