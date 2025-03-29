import { useState, useEffect, useRef } from "react";

export function useCarousel(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoRotating) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }

    return () => {
      stopAutoRotate();
    };
  }, [isAutoRotating, itemCount]);

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, 3000);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
    restartAutoRotate();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    restartAutoRotate();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    restartAutoRotate();
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
  };

  const restartAutoRotate = () => {
    if (isAutoRotating) {
      stopAutoRotate();
      startAutoRotate();
    }
  };

  const getItemStyle = (index: number, total: number) => {
    // Calculate the angle for the item in 3D space
    const angle = (index - currentIndex) * (360 / total);
    
    // Calculate the z-distance - items further from current have larger z-distance
    const zDistance = 300; // Base distance from center
    
    // Calculate x, y and z position
    const x = Math.sin(angle * Math.PI / 180) * 350; // Radius of the circle
    const z = -Math.cos(angle * Math.PI / 180) * zDistance; // Negative to push back
    
    // Scale based on z position - further items are smaller
    const scale = Math.max(0.6, 1 - Math.abs(angle) / 360);
    
    // Opacity based on angle - current item is fully opaque
    const opacity = Math.max(0.4, 1 - Math.abs(angle) / 180);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`,
      opacity,
      zIndex: Math.round(opacity * 10),
      position: "absolute" as "absolute",
      transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
    };
  };

  return {
    currentIndex,
    isAutoRotating,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleAutoRotate,
    getItemStyle
  };
}