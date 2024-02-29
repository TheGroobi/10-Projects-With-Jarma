<script>
	import '../app.css';
</script>
<div class="bg-slate-950 grid place-items-center w-full min-h-svh">
	<main
		class="p-8 md:p-16 bg-bg-light flex flex-col gap-8 xl:max-w-7xl lg:max-w-5xl md:max-w-3xl mt-44"
	>
<slot />
	</main>
</div>
<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
	}
</style>