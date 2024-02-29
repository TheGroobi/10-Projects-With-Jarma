<script lang="ts">
	import type { ingredientObj } from '$lib/types.d.ts'

	export let ingredient: ingredientObj;
</script>

<li id={ingredient.id.toString()} class="py-3 px-4 bg-bg-main list-none flex gap-3 relative">
	<button type="submit" class="h-6 w-6">
		<form method="POST" class="h-6 w-6">
			<input
				type="checkbox"
				class="before:content[''] h-6 w-6 cursor-pointer appearance-none rounded-[0.1875rem] bg-bg-light checked:bg-lime-500"
				bind:checked={ingredient.completed}
			/>
		</form>
		{#if ingredient.completed}
			<svg
				class="absolute h-[0.875rem] w-[0.875rem] top-[1.06rem] left-[1.31rem] pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
				><path
					fill="#fff"
					fill-rule="evenodd"
					d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z"
					clip-rule="evenodd"
				></path></svg
			>
		{/if}
	</button>
	<span
		class="text-base font-normal leading-6 text-text-main"
		class:text-text-secondary={ingredient.completed}
		class:line-through={ingredient.completed}>{ingredient.name}</span
	>
</li>
