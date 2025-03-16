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
    apiKey: "AIzaSyDV-ALWRDgtJHhhbJ2VFFUksQIfNX5PCFo",
    authDomain: "todolist-22c90.firebaseapp.com",
    projectId: "todolist-22c90",
    storageBucket: "todolist-22c90.firebasestorage.app",
    messagingSenderId: "672849462852",
    appId: "1:672849462852:web:b3372f9522b89e83665e11",
    measurementId: "G-91VDNQK391",
  };

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase Services
export const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc }; 