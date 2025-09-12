<script lang="ts">
	let { 
		color = 'text-black', 
		height = 30, 
		width = 30, 
		onclick = null,
		onkeydown = null
	} = $props();
</script>

<button {onclick} {onkeydown} aria-label="Back" class="h-fit w-fit z-50 cursor-pointer">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		{width}
		{height}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		role="img"
		aria-label="Go back"
		class={`${color}`}
	>
		<path d="M15 18L9 12l6-6" />
	</svg>
</button>
