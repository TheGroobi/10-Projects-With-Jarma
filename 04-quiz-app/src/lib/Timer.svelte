<script lang="ts">
	export let sCountdownTimer: string;
</script>

<div
	class="flex items-center gap-3 px-4 py-2 border-stroke border rounded-3xl w-full bg-white">
	<svg
		class="h-4 aspect-square"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_4201_1723)">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8 2.00001C4.68629 2.00001 2 4.6863 2 8.00001C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8.00001C14 4.6863 11.3137 2.00001 8 2.00001ZM0.666666 8.00001C0.666666 3.94992 3.94991 0.666672 8 0.666672C12.0501 0.666672 15.3333 3.94992 15.3333 8.00001C15.3333 12.0501 12.0501 15.3333 8 15.3333C3.94991 15.3333 0.666666 12.0501 0.666666 8.00001Z"
				fill="#0EA5E9"></path>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8 3.33333C8.36819 3.33333 8.66667 3.63181 8.66667 3.99999V7.58797L10.9648 8.73704C11.2941 8.9017 11.4276 9.30215 11.263 9.63147C11.0983 9.96079 10.6978 10.0943 10.3685 9.92961L7.70186 8.59628C7.476 8.48335 7.33333 8.25251 7.33333 8V3.99999C7.33333 3.63181 7.63181 3.33333 8 3.33333Z"
				fill="#0EA5E9"></path>
		</g>
		<defs>
			<clipPath id="clip0_4201_1723">
				<rect width="16" height="16" fill="white"></rect>
			</clipPath>
		</defs>
	</svg>
	<span class="text-text font-bold uppercase text-xs"
		>Pozostały czas:
		<span class="text-sky-500">{sCountdownTimer}</span>
	</span>
</div>
