<script lang="ts">
	import { user } from '$lib/firebase';
	import { signInWithGoogle } from '$lib/index';
</script>

{#if $user}
	<slot />
{:else}
	<div class="h-svh grid place-items-center">
		<p class="bg-bg-main p-4 rounded-2xl text-text-white">
			Musisz być zalogowany żeby przejść na tę stronę.
			<button on:click={signInWithGoogle} class="text-brand font-bold">Zaloguj się</button>
		</p>
	</div>
{/if}
