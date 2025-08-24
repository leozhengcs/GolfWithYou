<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onlineUsers } from '$lib/stores/users.svelte.js';

	let scrollContainer: HTMLElement;
	let isDown = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

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
	let unreadMap = $state<Record<string, boolean>>({});

	onMount(() => {
		otherUsers = users.filter((u) => u.id !== user?.id);

		const map: Record<string, boolean> = {};

		userChats?.forEach((chat) => {
			const otherUserId = chat.user1 === user?.id ? chat.user2 : chat.user1;

			const lastRead = chat.user1 === user?.id ? chat.user1LastRead : chat.user2LastRead;

			const hasUnread = lastRead !=null && lastRead != chat.lastMessage;

			map[otherUserId] = hasUnread;
		});

		unreadMap = map;

		// Remind users w/o avatar to upload one
		if (page.url.searchParams.get('avatar') == 'false') {
			toast.info('No User Avatar Image', {
				description: 'Please set an avatar photo in your profile.'
			});
		}

		console.log(map)
	});
</script>

<div class="relative flex flex-col gap-10">
	<div class="fixed top-20 left-5">
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div class="fixed top-40 right-10">
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div class="fixed top-80 right-96">
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<section class="flex flex-row justify-between">
		<h1 class="font-fugaz text-3xl text-yellow-400">Discover Other Users</h1>
	</section>
	<div
		class="z-10 flex w-full flex-row flex-wrap items-center justify-center gap-14 md:justify-between"
	>
		{#each otherUsers as otherUser}
			<UserCard
				user={otherUser}
				self={user!}
				{supabase}
				unread={unreadMap[otherUser.id] || false}
			/>
		{/each}
		<div class="hidden grow md:block"></div>
	</div>
</div>
