<!-- +layout.svelte (Svelte 5 / runes) -->
<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { navigating, page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onlineUsers } from '$lib/stores/users.svelte.js';

	// Page Loader Animations
	import LoaderDiscover from '$lib/components/loaders/LoaderDiscover.svelte';
	import LoaderProfile from '$lib/components/loaders/LoaderProfile.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { children, data } = $props();
	let { profile, supabase } = $derived(data);
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

	onMount(() => {
		if (!data.user) {
			toast.error('Error getting user, please try logging in again');
			return;
		}

		// Setting up user presence
		const channel = supabase.channel('online-users', { config: { presence: { key: data.user.id } } });
		channel
			.on('presence', { event: 'sync' }, () => {
				const state = channel.presenceState();
				console.log('Current online users:', state);
			})
			.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					await channel.track({ online_at: new Date().toISOString(), user_id: data.user!.id });
				}
			});
	});
</script>

<Navbar {profile} />

<div
	class="bg-sky-background relative flex min-h-screen flex-col overflow-x-clip p-10 pt-32 xl:p-30"
>
	{#if show}
		<Loader />
	{:else}
		{@render children()}
	{/if}
</div>

<Footer />
