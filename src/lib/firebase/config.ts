
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studyjeet-selk9",
  "appId": "1:115268055268:web:1cca1adf0e4f77ea077cf1",
  "storageBucket": "studyjeet-selk9.appspot.com",
  "apiKey": "AIzaSyBs4FZqNpE2BkoJee1NsR09ThW5gUZJWZc",
  "authDomain": "studyjeet-selk9.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "115268055268"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
