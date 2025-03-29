import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventWithPhotos } from "@/types/event";
import { formatDate } from "@/lib/utils";

interface LightboxProps {
  event: EventWithPhotos;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectPhoto: (index: number) => void;
}

export default function Lightbox({ 
  event, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev,
  onSelectPhoto
}: LightboxProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'f') toggleFullscreen();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Re-enable scrolling
    };
  }, [onClose, onNext, onPrev]);
  
  // Get current photo
  const photos = event.photos || [];
  const currentPhoto = photos[currentIndex] || { imageUrl: event.thumbnailUrl, caption: event.title };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center"
        onClick={(e) => {
          // Close if clicking on background
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center flex-col">
          {/* Close Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-6 right-6 bg-black/50 hover:bg-primary border-0 text-foreground z-10 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Fullscreen Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-6 right-20 bg-black/50 hover:bg-primary border-0 text-foreground z-10 rounded-full"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
          
          {/* Image Container */}
          <div className="relative max-w-full max-h-full px-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentPhoto.imageUrl}
                alt={currentPhoto.caption || event.title}
                className="max-w-full max-h-[80vh] object-contain"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Caption */}
            <div className="text-center mt-4 px-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
              {currentPhoto.caption && (
                <p className="text-sm mt-2">{currentPhoto.caption}</p>
              )}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-black/50 hover:bg-primary border-0 text-foreground rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="bg-black/50 hover:bg-primary border-0 text-foreground rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Thumbnail Navigation */}
          {photos.length > 1 && (
            <div className="absolute bottom-8 left-0 w-full overflow-x-auto pb-2">
              <div className="flex justify-center space-x-2 px-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`w-16 h-10 rounded overflow-hidden cursor-pointer transition-all duration-300 ${
                      currentIndex === index 
                        ? "opacity-100 border-2 border-primary" 
                        : "opacity-50 border-2 border-transparent hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPhoto(index);
                    }}
                  >
                    <img 
                      src={photo.imageUrl} 
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
    </AnimatePresence>
  );
}
