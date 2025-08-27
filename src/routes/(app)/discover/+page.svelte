<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onDestroy, onMount, tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { chatMap, openedModal, unreadMap } from '$lib/stores/globalStates.svelte.js';
	import { get } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import { backOut, bounceOut, cubicOut } from 'svelte/easing';

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

	async function createChatChannel(chat: any) {
		const channelName = 'private_chat_' + chat.id;
		const otherUserId = chat.user1 === user?.id ? chat.user2 : chat.user1;

		let chatChannel = supabase.channel(channelName, {
			config: {
				private: true,
				broadcast: { self: true }
			}
		});

		if (
			(user?.id == chat.user1 && chat.user1LastRead != chat.lastMessage) ||
			(user?.id == chat.user2 && chat.user2LastRead != chat.lastMessage)
		) {
			unreadMap.update((m) => ({
				...m,
				[otherUserId]: true
			}));
		}

		chatMap.update((m) => ({
			...m,
			[otherUserId]: {
				chatChannel,
				status: 'pending',
				lastMessageId: null,
				lastSenderId: null,
				unread: false,
				updatedAt: Date.now()
			}
		}));

		chatChannel.on('broadcast', { event: 'chat' }, ({ payload: { message_id, sender_id } }) => {
			// Get own last read
			const lastRead = get(chatMap)[chat.id] ?? null;
			const hasUnread = sender_id !== user!.id && message_id != null && lastRead !== message_id;

			chatMap.update((m) => ({
				...m,
				[otherUserId]: {
					...m[otherUserId]!,
					lastMessageId: message_id ?? null,
					lastSenderId: sender_id ?? null,
					unread: hasUnread,
					updatedAt: Date.now()
				}
			}));
			if (chat.id != $openedModal) {
				toast.info('New message!');
				// unreadMap.update((current) => ({ ...current, [otherUserId]: tempUnread }));
				chatMap.update((current) => ({ ...current, [otherUserId]: chatChannel }));
				unreadMap.update((current) => ({ ...current, [otherUserId]: hasUnread }));
			}
		});

		chatChannel.subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				chatMap.update((m) => ({
					...m,
					[otherUserId]: { ...m[otherUserId]!, status: 'subscribed', updatedAt: Date.now() }
				}));
			}
		});
	}

	onMount(() => {
		const init = async () => {
			otherUsers = users.filter((u) => u.id !== user?.id);

			const { data } = await supabase.auth.getSession();
			const session = data.session;

			if (!session) {
				toast.error('Error getting user session, please re-login and try again.');
				return;
			}

			await supabase.realtime.setAuth(session.access_token);

			userChats?.forEach((chat) => {
				createChatChannel(chat);
			});

			if (page.url.searchParams.get('avatar') == 'false') {
				toast.info('No User Avatar Image', {
					description: 'Please set an avatar photo in your profile.'
				});
			}
		};

		init();

		return () => {
			userChats?.forEach((chat) => {
				const topic = `realtime:private_chat_${chat.id}`;
				// find exactly the chat channel
				const ch = supabase
					.getChannels()
					.find((c: { topic: string }) => c.topic === `realtime:${topic}` || c.topic === topic);
				ch?.untrack?.();
				ch?.unsubscribe();
			});
		};
	});

	// onDestroy(() => {

	// });
</script>

<div class="relative flex flex-col top-12 mb-[-7%]">
	<div class="fixed top-[-10%] left-[60%]" in:fly={{ x: 550, duration: 1500, easing: (t) => cubicOut(t) }}>
		<img src="/images/cloud.png" class="z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div class="fixed top-[10%] left-[-20%]" in:fly={{ x: -600, duration: 1500, easing: (t) => cubicOut(t) }}>
		<img src="/images/cloud.png" class="z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div
		class="fixed top-[25%] left-[30%]"
		in:fly={{ x: 800, duration: 1500, easing: (t) => cubicOut(t) }}
	>
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div
		class="fixed top-[50%] left-[50%]"
		in:fly={{ x: 650, duration: 1500, easing: (t) => cubicOut(t) }}
	>
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<div
		class="fixed top-[60%] left-[0%]"
		in:fly={{ x: -800, duration: 1500, easing: (t) => cubicOut(t) }}
	>
		<img src="/images/cloud.png" class="-z-10 max-w-[800px] opacity-40" alt="" />
	</div>
	<!-- <section class="flex flex-row justify-between">
		<h1 class="font-fugaz text-3xl text-yellow-400">Discover Other Users</h1>
	</section> -->
	<div class="z-20 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" in:fade={{ delay: 1500, duration: 1000 }}>
		{#each otherUsers as otherUser}
			<UserCard user={otherUser} self={user!} {supabase} unread={$unreadMap[otherUser.id]} />
		{/each}
		<div class="hidden grow md:block"></div>
	</div>
</div>
