import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'
import { db } from '$lib/firebase'
import { doc, getDoc, collection, updateDoc, Timestamp } from 'firebase/firestore'

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const uid = cookies.get('uid')
    const docRef = doc(db, 'users', `${uid}`)
    const searchVal = await request.json()
    const notes = await (await getDoc(docRef)).data()

    return json({ notes })
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

    await updateDoc(doc(userCol, `${res.id}`), {
    'content': res.content,
    'title': res.title,
    'date': Timestamp.fromDate(new Date()),
    })

    return json({ saveStatus: 'Autozapis, zapisano notatkę!' })
}