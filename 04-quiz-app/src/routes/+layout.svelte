<script>
	import "../app.css";
	</script>

<main class="sm:p-8 bg-slate-200 w-min p-4">
	<div class="sm:p-16 bg-bgSecondary flex flex-col gap-6 p-8">
		<slot />
	</div>
</main>
<style lang="postcss">
	:global(body) {
		min-height: 100vh;
		display: grid;
		place-items: center;
	}
</style>