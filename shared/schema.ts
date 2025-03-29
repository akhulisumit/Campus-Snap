import { pgTable, text, serial, integer, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { EventCategory } from "../client/src/lib/utils";

// Photo schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  eventId: integer("event_id").notNull(),
});

// Event schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  category: text("category").notNull(),
  isFeatured: integer("is_featured").default(0),
});

// Photo insert schema
export const insertPhotoSchema = createInsertSchema(photos).omit({ id: true });

// Event insert schema
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// Types
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect & {
  photos: Photo[];
};

// For easy use in the app (these would normally come from the database)
export const mockEvents = [
  {
    id: 1,
    title: "Graduation Ceremony",
    description: "Celebrating the achievements of our graduating class with proud moments captured throughout the ceremony.",
    date: new Date("2023-06-20").toISOString(),
    category: "Academic",
    isFeatured: 0,
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 1
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 1
      }
    ]
  },
  {
    id: 2,
    title: "Spring Music Festival",
    description: "Our annual music extravaganza featuring student bands, professional artists, and unforgettable performances.",
    date: new Date("2023-04-15").toISOString(),
    category: "Cultural",
    isFeatured: 1,
    photos: [
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 2
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 2
      }
    ]
  },
  {
    id: 3,
    title: "Tech Hackathon",
    description: "Students competing to build innovative solutions to real-world problems in our annual hackathon challenge.",
    date: new Date("2023-03-10").toISOString(),
    category: "Technical",
    isFeatured: 0,
    photos: [
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 3
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 3
      }
    ]
  },
  {
    id: 4,
    title: "Basketball Championship",
    description: "The final showdown of our inter-college basketball tournament with top athletes competing for the trophy.",
    date: new Date("2023-05-05").toISOString(),
    category: "Sports",
    isFeatured: 1,
    photos: [
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 4
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 4
      }
    ]
  },
  {
    id: 5,
    title: "Science Fair",
    description: "Showcasing student research projects and scientific innovations from across all departments.",
    date: new Date("2023-02-15").toISOString(),
    category: "Academic",
    isFeatured: 0,
    photos: [
      {
        id: 9,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 5
      },
      {
        id: 10,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 5
      }
    ]
  },
  {
    id: 6,
    title: "Robotics Workshop",
    description: "Hands-on learning experience with cutting-edge robotics technology for engineering students.",
    date: new Date("2023-01-20").toISOString(),
    category: "Technical",
    isFeatured: 1,
    photos: [
      {
        id: 11,
        url: "https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 6
      },
      {
        id: 12,
        url: "https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 6
      }
    ]
  },
  {
    id: 7,
    title: "Cultural Dance Night",
    description: "A spectacular evening celebrating diverse cultural traditions through dance performances.",
    date: new Date("2022-12-10").toISOString(),
    category: "Cultural",
    isFeatured: 0,
    photos: [
      {
        id: 13,
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 7
      },
      {
        id: 14,
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 7
      }
    ]
  },
  {
    id: 8,
    title: "Swimming Competition",
    description: "Annual swimming championship featuring individual and team events across multiple categories.",
    date: new Date("2022-09-05").toISOString(),
    category: "Sports",
    isFeatured: 1,
    photos: [
      {
        id: 15,
        url: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 8
      },
      {
        id: 16,
        url: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 8
      }
    ]
  },
  {
    id: 9,
    title: "Inter-College Championships",
    description: "Top athletes from regional colleges compete in our state-of-the-art facilities for the championship title.",
    date: new Date("2023-07-15").toISOString(),
    category: "Sports",
    isFeatured: 1,
    photos: [
      {
        id: 17,
        url: "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
        eventId: 9
      },
      {
        id: 18,
        url: "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        eventId: 9
      }
    ]
  }
];

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
