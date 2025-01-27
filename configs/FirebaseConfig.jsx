// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "logo-generator-a177b.firebaseapp.com",
  projectId: "logo-generator-a177b",
  storageBucket: "logo-generator-a177b.firebasestorage.app",
  messagingSenderId: "684038517546",
  appId: "1:684038517546:web:d3f326cd5e9fd263ece453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);