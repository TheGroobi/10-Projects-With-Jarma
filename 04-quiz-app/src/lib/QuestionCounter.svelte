<script lang="ts">
	let nCurrentQuestion: number = 6;
	let nAllQuestions: number = 12;
</script>

<div class="flex justify-between items-center sm:flex-row flex-col gap-2">
	<span class="text-slate-400 uppercase font-bold text-xs break-normal w-max"
		>Pytanie {nCurrentQuestion} Z {nAllQuestions}</span>
	<div class="h-1 w-60 bg-slate-200 rounded-lg relative">
		<div class="h-1 w-24 bg-teal-500 rounded-lg absolute left-0"></div>
	</div>
</div>
<!-- 
	tailwind class for teal-500 gradient based on the range of the timer
	reset after running out or after fetch with form submit
-->
