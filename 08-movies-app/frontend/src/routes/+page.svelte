<script lang="ts">
	export let data;
	$: movies = data.movies;
	$: console.log(movies.results);
</script>

<h1>{data}</h1>
