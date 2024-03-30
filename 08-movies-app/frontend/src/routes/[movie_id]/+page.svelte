<script lang="ts">
	import RatingIcon from '$lib/icons/RatingIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import ReturnIcon from '$lib/icons/ReturnIcon.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
	export let form: any;

	let movie = data.movie;
	let images = data.images;
	let cast = data.cast;

	$: if (form?.link) {
		window.open(form?.link);
	}
</script>

<div class="flex flex-col gap-12 md:-mt-12 relative">
	<div class="absolute group right-4 -top-4">
		<button
			class="w-10 h-10 absolute z-10 rounded-full bg-bg-main self-end group-hover:bg-slate-900 flex justify-center items-center transition-all border-2 border-slate-900"
			on:click={() => goto('/')}>
			<ReturnIcon />
		</button>
	</div>
	<section class="items-center max-w-full flex lg:flex-row flex-col lg:gap-0 gap-4">
		{#if !movie.poster_path}
			<div class="w-full">
				<div class="relative">
					<h1
						class="text-text-white font-semibold bg-bg-main px-12 py-8 pb-24 rounded-lg text-center">
						Plakat niedostępny dla tego filmu
					</h1>
					<form method="POST" use:enhance class="group">
						<button
							type="submit"
							class="lg:px-8 py-2 rounded-lg text-sm lg:text-base text-text-white font-bold z-10 left-1/2 bottom-10 items-center absolute bg-bg-secondary w-max -translate-x-1/2 flex gap-4 group-hover:text-text-gray group-hover:bg-slate-800 transition-all px-4">
							<PlayIcon />
							Zobacz Zwiastun</button>
					</form>
				</div>
				{#if form?.error}
					<p class="text-center text-red-500 mt-4">{form?.error}</p>
				{/if}
			</div>
		{:else}
			<div>
				<div class="relative">
					<img
						src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}
						alt="Plakat {movie.title}"
						class="w-full object-cover" />
					<form method="POST" use:enhance class="group flex justify-center">
						<button
							type="submit"
							class="lg:px-8 py-2 rounded-lg text-sm lg:text-base text-text-white font-bold z-10 bottom-6 left-1/2 right-1/2 items-center absolute bg-bg-secondary w-max -translate-x-1/2 flex gap-4 group-hover:text-text-gray group-hover:bg-slate-800 transition-all px-4">
							<PlayIcon />
							Zobacz Zwiastun</button>
					</form>
				</div>
				{#if form?.error}
					<p class="text-center text-red-500 mt-4">{form?.error}</p>
				{/if}
			</div>
		{/if}
		<div
			class="flex flex-col p-5 bg-bg-main rounded-lg gap-1 min-[700px]:gap-5 h-full lg:ml-20 lg:max-w-[40vw]">
			<div class="flex justify-between xl:flex-row flex-col">
				<h1
					class="text-text-white text-pretty font-semibold min-[700px]:line-clamp-2 text-clampBigSmall min-[700px]:text-clampBig leading-[150%] tracking-[-0.01406rem] 3xl:break-normal">
					{movie.title}
				</h1>
				<p
					class="font-normal min-[700px]:text-sm text-clampSmallSmall text-text-gray xl:self-center">
					Rok Produkcji: {movie.release_date.slice(0, 4)}
				</p>
			</div>
			<div class="flex justify-between flex-col lg:flex-row lg:gap-0 gap-4">
				<div class="flex gap-3 flex-wrap">
					{#each movie.genres as tag}
						<p
							class="bg-bg-secondary px-2 py-1 rounded text-text-gray text-clampOverview lg:text-sm">
							{tag.name}
						</p>
					{/each}
				</div>
				<div class="flex items-center lg:mr-0 mr-auto gap-3 lg:flex-row-reverse">
					<RatingIcon />
					<p class="text-text-gray font-normal min-[700px]:text-sm text-clampSmall">
						{Math.round(movie.vote_average * 10) / 10} / 10
					</p>
				</div>
			</div>
			<p
				class="text-text-gray text-ellipsis xl:text-base text-clampMediumSmall overflow-hidden">
				{movie.overview}
			</p>
			<p
				class="text-text-gray text-ellipsis xl:text-base text-clampMediumSmall overflow-hidden">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper,
				magna ut fringilla aliquam, purus libero tempor elit, eget tristique arcu ligula non
				mauris. Integer id libero auctor, consectetur justo vitae, scelerisque eros. Nulla
				at mauris et tortor aliquam ultricies. Fusce nec nunc nec nisi lobortis feugiat. Sed
				nec tortor fermentum, viverra magna eget, congue odio. Nam vel enim non ante
				facilisis bibendum eget vel sapien. Sed malesuada fermentum metus vel interdum.
				Pellentesque vitae commodo justo. Etiam aliquam orci sed sapien volutpat, non
				venenatis nisi cursus. Fusce convallis orci vel sem volutpat, ac convallis lorem
				mollis.
			</p>
		</div>
	</section>
	<section class="grid lg:grid-rows-1 grid-rows-2 grid-flow-col w-full gap-4">
		{#each images as i}
			<div class="rounded-lg">
				<img
					src={'https://image.tmdb.org/t/p/w780/' + i.file_path}
					alt="Zdjęcię {movie.title}"
					class="object-cover rounded-lg min-h-[12rem] xl:min-h-[16rem]" />
			</div>
		{/each}
	</section>
	<section class="flex flex-col gap-6">
		<h1 class="text-center text-text-white font-semibold tracking-[-0.009rem] text-2xl">
			Cast
		</h1>
		<div class="grid md:grid-cols-2 min-[1050px]:grid-cols-3 gap-[1.12rem]">
			{#each cast as c}
				<div class="flex bg-bg-main gap-4 items-center py-3 px-6 rounded-lg">
					<img
						src={'https://image.tmdb.org/t/p/w185/' + c.profile_path}
						alt={'Zdjęcię ' + c.name}
						class="rounded-full h-[4.25rem] xl:h-[6.25rem] aspect-square object-cover object-[100%_35%]" />
					<div class="flex flex-col gap-2">
						<h1 class="text-text-white font-semibold text-clampActor">
							{c.name}
						</h1>
						<p class="text-text-gray font-base text-clampChar">{c.character}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
