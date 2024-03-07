<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let forecast = data?.forecast.daily;
	let weather = data?.weather;
	let errorMessage: string;

	$: if (form) {
		//@ts-ignore
		if (form.status >= 300) {
			errorMessage = 'Miasto nie istnieje';
		} else {
			errorMessage = '';
			weather = form.weather;
			forecast = form.forecast.daily;
		}
	}

	let formEl: HTMLFormElement;

	$: cityName = weather.name;
	$: weatherDesc = weather.weather[0].description;
	$: temp = weather.main.temp;
	$: feelsLike = weather.main.feels_like;
	$: pressure = weather.main.pressure;
	$: humidity = weather.main.humidity;
	$: windSpeed = Math.round(weather.wind.speed);

	function handleSubmit(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			formEl.submit();
		}
	}

	function srcIcon(icon: string) {
		switch (icon) {
			case '01d':
			case '01n':
				return '/images/01.png';
			case '02d':
			case '02n':
				return '/images/02.png';
			case '03d':
			case '03n':
			case '04d':
			case '04n':
			case '50n':
			case '50d':
				return '/images/03.png';
			case '09d':
			case '09n':
			case '10n':
			case '10d':
				return '/images/10.png';
			case '11d':
			case '11n':
				return '/images/11.png';
			case '13d':
			case '13n':
				return '/images/13.png';
		}
	}

	function altIcon(icon: string) {
		switch (icon) {
			case '01d':
			case '01n':
				return 'Sunny Icon';
			case '02d':
			case '02n':
				return 'Sun and cloud Icon';
			case '03d':
			case '03n':
			case '04d':
			case '04n':
			case '50n':
			case '50d':
				return 'Cloud Icon';
			case '09d':
			case '09n':
			case '10n':
			case '10d':
				return 'Rain Icon';
			case '11d':
			case '11n':
				return 'Thunderstorm Icon';
			case '13d':
			case '13n':
				return 'Snow Icon';
		}
	}

	function dayOfTheWeek(i: number) {
		let date: Date = new Date();
		const weekDay = (date.getDay() + i) % 7;
		switch (weekDay) {
			case 0:
				return 'Ndz';
			case 1:
				return 'Pon';
			case 2:
				return 'Wt';
			case 3:
				return 'Śr';
			case 4:
				return 'Czw';
			case 5:
				return 'Pt';
			case 6:
				return 'Sob';
		}
	}

	function amplitude(f: any) {
		const maxTempArr = f.map((f: WeatherData) => Math.round(f.temp.max));
		const minTempArr = f.map((f: WeatherData) => Math.round(f.temp.min));

		let minTemp: number = minTempArr[0];
		let maxTemp: number = maxTempArr[0];
		for (let i = 1; i < maxTempArr.length; i++) {
			if (maxTempArr[i] > maxTemp) {
				maxTemp = maxTempArr[i];
			}
			if (minTempArr[i] < minTemp) {
				minTemp = minTempArr[i];
			}
		}
		return {
			amplitude: Math.abs(maxTemp - minTemp),
			minTemp
		};
	}

	$: maxCols = amplitude(forecast).amplitude;
	$: minTemp = amplitude(forecast).minTemp;
	$: gridCols = `grid-template-columns:repeat(${maxCols}, 1fr)`;

	function localAmplitude(min: number, max: number, minTemp: number) {
		let startCol: number = Math.round(min) - Math.round(minTemp) + 1;
		let endCol: number = Math.round(max) - Math.round(minTemp) + 1;

		return `grid-column:${startCol}/${endCol}`;
	}
</script>

