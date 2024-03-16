import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase'
import { doc, getDocs, collection, addDoc, Timestamp, deleteDoc } from 'firebase/firestore'

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

export const actions = {
    createNote: async({ request, cookies }) => {
        const uid = cookies.get('uid');
        
        const formData = await request.formData();
        const title = formData.get('noteTitle');
        
        const docRef = doc(db, 'users', `${uid}`);
        const notesCollection = collection(docRef, 'notes');
        if (title !== '') {
            await addDoc(notesCollection, {
                content: '',
                title,
                date: Timestamp.fromDate(new Date())
            });
        } else {
            return { error: 'Notatka musi mieć tytuł'}
        }
    },

    deleteNote: async({ request, cookies }) => {
        const uid = cookies.get('uid')

        const formData = await request.formData()
        const id = formData.get('noteId')

        const docRef = doc(db, 'users', `${uid}`);
        const notesCollection = collection(docRef, 'notes');

        await deleteDoc(doc(notesCollection, `${id}`));
    }
}