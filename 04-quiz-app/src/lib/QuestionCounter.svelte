<script lang="ts">
	let currentQuestion: number = 6;
	let allQuestions: number = 12;
</script>

<div class="flex justify-between items-center">
	<span class="text-slate-400 uppercase font-bold text-xs"
		>Pytanie {currentQuestion} Z {allQuestions}</span>
	<div class="h-1 w-60 bg-slate-200 rounded-lg relative">
		<div class="h-1 w-24 bg-teal-500 rounded-lg absolute left-0"></div>
	</div>
</div>
