<script lang="ts" type="module">
	import moment from "moment-timezone";

	let day: number = moment().date();
	let month: number = moment().month() + 1;
	let year: number = moment().year();
	let hour: number = moment().hour();
	let minutes: number = moment().minutes();
	let seconds: number = moment().seconds();

	let mode: string = "days-hours";
	let timezone: string = moment.tz.guess();
	$: date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

	let openSelect = false;

	function handleButtonClick(e: Event) {
		e.preventDefault();
		let now = moment();
		let selectedDate = moment(date);
		let offset = now.utcOffset() - moment.tz(timezone).utcOffset();
		now = now.add(-offset, "minutes");
		let distanceSeconds = selectedDate.diff(now, "seconds");
		let distanceDays = selectedDate.diff(now, "days");
		if (distanceSeconds <= 0) {
			alert("Ustaw datę w przyszłości");
			return;
		}
		if (distanceDays <= 0 && mode === "days") {
			alert("Ustaw datę w przyszłości");
			return;
		}
		let url = `/${date}/${timezone.replace("/", "|")}/${mode}`;
		window.location.href = url;
	}
</script>
<svelte:head>
	<title>Countdown Timer</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anynymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<form class="wrapper">
	<h1>Podaj datę do odliczania</h1>
	<div class="input-container">
		<div class="date-container">
			<div class="date-input">
				<label class="title" for="day">Dzień</label>
				<input
					name="day"
					type="number"
					id="day"
					placeholder="11"
					max="31"
					min="1"
					class="day-input"
					bind:value={day}
				/>
			</div>
			<div class="date-input">
				<label class="title" for="month">Miesiąc</label>
				<input
					name="month"
					type="number"
					id="month"
					placeholder="02"
					max="12"
					min="1"
					class="month-input"
					bind:value={month}
				/>
			</div>
			<div class="date-input">
				<label class="title" for="year">Rok</label>
				<input
					name="year"
					type="number"
					id="year"
					placeholder="2024"
					max="3000"
					min="2024"
					class="year-input"
					bind:value={year}
				/>
			</div>
		</div>
		<div class="time-container">
			<div class="time-input">
				<label class="title" for="hour">Godzina</label>
				<input
					name="hour"
					type="number"
					id="hour"
					placeholder="12"
					max="24"
					min="0"
					class="hour-input"
					bind:value={hour}
				/>
			</div>
			<div class="time-input">
				<label class="title" for="minutes">Minuty</label>
				<input
					name="minutes"
					type="number"
					id="minutes"
					placeholder="49"
					max="59"
					min="0"
					class="minutes-input"
					bind:value={minutes}
				/>
			</div>
			<div class="time-input">
				<label class="title" for="seconds">Sekundy</label>
				<input
					name="seconds"
					type="number"
					id="seconds"
					placeholder="15"
					max="59"
					min="0"
					class="seconds-input"
					bind:value={seconds}
				/>
			</div>
		</div>
	</div>
	<div class="timezone-dropwdown-container">
		<label for="timezone-input" class="title">Wybierz strefę czasową</label>
		<div class="dropdown-container" class:open={openSelect}>
			<select
				name="timezone"
				id="timezone-input"
				on:click={() => openSelect = !openSelect}
				on:blur={() => openSelect = false}
				bind:value={timezone}
			>
			{#each moment.tz.names() as tz}
				<option value={tz}>{tz}</option>
			{/each}
			</select>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"
				><path
					fill="#1E293B"
					fill-rule="evenodd"
					d="M3.97 6.22a.75.75 0 0 1 1.06 0L9 10.19l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/></svg
			>
		</div>
	</div>
	<div class="mode-container">
		<p class="title">Wybierz model obliczania</p>
		<div class="radio-container">
			<label class="radio-input" for="mode-weeks">
				<input
					class="radio-input"
					type="radio"
					name="mode-weeks"
					id="mode-weeks"
					value="weeks"
					bind:group={mode}
				/>
				<div class="radio-custom">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
						><path
							fill="#fff"
							fill-rule="evenodd"
							d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<span>Tygodnie, dni, godziny, minuty, sekundy</span>
			</label>
			<label class="radio-input" for="mode-days-hours">
				<input
					type="radio"
					name="mode-days-hours"
					id="mode-days-hours"
					value="days-hours"
					bind:group={mode}
				/>
				<div class="radio-custom">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
						><path
							fill="#fff"
							fill-rule="evenodd"
							d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<span>Dni, godziny, minuty, sekundy</span>
			</label>
			<label class="radio-input" for="mode-days">
				<input
					type="radio"
					name="mode-days"
					id="mode-days"
					value="days"
					bind:group={mode}
				/>
				<div class="radio-custom">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
						><path
							fill="#fff"
							fill-rule="evenodd"
							d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<span>Tylko dni</span>
			</label>
		</div>
	</div>
	<button on:click={handleButtonClick} type="button" class="submit-btn"
		>Wygeneruj czas
	</button>
</form>

<style lang="scss">
	:global(:root) {
		--white: rgba(255, 255, 255, 1);
		--text: rgba(30, 41, 59, 1);
		--text2: rgba(100, 116, 139, 1);
		--bg: rgba(241, 245, 249, 1);
	}
	:global(body) {
		margin: 0;
		padding: 0;
		display: grid;
		place-items: center;
		height: 100svh;
		background-color: var(--bg);
	}
	:global(*) {
		margin: 0;
		font-family: "Inter", sans-serif;
		font-weight: 500;
		text-decoration: none;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		h1 {
			color: var(--text);
			font-size: 20px;
			text-align: left;
			font-weight: 600;
		}
		.input-container {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			input {
				padding: 0.5rem 1rem;
				border: none;
				border-radius: 4px;
				background-color: var(--bg);
				text-align: center;
				font-size: 14px;
				font-weight: 600;
				color: var(--text);
				&:focus {
					outline: none;
					background-color: rgb(216, 224, 230);
				}
			}
			.date-container,
			.time-container {
				padding: 0.5rem;
				background-color: var(--white);
				display: grid;
				border-radius: 4px;
			}
			.date-container {
				grid-template-columns: repeat(2, 4.5rem) repeat(1, 5.75rem);
			}
			.time-container {
				grid-template-columns: repeat(3, 4.5rem);
			}
			.date-input,
			.time-input {
				background-color: var(--white);
				display: flex;
				flex-direction: column;
				padding: 0.5rem;
				input[type="number"] {
					&::-webkit-inner-spin-button,
					&::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}
					& {
						-moz-appearance: textfield;
						appearance: textfield;
					}
				}
			}
		}
		.title {
			color: var(--text2);
			font-weight: 700;
			font-size: 10px;
			text-transform: uppercase;
			margin-bottom: 0.5rem;
		}
		.timezone-dropwdown-container {
			display: flex;
			flex-direction: column;
		}
		.dropdown-container {
			position: relative;
			display: inline-block;
			select {
				background-color: white;
				border: none;
				font-size: 14px;
				color: var(--text);
				padding: 1rem;
				cursor: pointer;
				border-radius: 4px;
				width: 100%;
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				&:focus,
				&:active,
				&:hover {
					outline: none;
				}
				option {
					color: var(--text);
					border: none;
					padding: 1rem;
				}
			}
			svg {
				pointer-events: none;
				position: absolute;
				top: 50%;
				left: 95%;
				transform: translate(-50%, -50%);
				width: 1rem;
				transition: all 0.2s;
			}
			&.open {
				select {
					background: rgb(216, 224, 230);
				}
				svg {
					transform: translate(-50%, -50%) rotate(180deg);
				}
			}
		}
		.radio-container {
			display: flex;
			flex-direction: column;
			padding: 0.75rem;
			background-color: white;
			border-radius: 4px;
			label {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				padding: 0.75rem;
				border-bottom: 1px solid rgba(241, 245, 249, 1);
				&:last-child {
					border-bottom: none;
				}
				span {
					font-size: 12px;
					font-weight: bold;
					color: var(--text);
					text-transform: none;
				}
				input[type="radio"] {
					display: none;
				}
				.radio-custom {
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 3px;
					position: relative;
					display: inline-block;
					background-color: rgba(241, 245, 249, 1);
					transition: all 0.2s ease-in-out;
					svg {
						position: absolute;
						display: none;
						width: 1rem;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
				input[type="radio"]:checked + .radio-custom {
					background-color: rgba(14, 165, 233, 1);
					svg {
						display: block;
					}
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
			align-self: flex-end;
			transition: background 0.3s ease;
			cursor: pointer;
			&:hover {
				background: rgba(14, 165, 233, 0.9);
			}
		}
	}
</style>
