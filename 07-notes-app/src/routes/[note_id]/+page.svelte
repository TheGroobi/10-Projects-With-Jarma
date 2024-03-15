<!-- individual note page -->
<script lang="ts">
	import type { Note } from '$types/Note.type.ts';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { scale, fade } from 'svelte/transition';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import {
		handleEnterSubmit,
		TINYMCE_API_KEY,
		tinymceConfig,
		signOutWithGoogle,
	} from '$lib/index';
	import { page } from '$app/stores';

	let note_id: number = Number($page.params.note_id);
	export let data: PageData;
	let notes: Note[] = data?.data[0].notes;
	let note: Note = data?.data[0].notes[note_id];

	let deleteForm: HTMLFormElement;
	let noteText: string = '';
</script>

<AuthCheck>
	<div
		class="mx-8 mt-8 w-[calc(100vw - 4rem)]"
		in:scale={{ duration: 750, start: 0.7, opacity: 0.5 }}
		out:fade={{ duration: 200 }}>
		<header
			class="text-text-white font-bold flex flex-col min-[610px]:flex-row gap-2 justify-between w-[calc(100vw-4rem)]">
			<div class="flex gap-2">
				<button
					class="px-8 py-2 leading-[150%] bg-bg-main rounded-lg grid place-items-center"
					on:click={signOutWithGoogle}>Wyloguj</button>
				<a
					href="/notes"
					class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
					>Powrót</a>
			</div>
			<form
				class="flex gap-2"
				method="POST"
				on:submit|preventDefault={() => console.log('kjsadh')}
				bind:this={deleteForm}
				action="?/delete"
				use:enhance>
				<button
					class="px-8 py-2 leading-[150%] bg-bg-main rounded-lg grid place-items-center"
					on:click={() => deleteForm.submit()}>Usuń notatkę</button>
				<button
					type="submit"
					class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
					>Zapisz</button>
				<!-- <input type="hidden" bind:value={note.id} name="note" /> -->
			</form>
		</header>
		<section
			class="mt-16 md:w-[calc(100vw - 8rem)] xl:w-[calc(100vw - 16rem)] md:mx-16 xl:mx-32">
			<div
				class="bg-bg-main flex flex-col justify-center items-center px-8 sm:px-16 pt-12 pb-6 gap-12">
				<form class="flex flex-col gap-6 justify-center items-center w-full">
					<textarea
						id="title"
						name="title"
						class="font-extrabold tracking-[-0.036rem] w-full text-clampHuge leading-[3rem] bg-bg-main min-h-16 text-text-white overflow-y-auto resize-none text-center"
						rows="1"
						on:keydown={e => handleEnterSubmit(e, formEl)}
						placeholder="Twój tytuł notatki..." />
					<p class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
						<CalendarIcon />
						Date here
					</p>
				</form>
				<Editor bind:value={noteText} conf={tinymceConfig} apiKey={TINYMCE_API_KEY} />
			</div>
		</section>
	</div>
</AuthCheck>

<!--
	dodać hover do buttonów i transition na page
 -->

<style lang="postcss">
	:global(.tox .tox-toolbar__group:last-child) {
		margin-left: auto !important;
	}
	:global(.tox-tinymce, .tox-editor-header, .tox-statusbar) {
		border: none !important;
		border-radius: 8px !important;
	}
	:global(.tox-editor-header) {
		padding-left: 4px !important;
		padding-right: 4px !important;
	}
	:global(.tox:not(.tox-tinymce-inline) .tox-editor-header, .tox-toolbar) {
		background-color: #334155 !important;
	}
	:global(.tox-statusbar) {
		background-color: rgba(30, 41, 59, 1) !important;
	}

	:global(.tinymce-wrapper) {
		width: 100% !important;
	}
	:global(.tox-toolbar__group) {
		padding-left: 1.5rem !important;
		padding-right: 1.5rem !important;
		border: none !important;
	}
	:global(.tox-toolbar__group:last-child) {
		padding-right: calc(1em - 4px) !important;
	}
	:global(.tox-toolbar__group:first-child) {
		padding-left: calc(1em - 4px) !important;
	}
	:global(.tox-menu) {
		border: none !important;
	}
	:global(.tox-tbtn--bespoke) {
		background: rgba(30, 41, 59, 0.4) !important;
	}
</style>
