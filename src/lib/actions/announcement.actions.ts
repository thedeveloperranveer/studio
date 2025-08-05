
'use server';
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import type { Announcement } from "../types";

// Type for creating an announcement (without id and createdAt)
export type CreateAnnouncement = Omit<Announcement, 'id' | 'createdAt'>;

// Function to create a new announcement in Firestore
export async function createAnnouncement(announcement: CreateAnnouncement): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "announcements"), {
            ...announcement,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not create announcement");
    }
}

// Function to get all announcements from Firestore
export async function getAnnouncements(): Promise<Announcement[]> {
    try {
        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const announcements: Announcement[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            announcements.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                audience: data.audience,
                tag: data.tag,
                createdAt: data.createdAt.toDate().toISOString(), // Convert timestamp to ISO string
            });
        });
        return announcements;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw new Error("Could not fetch announcements");
    }
}

// Function to delete an announcement
export async function deleteAnnouncement(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, "announcements", id));
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Could not delete announcement");
    }
}
