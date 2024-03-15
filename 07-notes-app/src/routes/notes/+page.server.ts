import type { PageServerLoad, RequestEvent } from './$types';
import { db } from '$lib/firebase'
import { collection, where, query, getDocs, doc, getDoc } from 'firebase/firestore'

export const load = (async ({ cookies }) => {
    const uid = cookies.get('uid')
    const docRef = doc(db, 'users', `${uid}`)
    const snap = await getDoc(docRef)
    const data = await (snap).data()
    return { data };
}) satisfies PageServerLoad;
