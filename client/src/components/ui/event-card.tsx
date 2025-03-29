import { Event } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import { CardHover } from "./card-hover";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  onEventClick: (event: Event) => void;
  delay?: number;
}

export function EventCard({ event, onEventClick, delay = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay 
      }}
    >
      <CardHover onClick={() => onEventClick(event)}>
        <div className="relative h-64 overflow-hidden">
          {/* Image with hover effect */}
          <div className="w-full h-full transform transition-transform duration-500 hover:scale-110">
            <img 
              src={event.thumbnailUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay with event details */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
            <span className="px-2 py-1 bg-primary text-xs font-semibold rounded-full w-max mb-2">
              {event.category}
            </span>
            <h3 className="text-lg font-semibold text-white">{event.title}</h3>
            <p className="text-sm text-white/80">{formatDate(event.date)}</p>
          </div>
        </div>
      </CardHover>
    </motion.div>
  );
}
