import { Event, Photo } from "@shared/schema";

export type EventWithPhotos = Event & {
  photos?: Photo[];
};

export type HeroSlide = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};
