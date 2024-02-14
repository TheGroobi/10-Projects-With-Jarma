<script lang="ts" type="module">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import moment from "moment-timezone";

	let mode = $page.params.mode;
	let timezone = $page.params.timezone.replace("|", "/");
	let date = moment($page.params.date).tz(timezone);
	let currentDate = moment().tz(timezone);
	// $: console.log(date.diff(currentDate, 'seconds'));
	onMount(() => {
		setInterval(() => {
			currentDate = moment().tz(timezone);
		}, 1000);
	});

	$: distance = date.diff(currentDate, "seconds");
	$: distanceSeconds = distance % 60;
	$: distanceMinutes = Math.floor(distance / 60) % 60;
	$: distanceHours = Math.floor(distance / 3600) % 24;
	$: distanceDays =
		mode === "weeks"
			? Math.floor(distance / 86400) % 7
			: Math.floor(distance / 86400);
	$: distanceWeeks = Math.floor(distance / 604800);
</script>

<svelte:head>
	<title>Countdown Timer</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="wrapper">
	<h1>Pozostały czas</h1>
	<div class="timer-container">
		{#if mode === "days"}
			<div class="days">
				<span>Dni</span>
				<p>{distanceDays}</p>
			</div>
		{:else if mode === "days-hours"}
			<div class="days">
				<span>Dni</span>
				<p>{distanceDays}</p>
			</div>
			<div class="hours">
				<span>Godzina</span>
				<p>{distanceHours}</p>
			</div>
			<div class="minutes">
				<span>Minuty</span>
				<p>{distanceMinutes}</p>
			</div>
			<div class="seconds">
				<span>Sekundy</span>
				<p>{distanceSeconds}</p>
			</div>
		{:else}
			<div class="weeks">
				<span>Tydzień</span>
				<p>{distanceWeeks}</p>
			</div>
			<div class="days">
				<span>Dni</span>
				<p>{distanceDays}</p>
			</div>
			<div class="hours">
				<span>Godzina</span>
				<p>{distanceHours}</p>
			</div>
			<div class="minutes">
				<span>Minuty</span>
				<p>{distanceMinutes}</p>
			</div>
			<div class="seconds">
				<span>Sekundy</span>
				<p>{distanceSeconds}</p>
			</div>
		{/if}
	</div>
	<a href="../../../" type="button" class="submit-btn">Wygeneruj nowy timer</a>
</div>

<style lang="scss">
	:global(:root) {
		--text: rgba(30, 41, 59, 1);
		--text2: rgba(100, 116, 139, 1);
		--bg: rgba(241, 245, 249, 1);
		--white: rgba(255, 255, 255, 1);
	}
	:global(body) {
		background: var(--bg);
		color: rgba(30, 41, 59, 1);
		margin: 0;
	}
	:global(*) {
		font-family: "Inter", sans-serif;
		font-weight: 500;
		margin: 0;
		text-decoration: none;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100svh;
		h1 {
			color: var(--text);
			font-size: 20px;
			font-weight: 600;
		}
		.timer-container {
			background: var(--white);
			margin-top: 1.5rem;
			margin-bottom: 2rem;
			padding: 1rem 1.5rem;
			border-radius: 4px;
			display: flex;
			gap: 1rem;
			.weeks,
			.days,
			.hours,
			.minutes,
			.seconds {
				display: flex;
				flex-direction: column;
				align-items: center;
				span {
					font-size: 10px;
					font-weight: 700;
					color: var(--text2);
					text-transform: uppercase;
				}
				p {
					font-size: 14px;
					font-weight: 600;
					color: var(--text);
					margin: 0;
					margin-top: 0.5rem;
				}
			}
		}
		.submit-btn {
			background: rgba(14, 165, 233, 1);
			color: var(--white);
			font-size: 14px;
			border-radius: 8px;
			padding: 0.9rem 2rem;
			border: none;
			font-family: "Inter", sans-serif;
			cursor: pointer;
			transition: background 0.3s ease;
			&:hover {
				background: rgba(14, 165, 233, 0.9);
			}
		}
	}
</style>
