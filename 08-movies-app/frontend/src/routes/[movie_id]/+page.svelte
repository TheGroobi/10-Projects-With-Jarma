<script lang="ts">
	import RatingIcon from '$lib/icons/RatingIcon.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let movie = data?.movie;
	let images = data?.images;
	let cast = data?.cast;
</script>

<div class="flex flex-col gap-12 md:px-8 min-[500px]:px-4 px-2 -mt-12">
	<section class="items-center max-w-full flex">
		<img
			src={'https://image.tmdb.org/t/p/w780/' + movie.poster_path}
			alt="Plakat {movie.title}"
			class="object-scale-down max-h-[49.1875rem]" />
		<div class="flex flex-col p-5 bg-bg-main rounded-lg gap-1 min-[700px]:gap-5 h-full ml-20">
			<div class="flex justify-between">
				<h1
					class="text-text-white font-semibold min-[700px]:line-clamp-2 text-clampBigSmall min-[700px]:text-clampBig leading-[150%] tracking-[-0.01406rem] break-all 3xl:break-normal">
					{movie.title}
				</h1>
				<p
					class="font-normal min-[700px]:text-sm text-clampSmallSmall text-text-gray self-center">
					Rok Produkcji: {movie.release_date.slice(0, 4)}
				</p>
			</div>
			<div class="flex justify-between">
				<div class="flex gap-3">
					{#each movie.genres as tag}
						<p class="bg-bg-secondary px-2 py-1 rounded text-text-gray text-sm">
							{tag.name}
						</p>
					{/each}
				</div>
				<div class="flex items-center gap-3 flex-row-reverse">
					<RatingIcon />
					<p class="text-text-gray font-normal min-[700px]:text-sm text-clampSmall">
						{Math.round(movie.vote_average * 10) / 10} / 10
					</p>
				</div>
			</div>
			<p
				class="text-text-gray text-ellipsis min-[700px]:text-base text-clampMediumSmall overflow-hidden">
				{movie.overview}
			</p>
		</div>
	</section>
	<section class="grid grid-flow-col w-full gap-4">
		{#each images as i}
			<div class="rounded-lg">
				<img
					src={'https://image.tmdb.org/t/p/w780/' + i.file_path}
					alt="Zdjęcię {movie.title}"
					class="object-cover rounded-lg min-h-[16rem]" />
				</div>
				{/each}
			</section>
			<section class="flex flex-col gap-6">
				<h1 class="text-center text-text-white font-semibold tracking-[-0.009rem] text-2xl">
			Cast
		</h1>
		<div class="grid grid-cols-3 gap-[1.12rem]">
			{#each cast as c}
				<div class="flex bg-bg-main gap-4 items-center py-3 px-6 rounded-lg">
					<img
					src={'https://image.tmdb.org/t/p/w185/' + c.profile_path}
						alt={'Zdjęcię ' + c.name}
						class="rounded-full h-[6.25rem] aspect-square object-cover object-[100%_35%]" />
						<div class="flex flex-col gap-2">
							<h1 class="text-text-white font-semibold text-2xl">
								{c.name}
							</h1>
							<p class="text-text-gray font-base text-xl">{c.character}</p>
						</div>
				</div>
			{/each}
		</div>
	</section>
</div>
