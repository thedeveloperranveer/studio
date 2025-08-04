import type { Announcement, FreeResource, UpcomingTest, LatestLecture, ImportantUpdate, Post } from './types';

export const announcements: Announcement[] = [];

export const freeResources: FreeResource[] = [];

const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export const upcomingTests: UpcomingTest[] = [];

export const latestLectures: LatestLecture[] = [
  {
    id: "WDjcpSCI-uU",
    title: "NEET Physics Lecture",
    subject: "Physics",
    chapter: "YouTube Live",
    thumbnailUrl: "https://img.youtube.com/vi/WDjcpSCI-uU/0.jpg",
    videoUrl: "https://www.youtube.com/embed/WDjcpSCI-uU",
    youtubeUrl: "https://www.youtube.com/watch?v=WDjcpSCI-uU",
    tags: ["NEET", "Physics", "YouTube Live"],
    notes: "Lecture Notes: Will be provided soon"
  },
  {
    id: "46CaYBwEp_k",
    title: "Vectors One Shot",
    subject: "Physics",
    chapter: "Vectors",
    thumbnailUrl: "https://img.youtube.com/vi/46CaYBwEp_k/0.jpg",
    videoUrl: "https://www.youtube.com/embed/46CaYBwEp_k",
    youtubeUrl: "https://www.youtube.com/watch?v=46CaYBwEp_k",
    tags: ["Vectors", "One Shot", "JEE", "NEET"],
    notes: "Lecture Notes: Will be provided soon"
  }
];

export const importantUpdates: ImportantUpdate[] = [];

export const userFeedback: { id: number; username: string; feedback: string; date: string }[] = [];
