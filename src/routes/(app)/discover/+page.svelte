<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onDestroy, onMount, tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { chatMap, openedModal, unreadMap } from '$lib/stores/globalStates.svelte.js';
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
	let filteredUsers: PublicUserProfile[] = $state([]);
	$inspect(filteredUsers);
	let loading = $state(true);
	let filter = $state('');

	const searchUsers = (event: SubmitEvent) => {
		event.preventDefault();
		const normalized = filter.trim().toLowerCase();
		if (!filter) filteredUsers = otherUsers;

		filteredUsers = otherUsers.filter((user) => user.full_name.toLowerCase().includes(normalized));
	};

	onMount(async () => {
		otherUsers = users.filter((u) => u.id !== user?.id);
		filteredUsers = otherUsers;

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
		<form class="mb-5 max-w-md md:mb-10" onsubmit={searchUsers}>
			<label
				for="default-search"
				class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label
			>
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<svg
						class="h-4 w-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					bind:value={filter}
					type="search"
					id="default-search"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Search Users"
				/>
				<button
					type="submit"
					class="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Search</button
				>
			</div>
		</form>

		<div
			class="z-[60] grid w-full grid-cols-1 place-items-center gap-10 pb-20 sm:grid-cols-2 md:grid-cols-3 md:pb-32 lg:grid-cols-4"
			in:fade={{ duration: 1000 }}
		>
			{#each filteredUsers as otherUser}
				<UserCard user={otherUser} self={user!} {supabase} unread={$unreadMap[otherUser.id]} />
			{/each}
		</div>
	{/if}
</div>
