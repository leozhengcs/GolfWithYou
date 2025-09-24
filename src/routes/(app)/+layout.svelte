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
	import { onDestroy, onMount, tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { navbarState } from '$lib/stores/navbarState.svelte';
	import { subscribeToMailbox } from '$lib/mailbox';
	import { unread, notifications } from '$lib/stores/globalStates.svelte';
	import type { UserProfile } from '$lib/types/Database';
	import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
	import type { Notification } from '$lib/types/Chat';

	let {
		children,
		data
	}: {
		children: any;
		data: { profile: UserProfile; supabase: SupabaseClient; user: User; session: Session };
	} = $props();
	let { supabase } = $derived(data);
	injectAnalytics();

	const pickLoader = (path: string) => {
		if (path.startsWith('/discover')) return LoaderDiscover;
		if (path.startsWith('/profile')) return LoaderProfile;
		return LoaderDiscover;
	};

	// Start by showing a loader on initial load, based on current page
	let show = $state(false);
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
			Loader = pickLoader(navigating.to.url.pathname); // note: .pathname, no .url
			show = true;
		} else {
			// nav finished → hide after a tiny delay (prevents flicker)
			const t = setTimeout(() => (show = false), HIDE_DELAY_MS);
			return () => clearTimeout(t);
		}
	});

	let channel: ReturnType<typeof supabase.channel> | null = null;
	let stopMail = () => {};

	function startPresence(userId: string, name: string, avatar: string) {
		// if (channel && channel.state !== 'closed') return;
		if (channel && channel.state === 'joined') return;

		channel = supabase.channel('online-users', {
			config: { presence: { key: userId }, broadcast: { self: true } }
		});

		const refresh = () => {
			const state = channel!.presenceState() as Record<string, Notification[]>;
			onlineUsers.set(Object.keys(state));
		};

		channel.on('presence', { event: 'sync' }, refresh);
		channel.on('presence', { event: 'join' }, (e) => {
			refresh();
		});
		channel.on('presence', { event: 'leave' }, (e) => {
			refresh();
		});

		channel.subscribe(async (status) => {
			// console.log('USER STATUS:', status);
			if (status === 'SUBSCRIBED') {
				await channel!.track({ id: userId, name, avatar, online_at: new Date().toISOString() });
				// optimistic: show self immediately
				onlineUsers.update((id) => (id.includes(userId) ? id : [...id, userId, name, avatar]));
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

	onMount(async () => {
		await tick();
		navbarState.show = true;
		// Sets the auth token for when you login
		const {
			data: { session }
		} = await supabase.auth.getSession();

		if (!session) {
			console.error('No session please login again');
			toast.error('No session, please login again.');
			return;
		}

		await supabase.realtime.setAuth(session.access_token);

		stopMail = subscribeToMailbox(session?.user.id, supabase, (row) => {
			notifications.update((existing) => [row, ...existing]);
			unread.update((num) => num + 1);
			// console.log('Update row: ', row);
			toast.info(`You have a new notification from: ${row.from_name}`);
		});

		if (!data.user) {
			toast.error('Error getting user, please log in again');
			return;
		}

		startPresence(data.user.id, data.profile.full_name, data.profile.avatar_url);
	});

	onDestroy(() => {
		stopPresence();
		stopMail();
	});
</script>

<div class="relative flex min-h-screen flex-col overflow-x-clip bg-[#CAD2C5] p-10 pt-32 xl:p-30">
	{#if show}
		<Loader />
	{:else}
		{@render children()}
	{/if}
</div>

<Footer />
