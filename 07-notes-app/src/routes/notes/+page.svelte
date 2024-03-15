<!-- browse notes page -->
<script lang="ts">
	import type { PageData } from './$types';
	import type { Note } from '$types/Note.type.ts';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { fade } from 'svelte/transition';
	import { signOutWithGoogle } from '$lib/index';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	export let data: PageData;

	let searchVal: string = '';
	let debounceTimer: NodeJS.Timeout;
	let notes: Note[] = data?.data[0].notes;

	async function filterNotes(e: KeyboardEvent) {
		clearTimeout(debounceTimer);
		if (e.key === 'Enter') {
			clearTimeout(debounceTimer);
			return;
		} else {
			debounceTimer = setTimeout(async () => {
				const res = await fetch('/api', {
					method: 'PATCH',
					body: JSON.stringify({ searchVal }),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await res.json();
				notes = data?.data[0].notes;
			}, 350);
		}
	}
</script>

<AuthCheck>
	<div
		class="sm:mx-16 mx-8 md:mx-32 xl:mx-48 w-[calc(100%-4rem)] sm:w-[calc(100%-8rem)] md:w-[calc(100%-16rem)] xl:w-[calc(100%-24rem)] flex flex-col gap-8 text-text-white mt-8"
		in:fade={{ duration: 1000, delay: 100 }}>
		<button
			class="px-8 py-2 leading-[150%] self-start bg-bg-main rounded-lg grid place-items-center shadow-black/50 shadow-md hover:bg-bg-secondary transition-all text-text-white font-bold"
			on:click={signOutWithGoogle}>Wyloguj</button>
		<form class="w-full">
			<label for="searchNote" class="relative flex justify-between">
				<input
					on:keydown={e => filterNotes(e)}
					bind:value={searchVal}
					class="px-4 py-[0.88rem] bg-bg-main rounded-lg text-sm w-full focus:outline-sky-300"
					id="searchNote"
					name="searchNote"
					type="text"
					placeholder="Wyszukaj notatkę" />
				<SearchIcon />
			</label>
		</form>
		<section class="grid lg:grid-cols-2 gap-4 lg:gap-8">
			{#each notes as n}
				<div class="bg-bg-main p-8 flex flex-col justify-between">
					<div class="flex flex-col gap-4">
						<h1 class="text-clampBig font-semibold tracking-[-0.01406rem]">
							{n.title}
						</h1>
						<p
							class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
							<CalendarIcon />
							{n.date.toLocaleString('pl-PL')}
						</p>
						<p class="overflow-ellipsis font-normal text-clampMedium">{n.note}</p>
					</div>
					<form
						method=""
						class="mt-6 font-bold text-base flex-col min-[435px]:flex-row flex gap-[0.62rem] w-full justify-end">
						<input type="hidden" bind:value={n.id} />
						<button
							type="submit"
							class="px-8 py-2 leading-[150%] rounded-lg bg-bg-secondary grid place-items-center shadow-black/50 shadow-md hover:bg-bg-secondaryHov transition-all"
							>Usuń notatkę</button>
						<a
							href="/{n.id}"
							class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all"
							>Edytuj</a>
					</form>
				</div>
			{/each}
		</section>
	</div>
</AuthCheck>
