<script>
	import { page } from "$app/stores";
</script>

<div class="flex items-center flex-col gap-4">
	<h1 class="text-1xl tracking-tight font-bold w-max text-text text-center">
		Your score :
	</h1>
	<p class="tracking-tight text-2xl font-bold w-max text-center">
		<span class="text-sky-500">{$page.params.nPoints}</span>/<span
			class="text-emerald-500">{$page.params.nMaxPoints}</span>
	</p>
</div>
