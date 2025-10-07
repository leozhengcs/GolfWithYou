<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { clubs } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { fade, fly } from 'svelte/transition';
	import { notifications } from '$lib/stores/globalStates.svelte.js';
	import LoaderDiscover from '$lib/components/loaders/LoaderDiscover.svelte';

	let { data } = $props();
	let {
		user,
		users,
		supabase
	}: {
		user: UserProfile | null;
		users: PublicUserProfile[];
		supabase: SupabaseClient;
	} = $derived(data);

	let otherUsers: PublicUserProfile[] = $state([]);
	let filteredUsers: PublicUserProfile[] = $state([]);

	let loading = $state(true);

	let search = $state('');
	let searchTimer: NodeJS.Timeout | undefined;

	let filterClubs = $state<string[]>([]);

	let indexMap: Map<string, number> | undefined = $state();
	const notifiedIds = $derived(new Set($notifications.map((n) => n.from_user_id)));

	let sortedOtherUsers = $derived([
		...otherUsers.filter((u) => notifiedIds.has(u.id)),
		...otherUsers.filter((u) => !notifiedIds.has(u.id))
	]);

	const searchUsers = (event: SubmitEvent | null = null) => {
		if (event) {
			event.preventDefault();
		}
		const normalized = search.trim().toLowerCase();
		if (!search) filteredUsers = sortedOtherUsers;

		if (filterClubs.length > 0) {
			filteredUsers = filteredUsers.filter((user) =>
				user.full_name.toLowerCase().includes(normalized)
			);
		} else {
			filteredUsers = sortedOtherUsers.filter((user) =>
				user.full_name.toLowerCase().includes(normalized)
			);
		}
	};

	const handleFilterInput = () => {
		clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			searchUsers();
		}, 500);
	};

	$effect(() => {
		if (filterClubs.length > 0) {
			filteredUsers = sortedOtherUsers.filter((user) =>
				filterClubs.includes(user.club_name.toLowerCase())
			);
		} else if (filterClubs.length == 0) {
			filteredUsers = sortedOtherUsers;
		}

		indexMap = new Map(otherUsers.map((u, i) => [u.id, i]));
	});

	onMount(async () => {
		// Check if the latest messages are up to date
		const { data: chats } = await supabase
			.from('private_chats')
			.select('*')
			.or(`user1.eq.${user?.id},user2.eq.${user?.id}`);

		chats?.forEach(async (chat) => {
			if (user?.id == chat.user1 && chat.user1LastRead != chat.lastMessage) {
				const { data } = await supabase
					.from('public_user_profile')
					.select('*')
					.eq('id', chat.user2)
					.single();
				notifications.update((existing) => [
					...existing,
					{
						from_user_id: chat.user2,
						avatar: data?.avatar_url ?? '',
						id: data?.id ?? '',
						name: data?.full_name ?? ''
					}
				]);
			} else if (user?.id == chat.user2 && chat.user2LastRead != chat.lastMessage) {
				const { data } = await supabase
					.from('public_user_profile')
					.select('*')
					.eq('id', chat.user1)
					.single();
				notifications.update((existing) => [
					...existing,
					{
						from_user_id: chat.user1,
						avatar: data?.avatar_url ?? '',
						id: data?.id ?? '',
						name: data?.name ?? ''
					}
				]);
			}
		});

		otherUsers = users.filter((u) => u.id !== user?.id);
		filteredUsers = sortedOtherUsers;

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

	onDestroy(() => {
		clearTimeout(searchTimer);
	});
</script>

<div class="relative flex flex-col md:top-12">
	<svg
		class="fixed inset-0 h-screen w-screen"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 550 420"
		preserveAspectRatio="none"
	>
		<path
			in:fly={{ duration: 300, y: 100 }}
			class="fill-[#A7BEA9]"
			d="M0 200 20 180 60 166 90 170 120 190 130 195 180 200 230 190 265 220 290 210 310 200 340 180 360 175 380 175 400 180 420 178 450 185 500 185 550 200 550 420 0 420Z"
		/>
		<path
			in:fly={{ duration: 300, y: 100, delay: 100 }}
			class="fill-[#84A98C]"
			d="M0 240 30 240 100 260 160 255 250 240 330 230 450 240 500 235 530 230 550 230 550 420 0 420Z"
		/>
		<path
			in:fly={{ duration: 300, y: 100, delay: 200 }}
			class="fill-[#52796F]"
			d="M0 325 75 310 150 302 250 310 300 318 410 310 470 302 550 300 550 420 0 420Z"
		/>
		<path
			in:fly={{ duration: 300, y: 100, delay: 300 }}
			class="fill-[#354F52]"
			d="M0 380 40 370 100 371 130 365 180 350 280 338 350 340 410 335 430 335 500 340 550 342 550 420 0 420Z"
		/>
	</svg>

	{#if loading}
		<LoaderDiscover />
	{:else}
		<div class="z-50 mb-10 w-full">
			<form class="mb-5 w-full sm:max-w-md md:mb-10" onsubmit={searchUsers}>
				<label for="default-search" class="sr-only mb-2 text-sm font-medium text-gray-900"
					>Search</label
				>
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
						<svg
							class="h-4 w-4 text-gray-500"
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
						bind:value={search}
						type="search"
						id="default-search"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-[#84A98C] focus:ring-[#84A98C]"
						placeholder="Search Users"
						oninput={handleFilterInput}
					/>
				</div>
			</form>
			<Dropdown
				searchLabel="Search Club"
				options={clubs}
				label="Filter Clubs"
				bind:selectedClubs={filterClubs}
			/>
		</div>

		<div
			class="z-50 grid w-full grid-cols-1 place-items-center gap-10 pb-20 sm:grid-cols-2 md:grid-cols-3 md:pb-32 lg:grid-cols-4"
			in:fade={{ duration: 1000 }}
		>
			{#each filteredUsers as otherUser (otherUser.id)}
				<UserCard
					user={otherUser}
					self={user!}
					{supabase}
					unread={$notifications.some((notification) => notification.from_user_id === otherUser.id)}
				/>
			{/each}
		</div>
	{/if}
</div>
