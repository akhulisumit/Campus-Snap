import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Event } from "@shared/schema";
import { useTheme } from "@/contexts/ThemeContext";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  events: Event[];
}

export default function Lightbox({ isOpen, onClose, event, events }: LightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const { theme } = useTheme();

  // Theme-specific styling
  const bgOverlay = theme === 'light'
    ? 'bg-black/85'
    : 'bg-black/95';
    
  const infoBg = theme === 'light'
    ? 'bg-white/20 backdrop-blur-md'
    : 'bg-black/60 backdrop-blur-sm';
    
  const btnHoverBg = theme === 'light'
    ? 'hover:bg-accent hover:text-white'
    : 'hover:bg-accent hover:text-white';
    
  const thumbnailActiveBorder = theme === 'light'
    ? 'border-accent shadow-md shadow-accent/40'
    : 'border-accent shadow-lg shadow-accent/30';

  useEffect(() => {
    if (event) {
      const index = events.findIndex(e => e.id === event.id);
      if (index !== -1) {
        setCurrentEventIndex(index);
      }
      setCurrentImageIndex(0);
    }
  }, [event, events]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, currentImageIndex, currentEventIndex]);

  if (!event) return null;

  const currentEvent = events[currentEventIndex];
  const images = currentEvent?.photos || [];

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-[1000] ${bgOverlay} flex items-center justify-center`}
          onClick={handleBackdropClick}
        >
          <div className="relative w-full h-full flex items-center justify-center flex-col">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 bg-black/50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 z-10 shadow-lg"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            
            {/* Event Info */}
            <div className={`absolute top-6 left-6 right-20 text-white z-10 p-4 ${infoBg} rounded-lg max-w-xl`}>
              <h2 className="text-xl md:text-2xl font-bold mb-1">{currentEvent.title}</h2>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>
                  {new Date(currentEvent.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <p className="text-sm md:text-base line-clamp-2 md:line-clamp-3">{currentEvent.description}</p>
            </div>
            
            {/* Image Container */}
            <div className="relative max-w-full max-h-full mt-20 md:mt-16">
              <motion.img
                key={`${currentEvent.id}-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]?.url}
                alt={`${currentEvent.title} - Photo ${currentImageIndex + 1}`}
                className="max-w-[90%] max-h-[70vh] object-contain mx-auto shadow-2xl rounded-md"
              />
            </div>
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  className={`bg-black/50 ${btnHoverBg} rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-lg transform hover:scale-105`}
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  className={`bg-black/50 ${btnHoverBg} rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-lg transform hover:scale-105`}
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
            )}
            
            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-8 left-0 w-full overflow-x-auto pb-2">
                <div className="flex justify-center space-x-3 px-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`w-20 h-12 rounded-md overflow-hidden cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 ${
                        currentImageIndex === index ? thumbnailActiveBorder : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => goToImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
