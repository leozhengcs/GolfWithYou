<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { chatMap, unreadMap } from '$lib/stores/globalStates.svelte.js';

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
		const alreadyExists = supabase
			.getChannels()
			.some((ch: { topic: string }) => ch.topic === `realtime:${channelName}`);

		if (alreadyExists) return;

		let chatChannel = supabase.channel(channelName, {
			config: {
				private: true,
				broadcast: { self: true }
			}
		});

		const otherUserId = chat.user1 === user?.id ? chat.user2 : chat.user1;
		const lastRead = chat.user1 === user?.id ? chat.user1LastRead : chat.user2LastRead;
		const hasUnread = lastRead != null && lastRead != chat.lastMessage;

		chatChannel.on('broadcast', { event: 'chat' }, async (payload) => {
			const chatWrite = await supabase.from('private_chats').select('*').eq('id', chat.id).single();
			const resData = chatWrite.data;

			console.log('response:\n', resData);

			const tempLastRead = resData.user1 === user?.id ? resData.user1LastRead : resData.user2LastRead;
			const tempUnread = tempLastRead != null && tempLastRead != resData.lastMessage;

			if(tempUnread){
				toast.error("New message!");
				unreadMap.update((current) => ({ ...current, [otherUserId]: tempUnread }));
			}
		});

		chatChannel.subscribe();

		unreadMap.update((current) => ({ ...current, [otherUserId]: hasUnread }));
		chatMap.update((current) => ({ ...current, [otherUserId]: chatChannel }));
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

			console.log('UnreadMap:\n', $unreadMap);
			console.log('chatMap:\n', $chatMap);

			if (page.url.searchParams.get('avatar') == 'false') {
				toast.info('No User Avatar Image', {
					description: 'Please set an avatar photo in your profile.'
				});
			}
		};

		init();
	});
</script>

<div
	class="relative flex flex-col gap-10"
>
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
	<div class="z-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each otherUsers as otherUser}
			<UserCard
				user={otherUser}
				self={user!}
				{supabase}
				unread={$unreadMap[otherUser.id] || false}
			/>
		{/each}
		<div class="hidden grow md:block"></div>
	</div>
</div>
