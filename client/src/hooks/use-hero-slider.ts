import { useState, useEffect, useRef } from "react";
import { HeroSlide } from "@/types/event";

export function useHeroSlider(slides: HeroSlide[]) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const slideDuration = 5000; // 5 seconds per slide
  const progressUpdateInterval = 50; // Update progress every 50ms for smooth progress bar

  const startProgressTimer = () => {
    // Clear any existing progress interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset progress
    setProgress(0);
    
    // Start new progress timer
    let elapsed = 0;
    progressIntervalRef.current = setInterval(() => {
      elapsed += progressUpdateInterval;
      const newProgress = (elapsed / slideDuration) * 100;
      setProgress(Math.min(newProgress, 100));
    }, progressUpdateInterval);
  };

  const startAutoSlide = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start progress timer
    startProgressTimer();
    
    // Start slide interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, slideDuration);
  };

  const resetAutoSlide = () => {
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startProgressTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startProgressTimer();
  };

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      // Clean up on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [slides.length]);

  return {
    currentSlide,
    progress,
    nextSlide,
    prevSlide,
    resetAutoSlide
  };
}