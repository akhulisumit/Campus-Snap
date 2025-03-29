import { useState } from "react";
import { EventWithPhotos } from "@/types/event";
import { Event } from "@shared/schema";

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithPhotos | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  
  const openLightbox = (event: EventWithPhotos) => {
    setSelectedEvent(event);
    setSelectedPhotoIndex(0);
    setIsOpen(true);
  };
  
  const closeLightbox = () => {
    setIsOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setSelectedEvent(null);
      setSelectedPhotoIndex(0);
    }, 300);
  };
  
  const nextPhoto = () => {
    if (!selectedEvent || !selectedEvent.photos || selectedEvent.photos.length === 0) return;
    
    setSelectedPhotoIndex((prev) => 
      (prev + 1) % selectedEvent.photos!.length
    );
  };
  
  const prevPhoto = () => {
    if (!selectedEvent || !selectedEvent.photos || selectedEvent.photos.length === 0) return;
    
    setSelectedPhotoIndex((prev) => 
      (prev - 1 + selectedEvent.photos!.length) % selectedEvent.photos!.length
    );
  };
  
  const goToPhoto = (index: number) => {
    if (!selectedEvent || !selectedEvent.photos) return;
    
    if (index >= 0 && index < selectedEvent.photos.length) {
      setSelectedPhotoIndex(index);
    }
  };
  
  return {
    isOpen,
    selectedEvent,
    selectedPhotoIndex,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
    goToPhoto
  };
}
