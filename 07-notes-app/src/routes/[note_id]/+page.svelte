<!-- individual note page -->
<script lang="ts">
	import type { Note } from '$types/Note.type.ts';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import { handleEnterSubmit, TINYMCE_API_KEY, tinymceConfig } from '$lib/index';

	let notes: Note[] = [
		{
			title: 'Lista Zakupów na sobotni obiad',
			note: 'Lorem ipsum dolor sit amet consectetur. Nunc molestie egestas consequat odio sed ac consequat cum ullamcorper. Bibendum eget in arcu dictum nec pretium. Purus placerat amet quisque tincidunt massa eleifend...',
			date: new Date(),
			id: 1,
		},
		{
			title: 'Plan treningowy na nadchodzący tydzień',
			note: 'Lorem ipsum dolor sit amet consectetur. Nunc molestie egestas consequat odio sed ac consequat cum ullamcorper. Bibendum eget in arcu dictum nec pretium. Purus placerat amet quisque tincidunt massa eleifend...',
			date: new Date(),
			id: 2,
		},
		{
			title: 'Pomysły na weekendowe wycieczki',
			note: 'Lorem ipsum dolor sit amet consectetur. Nunc molestie egestas consequat odio sed ac consequat cum ullamcorper. Bibendum eget in arcu dictum nec pretium. Purus placerat amet quisque tincidunt massa eleifend...',
			date: new Date(),
			id: 3,
		},
		{
			title: 'Pomysły na weekendowe wycieczki',
			note: 'Lorem ipsum dolor sit amet consectetur. Nunc molestie egestas consequat odio sed ac consequat cum ullamcorper. Bibendum eget in arcu dictum nec pretium. Purus placerat amet quisque tincidunt massa eleifend...',
			date: new Date(),
			id: 4,
		},
	];

	let formEl: HTMLFormElement;
	let note: string = '';
</script>

<div class="mx-8 mt-8 w-[calc(100vw - 4rem)]">
	<header
		class="text-text-white font-bold flex flex-col min-[610px]:flex-row gap-2 justify-between w-[calc(100vw-4rem)]">
		<div class="flex gap-2">
			<button class="px-8 py-2 leading-[150%] bg-bg-main rounded-lg grid place-items-center"
				>Wyloguj</button>
			<a
				href="/"
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
				>Powrót</a>
		</div>
		<form class="flex gap-2">
			<button class="px-8 py-2 leading-[150%] bg-bg-main rounded-lg grid place-items-center"
				>Usuń notatkę</button>
			<button
				type="submit"
				class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
				>Zapisz</button>
			<input type="hidden" bind:value={note} name="note" />
		</form>
	</header>
	<section class="mt-16 md:w-[calc(100vw - 8rem)] xl:w-[calc(100vw - 16rem)] md:mx-16 xl:mx-32">
		<div
			class="bg-bg-main flex flex-col justify-center items-center px-8 sm:px-16 pt-12 pb-6 gap-12">
			<form class="flex flex-col gap-6 justify-center items-center w-full" bind:this={formEl}>
				<textarea
					id="title"
					name="title"
					class="font-extrabold tracking-[-0.036rem] w-full text-clampHuge leading-[3rem] bg-bg-main min-h-16 text-text-white overflow-y-auto resize-none text-center"
					rows="1"
					on:keydown={e => handleEnterSubmit(e, formEl)}
					placeholder="Twój tytuł notatki..." />
				<p class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
					<CalendarIcon />
					{notes[0].date.toLocaleString('pl-PL')}
				</p>
			</form>
			<Editor bind:value={note} conf={tinymceConfig} apiKey={TINYMCE_API_KEY} />
		</div>
	</section>
</div>

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
