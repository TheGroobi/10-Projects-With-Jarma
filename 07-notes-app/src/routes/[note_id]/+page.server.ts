import type { Actions, PageServerLoad } from './$types'
import { db } from '$lib/firebase'
import { getDoc, doc, collection, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore'

export const load = (async ({ params, cookies }) => {
    const uid = cookies.get('uid')
    const id = params.note_id
    
    const docUserRef = doc(db, 'users', `${uid}`)
    const userCol = collection(docUserRef, 'notes')
    const docNoteRef = doc(userCol, `${id}`)
    const snapNote = getDoc(docNoteRef)
    const noteData = await (await snapNote).data()
    if (noteData !== undefined) {
        return {
            content: noteData.content,
            title: noteData.title,
            date: noteData.date = new Date(noteData?.date.seconds * 1000).toLocaleString(),
        };
    } else {
        return {
            error: 'notatka nie istenieje'
        }
    }
}) satisfies PageServerLoad;


export const actions = {
    deleteNote: async ({ params, cookies }) => {
        const uid = cookies.get('uid')
        const id = params.note_id
        
        const docUserRef = doc(db, 'users', `${uid}`)
        const userCol = collection(docUserRef, 'notes')

        await deleteDoc(doc(userCol, `${id}`))

        return { status: 'Notatka została usunięta'}
    },

    saveNote: async ({ params, request, cookies }) => {
        const uid = cookies.get('uid')
        const id = params.note_id

        const formData = await request.formData();
        const content = formData.get('noteText');
        const title = formData.get('noteTitle');
        const date = new Date(formData.get('noteDate') as string);

        const docUserRef = doc(db, 'users', `${uid}`)
        const userCol = collection(docUserRef, 'notes')

        await updateDoc(doc(userCol, `${id}`), {
        'content': content,
        'title': title,
        'date': Timestamp.fromDate(date),
        })

        return { saveStatus: 'Notatka Została zapisana prawidłowo!' }
    },
} satisfies Actions
