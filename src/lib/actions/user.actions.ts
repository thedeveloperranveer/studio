'use server';

import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "@/lib/firebase/config";

// Note: This is a server-side action.
// Ensure you have Firebase configured correctly.

export async function createUser(name: string): Promise<string> {
    try {
        if (!name.trim()) {
            throw new Error("User name cannot be empty.");
        }

        const userRef = await addDoc(collection(db, "users"), {
            name: name.trim(),
            joinDate: serverTimestamp(),
            lastActive: serverTimestamp(),
            activityLog: [],
        });
        
        return userRef.id;
    } catch (error) {
        console.error("Error creating user in Firestore:", error);
        throw new Error("Could not create user.");
    }
}
