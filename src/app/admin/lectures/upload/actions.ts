
'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Post } from '@/lib/types';

// The data coming from the form, omitting fields that will be generated.
type LectureFormData = Omit<Post, 'id' | 'timestamp' | 'type' | 'videoUrl' | 'thumbnailUrl'> & {
    youtubeUrl: string;
};

/**
 * Extracts the YouTube video ID from various URL formats.
 * @param url The YouTube URL.
 * @returns The video ID or null if not found.
 */
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

/**
 * Creates a Firestore post document for a new lecture using only external links.
 * @param lectureData The lecture data from the form.
 * @returns An object indicating success or failure.
 */
export async function uploadLecture(
  lectureData: LectureFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const { youtubeUrl, exam, subject, tags, notes, ...restOfData } = lectureData;

    if (!youtubeUrl || !exam || !subject) {
        return { success: false, message: 'Missing required fields: youtubeUrl, exam, or subject.' };
    }
    
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      return { success: false, message: 'Invalid YouTube URL provided.' };
    }
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    
    // Prepare the document for Firestore
    const postDoc: Omit<Post, 'id'> = {
      ...restOfData,
      exam,
      subject,
      tags,
      videoUrl: embedUrl,
      type: 'youtube',
      thumbnailUrl,
      timestamp: serverTimestamp(),
    };
    
    if (notes) {
      postDoc.notes = notes;
    }
    
    // Save all posts to a single "lectures" collection
    const postCollectionRef = collection(db, 'lectures');
    await addDoc(postCollectionRef, postDoc);

    // In a real app, you would trigger a push notification here if notify is true.

    return { success: true, message: 'Lecture post created successfully!' };
  } catch (error) {
    console.error('Error creating lecture post:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: `Failed to create post. ${errorMessage}` };
  }
}
