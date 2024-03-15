import type { Actions, PageServerLoad } from './$types'
import { db } from '$lib/firebase'
import { collection, where, query, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
import type { Note } from '$types/Note.type';

export const load = (async ({ cookies }) => {
    const uid = cookies.get('uid')
    const docRef = doc(db, 'users', `${uid}`)
    const data = await (await getDoc(docRef)).data()
    return { data };
}) satisfies PageServerLoad;


export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
    },
    save: async ({ request, cookies }) => {
        const formData = await request.formData();
        const id = formData.get('noteId')
        const content = formData.get('noteText')
        const title = formData.get('noteTitle')
        const date = formData.get('noteDate')
        console.log({id, content, title, date})

        const uid = cookies.get('uid')
        const docRef = doc(db, 'users', `${uid}`)
        await updateDoc(docRef, {
            'notes.content': content,
            'notes.title': title,
        })

        const snap = await getDoc(docRef)
        const data = await (snap).data()
        return { data };
    }
} satisfies Actions
