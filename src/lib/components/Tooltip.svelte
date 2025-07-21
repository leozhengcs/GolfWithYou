<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Spring } from 'svelte/motion';

	let { text, children = null } = $props();

	let tooltipEl: HTMLElement | null = $state(null);
	let visible = $state(false);
	let coords = new Spring({ x: 0, y: 0 });

    let timer: ReturnType<typeof setTimeout>;

	function handleMouseMove(event: MouseEvent) {
		if (!tooltipEl) return;

		const tooltipRect = tooltipEl.getBoundingClientRect();
		const padding = 10; // space between tooltip and window edge

		let x = event.clientX + 25;
		let y = event.clientY + 25;

		// Adjust if tooltip would overflow to the right
		if (x + tooltipRect.width + padding > window.innerWidth) {
			x = window.innerWidth - tooltipRect.width - padding;
		}

		// Adjust if tooltip would overflow to the bottom
		if (y + tooltipRect.height + padding > window.innerHeight) {
			y = window.innerHeight - tooltipRect.height - padding;
		}

		coords.target = { x, y };
	}

	function handleMouseEnter(event: MouseEvent) {
		coords.set({ x: event.clientX + 25, y: event.clientY + 25 }, { instant: true });
        timer = setTimeout(() => {
            visible = true;
        }, 1000);
		window.addEventListener('mousemove', handleMouseMove);
	}

	function handleMouseLeave() {
        clearTimeout(timer);
		visible = false;
		window.removeEventListener('mousemove', handleMouseMove);
	}

	onMount(() => {
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div
	role="presentation"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="inline-block w-fit cursor-default"
>
	{@render children?.()}
	{#if visible}
		<div
			bind:this={tooltipEl}
			class="text-white pointer-events-none fixed z-50 rounded bg-gray-800 px-2 py-1 text-sm shadow transition-opacity duration-100"
			style="left: {coords.current.x}px; top: {coords.current.y}px;"
		>
			{text}
		</div>
	{/if}
</div>
