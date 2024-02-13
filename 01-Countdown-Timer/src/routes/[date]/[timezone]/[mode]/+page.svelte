<script lang="ts" type="module">
	import { modeStore } from '$lib/store.js';
</script>

<div class="wrapper">
	<h1>Pozostały czas</h1>
    <p>{$modeStore}</p>
	<div class="timer-container">
		{#if $modeStore === "days"}
			<div class="days">
				<span>Dni</span>
				<p>15</p>
			</div>
		{:else if $modeStore === "days-hours"}
			<div class="days">
				<span>Dni</span>
				<p>15</p>
			</div>
			<div class="hours">
				<span>Godzina</span>
				<p>15</p>
			</div>
			<div class="minutes">
				<span>Minuty</span>
				<p>15</p>
			</div>
			<div class="seconds">
				<span>Sekundy</span>
				<p>15</p>
			</div>
		{:else}
			<div class="weeks">
				<span>Tydzień</span>
				<p>15</p>
			</div>
			<div class="days">
				<span>Dni</span>
				<p>15</p>
			</div>
			<div class="hours">
				<span>Godzina</span>
				<p>15</p>
			</div>
			<div class="minutes">
				<span>Minuty</span>
				<p>15</p>
			</div>
			<div class="seconds">
				<span>Sekundy</span>
				<p>15</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		h1 {
			color: var(--text);
			font-size: 20px;
			text-align: left;
			font-weight: 600;
		}
	}
</style>
