import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase'
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore'

export const load = (async ({ cookies }) => {
    const uid = cookies.get('uid')

    const docRef = doc(db, 'users', `${uid}`)
    const userCol = collection(docRef, 'notes')
    const snap = await getDocs(userCol)

    const notesData = snap.docs.map(doc => doc.data())
    const ids = snap.docs.map(doc => doc.id)
    const notes = notesData.map(note => {
        return {
            ...note,
            date: note.date = new Date(note.date.seconds * 1000).toLocaleString(),
        };
    });
    return { notes, ids };
}) satisfies PageServerLoad;
