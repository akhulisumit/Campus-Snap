import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event } from "@shared/schema";

interface HeroSliderProps {
  slides: Event[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 5000;

  // Auto advance slides
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, slideDuration);
    };

    if (isAutoPlaying) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  // Reset interval when changing slides manually
  const restartAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, slideDuration);
    }
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    restartAutoPlay();
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    restartAutoPlay();
  };

  // Progress animation for current slide
  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: "100%", transition: { duration: slideDuration / 1000, ease: "linear" } },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Slides */}
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={slide.photos[0].url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-2/3 flex flex-col justify-end pb-20 px-8 md:px-16 bg-gradient-to-t from-primary to-transparent">
              <AnimatePresence mode="wait">
                {index === currentSlide && (
                  <>
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-3xl md:text-5xl font-montserrat font-bold mb-4"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-lg md:text-xl max-w-2xl mb-8"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link href={`/#events`}>
                        <a className="bg-accent hover:bg-accent-light text-white font-semibold py-3 px-8 rounded-full inline-block transition-all duration-300 transform hover:scale-105 w-max">
                          View Gallery
                        </a>
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation & Progress Indicators */}
      <div className="absolute bottom-10 left-0 w-full px-8 md:px-16 z-20 flex items-center justify-between">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className="w-16 md:w-24 h-1 bg-white bg-opacity-20 rounded-sm overflow-hidden"
            >
              {index === currentSlide && (
                <motion.div
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  key={`progress-${currentSlide}`}
                  className="h-full bg-accent rounded-sm"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={goToPrevSlide}
            className="bg-black bg-opacity-50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-black bg-opacity-50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
