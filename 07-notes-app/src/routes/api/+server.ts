import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'
import { db } from '$lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const uid = cookies.get('uid')
    const docRef = doc(db, 'users', `${uid}`)
    const searchVal = await request.json()
    const data = await (await getDoc(docRef)).data()
    //add query for title like searchVal

    return json({ data })
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    const res = await request.json()
    cookies.set('uid', `${res.uid}`, { path: '/' });
    return new Response();
};