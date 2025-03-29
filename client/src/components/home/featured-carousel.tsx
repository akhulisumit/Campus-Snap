import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Event } from "@shared/schema";
import { useCarousel } from "@/hooks/use-carousel";
import { formatDate } from "@/lib/utils";

interface FeaturedCarouselProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function FeaturedCarousel({ events, onEventClick }: FeaturedCarouselProps) {
  const { 
    currentIndex,
    isAutoRotating,
    nextSlide,
    prevSlide,
    toggleAutoRotate,
    getItemStyle
  } = useCarousel(events.length);
  
  if (events.length === 0) return null;
  
  return (
    <section id="featured" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-montserrat font-bold mb-12 text-center"
        >
          <span className="relative inline-block">
            Featured Events
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"></span>
          </span>
        </motion.h2>
        
        {/* 3D Carousel */}
        <div className="relative perspective-1000 h-[350px] mb-8">
          <div 
            className="w-full h-full relative transform-style-preserve-3d transition-transform duration-500"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateY(${currentIndex * -(360 / events.length)}deg)`
            }}
          >
            {events.map((event, index) => {
              const style = getItemStyle(index, events.length);
              
              return (
                <div
                  key={event.id}
                  className="carousel-item absolute w-[250px] h-[350px] top-0 left-1/2 -ml-[125px] transition-all duration-500 cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  style={style}
                  onClick={() => {
                    if (index === currentIndex) {
                      onEventClick(event);
                    } else {
                      // If clicked on a side item, rotate to it
                      if (index > currentIndex) {
                        nextSlide();
                      } else {
                        prevSlide();
                      }
                    }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative overflow-hidden"
                  >
                    <img 
                      src={event.thumbnailUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                      <p className="text-sm text-white/80">{formatDate(event.date)}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Carousel Controls */}
        <div className="flex justify-center mt-6 space-x-4">
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
