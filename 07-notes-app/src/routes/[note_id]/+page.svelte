<!-- individual note page -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { scale, fade } from 'svelte/transition';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import { TINYMCE_API_KEY, tinymceConfig, signOutWithGoogle } from '$lib/index';

	export let data: any;
	let noteText: string = data?.content;
	let noteTitle: string = data?.title;
	let noteDate: string = data?.date;
	let showModal: boolean = false

</script>

{#if data.error}
	<div class="h-svh grid place-items-center">
		<p class="bg-bg-main p-4 rounded-2xl text-text-white capitalize">
			{data.error}
			<a href="/notes" class="text-brand font-bold">Powróć do notatek</a>
		</p>
	</div>
{:else}
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
				<div class="flex gap-2">
					<form method="POST" on:submit|preventDefault={() => {}} use:enhance>
						<button
							formaction="?/delete"
							class="px-8 py-2 leading-[150%] bg-bg-main rounded-lg grid place-items-center"
							type="submit">Usuń notatkę</button>
					</form>
					<form method="POST" on:submit|preventDefault={() => {}} use:enhance>
						<button
							formaction="?/save"
							class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
							type="submit">Zapisz</button>
						<input type="hidden" bind:value={noteTitle} name="noteTitle" />
						<input type="hidden" value={new Date()} name="noteDate" />
						<input type="hidden" bind:value={noteText} name="noteText" />
					</form>
				</div>
			</header>
			<section
				class="mt-16 md:w-[calc(100vw - 8rem)] xl:w-[calc(100vw - 16rem)] md:mx-16 xl:mx-32">
				<div
					class="bg-bg-main flex flex-col justify-center items-center px-8 sm:px-16 pt-12 pb-6 gap-12">
					<form
						class="flex flex-col gap-6 justify-center items-center w-full"
						method="POST"
						action="?/save">
						<input
							id="title"
							name="title"
							class="font-extrabold tracking-[-0.036rem] w-full text-clampHuge leading-[3rem] bg-bg-main min-h-16 text-text-white overflow-y-auto resize-none text-center"
							bind:value={noteTitle}
							placeholder="Twój tytuł notatki..." />
						<p
							class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
							<CalendarIcon />
							{noteDate}
						</p>
					</form>
					<Editor bind:value={noteText} conf={tinymceConfig} apiKey={TINYMCE_API_KEY} />
				</div>
			</section>
		</div>
	</AuthCheck>
{/if}

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
