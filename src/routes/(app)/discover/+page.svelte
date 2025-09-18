<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onDestroy, onMount, tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { chatMap, openedModal, unreadMap } from '$lib/stores/globalStates.svelte.js';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import LoaderDiscover from '$lib/components/loaders/LoaderDiscover.svelte';

	let { data } = $props();
	let {
		user,
		users,
		supabase,
		userChats
	}: {
		user: UserProfile | null;
		users: PublicUserProfile[];
		supabase: SupabaseClient;
		userChats?: any[] | null | undefined;
	} = $derived(data);

	let otherUsers: PublicUserProfile[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		otherUsers = users.filter((u) => u.id !== user?.id);

		const { data } = await supabase.auth.getSession();
		const session = data.session;

		if (!session) {
			toast.error('Error getting user session, please re-login and try again.');
			return;
		}

		await supabase.realtime.setAuth(session.access_token);

		if (page.url.searchParams.get('avatar') == 'false') {
			toast.info('No User Avatar Image', {
				description: 'Please set an avatar photo in your profile.'
			});
		}

		loading = false;
	});
</script>

<div class="relative top-12 mb-[-7%] flex flex-col">
	{#if loading}
		<LoaderDiscover />
	{:else}
		<div
			class="z-[60] grid w-full grid-cols-1 place-items-center gap-10 pb-20 sm:grid-cols-2 md:grid-cols-3 md:pb-32 lg:grid-cols-4"
			in:fade={{ duration: 1000 }}
		>
			{#each otherUsers as otherUser}
				<UserCard user={otherUser} self={user!} {supabase} unread={$unreadMap[otherUser.id]} />
			{/each}
		</div>
	{/if}
</div>
