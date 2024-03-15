import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'
import { db } from '$lib/firebase'
import { collection, where, query, getDocs } from 'firebase/firestore'

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const uid = cookies.get('uid')
    const usersRef = collection(db, "users")

    const searchVal = await request.json()
    //add query for title like searchVal
    const q = query(usersRef, where('uid', '==', `${uid}`), where('title', '==', 'Plan treningowy na nadchodzący tydzień'))
    const snapshot = await getDocs(q);
    const data = await snapshot.docs.map((doc: any) => doc?.data());

    return json({ data })
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    const res = await request.json()
    cookies.set('uid', `${res.uid}`, { path: '/' });
    return new Response();
};