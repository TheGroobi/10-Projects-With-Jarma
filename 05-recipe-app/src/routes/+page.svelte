<script lang="ts">
	import Image from '$lib/assets/Image_placeholder.png';
	import IngredientTask from '$lib/IngredientTask.svelte';
	import CookingDirectionsTask from '$lib/CookingDirectionsTask.svelte';

	interface taskObj {
		id: number;
		text: string;
		completed: boolean;
	}

	let directionsArr: taskObj[] = [
		{
			id: 1,
			text: '1) Przygotuj składniki: Zbierz wszystkie składniki. Jajka wybij do miski.',
			completed: false
		},
		{
			id: 2,
			text: '2) Rozgrzej patelnię: Na średnim ogniu rozgrzej patelnię i dodaj masło lub olej. Poczekaj, aż masło się roztopi i zacznie lekko skwierczeć.',
			completed: false
		},
		{
			id: 3,
			text: '3) Mieszaj jajecznicę: Delikatnie mieszaj jajka drewnianą łyżką lub szpatułką, przesuwając je od krawędzi patelni do środka, pozwalając płynnym częściom jaj spłynąć na patelnię, aby się ścięły.',
			completed: false
		},
		{
			id: 4,
			text: '4) Podawaj natychmiast: Podawaj jajecznicę natychmiast po ściągnięciu z ognia, najlepiej z ulubionymi dodatkami, takimi jak świeże zioła, pomidory, ser lub pieczywo.',
			completed: false
		}
	];
	let ingredientsArr: taskObj[] = [
		{ id: 1, text: 'Ketchup', completed: false },
		{ id: 2, text: '2 Łyżki mleka', completed: false },
		{ id: 3, text: 'Mąka przenna', completed: false },
		{ id: 4, text: '2 Jaja', completed: false }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="bg-slate-950 grid place-items-center w-full min-h-svh">
	<main
		class="p-8 md:p-16 bg-bg-light flex flex-col gap-8 xl:max-w-7xl lg:max-w-5xl md:max-w-3xl mt-44"
	>
		<form action="" class="sm:gap-8 gap-4 flex flex-col sm:flex-row">
			<div class="flex relative xl:w-[72rem] lg:w-[60rem] md:w-[44rem]">
				<input
					type="text"
					class="w-full bg-bg-main rounded-lg px-4 py-2 font-medium outline-none text-text-main"
					placeholder="Wyszukaj przepisu"
				/>
				<svg
					class="absolute right-4 top-3 pointer-events-none"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8.24902 3C5.34953 3 2.99902 5.3505 2.99902 8.25C2.99902 11.1495 5.34953 13.5 8.24902 13.5C11.1485 13.5 13.499 11.1495 13.499 8.25C13.499 5.3505 11.1485 3 8.24902 3ZM1.49902 8.25C1.49902 4.52208 4.5211 1.5 8.24902 1.5C11.9769 1.5 14.999 4.52208 14.999 8.25C14.999 11.9779 11.9769 15 8.24902 15C4.5211 15 1.49902 11.9779 1.49902 8.25Z"
						fill="#F8FAFC"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M11.9936 11.9947C12.2865 11.7018 12.7614 11.7018 13.0543 11.9947L16.2793 15.2197C16.5721 15.5126 16.5721 15.9874 16.2793 16.2803C15.9864 16.5732 15.5115 16.5732 15.2186 16.2803L11.9936 13.0553C11.7007 12.7624 11.7007 12.2876 11.9936 11.9947Z"
						fill="#F8FAFC"
					/>
				</svg>
			</div>
			<a
				href="/"
				class="bg-orange-500 rounded-lg text-invert font-bold text-base px-8 py-2 text-center"
				>Powrót</a
			>
		</form>
		<section class="flex flex-col gap-4">
			<h1 class="text-text-main text-3xl tracking-[-0.01496rem] font-semibold">
				Title Placeholder
			</h1>
			<img src={Image} alt="Placeholder Alt Name" />
		</section>
		<section class="flex flex-col gap-6">
			<p class="px-2 py-1 text-yellow-100 bg-ingredients w-min rounded-lg">Składniki</p>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each ingredientsArr as ingredient}
					<IngredientTask {ingredient} />
				{/each}
			</div>
		</section>
		<section class="flex flex-col gap-4">
			<p class="px-2 py-1 text-sky-50 bg-directions rounded-lg w-max">Kroki przygotowania</p>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each directionsArr as direction}
					<CookingDirectionsTask ingredient={direction} />
				{/each}
			</div>
		</section>
		<footer>
			<p class="leading-7 font-normal text-lg text-text-secondary text-pretty">
				Pamiętaj, że kluczem do idealnej jajecznicy jest niska i wolna temperatura gotowania oraz
				ciągłe, delikatne mieszanie.
			</p>
		</footer>
	</main>
</div>
