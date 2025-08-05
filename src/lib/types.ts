

export interface Announcement {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  audience: 'All' | 'JEE' | 'NEET';
  tag: 'Important' | 'Update' | 'Info';
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
  youtubeUrl: string;
  tags: string[];
  notes?: string;
}

export interface ImportantUpdate {
  id: number;
  title: string;
  description: string;
  link?: string;
}

export interface Feedback {
    id: string;
    subject: string;
    feedback: string;
    createdAt: string;
}
