<script lang="ts">
	import Timer from "$lib/Timer.svelte";
	import QuestionCounter from "$lib/QuestionCounter.svelte";
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

<main class="p-8 bg-slate-200">
	<div class="p-16 w-140 bg-bgSecondary w-full flex flex-col gap-6">
		<Timer countdownTimer="{'12:12'}" />
		<div class="py-8 px-6 flex flex-col gap-8 bg-white">
			<QuestionCounter />
			<div class="flex flex-col gap-4">
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
		</div>
	</div>
</main>
