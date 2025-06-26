// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpXHbbY4NxYKoXTA_hZ-4ue5eUzY5KOBc",
  authDomain: "iprodatabase-9d9db.firebaseapp.com",
  projectId: "iprodatabase-9d9db",
  storageBucket: "iprodatabase-9d9db.firebasestorage.app",
  messagingSenderId: "135650665800",
  appId: "1:135650665800:web:1f3b443466db3939257f7d",
  measurementId: "G-QLQ4LQJQGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);