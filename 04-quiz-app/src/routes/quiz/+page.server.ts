/** @type {import('../$types').PageServerLoad} */
import { db } from "$lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export async function load() {
    const oCollectionRef = collection(db, "questions");
    const q = query(
        oCollectionRef,
        where('username', '==', 'test'),
        limit(1),
    )
    // limit limits how many elements
    // where is an if statement for firebase db
    const snapshot = await getDocs(oCollectionRef);
    const data = snapshot.docs.map((oDocument) => oDocument?.data());
    return { questions: data };
};