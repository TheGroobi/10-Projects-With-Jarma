import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'
import { db } from '$lib/firebase'
import { doc, getDocs, collection, updateDoc, Timestamp } from 'firebase/firestore'

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const uid = cookies.get('uid')
    const docUserRef = doc(db, 'users', `${uid}`)
    const userCol = collection(docUserRef, 'notes')
    const notesSnap = getDocs(userCol)
    const data = await request.json()

    const notesData = (await notesSnap).docs.map(doc => doc.data())
    const idsData = (await notesSnap).docs.map(doc => doc.id)
    
    let notes: any = []
    let ids: any = []
    notesData.forEach((note, i) => {
        if ((note.title).includes(data.searchVal)) {
            notes = [...notes, {
                content: note.content,
                title: note.title,
                date: note.date = new Date(note?.date.seconds * 1000).toLocaleString(),
            }]
            ids = [...ids, idsData[i]]
        }
    })
    return json({ notes, ids })
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
    const res = await request.json()
    cookies.set('uid', `${res.uid}`, { path: '/' });
    return new Response();
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    const res = await request.json()
    const uid = cookies.get('uid')

    const docUserRef = doc(db, 'users', `${uid}`)
    const userCol = collection(docUserRef, 'notes')

    if (res.content && res.title) {
        await updateDoc(doc(userCol, `${res.id}`), {
            'content': res.content,
            'title': res.title,
            'date': Timestamp.fromDate(new Date()),
        })
        return json({ saveStatus: 'Autozapis, zapisano notatkę!' })
    }

    await updateDoc(docUserRef, {
        toggle: res.toggle
    })
    return new Response()
}