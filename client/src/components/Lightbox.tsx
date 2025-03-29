import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@shared/schema";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  events: Event[];
}

export default function Lightbox({ isOpen, onClose, event, events }: LightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

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
          className="fixed inset-0 z-[1000] bg-black bg-opacity-90 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full h-full flex items-center justify-center flex-col">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 bg-black bg-opacity-50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 z-10"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            
            {/* Image Container */}
            <div className="relative max-w-full max-h-full">
              <motion.img
                key={`${currentEvent.id}-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]?.url}
                alt={`${currentEvent.title} - Photo ${currentImageIndex + 1}`}
                className="max-w-[90%] max-h-[80vh] object-contain mx-auto"
              />
              
              {/* Caption */}
              <div className="text-center mt-4 px-4">
                <h3 className="text-xl font-semibold">{currentEvent.title}</h3>
                <p className="text-sm opacity-80">{new Date(currentEvent.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  className="bg-black bg-opacity-50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 pointer-events-auto"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  className="bg-black bg-opacity-50 hover:bg-accent rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 pointer-events-auto"
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
                <div className="flex justify-center space-x-2 px-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`w-16 h-10 rounded overflow-hidden cursor-pointer transition-opacity duration-300 border-2 ${
                        currentImageIndex === index ? "border-accent opacity-100" : "border-transparent opacity-50 hover:opacity-100"
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
