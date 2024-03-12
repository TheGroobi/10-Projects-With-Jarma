<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<div class="h-svh grid place-items-center">
		<p class="bg-bg-main p-4 rounded-2xl text-text-white">
			Musisz być zalogowany żeby przejść na tę stronę.
			<a class="text-brand font-bold" href="/">Zaloguj się</a>
		</p>
	</div>
{/if}
