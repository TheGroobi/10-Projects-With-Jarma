<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import RatingIcon from '$lib/icons/RatingIcon.svelte';
	import Next from '$lib/icons/Next.svelte';
	import NextTen from '$lib/icons/NextTen.svelte';
	import PreviousTen from '$lib/icons/PreviousTen.svelte';
	import Previous from '$lib/icons/Previous.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { handleEnterSubmit } from '$lib/index';

	export let data;
	export let form;
	let currentPage: number = data.movies.page;
	let totalPages: number = 500;
	$: movies = data.movies.results;

	let clickedPage: number = currentPage;
	let formEl: HTMLFormElement;

	$: pages = [
		{ page: currentPage - 4, current: false },
		{ page: currentPage - 3, current: false },
		{ page: currentPage - 2, current: false },
		{ page: currentPage - 1, current: false },
		{ page: currentPage, current: true },
		{ page: currentPage + 1, current: false },
		{ page: currentPage + 2, current: false },
		{ page: currentPage + 3, current: false },
		{ page: currentPage + 4, current: false },
	];

	function handleRedirect(id: Number) {
		setTimeout(() => goto(`/${id}`), 100);
	}

	function previousTen() {
		if (currentPage > 10) {
			return (clickedPage = currentPage - 10);
		} else {
			return (clickedPage = 1);
		}
	}

	function nextTen() {
		if (currentPage < totalPages - 10) {
			return (clickedPage = currentPage + 10);
		} else {
			return (clickedPage = 500);
		}
	}

	$: if (form) {
		movies = form.updatedMovies.results;
		currentPage = form.updatedMovies.page;
	}
</script>

<section class="grid grid-cols-1 3xl:grid-cols-2 gap-6 w-full">
	<form class="col-span-full" action="?/search" method="POST">
		<label for="title" class="relative flex justify-between">
			<input
				class="px-4 py-[0.88rem] bg-bg-main rounded-lg text-clampSmall min-[700px]:text-sm w-full focus:outline-none focus:bg-bg-mainActive transition-colors text-text-white"
				id="title"
				name="title"
				type="text"
				placeholder="Wyszukaj film..." />
			<SearchIcon />
		</label>
	</form>
	{#each movies as m (m)}
		<div
			class="flex gap-3 min-[850px]:max-h-[26.0625rem] min-[700px]:max-h-[22rem] min-[500px]:max-h-[16rem] max-h-[12rem]">
			{#if m.poster_path}
				<img
					src={'https://image.tmdb.org/t/p/w342/' + m.poster_path}
					alt="Plakat {m.title}"
					class="rounded-lg object-cover max-w-[17.375rem] max-h-full" />
			{/if}
			<div class="flex flex-col p-5 bg-bg-main rounded-lg w-full gap-1 min-[700px]:gap-5">
				<h1
					class="text-text-white font-semibold min-[700px]:line-clamp-2 text-clampBigSmall min-[700px]:text-clampBig leading-[150%] tracking-[-0.01406rem] break-all 3xl:break-normal">
					{m.title}
				</h1>
				<p class="font-normal min-[700px]:text-sm text-clampSmallSmall text-text-gray">
					Rok Produkcji: {m.release_date.slice(0, 4)}
				</p>
				<div class="flex items-center gap-3">
					<RatingIcon />
					<p class="text-text-gray font-normal min-[700px]:text-sm text-clampSmall">
						{Math.round(m.vote_average * 10) / 10} / 10
					</p>
				</div>
				<p
					class="text-text-gray min-[700px]:line-clamp-2 min-[850px]:line-clamp-5 3xl:line-clamp-3 text-ellipsis min-[700px]:text-base text-clampMediumSmall overflow-hidden">
					{m.overview}
				</p>
				<button
					on:click={() => handleRedirect(m.id)}
					class="px-4 min-[700px]:px-8 py-1 min-[700px]:py-2 min-[700px]:text-base text-[0.5rem] bg-bg-secondary rounded-lg font-bold text-text-white w-max mt-auto"
					>Dowiedz się więcej</button>
			</div>
		</div>
	{/each}
	<form
		class="flex justify-center gap-2 col-span-full"
		use:enhance
		method="POST"
		action="?/page"
		bind:this={formEl}>
		<input type="hidden" bind:value={clickedPage} name="page" />
		{#if currentPage !== 1 && currentPage < 5}
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={previousTen}>
				<PreviousTen />
			</button>
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={() => (clickedPage = currentPage - 1)}>
				<Previous />
			</button>
		{:else if currentPage >= 5}
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={previousTen}>
				<PreviousTen />
			</button>
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={() => (clickedPage = currentPage - 1)}>
				<Previous />
			</button>
			<button
				class="px-2 py-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={() => (clickedPage = 1)}>1</button>
		{/if}
		{#each pages as p, i}
			{#if p.page > 0 && !p.current && p.page < totalPages}
				<button
					class="px-2 py-1 font-regular text-text-gray rounded-md bg-bg-main"
					type="submit"
					on:click={() => (clickedPage = pages[i].page)}>{p.page}</button>
			{:else if p.current && p.page !== totalPages}
				<button class="px-2 py-1 font-bold text-text-white rounded-md bg-bg-main" disabled
					>{p.page}</button>
			{/if}
		{/each}

		{#if currentPage !== totalPages}
			<!-- doesn't work????
		////////////////////////////////////////////////////////// -->
			<input
				type="number"
				class="max-w-12 px-1 border-2 rounded-lg bg-bg-secondary focus:border-slate-900 focus-border-3 border-slate-800 text-center text-text-white outline-none"
				placeholder="..."
				on:keypress={e => handleEnterSubmit(formEl)}
				max={totalPages}
				bind:value={clickedPage} />
			<button
				class="px-2 py-1 font-regular text-text-gray rounded-md bg-bg-main"
				on:click={() => (clickedPage = totalPages)}>{totalPages}</button>
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={() => (clickedPage = currentPage + 1)}>
				<Next />
			</button>
			<button
				class="px-1 font-regular text-text-gray rounded-md bg-bg-main"
				type="submit"
				on:click={nextTen}>
				<NextTen />
			</button>
		{:else if currentPage === totalPages}
			<input
				type="number"
				class="max-w-12 px-1 border-2 rounded-lg bg-bg-secondary focus:border-slate-900 focus-border-3 border-slate-800 text-center text-text-white outline-none"
				placeholder="..."
				on:keypress={e => handleEnterSubmit(formEl)}
				max={totalPages} />
			<button
				class="px-2 py-1 font-regular text-text-white font-bold rounded-md bg-bg-main"
				disabled>{totalPages}</button>
		{/if}
	</form>
</section>
