import type { PageServerLoad, RequestEvent } from './$types';
import { db } from '$lib/firebase'
import { collection, where, query, getDocs } from 'firebase/firestore'

export const load = (async ({ cookies }) => {
    const uid = cookies.get('uid')
    const usersRef = collection(db, "users")
    
    const q = query(usersRef, where('uid', '==', `${uid}`))
    const snapshot = await getDocs(q);

    const data = await snapshot.docs.map((doc: any) => (doc?.data()));
    return { data };
}) satisfies PageServerLoad;
