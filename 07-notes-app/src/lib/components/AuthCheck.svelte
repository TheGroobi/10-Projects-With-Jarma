<script lang="ts">
	// import { page } from '$app/stores';
	import { user } from '$lib/firebase';
	import { signInWithGoogle } from '$lib/index';
	// import { fade } from 'svelte/transition';
</script>

{#if $user}
	<slot />
{:else}
	<div class="h-svh grid place-items-center">
		<p class="bg-bg-main p-4 rounded-2xl text-text-white">
			Musisz być zalogowany żeby przejść na tę stronę.
			<button on:click={signInWithGoogle} class="text-brand font-bold hover:text-brandHov">Zaloguj się</button>
		</p>
	</div>
{/if}
