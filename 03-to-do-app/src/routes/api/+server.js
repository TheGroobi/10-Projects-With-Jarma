/** @type {import('./$types').RequestHandler} */
import { json } from '@sveltejs/kit'
export async function GET() {
    return json('123123')
};


export async function POST() {
    return json('123123')
};