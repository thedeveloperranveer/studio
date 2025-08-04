
'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Post } from '@/lib/types';

// The data coming from the card generator form.
type CardData = {
  title: string;
  exam: "JEE" | "NEET" | "BOTH";
  subject: string;
  tags: string[];
  youtubeLink: string;
  notes: string;
  videoId: string | null;
}

/**
 * Creates a Firestore post document for a new lecture from the card generator.
 * @param cardData The lecture data from the form.
 * @returns An object indicating success or failure.
 */
export async function saveCard(
  cardData: CardData
): Promise<{ success: boolean; message: string }> {
  try {
    const { videoId, exam, subject, ...restOfData } = cardData;

    if (!videoId) {
      return { success: false, message: 'Invalid YouTube video ID.' };
    }
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    
    const postDoc: Omit<Post, 'id'> = {
      title: restOfData.title,
      description: '', // Card generator doesn't have a description field
      exam,
      subject,
      tags: restOfData.tags,
      youtubeUrl: restOfData.youtubeLink,
      videoUrl: embedUrl,
      type: 'youtube',
      thumbnailUrl,
      notes: restOfData.notes,
      notify: true, // Default to notifying users for new posts from generator
      timestamp: serverTimestamp(),
    };
    
    // Save all posts to a single "lectures" collection
    const postCollectionRef = collection(db, 'lectures');
    await addDoc(postCollectionRef, postDoc);

    return { success: true, message: 'Lecture post created successfully!' };
  } catch (error) {
    console.error('Error creating lecture post from card generator:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: `Failed to create post. ${errorMessage}` };
  }
}
