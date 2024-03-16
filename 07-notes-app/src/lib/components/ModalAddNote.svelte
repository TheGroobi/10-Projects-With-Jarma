<script lang="ts">
	import { scale } from 'svelte/transition';
	export let modalForm: string;
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	in:scale
	class="p-8 bg-bg-main w-max rounded backdrop:blur-xl backdrop:bg-[rgba(0,0,0,0.5)]"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col gap-4">
		<form on:click|stopPropagation>
			<input
				type="text"
				name="noteTitle"
				bind:value={modalForm}
				class="px-3 py-2 text-xl bg-bg-secondary rounded-lg w-full text-text-white focus:outline-none focus:bg-bg-secondaryActive transition-colors"
				placeholder="Tytuł nowej notatki" />
		</form>
		<!-- svelte-ignore a11y-autofocus -->
		<div class="flex gap-2 min-[320px]:flex-row flex-col">
			<button
				type="submit"
				autofocus
				on:click={() => dialog.close()}
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all font-bold"
				>Dodaj notatkę</button>
			<!-- svelte-ignore a11y-autofocus -->
			<button
				autofocus
				on:click={() => dialog.close()}
				class="px-8 py-2 leading-[150%] bg-[#B81426] rounded-lg grid place-items-center text-text-white hover:text-text-whiteHov shadow-black/50 shadow-md hover:bg-[#E93548] transition-all font-bold"
				>Anuluj</button>
		</div>
	</div>
</dialog>
