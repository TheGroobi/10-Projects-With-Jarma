<script>
	import SearchInput from '$lib/SearchInput.svelte';
	export let data;
	console.log(data.recipes);
</script>

<SearchInput />
{#each data.recipes as recipe}
	<div class="flex flex-col sm:flex-row gap-4 bg-bg-main">
		<img
			src={recipe.image_url}
			alt={recipe.name}
			class="xl:w-[29.75rem] lg:w-[20rem] w-full object-cover max-h-64 sm:max-h-full sm:w-64 md:max-h-64 lg:max-h-64"
		/>
		<div class="flex flex-col pt-8 gap-6 py-[1.37rem] px-8">
			<h1 class="text-text-main text-3xl font-semibold leading-[150%]">{recipe.name}</h1>
			<p class="text-text-secondary">{recipe.description}</p>
			<a
				href={recipe.id}
				class="bg-orange-500 rounded-lg text-invert font-bold text-base px-8 py-2 text-center self-end"
				>Przejdź do przepisu</a
			>
		</div>
	</div>
{/each}
