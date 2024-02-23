<script lang="ts">
	export let form;
	let bCongrats: Boolean;
	let nPoints: number = form?.nPoints;
	let nMaxPoints: number = form?.nMaxPoints;
	if (nPoints === nMaxPoints) {
		bCongrats = true;
	}
</script>

<div
	class="flex items-center flex-col bg-white py-8 px-6 rounded border border-stroke font-bold">
	{#if bCongrats}
		<h1
			class="mb-8 text-3xl bg-gradient-to-r bg-clip-text text-transparent from-emerald-500 via-purple-500 to-emerald-500 animate-text">
			Gratulacje!!!
		</h1>
	{/if}
	<h1 class="text-1xl tracking-tight w-max text-text text-center">
		Twój wynik:
	</h1>
	<p class="tracking-tight text-2xl font-bold w-max text-center">
		<span class="text-sky-500">{nPoints}</span>
		 /
		<span class="text-emerald-500">{nMaxPoints}</span>
	</p>
	<a
		href="/"
		class="mt-6 bg-emerald-500 rounded text-white py-2 px-4 w-max font-bold"
		>Zacznij nowy Quiz</a>
</div>
