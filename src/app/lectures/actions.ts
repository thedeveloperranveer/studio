
'use server';

import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Post } from '@/lib/types';

export async function getLectures(max: number = 50): Promise<Post[]> {
  try {
    const allLectures: Post[] = [];
    
    const lecturesCol = collection(db, 'lectures');
    const q = query(lecturesCol, orderBy('timestamp', 'desc'), limit(max));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(doc => {
        const data = doc.data();
        allLectures.push({
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            exam: data.exam || 'BOTH',
            subject: data.subject || '',
            chapter: data.chapter || '',
            tags: data.tags || [],
            type: data.type || 'youtube',
            youtubeUrl: data.youtubeUrl || '',
            videoUrl: data.videoUrl || '',
            thumbnailUrl: data.thumbnailUrl || '',
            notes: data.notes,
            notify: data.notify || false,
            timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
        } as Post);
    });

    return allLectures;

  } catch (error) {
    console.error("Error fetching lectures:", error);
    return [];
  }
}
