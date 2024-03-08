import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcErUEgHQfixAdkLWwSiuyKOzDg2R6BYs",
  authDomain: "notes-app-fdb21.firebaseapp.com",
  projectId: "notes-app-fdb21",
  storageBucket: "notes-app-fdb21.appspot.com",
  messagingSenderId: "914787014480",
  appId: "1:914787014480:web:6091e7347335500714fe55",
  measurementId: "G-9TJN3KZV2R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
