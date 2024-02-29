<script lang="ts">
	import IngredientTask from '$lib/IngredientTask.svelte';
	import CookingDirectionsTask from '$lib/CookingDirectionsTask.svelte';
	import SearchInput from '$lib/SearchInput.svelte';
	import type { recipeObj, descriptionObj, ingredientObj } from '$lib/types.d.ts';

	export let data;

	let recipe: recipeObj = data.recipe;
	let directions: descriptionObj[] = data.directions;
	let ingredients: ingredientObj[] = data.ingredients;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<form action="" class="sm:gap-8 gap-4 flex flex-col sm:flex-row">
	<SearchInput />
	<a href="/" class="bg-orange-500 rounded-lg text-invert font-bold text-base px-8 py-2 text-center"
		>Powrót</a
	>
</form>
<section class="flex flex-col gap-4">
	<h1 class="text-text-main text-3xl tracking-[-0.01496rem] font-semibold">
		{recipe.name}
	</h1>
	<img src={recipe.image_url} alt={recipe.name} class="w-full min-h-4xl h-43" />
</section>
<section class="flex flex-col gap-6">
	<p class="px-2 py-1 text-yellow-100 bg-ingredients w-min rounded-lg">Składniki</p>
	<div class="grid gap-3 sm:grid-cols-2">
		{#each ingredients as ingredient}
			<IngredientTask {ingredient} />
		{/each}
	</div>
</section>
<section class="flex flex-col gap-4">
	<p class="px-2 py-1 text-sky-50 bg-directions rounded-lg w-max">Kroki przygotowania</p>
	<div class="grid gap-3 sm:grid-cols-2">
		{#each directions as direction}
			<CookingDirectionsTask {direction} />
		{/each}
	</div>
</section>
<footer>
	<p class="leading-7 font-normal text-lg text-text-secondary text-pretty">
		{data.recipe.disclaimer}
	</p>
</footer>
