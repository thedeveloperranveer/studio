
'use server';

import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Post } from '@/lib/types';

const COLLECTION_PREFIXES = ['posts_JEE_', 'posts_NEET_', 'posts_BOTH_'];
const SUBJECTS = ['physics', 'chemistry', 'maths', 'biology'];

export async function getLectures(max: number = 50): Promise<Post[]> {
  try {
    const allLectures: Post[] = [];
    const lecturePromises: Promise<void>[] = [];

    const allCollectionPaths: string[] = [];
    COLLECTION_PREFIXES.forEach(prefix => {
        SUBJECTS.forEach(subject => {
            allCollectionPaths.push(`${prefix}${subject}`);
        });
    });

    for (const path of allCollectionPaths) {
        const promise = async () => {
            const lecturesCol = collection(db, path);
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
                    videoUrl: data.videoUrl || '',
                    thumbnailUrl: data.thumbnailUrl || '',
                    notes: data.notes,
                    notify: data.notify || false,
                    timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
                } as Post);
            });
        };
        lecturePromises.push(promise());
    }
    
    await Promise.all(lecturePromises);

    // Sort all merged lectures by timestamp and take the latest `max` amount.
    allLectures.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return allLectures.slice(0, max);

  } catch (error) {
    console.error("Error fetching lectures:", error);
    return [];
  }
}
