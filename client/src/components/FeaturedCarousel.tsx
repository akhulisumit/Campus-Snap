import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Event } from '@/types/event';

interface FeaturedCarouselProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function FeaturedCarousel({ events, onEventClick }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + events.length) % events.length;
  };

  return (
    <section className="relative py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Events
        </h2>

        <div className="relative h-[500px] overflow-hidden">
          <div className="flex justify-center items-center h-full">
            {[-1, 0, 1].map((offset, index) => {
              const eventIndex = getSlideIndex(offset);
              const event = events[eventIndex];
              return (
                <motion.div
                  key={`${event.id}-${offset}`}
                  initial={false}
                  animate={{ 
                    x: `${offset * 85}%`,
                    opacity: offset === 0 ? 1 : 0.7,
                    scale: offset === 0 ? 1.6 : 0.8,
                    zIndex: offset === 0 ? 10 : 1
                  }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    opacity: { duration: 0.4, ease: "easeInOut" },
                    scale: { duration: 0.5, ease: "easeInOut" },
                  }}
                  className={`absolute w-[500px] cursor-pointer ${offset === 0 ? 'z-10' : 'z-0'}`}
                  onClick={() => offset === 0 && onEventClick(event)}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[16/9]">
                    <img
                      src={`https://picsum.photos/800/500?random=${event.id}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}