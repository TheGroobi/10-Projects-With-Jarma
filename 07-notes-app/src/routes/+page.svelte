<!-- browse notes page -->
<script lang="ts">
	import type { Note } from '../types/Note.type.ts';
	// import { auth } from '$lib/firebase';
	// import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	// async function signInWithGoogle() {
	// const provider = new GoogleAuthProvider();
	// const user = await signInWithPopup(auth, provider);
	// }

	let formEl: HTMLFormElement;
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

	function handleSubmit(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			formEl.submit();
		}
	}
</script>

<div
	class="max-w-[75rem] sm:mx-16 md:mx-32 xl:mx-48 w-[calc(100%-4rem)] sm:w-[calc(100%-8rem)] md:w-[calc(100%-16rem)] xl:w-[calc(100%-24rem)] flex flex-col gap-8 text-text-white">
	<form method="" bind:this={formEl} class="w-full">
		<label for="searchNote" class="relative flex justify-between">
			<input
				on:keydown={e => handleSubmit(e)}
				class="px-4 py-[0.88rem] bg-bg-main rounded-lg text-sm w-full focus:outline-sky-300"
				id="searchNote"
				title="searchNote"
				type="text"
				placeholder="Wyszukaj notatkę" />
			<svg
				class="absolute right-4 top-4 pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.24902 3C5.34953 3 2.99902 5.3505 2.99902 8.25C2.99902 11.1495 5.34953 13.5 8.24902 13.5C11.1485 13.5 13.499 11.1495 13.499 8.25C13.499 5.3505 11.1485 3 8.24902 3ZM1.49902 8.25C1.49902 4.52208 4.5211 1.5 8.24902 1.5C11.9769 1.5 14.999 4.52208 14.999 8.25C14.999 11.9779 11.9769 15 8.24902 15C4.5211 15 1.49902 11.9779 1.49902 8.25Z"
					fill="#F8FAFC" />
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M11.9936 11.9947C12.2865 11.7018 12.7614 11.7018 13.0543 11.9947L16.2793 15.2197C16.5721 15.5126 16.5721 15.9874 16.2793 16.2803C15.9864 16.5732 15.5115 16.5732 15.2186 16.2803L11.9936 13.0553C11.7007 12.7624 11.7007 12.2876 11.9936 11.9947Z"
					fill="#F8FAFC" />
			</svg>
		</label>
	</form>
	<section class="grid lg:grid-cols-2 gap-4 lg:gap-8">
		{#each notes as n}
			<div class="bg-bg-main p-8 flex flex-col justify-between">
				<div class="flex flex-col gap-4">
					<h1 class="text-clampBig font-semibold tracking-[-0.01406rem]">{n.title}</h1>
					<p class="flex items-center gap-3 text-text-gray text-clampMedium font-normal">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5 5C4.44772 5 4 5.44772 4 6V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V6C20 5.44772 19.5523 5 19 5H5ZM2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V6Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M16 1C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V2C15 1.44772 15.4477 1 16 1Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8 1C8.55228 1 9 1.44772 9 2V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V2C7 1.44772 7.44772 1 8 1Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M2 10C2 9.44772 2.44772 9 3 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10 14C10 13.4477 10.4477 13 11 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H11C10.4477 15 10 14.5523 10 14Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6 18C6 17.4477 6.44772 17 7 17H13C13.5523 17 14 17.4477 14 18C14 18.5523 13.5523 19 13 19H7C6.44772 19 6 18.5523 6 18Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6 14C6 13.4477 6.44772 13 7 13H7.01C7.56228 13 8.01 13.4477 8.01 14C8.01 14.5523 7.56228 15 7.01 15H7C6.44772 15 6 14.5523 6 14Z"
								fill="#94A3B8" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M16 18C16 17.4477 16.4477 17 17 17H17.01C17.5623 17 18.01 17.4477 18.01 18C18.01 18.5523 17.5623 19 17.01 19H17C16.4477 19 16 18.5523 16 18Z"
								fill="#94A3B8" /></svg>
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
						class="px-8 py-2 leading-[150%] rounded-lg bg-bg-secondary grid place-items-center"
						>Usuń notatkę</button>
					<a
						href="/{n.id}"
						class="px-8 py-2 leading-[150%] bg-brand rounded-lg grid place-items-center text-bg-main"
						>Edytuj</a>
				</form>
			</div>
		{/each}
	</section>
</div>
