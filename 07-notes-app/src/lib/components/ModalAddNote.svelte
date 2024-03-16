<script lang="ts">
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	export let inputVal: string = '';
	export let showModal: boolean;

	let dialog: HTMLDialogElement;
	let form: HTMLFormElement;
	let error: string = '';

	$: if (dialog && showModal) dialog.showModal();

	function handleSubmit(form: HTMLFormElement) {
		if (inputVal !== '') {
			form.submit();
		} else {
			error = 'Please insert a title';
			return;
		}
	}
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
		<!-- svelte-ignore a11y-autofocus -->
		<form
			bind:this={form}
			on:click|stopPropagation
			on:submit|preventDefault={() => dialog.close()}
			class="flex gap-4 flex-col"
			method="POST"
			action="?/createNote"
			use:enhance>
			<div class="flex flex-col gap-1">
				<input
					autofocus
					type="text"
					name="noteTitle"
					bind:value={inputVal}
					class="px-3 py-2 text-xl bg-bg-secondary rounded-lg w-full text-text-white focus:outline-none focus:bg-bg-secondaryActive transition-colors"
					placeholder="Tytuł nowej notatki" />
				{#if error !== ''}
					<p class="text-red-500 font-regular">{error}</p>
				{/if}
			</div>
			<div class="flex gap-2 min-[320px]:flex-row flex-col">
				<button
					class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all font-bold"
					type="submit">Dodaj notatkę</button>
				<button
					on:click={() => dialog.close()}
					class="px-8 py-2 leading-[150%] bg-[#B81426] rounded-lg grid place-items-center text-text-white hover:text-text-whiteHov shadow-black/50 shadow-md hover:bg-[#E93548] transition-all font-bold"
					>Anuluj</button>
			</div>
		</form>
	</div>
</dialog>