<form class="w-full mb-[10.5rem]" bind:this={formEl} method="POST" use:enhance>
	<label for="city" class="relative flex justify-between">
		<input
			on:keydown={(e) => handleSubmit(e)}
			class="px-4 py-[0.87rem] bg-bg-main rounded-lg text-sm w-full focus:outline-sky-300"
			id="city"
			name="city"
			type="text"
			placeholder="Wyszukaj lokalizacje"
		/>
		<svg
			class="text-white absolute right-4 top-4"
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9 2.25C7.60761 2.25 6.27226 2.80312 5.28769 3.78769C4.30312 4.77226 3.75 6.10761 3.75 7.5C3.75 9.45373 5.07785 11.5212 6.56056 13.1892C7.28432 14.0035 8.01041 14.6844 8.55638 15.1621C8.72339 15.3083 8.87304 15.4349 9 15.5401C9.12696 15.4349 9.27661 15.3083 9.44362 15.1621C9.98959 14.6844 10.7157 14.0035 11.4394 13.1892C12.9221 11.5212 14.25 9.45373 14.25 7.5C14.25 6.10761 13.6969 4.77226 12.7123 3.78769C11.7277 2.80312 10.3924 2.25 9 2.25ZM9 16.5C8.55 17.1 8.54984 17.0999 8.54965 17.0997L8.54916 17.0994L8.54778 17.0983L8.54338 17.095L8.52818 17.0835C8.51526 17.0736 8.49681 17.0595 8.47319 17.0412C8.42596 17.0046 8.35804 16.9513 8.27239 16.8825C8.10116 16.7449 7.85867 16.5448 7.56862 16.291C6.98959 15.7843 6.21568 15.059 5.43944 14.1858C3.92215 12.4788 2.25 10.0463 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5C15.75 10.0463 14.0779 12.4788 12.5606 14.1858C11.7843 15.059 11.0104 15.7843 10.4314 16.291C10.1413 16.5448 9.89884 16.7449 9.72761 16.8825C9.64196 16.9513 9.57404 17.0046 9.52681 17.0412C9.50319 17.0595 9.48474 17.0736 9.47182 17.0835L9.45662 17.095L9.45222 17.0983L9.45084 17.0994L9.45035 17.0997C9.45016 17.0999 9.45 17.1 9 16.5ZM9 16.5L9.45 17.1C9.18333 17.3 8.81667 17.3 8.55 17.1L9 16.5Z"
				fill="#F8FAFC"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9 6C8.17157 6 7.5 6.67157 7.5 7.5C7.5 8.32843 8.17157 9 9 9C9.82843 9 10.5 8.32843 10.5 7.5C10.5 6.67157 9.82843 6 9 6ZM6 7.5C6 5.84315 7.34315 4.5 9 4.5C10.6569 4.5 12 5.84315 12 7.5C12 9.15685 10.6569 10.5 9 10.5C7.34315 10.5 6 9.15685 6 7.5Z"
				fill="#F8FAFC"
			/>
		</svg>
	</label>
	{#if errorMessage}
		<div class="flex justify-center">
			<p class="text-red-500 w-max mt-2">
				{errorMessage}
			</p>
		</div>
	{/if}
</form>
<section
	class="bg-bg-main pt-[8.875rem] pb-16 px-8 rounded-3xl relative flex flex-col gap-10 max-w-[38.5rem]"
>
	<div class="flex flex-col gap-6">
		<img
			src={srcIcon(weather.weather[0].icon)}
			alt={altIcon(weather.weather[0].icon)}
			class="w-60 absolute z-1 top-[-7.5rem] self-center"
		/>
		<div class="flex gap-2 flex-col items-center">
			<h2 class="font-semibold text-clampMediumLg">{cityName}</h2>
			<h1 class="font-bold text-clampBig">{Math.round(temp)}°C</h1>
			<h3 class="font-regular text-clampMediumSm capitalize">{weatherDesc}</h3>
		</div>
		<p class="text-text-gray text-clampMediumSm">
			{weather.sys.country}
			{cityName}, Temperatura wynosi {temp}°C (Odczuwalna {feelsLike}°C). Ciśnienie wyniesie dzisiaj {pressure}
			hPa
		</p>
	</div>
	<div class="rounded-3xl bg-bg-secondary p-6 flex justify-between">
		<div class="flex gap-2 flex-col items-center min-w-[6.625rem]">
			<svg
				class="mb-1"
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M32.8962 13.3866C32.4983 13.3043 32.0863 13.3203 31.6959 13.433C31.3056 13.5458 30.9486 13.7521 30.6559 14.0339C29.9928 14.6724 28.9377 14.6524 28.2993 13.9894C27.6608 13.3263 27.6808 12.2712 28.3438 11.6328C29.0268 10.9751 29.8598 10.4939 30.7706 10.2307C31.6815 9.96752 32.6428 9.93033 33.5713 10.1223C34.4997 10.3144 35.3674 10.7298 36.0992 11.3327C36.8309 11.9356 37.4047 12.7077 37.7708 13.5823C38.1369 14.4569 38.2843 15.4076 38.2003 16.3519C38.1162 17.2963 37.8032 18.206 37.2884 19.0022C36.7736 19.7984 36.0725 20.4571 35.2457 20.9212C34.419 21.3854 33.4916 21.6411 32.5438 21.6661C32.5292 21.6665 32.5145 21.6667 32.4998 21.6667H3.33317C2.4127 21.6667 1.6665 20.9205 1.6665 20C1.6665 19.0795 2.4127 18.3333 3.33317 18.3333H32.475C32.8746 18.3197 33.2651 18.2105 33.6138 18.0147C33.9681 17.8158 34.2686 17.5335 34.4893 17.1923C34.7099 16.851 34.844 16.4612 34.88 16.0564C34.9161 15.6517 34.8529 15.2443 34.696 14.8695C34.5391 14.4946 34.2932 14.1637 33.9796 13.9053C33.666 13.6469 33.2941 13.4689 32.8962 13.3866Z"
					fill="#F8FAFC"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18.6988 8.36441C18.4281 8.31166 18.1486 8.3269 17.8852 8.40877C17.6219 8.49063 17.383 8.63656 17.1899 8.83347C16.5455 9.49074 15.4903 9.50114 14.833 8.85672C14.1757 8.2123 14.1653 7.15707 14.8098 6.49981C15.389 5.90907 16.1057 5.47129 16.8957 5.22569C17.6857 4.9801 18.5243 4.93438 19.3364 5.09263C20.1484 5.25087 20.9085 5.60814 21.5485 6.13241C22.1885 6.65668 22.6884 7.33156 23.0034 8.09656C23.3184 8.86155 23.4386 9.69276 23.3534 10.5157C23.2681 11.3386 22.98 12.1275 22.5148 12.8116C22.0496 13.4958 21.422 14.0538 20.6881 14.4357C19.958 14.8156 19.1454 15.0094 18.3226 15H3.33317C2.4127 15 1.6665 14.2538 1.6665 13.3333C1.6665 12.4128 2.4127 11.6666 3.33317 11.6666H18.3566C18.6323 11.6705 18.9047 11.6061 19.1494 11.4788C19.394 11.3515 19.6032 11.1655 19.7583 10.9374C19.9133 10.7094 20.0094 10.4464 20.0378 10.1721C20.0662 9.89779 20.0261 9.62072 19.9211 9.36572C19.8161 9.11072 19.6495 8.88576 19.4362 8.71101C19.2228 8.53625 18.9695 8.41716 18.6988 8.36441Z"
					fill="#F8FAFC"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M23.3226 25C24.1455 24.9906 24.958 25.1844 25.6881 25.5643C26.422 25.9462 27.0496 26.5042 27.5148 27.1884C27.98 27.8725 28.2681 28.6614 28.3534 29.4843C28.4386 30.3072 28.3184 31.1385 28.0034 31.9034C27.6884 32.6684 27.1885 33.3433 26.5485 33.8676C25.9085 34.3919 25.1484 34.7491 24.3364 34.9074C23.5243 35.0656 22.6857 35.0199 21.8957 34.7743C21.1057 34.5287 20.389 34.0909 19.8098 33.5002C19.1653 32.8429 19.1757 31.7877 19.833 31.1433C20.4903 30.4989 21.5455 30.5093 22.1899 31.1665C22.383 31.3634 22.6219 31.5094 22.8852 31.5912C23.1486 31.6731 23.4281 31.6883 23.6988 31.6356C23.9695 31.5828 24.2228 31.4637 24.4362 31.289C24.6495 31.1142 24.8161 30.8893 24.9211 30.6343C25.0261 30.3793 25.0662 30.1022 25.0378 29.8279C25.0094 29.5536 24.9133 29.2906 24.7583 29.0626C24.6032 28.8345 24.394 28.6485 24.1494 28.5212C23.9047 28.3939 23.6323 28.3293 23.3566 28.3332L23.3332 28.3335V28.3334H3.33317C2.4127 28.3334 1.6665 27.5872 1.6665 26.6667C1.6665 25.7462 2.4127 25 3.33317 25H23.3226Z"
					fill="#F8FAFC"
				/>
			</svg>
			<h2 class="text-clampMedium font-bold tracking-wider">{windSpeed}km/h</h2>
			<p class="text-text-gray font-regular text-clampMediumSm">Wiatr</p>
		</div>
		<div class="flex gap-2 flex-col items-center min-w-[6.625rem]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M19.9998 3.33331C20.7943 3.33331 21.4783 3.89408 21.6341 4.67312C22.3874 8.43962 24.6678 12.1 27.7077 14.5319C31.3404 17.438 33.3332 21.049 33.3332 25C33.3332 28.5362 31.9284 31.9276 29.4279 34.4281C26.9274 36.9286 23.5361 38.3333 19.9998 38.3333C16.4636 38.3333 13.0722 36.9286 10.5717 34.4281C8.07126 31.9276 6.6665 28.5362 6.6665 25C6.6665 21.049 8.65931 17.438 12.292 14.5319C15.3318 12.1 17.6122 8.43962 18.3655 4.67312C18.5213 3.89408 19.2054 3.33331 19.9998 3.33331ZM19.9998 10.0889C18.6572 12.8167 16.7027 15.2721 14.3743 17.1348C11.3404 19.5619 9.99984 22.2843 9.99984 25C9.99984 27.6521 11.0534 30.1957 12.9288 32.071C14.8041 33.9464 17.3477 35 19.9998 35C22.652 35 25.1955 33.9464 27.0709 32.071C28.9463 30.1957 29.9998 27.6521 29.9998 25C29.9998 22.2843 28.6593 19.5619 25.6253 17.1348C23.297 15.2721 21.3425 12.8167 19.9998 10.0889Z"
					fill="#F8FAFC"
				/>
			</svg>
			<h2 class="text-clampMedium font-bold">{humidity}%</h2>
			<p class="text-text-gray font-regular text-clampMediumSm">Wilgotność</p>
		</div>
		<div class="flex gap-2 flex-col items-center min-w-[6.625rem]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18.6588 7.36281C17.2463 6.80828 15.7263 6.58244 14.2136 6.70241C12.701 6.82237 11.2355 7.28499 9.92815 8.05523C8.62079 8.82546 7.50586 9.88311 6.66781 11.1481C5.82975 12.413 5.29055 13.8521 5.09105 15.3563C4.89154 16.8605 5.03696 18.3904 5.51629 19.8301C5.99563 21.2697 6.7963 22.5815 7.85767 23.6659C8.50152 24.3237 8.4902 25.3789 7.83237 26.0228C7.17455 26.6666 6.11934 26.6553 5.47549 25.9975C4.06033 24.5516 2.99276 22.8026 2.35365 20.883C1.71454 18.9635 1.52064 16.9236 1.78665 14.918C2.05266 12.9124 2.77159 10.9936 3.889 9.30704C5.00641 7.62044 6.49298 6.21024 8.23612 5.18327C9.97926 4.15629 11.9333 3.53946 13.9501 3.37951C15.9669 3.21955 17.9937 3.52067 19.8769 4.26004C21.7602 4.99942 23.4504 6.15766 24.8197 7.64705C25.9038 8.82617 26.7641 10.1884 27.3628 11.6667H29.1664C29.1663 11.6667 29.1665 11.6667 29.1664 11.6667C31.1331 11.6665 33.0479 12.2988 34.6277 13.4703C36.2075 14.6419 37.3686 16.2905 37.9394 18.1726C38.5103 20.0547 38.4607 22.0705 37.798 23.9222C37.1352 25.774 35.8945 27.3635 34.259 28.4559C33.4936 28.9672 32.4586 28.7612 31.9473 27.9957C31.4361 27.2303 31.6421 26.1953 32.4075 25.6841C33.4483 24.9889 34.2379 23.9774 34.6596 22.799C35.0814 21.6206 35.1129 20.3378 34.7496 19.1401C34.3863 17.9424 33.6474 16.8933 32.6421 16.1478C31.6368 15.4023 30.4184 14.9998 29.1668 15H26.1832C25.4464 15 24.797 14.5162 24.5862 13.8102C24.1521 12.3562 23.3928 11.0201 22.3659 9.90306C21.3389 8.78602 20.0712 7.91734 18.6588 7.36281Z"
					fill="#F8FAFC"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M20.0002 18.3333C20.9206 18.3333 21.6668 19.0795 21.6668 20V35C21.6668 35.9205 20.9206 36.6666 20.0002 36.6666C19.0797 36.6666 18.3335 35.9205 18.3335 35V20C18.3335 19.0795 19.0797 18.3333 20.0002 18.3333Z"
					fill="#F8FAFC"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18.8213 18.8215C19.4722 18.1706 20.5275 18.1706 21.1783 18.8215L27.845 25.4881C28.4959 26.139 28.4959 27.1943 27.845 27.8452C27.1941 28.496 26.1389 28.496 25.488 27.8452L19.9998 22.357L14.5117 27.8452C13.8608 28.496 12.8055 28.496 12.1547 27.8452C11.5038 27.1943 11.5038 26.139 12.1547 25.4881L18.8213 18.8215Z"
					fill="#F8FAFC"
				/>
			</svg>
			<h2 class="text-clampMedium font-bold">{pressure} hPa</h2>
			<p class="text-text-gray font-regular text-clampMediumSm">Ciśnienie</p>
		</div>
	</div>
</section>
<p class="mt-8 mb-6 text-text-white">Najbliższe dni</p>
<section class="flex flex-col gap-3 w-full">
	{#each forecast as f, i}
		<div class="flex gap-6 bg-bg-main p-6 rounded-3xl items-center">
			<h1 class="text-clampMediumLg font-semibold w-[4.5625rem]">
				{#if i === 0}
					Dziś
				{:else}
					{dayOfTheWeek(i)}
				{/if}
			</h1>
			<div class="relative">
				<img src={srcIcon(f.weather[0].icon)} alt={altIcon(f.weather[0].icon)} class="w-[4rem]" />
				<img
					src={srcIcon(f.weather[0].icon)}
					alt={altIcon(f.weather[0].icon)}
					class="w-[4rem] absolute bottom-0 blur-md opacity-50"
				/>
			</div>
			<div class="flex gap-8 items-center">
				<p
					class="text-text-white font-regular text-clampMediumSm w-[5.4375rem] capitalize text-pretty"
				>
					{f.weather[0].description}
				</p>
				<div class="flex gap-3 items-center">
					<h2 class="text-clampMedium font-bold">{Math.round(f.temp.min)}°C</h2>
					<div class="w-32 bg-black bg-opacity-10 h-2 rounded-lg grid" style={gridCols}>
						<div
							class="rounded-lg items-center h-2 bg-gradient-to-r from-sky-300 to-emerald-300 z-10 grid"
							style={localAmplitude(f.temp.min, f.temp.max, minTemp)}
						></div>
					</div>
					<h2 class="text-clampMedium font-bold">{Math.round(f.temp.max)}°C</h2>
				</div>
			</div>
		</div>
	{/each}
</section>
