<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	let form: HTMLFormElement;
	let inputValue: string;

	let recipes: any[] = data.recipes;

	function handleSubmit(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			form.submit;
		}
	}
	$: console.log(data);
</script>

<form method="POST" class="flex relative w-full" bind:this={form} use:enhance>
	<input
		name="search"
		type="text"
		class="w-full bg-bg-main rounded-lg px-4 py-2 font-medium outline-none text-text-main"
		placeholder="Wyszukaj przepisu"
		bind:value={inputValue}
		on:keydown={handleSubmit}
	/>
	<svg
		class="absolute right-4 top-3 pointer-events-none"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M8.24902 3C5.34953 3 2.99902 5.3505 2.99902 8.25C2.99902 11.1495 5.34953 13.5 8.24902 13.5C11.1485 13.5 13.499 11.1495 13.499 8.25C13.499 5.3505 11.1485 3 8.24902 3ZM1.49902 8.25C1.49902 4.52208 4.5211 1.5 8.24902 1.5C11.9769 1.5 14.999 4.52208 14.999 8.25C14.999 11.9779 11.9769 15 8.24902 15C4.5211 15 1.49902 11.9779 1.49902 8.25Z"
			fill="#F8FAFC"
		/>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M11.9936 11.9947C12.2865 11.7018 12.7614 11.7018 13.0543 11.9947L16.2793 15.2197C16.5721 15.5126 16.5721 15.9874 16.2793 16.2803C15.9864 16.5732 15.5115 16.5732 15.2186 16.2803L11.9936 13.0553C11.7007 12.7624 11.7007 12.2876 11.9936 11.9947Z"
			fill="#F8FAFC"
		/>
	</svg>
</form>
{#if !recipes}
	<h1 class="text-text-main text-3xl grid place-items-center">No recipes found</h1>
{/if}
{#each recipes as recipe}
	<div class="flex flex-col sm:flex-row gap-4 bg-bg-main">
		<img
			src={recipe.image_url}
			alt={recipe.name}
			class="xl:w-[29.75rem] lg:w-[20rem] w-full object-cover max-h-64 sm:max-h-full sm:w-64 lg:max-h-64"
		/>
		<div class="flex flex-col pt-8 gap-6 py-[1.37rem] px-8 w-full">
			<h1 class="text-text-main text-3xl font-semibold leading-[150%]">{recipe.name}</h1>
			<p class="text-text-secondary">{recipe.description}</p>
			<a
				href={recipe.id}
				class="bg-orange-500 rounded-lg text-invert font-bold text-base px-8 py-2 text-center self-end hover:bg-orange-600"
				>Przejdź do przepisu</a
			>
		</div>
	</div>
{/each}
