<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<main class=" min-h-svh text-text-white grid place-items-center">
	<div class="flex flex-col items-center my-20">
		<slot />
	</div>
</main>

<style lang="postcss">
	:global(body) {
		font-style: 'Inter', sans-serif;
		background-color: #020617;
	}

</style>
