
import { Timestamp } from "firebase/firestore";

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface FreeResource {
  id: number;
  subject: 'Physics' | 'Chemistry' | 'Math' | 'PYQs';
  type: string;
}

export interface UpcomingTest {
  id: number;
  title: string;
  subject: string;
  date: string;
  chapters: string[];
  countdown_to: string;
}

export interface LatestLecture {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
  notes?: string;
}

export interface ImportantUpdate {
  id: number;
  title: string;
  description: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  joinDate: Timestamp | null;
  lastActive: Timestamp | null;
  activityLog: Activity[];
}

export type Activity = {
    type: "lecture_view" | "note_download" | "test_attempt" | "view_announcement";
    timestamp: Timestamp;
} & ({
    type: "lecture_view";
    lectureId: string;
} | {
    type: "note_download";
    noteId: string;
} | {
    type: "test_attempt";
    testId: string;
    score: number;
} | {
    type: "view_announcement";
    announcementId: string;
});

// This is the primary type for all lecture posts.
export interface Post {
  id: string;
  title: string;
  description: string;
  exam: "JEE" | "NEET" | "BOTH";
  subject: string;
  chapter?: string;
  tags: string[];
  notify: boolean;
  timestamp: any;
  type: "youtube";
  videoUrl: string; // Embed URL
  thumbnailUrl: string; // YouTube thumbnail URL
  notes?: string;
}
