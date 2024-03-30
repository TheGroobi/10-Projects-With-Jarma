<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Movies App</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet" />
</svelte:head>

<main
	class="bg-bg-secondary md:px-16 min-[500px]:px-8 px-4 md:py-[6.25rem] min-[500px]:py-[3.25rem] py-[1.75rem] md:mt-16 md:mx-20 min-[500px]:mx-12 mx-6 min-[500px]:mt-12 mt-8">
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		background-color: #020617;
		font-family: 'Inter', sans-serif;
		height: 100svh;
	}
</style>
