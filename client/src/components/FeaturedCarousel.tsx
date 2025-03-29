import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@shared/schema";
import { useTheme } from "@/contexts/ThemeContext";

interface FeaturedCarouselProps {
  events: Event[];
}

export default function FeaturedCarousel({ events }: FeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Set dynamic theme-based colors
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const accentTextColor = theme === 'light' ? 'text-accent' : 'text-accent';

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isAutoPlaying, events.length]);

  const startAutoPlay = () => {
    autoPlayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
    restartAutoPlay();
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
    restartAutoPlay();
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    restartAutoPlay();
  };

  const restartAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  };

  return (
    <section id="featured" className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold mb-12 text-center ${textColor}`}
        >
          <span className="relative inline-block">
            Featured Events
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"></span>
          </span>
        </motion.h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            {events.map((event, index) => (
              <div 
                key={event.id}
                className={`relative ${index === activeIndex ? 'block' : 'hidden'} h-96 md:h-[500px] overflow-hidden rounded-lg`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img 
                    src={event.photos[0].url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 8, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop" 
                    }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <span className={`px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full inline-block mb-3`}>
                      {event.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-200 mb-4">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-300 line-clamp-2 mb-4">{event.description}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={goToPrev}
              className="bg-black bg-opacity-50 hover:bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={goToNext}
              className="bg-black bg-opacity-50 hover:bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {events.map((event, index) => (
              <button
                key={event.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-accent' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}