<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { toast } from 'svelte-sonner';
	import type { Message } from '$lib/types/Chat';

	let {
		id, //id of opened user modal
		gender,
		other_gender,
		postal_code,
		verified,
		golf_id,
		name,
		handicap_index,
		member,
		src,
		closeModal,
		bio,
		images,
		self //id of logged in user
	} = $props();

	let messages: Message[] = $state([]);
	let newMessage = $state('');
	let chatId = $state('');
	let channel;
	let isFriend = $state(false);
	let hasSentMessage = $state(false);
	let inputRef: HTMLInputElement; // For keeping the text box focused
	let bottomRef: HTMLElement; // For scrolling the message chat down after sending a message

	async function getOrCreateChat() {
		const response = await fetch('/api/chats', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ otherUserId: id })
		});

		const res = await response.json();

		if (response.ok) {
			chatId = res.chatId;
		} else {
			console.error('Failed to create chat:', res.error);
		}
	}

	async function loadMessages() {
		const res = await fetch(`/api/message?chatId=${chatId}`);
		const data = await res.json();
		if (res.ok) {
			messages = data;
		} else {
			console.error('Load error:', data.error);
		}
		await tick(); // Waits for the bottom of the chat anchor element to load.
		bottomRef.scrollIntoView({ behavior: 'smooth' });
	}

	async function sendMessage(event: SubmitEvent) {
		event.preventDefault();

		const m = newMessage.trim();
		if (m === '') return;

		newMessage = '';
		const res = await fetch('/api/message', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat_id: chatId, content: m })
		});

		const data = await res.json();

		if (!res.ok) {
			console.error('Send error:', data.error);
		}

		// if (!isFriend) {
		//     hasSentMessage = true;
		//     // Send friend request
		//     const res = await fetch('/api/add_friend', {
		//         method: "POST",
		//         headers: {
		//             'Content-Type': 'application/json'
		//         },
		//         body: JSON.stringify({ receiver_id: id, text: m })
		//     })

		//     const data = await res.json();

		//     if (!res.ok) {
		//         toast.error(data.error);
		//         return;
		//     }

		//     toast.success(data.data);
		// }

		await loadMessages();
		await tick();
		inputRef.focus();
	}

	async function handleVouch() {
		try {
			const res = await fetch('/api/vouch_user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ self, id })
			});
		} catch (error) {
			console.log(error);
			return;
		}
		verified=true;
	}

	onMount(async () => {
		try {
			// isFriend = self.friends && self.friends.includes(id);

			await getOrCreateChat();
			await loadMessages();

			// Checks if you have aleady sent a message to a non-friend
			if (!isFriend) {
				hasSentMessage = messages.some((msg) => msg.sender_id === self.id);
			}

			const channelName = 'private_chat_' + chatId;
			const alreadyExists = supabase
				.getChannels()
				.some((ch) => ch.topic === `realtime:${channelName}`);

			if (!alreadyExists) {
				channel = supabase.channel(channelName).on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'messages',
						filter: `chat_id=eq.${chatId}`
					},
					(payload) => {
						messages = [...messages, payload.new as Message];
					}
				);

				channel.subscribe();
			}
		} catch (err: any) {
			console.error('onMount error:', err.message || err);
		}
	});
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Close Modal"
	onclick={closeModal}
	onkeydown={(e) => (e.key === 'Esc' ? closeModal() : null)}
	transition:fade={{ duration: 300 }}
	class="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-gray-500/50"
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="grid h-[80%] w-[80%] grid-cols-2 rounded-lg bg-white p-6"
		onclick={(e) => {
			e.stopPropagation();
		}}
		aria-label="User Modal"
	>
		<div class="flex flex-col gap-2">
			<div class="mb-2 aspect-square w-40 overflow-hidden rounded-lg object-cover">
				<img {src} alt="" class="h-full w-full object-cover object-center" />
			</div>
			<section class="flex flex-col">
				<h1 class="text-xl">
					{name}
				</h1>
				<span
					class={`text-xs ${verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
				>
					{verified ? 'Verified' : 'Awaiting Verification'}
				</span>
				{#if !verified && self.verified}
					<button
						onclick={handleVouch}
						class="bg-action z-50 mt-2 w-fit rounded-lg p-1 text-xs text-white"
					>
						Vouch for them
					</button>
				{/if}
			</section>
			<section class="flex flex-col">
				<h1 class="text-xl">User Info</h1>
				<span class="text-sm">Club Name: <span class="text-gray-400">{member}</span></span>
				<span class="text-sm"
					>Handicap Index: <span class="text-gray-400">{handicap_index}</span></span
				>
				<span class="text-sm">Gender: <span class="text-gray-400">{gender}</span></span>
				<span class="text-sm">Golf Id: <span class="text-gray-400">{golf_id}</span></span>
				<span class="text-sm">Postal Code: <span class="text-gray-400">{postal_code}</span></span>
			</section>
			<section class="flex flex-col">
				<h1 class="text-xl text-black">Bio</h1>
				<p class="text-sm">{bio && bio.length === 0 ? 'No bio yet.' : bio}</p>
			</section>
			<section class="flex flex-col">
				<h1 class="text-xl">User Images</h1>
			</section>
		</div>
		<div class="relative flex flex-col overflow-y-hidden">
			<h1 class="h-8 text-2xl">{name}</h1>
			<div class="flex flex-1 flex-col gap-5 overflow-y-auto pr-5">
				{#each messages as message}
					{#if message.sender_id == id}
						<div class="flex flex-row items-end gap-5">
							<div class="aspect-square w-10 overflow-hidden rounded-full">
								<img
									src={src ?? '/icons/DefaultProfile.png'}
									alt=""
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="w-fit rounded-lg bg-gray-200 p-2">
								<p class="m-0 w-fit max-w-[500px] p-0 text-wrap">{message.content}</p>
							</div>
						</div>
					{:else}
						<div class="flex flex-row items-end justify-end gap-5">
							<div class="w-fit rounded-lg bg-gray-200 p-2">
								<p class="m-0 w-fit max-w-[300px] p-0 text-wrap">{message.content}</p>
							</div>
							<div class="aspect-square w-10 overflow-hidden rounded-full">
								<img
									src={self.avatar_url ?? '/icons/DefaultProfile.png'}
									alt=""
									class="h-full w-full object-cover"
								/>
							</div>
						</div>
					{/if}
				{/each}
				<div bind:this={bottomRef}></div>
			</div>
			<form
				class="bottom-0 z-50 flex w-full items-center gap-4 border-t bg-white pt-4"
				onsubmit={sendMessage}
			>
				<input
					bind:value={newMessage}
					bind:this={inputRef}
					class="flex-1 rounded-full px-4 py-2 focus:ring-0 focus:outline-none"
					placeholder="Type your message..."
				/>
				<button
					type="submit"
					class="cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					{`Message ${name.split(' ')[0]}`}
				</button>
			</form>
		</div>
	</div>
</div>
