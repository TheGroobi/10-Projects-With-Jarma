<script lang="ts">
	import Timer from "$lib/Timer.svelte";
	import QuestionCounter from "$lib/QuestionCounter.svelte";
	let sAnswerSelected: string = "a";
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

<main class="sm:p-8 bg-slate-200 w-min p-4">
	<div class="sm:p-16 bg-bgSecondary flex flex-col gap-6 p-8">
		<Timer sCountdownTimer="{'12:12'}" />
		<div class="py-8 px-6 flex flex-col gap-8 bg-white">
			<QuestionCounter />
			<div class="flex flex-col gap-4 w-80 sm:w-94">
				<h1 class="text-2xl tracking-tight font-bold text-text">
					Jakie jest idealne wewnętrzne ustawienie temperatury dla steka
					medium-rare?
				</h1>
				<h2 class="font-normal text-text2 text-sm leading-6">
					Aby osiągnąć idealny medium-rare, kluczowa jest precyzyjna wewnętrzna
					temperatura steka. Która temperatura jest zalecana przez kucharzy do
					tego stopnia wysmażenia?
				</h2>
			</div>
			<div
				class="grid grid-rows-2 grid-cols-2 gap-4 text-sm text-text">
				<button
					class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3"
					class:orange-500="{sAnswerSelected === 'a'}"
					on:click="{() => (sAnswerSelected = 'a')}">
					<input type="hidden" bind:value="{sAnswerSelected}" />
					<div
						class="orange-500 text-orange-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
						<span class="text-xs">A</span>
					</div>
					<span class="break-words">Fetched Answer</span>
				</button>
				<button
					on:click="{() => (sAnswerSelected = 'b')}"
					class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3"
					class:pink-500="{sAnswerSelected === 'b'}">
					<input type="hidden" bind:value="{sAnswerSelected}" />
					<div
						class="pink-500 text-pink-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
						<span class="text-xs">B</span>
					</div>
					<span class="text-pretty">Fetched Answer</span>
				</button>
				<button
					class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3"
					class:sky-500="{sAnswerSelected === 'c'}"
					on:click="{() => (sAnswerSelected = 'c')}">
					<input type="hidden" bind:value="{sAnswerSelected}" />
					<div
						class="sky-500 text-sky-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
						<span class="text-xs">C</span>
					</div>
					<span class="text-pretty">Fetched Answer</span>
				</button>
				<button
					class="flex bg-bgSecondary border-stroke border rounded items-center px-4 py-2 gap-3"
					class:emerald-500="{sAnswerSelected === 'd'}"
					on:click="{() => (sAnswerSelected = 'd')}">
					<input type="hidden" bind:value="{sAnswerSelected}" />
					<div
						class="emerald-500 text-emerald-500 border font-bold bg-opacity-10 px-1.5 py-0.5 rounded flex justify-center items-center">
						<span class="text-xs">D</span>
					</div>
					<span class="text-pretty">Fetched Answer</span>
				</button>
			</div>

			<form action="?/submitAnswer" method="POST" class="self-end">
				<button
					type="submit"
					class="py-2 px-4 bg-emerald-500 rounded text-white font-bold text-sm"
					>Prześlij odpowiedź</button>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
	:global(body) {
		min-height: 100vh;
		display: grid;
		place-items: center;
	}
</style>
