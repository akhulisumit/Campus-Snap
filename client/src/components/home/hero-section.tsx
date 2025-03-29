import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeroSlider } from "@/hooks/use-hero-slider";
import { HeroSlide } from "@/types/event";

interface HeroSectionProps {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const { 
    currentSlide, 
    progress, 
    nextSlide, 
    prevSlide,
    resetAutoSlide 
  } = useHeroSlider(slides);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Slider */}
      <div className="hero-slider h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with content */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 flex flex-col justify-end pb-20 px-8 md:px-16 bg-gradient-to-t from-black to-transparent">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-5xl font-montserrat font-bold mb-4"
              >
                {slide.title}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg md:text-xl max-w-2xl mb-8"
              >
                {slide.description}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = "#events"}
                >
                  View Gallery
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation & Progress Indicators */}
      <div className="absolute bottom-10 left-0 w-full px-8 md:px-16 z-10 flex items-center justify-between">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div key={index} className="w-16 md:w-24 h-1 rounded-full overflow-hidden bg-white bg-opacity-20">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ 
                  width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" 
                }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-primary border-0 text-foreground"
            onClick={() => {
              prevSlide();
              resetAutoSlide();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-primary border-0 text-foreground"
            onClick={() => {
              nextSlide();
              resetAutoSlide();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
