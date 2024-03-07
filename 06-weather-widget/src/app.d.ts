// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	export type WeatherData = {
		dt: number;
		sunrise: number;
		sunset: number;
		moonrise: number;
		moonset: number;
		moon_phase: number;
		summary: string;
		temp: {
			day: number;
			min: number;
			max: number;
			night: number;
			eve: number;
			morn: number;
		};
		feels_like: {
			day: number;
			night: number;
			eve: number;
			morn: number;
		};
		pressure: number;
		humidity: number;
		dew_point: number;
		wind_speed: number;
		wind_deg: number;
		wind_gust: number;
		weather: Array<{
			id: number;
			main: string;
			description: string;
			icon: string;
		}>;
		clouds: number;
		pop: number;
		uvi: number;
	};
}

export {};
