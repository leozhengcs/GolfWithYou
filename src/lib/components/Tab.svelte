<!-- Tab.svelte -->
<script>
    let { active = false, label = '' } = $props();
</script>

<div class="relative w-32 h-10">
	<svg
		viewBox="0 0 100 40"
		preserveAspectRatio="none"
		class="absolute top-0 left-0 w-full h-full"
	>
		<path
			d="M 0 0 Q 5 0 10 10 L 90 10 Q 95 0 100 0 L 100 40 L 0 40 Z"
			fill={active ? '#ffffff' : '#d1d5db'}
		/>
	</svg>
	<div class="absolute inset-0 flex items-center justify-center font-semibold text-sm text-gray-800">
		{label}
	</div>
</div>