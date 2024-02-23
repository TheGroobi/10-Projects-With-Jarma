<script lang="ts" type="module">
	import Timer from "$lib/Timer.svelte";
	import { onMount } from "svelte";
	import { enhance } from "$app/forms";
	export let data: any;

	$: nCurrentQuestion = 0;
	$: nAllQuestions = data.questions.length;

	let sAnswerSelected: string;

	export let nPoints: number = 0;
	export let nMaxPoints: number = data.questions.length;

	$: nTimeleft = 90;
	$: nMinutesLeft = Math.floor(nTimeleft / 60);
	$: nSecondsLeft = fnPadZero(nTimeleft % 60);
	let form: HTMLFormElement;

	let intervalId: any = null;
	const fnInterval = () => {
		if (nTimeleft) {
			nTimeleft--;
		} else {
			clearInterval(intervalId);
			nTimeleft = 90;
			nCurrentQuestion++;
			intervalId = setInterval(fnInterval, 1000);
		}
	};

	onMount(() => {
		intervalId = setInterval(fnInterval, 1000);
	});

	function fnPadZero(n: number) {
		return ("0" + n).slice(-2);
	}
	function fnHandleSubmitBtn() {
		nTimeleft = 90;
		if (sAnswerSelected === data.questions[nCurrentQuestion].sCorrectAnswer) {
			nPoints++;
		}
		if (nCurrentQuestion + 1 >= nAllQuestions) {
			setTimeout(() => form.submit(), 100);
		} else {
			nCurrentQuestion++;
			sAnswerSelected = "";
		}
	}

	$: nWidth = Math.floor(((nCurrentQuestion + 1) / nAllQuestions) * 100);
	let HTMLrootElement: HTMLElement;
	$: HTMLrootElement &&
		HTMLrootElement.style.setProperty("--width", `${nWidth}%`);
</script>

<svelte:head>
	<title>Quiz App</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet" />
</svelte:head>

<Timer sCountdownTimer="{`${nMinutesLeft}:${nSecondsLeft}`}" />
<div
	class="py-8 px-6 flex flex-col gap-8 bg-white border rounded border-stroke">
	<div class="flex justify-between items-center sm:flex-row flex-col gap-2">
		<span class="text-slate-400 uppercase font-bold text-xs break-normal w-max"
			>Pytanie {nCurrentQuestion + 1} Z {nAllQuestions}</span>
		<div
			bind:this="{HTMLrootElement}"
			class="h-1 w-60 bg-slate-200 rounded-lg relative">
			<div
				class="teal-progress h-1 bg-teal-500 rounded-lg absolute left-0 transition-all duration-300 ease-out">
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 w-80 sm:w-94">
		<h1 class="text-2xl tracking-tight font-bold text-text">
			{data.questions[nCurrentQuestion].sQuestion}
		</h1>
		<h2 class="font-normal text-text2 text-sm leading-6">
			{data.questions[nCurrentQuestion].sDetails}
		</h2>
	</div>
	<div class="grid grid-rows-2 grid-cols-2 gap-4 text-sm text-text">
		<button
			class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3 text-left"
			class:orange-500="{sAnswerSelected === 'a'}"
			on:click="{() => (sAnswerSelected = 'a')}">
			<input type="hidden" bind:value="{sAnswerSelected}" />
			<div
				class="orange-500 text-orange-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
				<span class="text-xs">A</span>
			</div>
			<span class="break-words"
				>{data.questions[nCurrentQuestion].oAnswers.sA}</span>
		</button>
		<button
			on:click="{() => (sAnswerSelected = 'b')}"
			class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3 text-left"
			class:pink-500="{sAnswerSelected === 'b'}">
			<input type="hidden" bind:value="{sAnswerSelected}" />
			<div
				class="pink-500 text-pink-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
				<span class="text-xs">B</span>
			</div>
			<span class="text-pretty"
				>{data.questions[nCurrentQuestion].oAnswers.sB}</span>
		</button>
		<button
			class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3 text-left"
			class:sky-500="{sAnswerSelected === 'c'}"
			on:click="{() => (sAnswerSelected = 'c')}">
			<input type="hidden" bind:value="{sAnswerSelected}" />
			<div
				class="sky-500 text-sky-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
				<span class="text-xs">C</span>
			</div>
			<span class="text-pretty"
				>{data.questions[nCurrentQuestion].oAnswers.sC}</span>
		</button>
		<button
			class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3 text-left"
			class:emerald-500="{sAnswerSelected === 'd'}"
			on:click="{() => (sAnswerSelected = 'd')}">
			<input type="hidden" bind:value="{sAnswerSelected}" />
			<div
				class="emerald-500 text-emerald-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
				<span class="text-xs">D</span>
			</div>
			<span class="text-pretty"
				>{data.questions[nCurrentQuestion].oAnswers.sD}</span>
		</button>
	</div>
	<input type="hidden" bind:value="{sAnswerSelected}" />
	<div class="self-end">
		<button
			on:click|preventDefault="{fnHandleSubmitBtn}"
			class="py-2 px-4 bg-emerald-500 rounded text-white font-bold text-sm"
			>Prześlij odpowiedź
		</button>
	</div>
	<form method="POST" bind:this="{form}" action="/result/?" use:enhance>
		<input type="hidden" name="score" bind:value="{nPoints}" />
		<input type="hidden" name="maxPoints" bind:value="{nMaxPoints}" />
	</form>
</div>

<style lang="postcss">
	:root {
		--width: inherit;
	}
	.teal-progress {
		width: var(--width);
	}
</style>
