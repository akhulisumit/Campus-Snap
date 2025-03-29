import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@shared/schema";
import { useTheme } from "@/contexts/ThemeContext";

interface FeaturedCarouselProps {
  events: Event[];
}

export default function FeaturedCarousel({ events }: FeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Set dynamic theme-based colors
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  
  // Change to custom blue color
  const accentColor = 'bg-[#0245b9]';
  const accentHoverColor = 'hover:bg-[#0245b9]/90';
  const dotColor = 'bg-[#0245b9]';
  
  // Function to get the correct index for the infinite carousel
  const getCircularIndex = (idx: number) => {
    return (idx + events.length) % events.length;
  };

  // Get previous and next indices
  const prevIndex = getCircularIndex(activeIndex - 1);
  const nextIndex = getCircularIndex(activeIndex + 1);

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
      setSlideDirection("right");
      setActiveIndex((prev) => getCircularIndex(prev + 1));
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const goToPrev = () => {
    setSlideDirection("left");
    setActiveIndex(prevIndex);
    restartAutoPlay();
  };

  const goToNext = () => {
    setSlideDirection("right");
    setActiveIndex(nextIndex);
    restartAutoPlay();
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > activeIndex ? "right" : "left");
    setActiveIndex(index);
    restartAutoPlay();
  };

  const restartAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  };

  const slideVariants = {
    enterFromLeft: {
      x: -1000,
      opacity: 0,
      scale: 0.8,
    },
    enterFromRight: {
      x: 1000,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      }
    },
    exitToLeft: {
      x: -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
      }
    },
    exitToRight: {
      x: 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
      }
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
            <span className={`absolute -bottom-2 left-0 right-0 h-1 ${accentColor}`}></span>
          </span>
        </motion.h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel with 3 visible slides */}
          <div className="overflow-hidden py-12">
            <div className="flex items-center justify-center relative h-[400px] md:h-[500px]">
              {/* Previous Slide (Left) */}
              <div className="absolute left-0 md:left-[5%] z-10 w-[28%] md:w-[25%] h-[85%] opacity-70">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg cursor-pointer`} onClick={goToPrev}>
                  <motion.img 
                    src={events[prevIndex].photos[0].url} 
                    alt={events[prevIndex].title}
                    className="w-full h-full object-cover brightness-75"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              
              {/* Current Slide (Center) */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div 
                  key={activeIndex}
                  variants={slideVariants}
                  initial={slideDirection === "right" ? "enterFromRight" : "enterFromLeft"}
                  animate="center"
                  exit={slideDirection === "right" ? "exitToLeft" : "exitToRight"}
                  className="relative z-20 w-[44%] md:w-[50%] h-full mx-auto"
                >
                  <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-2xl`}>
                    <motion.img 
                      src={events[activeIndex].photos[0].url} 
                      alt={events[activeIndex].title}
                      className="w-full h-full object-cover"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ 
                        duration: 8, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop" 
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className={`px-3 py-1 ${accentColor} text-white text-xs font-semibold rounded-full inline-block mb-3`}>
                          {events[activeIndex].category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{events[activeIndex].title}</h3>
                        <p className="text-gray-200 mb-2 text-sm md:text-base">
                          {new Date(events[activeIndex].date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-gray-300 text-sm md:text-base line-clamp-2">{events[activeIndex].description}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Next Slide (Right) */}
              <div className="absolute right-0 md:right-[5%] z-10 w-[28%] md:w-[25%] h-[85%] opacity-70">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg cursor-pointer`} onClick={goToNext}>
                  <motion.img 
                    src={events[nextIndex].photos[0].url} 
                    alt={events[nextIndex].title}
                    className="w-full h-full object-cover brightness-75"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute inset-y-0 left-2 md:left-4 flex items-center">
            <button
              onClick={goToPrev}
              className={`bg-black/50 ${accentHoverColor} text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-2 md:right-4 flex items-center">
            <button
              onClick={goToNext}
              className={`bg-black/50 ${accentHoverColor} text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105`}
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
                className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                  index === activeIndex ? `${dotColor} scale-125` : 'bg-gray-400'
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