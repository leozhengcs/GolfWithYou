<!-- +layout.svelte (Svelte 5 / runes) -->
<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { navigating, page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	// Page Loader Animations
	import LoaderDiscover from '$lib/components/loaders/LoaderDiscover.svelte';
	import LoaderProfile from '$lib/components/loaders/LoaderProfile.svelte';

	let { children, data } = $props();
	let { profile } = $derived(data);
	injectAnalytics();

	const pickLoader = (path: string) => {
		if (path.startsWith('/discover')) return LoaderDiscover;
		if (path.startsWith('/profile')) return LoaderProfile;
		return LoaderDiscover;
	};

	// Start by showing a loader on initial load, based on current page
	let show = $state(true);
	let Loader = $state<typeof LoaderDiscover>(pickLoader(page.url.pathname));

	const HIDE_DELAY_MS = 200;

	// Hide the initial loader after first navigation settle (initial hydration)
	afterNavigate(() => {
		const t = setTimeout(() => (show = false), HIDE_DELAY_MS);
		return () => clearTimeout(t);
	});

	// Show/hide during client-side navigations
	$effect(() => {
		if (navigating.to) {
			// NEW nav in progress → pick loader by destination path
			Loader = pickLoader(navigating.to.url.pathname); // note: .pathname, no .url
			show = true;
		} else {
			// nav finished → hide after a tiny delay (prevents flicker)
			const t = setTimeout(() => (show = false), HIDE_DELAY_MS);
			return () => clearTimeout(t);
		}
	});
</script>

<Navbar {profile} />

<div class="relative flex min-h-screen flex-col overflow-x-clip p-10 xl:p-30 pt-32 bg-sky-background">
	{#if show}
		<Loader />
	{:else}
		{@render children()}
	{/if}
</div>

<Footer />
