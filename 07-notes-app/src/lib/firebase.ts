import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyDcErUEgHQfixAdkLWwSiuyKOzDg2R6BYs",
  authDomain: "notes-app-fdb21.firebaseapp.com",
  projectId: "notes-app-fdb21",
  storageBucket: "notes-app-fdb21.appspot.com",
  messagingSenderId: "914787014480",
  appId: "1:914787014480:web:6091e7347335500714fe55",
  measurementId: "G-9TJN3KZV2R",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

function userStore() {
  let unsubscribe: () => void
  const { subscribe } = writable(auth?.currentUser, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}
export const user = userStore()