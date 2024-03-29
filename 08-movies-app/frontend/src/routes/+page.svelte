<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import RatingIcon from '$lib/icons/RatingIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	export let data;
	$: movies = data.movies.results;
	$: console.log(data.movies);

	function handleRedirect(id: Number) {
		setTimeout(() => goto(`/${id}`), 100);
	}
</script>

<section class="grid grid-cols-1 3xl:grid-cols-2 gap-6 w-full">
	<form class="col-span-full">
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
			<img
				src={'https://image.tmdb.org/t/p/w342/' + m.poster_path}
				alt="Plakat {m.title}"
				class="rounded-lg object-scale-down max-w-full max-h-full" />
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
</section>
