
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event';
import { formatDate } from '@/lib/date';

interface FeaturedCarouselProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function FeaturedCarousel({ events, onEventClick }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const getSlideStyle = (index: number) => {
    const diff = (index - currentIndex + events.length) % events.length;
    let x = 0;
    let scale = 0.8;
    let zIndex = 0;

    if (diff === 0) { // Center
      x = 0;
      scale = 1;
      zIndex = 3;
    } else if (diff === 1 || diff === -2) { // Right
      x = 300;
      zIndex = 2;
    } else if (diff === -1 || diff === 2) { // Left
      x = -300;
      zIndex = 2;
    } else { // Off screen
      x = diff > 0 ? 600 : -600;
      scale = 0.6;
      zIndex = 1;
    }

    return {
      transform: `translateX(${x}px) scale(${scale})`,
      zIndex: zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Events</h2>
        
        <div className="relative h-[450px]">
          <div className="relative w-full h-full flex items-center justify-center">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="carousel-item absolute w-[300px] h-[400px] top-1/2 left-1/2 -ml-[150px] -mt-[200px] cursor-pointer overflow-hidden rounded-lg shadow-xl"
                style={getSlideStyle(index)}
                onClick={() => {
                  if (index === currentIndex) {
                    onEventClick(event);
                  } else {
                    if ((index - currentIndex + events.length) % events.length === 1) {
                      nextSlide();
                    } else {
                      prevSlide();
                    }
                  }
                }}
                whileHover={{ scale: index === currentIndex ? 1.05 : 1 }}
              >
                <div className="w-full h-full relative overflow-hidden group">
                  <img 
                    src={event.thumbnailUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/90">{formatDate(event.date)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            className={cn(
              "rounded-full px-4 h-10 transition-colors duration-300 text-sm",
              isAutoRotating && "bg-primary text-primary-foreground"
            )}
            onClick={toggleAutoRotate}
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            Auto-rotate
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
