<script lang="ts">
	import type { clickOutsideAction } from '$types/Note.type';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { handleEnterSubmit } from '$lib/index';
	export let inputVal: string = '';
	export let showModal: boolean;

	let dialog: HTMLDialogElement;
	let formEl: HTMLFormElement;
	let error: string = '';

	$: if (dialog && showModal) dialog.showModal();

	function handleError() {
		if (inputVal === '') {
			error = 'Please insert a title';
			return;
		}
	}

	const clickOutside: clickOutsideAction = element => {
		function handleClick(event: MouseEvent) {
			const targetEl = event.target as HTMLElement;

			if (element && !element.contains(targetEl)) {
				const clickOutsideEvent = new CustomEvent('outside');
				element.dispatchEvent(clickOutsideEvent);
			}
		}

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			},
		};
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	in:scale
	class="backdrop:blur-xl backdrop:bg-[rgba(0,0,0,0.5)] rounded-lg bg-bg-main"
	bind:this={dialog}
	on:close={() => (showModal = false)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="p-8 bg-bg-main w-max rounded-lg flex gap-4 flex-col"
		on:outside={() => (showModal = false)}
		use:clickOutside>
		<!-- svelte-ignore a11y-autofocus -->
		<form
			on:click|stopPropagation
			on:submit|preventDefault={() => setTimeout(() => (showModal = false), 250)}
			bind:this={formEl}
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
					on:keydown={e => handleEnterSubmit(e, formEl)}
					class="px-3 py-2 text-xl bg-bg-secondary rounded-lg w-full text-text-white focus:outline-none focus:bg-bg-secondaryActive transition-colors"
					placeholder="Tytuł nowej notatki" />
				{#if error !== ''}
					<p class="text-red-500 font-regular">{error}</p>
				{/if}
			</div>
			<button
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main hover:text-bg-secondary shadow-black/50 shadow-md hover:bg-brandHov transition-all font-bold"
				type="submit"
				on:click={handleError}>Dodaj notatkę</button>
		</form>
		<button
			on:click={() => (showModal = false)}
			class="px-8 py-2 leading-[150%] bg-[#B81426] rounded-lg grid place-items-center text-text-white hover:text-text-whiteHov shadow-black/50 shadow-md hover:bg-[#E93548] transition-all font-bold"
			>Anuluj</button>
	</div>
</dialog>
