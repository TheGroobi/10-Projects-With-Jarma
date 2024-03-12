<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, user } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { fly } from 'svelte/transition';
	import { backInOut, cubicInOut } from 'svelte/easing';

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

<div class="flex justify-center items-center h-svh">
	{#if $user}
		<div
			in:fly={{ x: -1000, duration: 500, delay: 250, easing: cubicInOut }}
			class="bg-bg-main w-max flex flex-col p-4 sm:p-8 gap-6 rounded-2xl text-clampBig">
			<h2 class="text-text-white">
				Witaj, <span class="text-brand font-bold">{$user?.displayName}</span>
			</h2>
			<p class="text-text-white text-clampMedium">
				Za chwilę zostaniesz przekierowany do swoich notatek <span
					class="text-brand font-bold">{countdownTimer}</span
				>...
			</p>
		</div>
	{:else}
		<div
			class="grid place-items-center gap-16 mb-16 bg-bg-main rounded-2xl sm:p-8 p-4"
			in:fly={{ y: -1000, duration: 500, easing: backInOut }}
			out:fly={{ x: 1000, duration: 500, easing: cubicInOut }}>
			<h1 class="text-text-white font-normal text-clampBig">Notatki</h1>
			<button
				class="bg-brand py-3 px-6 shadow-black/50 shadow-md hover:bg-brandHov text-bg-main hover:text-bg-secondary transition-all rounded-lg font-bold text-clampMedium"
				on:click={signInWithGoogle}>
				Zaloguj się
			</button>
		</div>
	{/if}
</div>
