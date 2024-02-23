import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA0RQ-TFyCg6ulSwM_WUouMg8G733-cSxE",
    authDomain: "quiz-app-51024.firebaseapp.com",
    projectId: "quiz-app-51024",
    storageBucket: "quiz-app-51024.appspot.com",
    messagingSenderId: "178164742385",
    appId: "1:178164742385:web:e6ae01163c67e36f709150",
    measurementId: "G-6CE3QVWR1B"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()