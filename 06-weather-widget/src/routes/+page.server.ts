import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { WEATHER_API_KEY } from '$env/static/private';

export const load = (async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.76&lon=19.45&lang=pl&units=metric&appid=${WEATHER_API_KEY}`)
    const resForecast = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=51.76&lon=19.45&lang=pl&appid=${WEATHER_API_KEY}&units=metric&exclude=minutely,hourly`);

    if (!res.ok) {
        return {
            status: res.status,
            statusText: res.statusText,
        }
    }
    if (!resForecast.ok) {
        return {
            status: resForecast.status,
            statusText: resForecast.statusText,
        }
    }
    
    const data = await res.json();
    const forecast = await resForecast.json();
    return { data, forecast }
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const inputVal = formData.get('city');

        const resGeoloc = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${WEATHER_API_KEY}`);

        if (!resGeoloc.ok) {
            return {
                status: resGeoloc.status,
                statusText: resGeoloc.statusText,
            }
        }
        const dataGeo = await resGeoloc.json();

        const lat: number = dataGeo[0]?.lat;
        const lon: number = dataGeo[0]?.lon;
    
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pl&units=metric&appid=${WEATHER_API_KEY}`);
        const resForecast = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${WEATHER_API_KEY}&units=metric&exclude=minutely,hourly`);

        if (!res.ok) {
            return {
                status: res.status,
                statusText: res.statusText,
            }
        }
        if (!resForecast.ok) {
            return {
                status: resForecast.status,
                statusText: resForecast.statusText,
            }
        }

        const form = await res.json()
        const forecast = await resForecast.json()
        return { form, forecast }
    }
} satisfies Actions;
