<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet" />
	<title>Notatki App</title>
</svelte:head>

<slot />

<style lang="postcss">
	:global(body) {
		font-style: 'Inter', sans-serif;
		background-color: #020617;
	}
</style>
