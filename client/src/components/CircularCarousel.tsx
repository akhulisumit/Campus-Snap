import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event } from "@shared/schema";

interface CircularCarouselProps {
  events: Event[];
}

export default function CircularCarousel({ events }: CircularCarouselProps) {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemAngle = 360 / events.length;

  useEffect(() => {
    if (isAutoRotating) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }

    return () => {
      stopAutoRotate();
    };
  }, [isAutoRotating]);

  const startAutoRotate = () => {
    autoRotateIntervalRef.current = setInterval(() => {
      setCurrentRotation((prev) => prev - itemAngle);
    }, 3000);
  };

  const stopAutoRotate = () => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
  };

  const rotatePrev = () => {
    setCurrentRotation((prev) => prev + itemAngle);
    restartAutoRotate();
  };

  const rotateNext = () => {
    setCurrentRotation((prev) => prev - itemAngle);
    restartAutoRotate();
  };

  const restartAutoRotate = () => {
    if (isAutoRotating) {
      stopAutoRotate();
      startAutoRotate();
    }
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
  };

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
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"></span>
          </span>
        </motion.h2>
        
        <div className="relative perspective-1000 h-[400px]">
          <motion.div 
            ref={carouselRef}
            className="w-full h-full transform-style-3d"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `rotateY(${currentRotation}deg)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            {events.map((event, index) => {
              const angle = itemAngle * index;
              return (
                <div
                  key={event.id}
                  className="absolute left-1/2 top-0 w-[250px] h-[350px] -ml-[125px] transition-all duration-500 overflow-hidden rounded-lg shadow-lg"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(400px)`,
                    zIndex: index === 0 ? 10 : 0,
                    opacity: index === 0 ? 1 : 0.7,
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden animate-fade-in">
                    <img 
                      src={event.photos[0].url} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm opacity-80">{new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
          
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={rotatePrev}
              className="bg-secondary hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={toggleAutoRotate}
              className={cn(
                "rounded-full px-4 h-10 flex items-center justify-center transition-colors duration-300 text-sm",
                isAutoRotating ? "bg-accent" : "bg-secondary hover:bg-accent"
              )}
            >
              <Repeat className="mr-1 h-4 w-4" /> Auto-rotate
            </button>
            <button
              onClick={rotateNext}
              className="bg-secondary hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
              aria-label="Next item"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
