import { apiRequest } from "./queryClient";
import { Event, Photo } from "@shared/schema";
import { EventWithPhotos } from "@/types/event";

export const api = {
  events: {
    getAll: async (category?: string, search?: string): Promise<Event[]> => {
      let url = "/api/events";
      
      const params = new URLSearchParams();
      if (category && category !== "All") {
        params.append("category", category);
      }
      if (search && search.trim() !== "") {
        params.append("search", search);
      }
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const res = await apiRequest("GET", url);
      return res.json();
    },
    
    getFeatured: async (): Promise<Event[]> => {
      const res = await apiRequest("GET", "/api/events/featured");
      return res.json();
    },
    
    getById: async (id: number): Promise<Event> => {
      const res = await apiRequest("GET", `/api/events/${id}`);
      return res.json();
    },
    
    getWithPhotos: async (id: number): Promise<EventWithPhotos> => {
      const [event, photos] = await Promise.all([
        api.events.getById(id),
        api.photos.getByEventId(id)
      ]);
      
      return {
        ...event,
        photos
      };
    }
  },
  
  photos: {
    getByEventId: async (eventId: number): Promise<Photo[]> => {
      const res = await apiRequest("GET", `/api/events/${eventId}/photos`);
      return res.json();
    }
  },
  
  categories: {
    getAll: async (): Promise<string[]> => {
      const res = await apiRequest("GET", "/api/categories");
      return res.json();
    }
  }
};
