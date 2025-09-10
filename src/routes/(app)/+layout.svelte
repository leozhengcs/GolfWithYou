<!-- +layout.svelte (Svelte 5 / runes) -->
<script lang="ts">
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
	import { navbarState } from '$lib/stores/navbarState.svelte';

	let { children, data } = $props();
	let { supabase } = $derived(data);
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

	let channel: ReturnType<typeof supabase.channel> | null = null;
	// let authUnsub: { subscription: { unsubscribe: () => void } } | null = null;

	function startPresence(userId: string) {
		// if (channel && channel.state !== 'closed') return;
		channel = supabase.channel('online-users', {
			config: { presence: { key: userId }, broadcast: { self: true } }
		});

		const refresh = () => {
			const state = channel!.presenceState() as Record<string, unknown[]>;
			onlineUsers.set(Object.keys(state));
			console.log('STATE', JSON.stringify(state, null, 2));
		};

		channel.on('presence', { event: 'sync' }, refresh);
		channel.on('presence', { event: 'join' }, (e) => {
			console.log('JOIN diff', e);
			refresh();
		});
		  channel.on('presence', { event: 'leave' }, (e) => {
			console.log("LEAVE diff: ", e);
			refresh();
		  });

		// channel.on('presence', { event: 'sync' }, () => {
		// 	const state = channel!.presenceState() as Record<string, unknown[]>;
		// 	onlineUsers.set(Object.keys(state));
		// });

		channel.subscribe(async (status) => {
			console.log('USER STATUS:', status);
			if (status === 'SUBSCRIBED') {
				await channel!.track({ online_at: new Date().toISOString() });
				// optimistic: show self immediately
				onlineUsers.update((ids) => (ids.includes(userId) ? ids : [...ids, userId]));
			}
		});
	}

	async function stopPresence() {
		try {
			await channel?.untrack();
		} catch {}
		try {
			await channel?.unsubscribe();
		} catch {}
		channel = null;
		onlineUsers.set([]);
	}

	onMount(() => {
		navbarState.show = true;
		// Sets the auth token for when you login
		(async () => {
			const {
				data: { session }
			} = await supabase.auth.getSession();
			if (session) await supabase.realtime.setAuth(session.access_token);
		})();

		if (!data.user) {
			toast.error('Error getting user, please log in again');
			return;
		}

		startPresence(data.user.id);

		// Go offline quickly on tab close/reload
		const cleanup = () => {
			stopPresence();
		};
		window.addEventListener('beforeunload', cleanup);

		return () => {
			window.removeEventListener('beforeunload', cleanup);
			stopPresence();
		};
	});
</script>

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
