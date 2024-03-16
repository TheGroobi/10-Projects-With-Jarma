<script lang="ts">
	import { clickOutside } from '$lib/index';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	export let showDeleteModal: boolean = false;
	export let deleteNoteId: string;

	let dialog: HTMLDialogElement;

	$: if (dialog && showDeleteModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	in:scale
	class="backdrop:blur-xl backdrop:bg-[rgba(0,0,0,0.5)] rounded-lg bg-bg-main"
	bind:this={dialog}
	on:close={() => (showDeleteModal = false)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="p-8 bg-bg-main w-max rounded-lg flex gap-4 flex-col"
		on:outside={() => (showDeleteModal = false)}
		use:clickOutside>
		<!-- svelte-ignore a11y-autofocus -->
		<form
			on:click|stopPropagation
			on:submit|preventDefault={() => setTimeout(() => (showDeleteModal = false), 250)}
			class="flex gap-4 flex-col"
			method="POST"
			action="?/deleteNote"
			use:enhance>
			<p class="text-text-white font-semibold text-lg">
				Czy na pewno chcesz usunąć tę notatke?
			</p>
			<input type="hidden" name="noteId" bind:value={deleteNoteId} />
			<button
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all font-bold"
				type="submit"
				on:click>Usuń notatkę</button>
		</form>
		<button
			on:click={() => (showDeleteModal = false)}
			class="px-8 py-2 leading-[150%] bg-[#B81426] rounded-lg grid place-items-center text-text-white hover:text-text-whiteHov shadow-black/50 shadow-md hover:bg-[#E93548] transition-all font-bold"
			>Anuluj</button>
	</div>
</dialog>
