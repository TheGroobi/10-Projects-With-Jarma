<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, user } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}

	$: if ($user) {
		setTimeout(() => {
			countdownTimer--;
		}, 1000);
		if (countdownTimer <= 0) {
			goto('/notes');
		}
	}
	$: countdownTimer = 4;
</script>

<div class="flex justify-center items-center h-svh -mt-8 -mx-8">
	{#if $user}
		<div
			in:fly={{ x: -1000, duration: 500, delay: 250, easing: cubicInOut }}
			class="bg-bg-main w-max flex flex-col p-4 sm:p-8 gap-6 rounded-2xl text-clampBig">
			<h2 class="text-text-white">
				Welcome, <span class="text-brand font-bold">{$user?.displayName}</span>
			</h2>
			<p class="text-text-white text-clampMedium">
				You are being redirected to your notes in {countdownTimer}...
			</p>
		</div>
	{:else}
		<div
			class="grid place-items-center gap-16 mb-16"
			out:fly={{ x: 1000, duration: 500, easing: cubicInOut }}>
			<h1 class="text-text-white font-normal text-clampBig">Notatki</h1>
			<div class="flex flex-col-reverse gap-4 text-clampMedium">
				<button
					class="bg-brand py-3 px-6 hover:opacity-90 text-text-white rounded-lg font-bold"
					on:click={signInWithGoogle}>Log in</button>
				<button
					class="bg-bg-main py-3 px-6 hover:opacity-85 hover:text-text-white text-text-gray rounded-lg font-bold"
					on:click={signInWithGoogle}>Sign in with Google</button>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
