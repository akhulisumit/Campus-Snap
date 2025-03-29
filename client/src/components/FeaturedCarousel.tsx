import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event';

interface FeaturedCarouselProps {
  events: Event[];
}

export default function FeaturedCarousel({ events }: FeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayIntervalRef.current = setInterval(() => {
      goToNext();
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
    if (isAutoPlaying) startAutoPlay();
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
    if (isAutoPlaying) startAutoPlay();
  };

  return (
    <section id="featured" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          <span className="relative inline-block">
            Featured Events
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"></span>
          </span>
        </motion.h2>

        <div className="relative overflow-hidden max-w-7xl mx-auto">
          <div className="flex items-center justify-center relative h-[400px]">
            <AnimatePresence initial={false} mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                const index = (activeIndex + offset + events.length) % events.length;
                const event = events[index];

                return (
                  <motion.div
                    key={event.id}
                    className={cn(
                      "absolute w-[300px] h-[350px] rounded-xl overflow-hidden shadow-lg",
                      "transition-shadow duration-300 hover:shadow-xl"
                    )}
                    initial={{ 
                      x: offset * 350,
                      scale: offset === 0 ? 1 : 0.8,
                      opacity: offset === 0 ? 1 : 0.6 
                    }}
                    animate={{ 
                      x: offset * 350,
                      scale: offset === 0 ? 1 : 0.8,
                      opacity: offset === 0 ? 1 : 0.6,
                      zIndex: offset === 0 ? 1 : 0
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative w-full h-full group cursor-pointer">
                      <img 
                        src={event.photos[0].url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="absolute bottom-0 p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-200">
                            {event.categories.map(cat => cat.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className={cn(
                "rounded-full px-4 transition-colors duration-300",
                isAutoPlaying && "bg-primary text-primary-foreground"
              )}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              Auto-play
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}