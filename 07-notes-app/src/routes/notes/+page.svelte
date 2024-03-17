<!-- browse notes page -->
<script lang="ts">
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { fade } from 'svelte/transition';
	import { signOutWithGoogle } from '$lib/index';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import ModalAddNote from '$lib/components/ModalAddNote.svelte';
	import ModalDeleteNote from '$lib/components/ModalDeleteNote.svelte';

	// add ts annotation here
	export let data: any;
	export let form: any;

	$: notes = data?.notes;
	$: ids = data?.ids;

	let searchVal: string = '';
	let showModal: boolean = false;
	let showDeleteModal: boolean = false;
	let deleteButtonDisabled = false;
	let deleteNoteId: string;

	let debounceTimer: NodeJS.Timeout;
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
				notes = data?.notes;
				ids = data?.ids;
			}, 350);
		}
	}
	$: if (form?.status) {
		deleteButtonDisabled = true;
		setTimeout(() => {
			deleteButtonDisabled = false;
		}, 300);
	}

	$: console.log(deleteNoteId)
</script>

<AuthCheck>
	<div
		class="sm:mx-16 mx-8 md:mx-32 xl:mx-48 w-[calc(100%-4rem)] sm:w-[calc(100%-8rem)] md:w-[calc(100%-16rem)] xl:w-[calc(100%-24rem)] flex flex-col gap-8 text-text-white mt-8"
		in:fade={{ duration: 1000, delay: 100 }}>
		<div class="-mb-4 flex gap-2">
			<button
				class="px-8 py-2 leading-[150%] self-start bg-bg-main rounded-lg grid place-items-center shadow-black/50 shadow-md hover:bg-bg-secondary transition-all text-text-white font-bold"
				on:click={signOutWithGoogle}>Wyloguj</button>
			<button
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all font-bold"
				on:click={() => (showModal = !showModal)}>Dodaj notatkę</button>
		</div>
		{#if showModal}
			<ModalAddNote bind:showModal />
		{:else if showDeleteModal}
			<ModalDeleteNote bind:showDeleteModal {deleteNoteId} />
		{/if}
		<form class="w-full">
			<label for="searchNote" class="relative flex justify-between">
				<input
					on:keydown={e => filterNotes(e)}
					bind:value={searchVal}
					class="px-4 py-[0.88rem] bg-bg-main rounded-lg text-sm w-full focus:outline-none focus:bg-bg-mainActive transition-colors"
					id="searchNote"
					name="searchNote"
					type="text"
					placeholder="Wyszukaj notatkę" />
				<SearchIcon />
			</label>
		</form>
		{#if notes && notes.length > 0}
			<section class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
				{#each notes as n, i}
					<div class="bg-bg-main p-8 flex flex-col justify-between">
						<div class="flex flex-col gap-4">
							<h1
								class="text-clampBig font-semibold tracking-[-0.01406rem] break-words">
								{n.title}
							</h1>
							<p
								class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
								<CalendarIcon />
								{n.date}
							</p>
							<p class="font-normal text-clampMedium line-clamp-3">
								{n.content}
							</p>
						</div>
						<form
							class="mt-6 font-bold text-base flex-col min-[435px]:flex-row flex gap-[0.62rem] w-full justify-end">
							<button
								on:click={() => {
									showDeleteModal = !showDeleteModal;
									deleteNoteId = ids[i];
								}}
								class="px-8 py-2 leading-[150%] rounded-lg bg-bg-secondary grid place-items-center shadow-black/50 shadow-md hover:bg-bg-secondaryHov transition-all"
								disabled={deleteButtonDisabled}>Usuń notatkę</button>

							<a
								href="/{ids[i]}"
								class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all"
								>Edytuj</a>
						</form>
					</div>
				{/each}
			</section>
		{:else}
			<div class="flex justify-center w-full items-center h-[20vh]">
				<p class="bg-bg-main p-4 rounded-2xl text-text-white">
					Nie masz jeszcze żadnych notek...
					<button
						on:click={() => (showModal = !showModal)}
						class="text-brand font-bold hover:text-brandHov">Dodaj Notatkę</button>
				</p>
			</div>
		{/if}
	</div>
</AuthCheck>
