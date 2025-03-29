import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardHoverProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CardHover({ children, className, onClick }: CardHoverProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg overflow-hidden bg-secondary cursor-pointer",
        className
      )}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
