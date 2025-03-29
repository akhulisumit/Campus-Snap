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
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Set dynamic theme-based colors
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const cardBgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';

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
    setActiveIndex(prevIndex);
    restartAutoPlay();
  };

  const goToNext = () => {
    setActiveIndex(nextIndex);
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
            <span className={`absolute -bottom-2 left-0 right-0 h-1 ${accentColor}`}></span>
          </span>
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel with 3 visible slides */}
          <div className="overflow-hidden py-12">
            <div className="flex items-center justify-center relative h-[400px] md:h-[500px]">
              {/* Previous Slides (Left) */}
              <div className="absolute left-0 md:left-4 z-10 w-[20%] md:w-[18%] h-[75%] opacity-40 transform -translate-x-6 scale-85">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg`}>
                  <img 
                    src={events[getCircularIndex(activeIndex - 2)].photos[0].url} 
                    alt={events[getCircularIndex(activeIndex - 2)].title}
                    className="w-full h-full object-cover brightness-75"
                  />
                </div>
              </div>

              <div className="absolute left-[15%] md:left-[18%] z-10 w-[25%] md:w-[22%] h-[80%] opacity-60 transform -translate-x-2 scale-90">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg`}>
                  <img 
                    src={events[prevIndex].photos[0].url} 
                    alt={events[prevIndex].title}
                    className="w-full h-full object-cover brightness-75"
                  />
                </div>
              </div>

              {/* Current Slide (Center) */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-20 w-[40%] md:w-[60%] h-full"
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

              {/* Next Slides (Right) */}
              <div className="absolute right-[15%] md:right-[18%] z-10 w-[25%] md:w-[22%] h-[80%] opacity-60 transform translate-x-2 scale-90">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg`}>
                  <img 
                    src={events[nextIndex].photos[0].url} 
                    alt={events[nextIndex].title}
                    className="w-full h-full object-cover brightness-75"
                  />
                </div>
              </div>

              <div className="absolute right-0 md:right-4 z-10 w-[20%] md:w-[18%] h-[75%] opacity-40 transform translate-x-6 scale-85">
                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg`}>
                  <img 
                    src={events[getCircularIndex(activeIndex + 2)].photos[0].url} 
                    alt={events[getCircularIndex(activeIndex + 2)].title}
                    className="w-full h-full object-cover brightness-75"
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
        </div>
      </div>
    </section>
  );
}