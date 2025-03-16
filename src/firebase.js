// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore"; // Add getDoc and setDoc here
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };


console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase Services
export const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc }; 