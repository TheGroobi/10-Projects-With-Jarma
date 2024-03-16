<script lang="ts">
	//@ts-nocheck
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js.js";

	type $$Props = SwitchPrimitive.Props;
	type $$Events = SwitchPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = undefined;
	export { className as class };
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		"peer inline-flex h-10 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand data-[state=unchecked]:bg-bg-main",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<SwitchPrimitive.Thumb
		class={cn(
			"pointer-events-none block h-7 w-7 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.850rem] data-[state=unchecked]:translate-x-1"
		)}
	/>
</SwitchPrimitive.Root>
