
'use server';
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import type { Feedback } from "../types";

export type CreateFeedback = Omit<Feedback, 'id' | 'createdAt'>;

export async function createFeedback(feedback: CreateFeedback): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "feedback"), {
            ...feedback,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not create feedback");
    }
}

export async function getFeedback(): Promise<Feedback[]> {
    try {
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const feedback: Feedback[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            feedback.push({
                id: doc.id,
                subject: data.subject,
                feedback: data.feedback,
                createdAt: data.createdAt.toDate().toISOString(),
            });
        });
        return feedback;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw new Error("Could not fetch feedback");
    }
}

export async function deleteFeedback(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, "feedback", id));
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Could not delete feedback");
    }
}
