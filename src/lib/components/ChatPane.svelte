<script lang="ts">
	import { draw, fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import Back from './Back.svelte';
	import { onMount, tick } from 'svelte';
	import { openedModal } from '$lib/stores/globalStates.svelte';
	import { toast } from 'svelte-sonner';
	import type { Message } from '$lib/types/Chat';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import LoaderChat from './loaders/LoaderChat.svelte';
	import { sendMail } from '$lib/mailbox';
	import type { PublicUserProfile } from '$lib/types/Database';

	// svelte-ignore non_reactive_update
	let inputRef: HTMLInputElement; // For keeping the text box focused
	// svelte-ignore non_reactive_update
	let taRef: HTMLTextAreaElement;
	// svelte-ignore non_reactive_update
	let bottomRef: HTMLElement; // For scrolling the message chat down after sending a message
	let form: HTMLFormElement;
	let {
		openProfile,
		src,
		supabase,
		id,
		self,
		onlineUsers,
		verified,
		name,
		handicap_index,
		member
	} = $props();
	let messages: Message[] = $state([]);
	let newMessage = $state('');
	let chatId = $state('');
	let userChannel: RealtimeChannel;
	let user1: string;
	let user2: string;
	let showIcon = $state(false);

	let isMultiline = $state(false);
	let baseline = $state(40);
	let h = $state(40);
	const MAX = 200;

	function autoResize() {
		if (!taRef) return;

		if (newMessage.trim().length === 0) {
			if (!baseline) measureBaseline();
			taRef.style.overflowY = 'hidden';
			taRef.style.height = `${baseline || 0}px`;
			isMultiline = false;
			h = baseline;
			return;
		}

		// 1) Read computed metrics (set a concrete line-height in CSS for best results)
		const cs = getComputedStyle(taRef);
		const lh = parseFloat(cs.lineHeight);
		const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
		const borderY = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);

		// 2) Stabilize measurement
		taRef.style.overflowY = 'hidden';
		taRef.style.height = '0px'; // collapse so scrollHeight reflects content only

		// 3) Measure raw height incl. padding (like scrollHeight always does)
		const raw = taRef.scrollHeight; // includes padding, excludes borders

		// 4) Convert to an integer number of lines, then snap height to that grid
		const contentOnly = Math.max(0, raw - padY); // remove padding
		const lines = Math.max(1, Math.round(contentOnly / lh)); // snap to nearest line
		const target = Math.min(Math.ceil(lines * lh + padY + borderY), MAX);

		// 5) Apply once (no transitions on height!)
		taRef.style.height = `${target}px`;
		taRef.style.overflowY = target >= MAX ? 'auto' : 'hidden';
		h = target;
		isMultiline = lines > 1;
	}

	function measureBaseline() {
		const cs = getComputedStyle(taRef);
		const lh = parseFloat(cs.lineHeight) || 0;
		const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
		const borderY = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
		baseline = Math.ceil(lh + padY + borderY);
	}

	let loading = $state(true);

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
			user1 = res.user1;
			user2 = res.user2;
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
		loading = false;
		if (bottomRef) {
			bottomRef.scrollIntoView({ behavior: 'smooth' });
		}

		await updateLastRead();
	}

	async function loadLatestMessage() {
		const res = await fetch(`/api/fetch_latest_message?chatId=${chatId}`);
		const data = await res.json();
		if (res.status === 401) {
			console.error('Unauthorized error, please contact support.');
		}
		return data;
	}

	async function sendMessage(event: SubmitEvent) {
		event.preventDefault();

		const m = newMessage.trim();
		if (m === '') return;

		newMessage = '';
		autoResize();

		// Save message into DB
		const res = await fetch('/api/message', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat_id: chatId, content: m })
		});
		const data = await res.json();

		if (!res.ok) {
			console.error('Send error:', data.error);
		} else {
			const { error } = await supabase
				.from('private_chats')
				.update({ lastMessage: data.id })
				.eq('id', chatId);

			if (error) {
				console.log('Update chat error: ', error);
				toast.error('Error sending messsage, please try again');
				return;
			}
		}

		// Send message into the live channel
		const ack = await userChannel.send({
			type: 'broadcast',
			event: 'chat',
			payload: {
				sender_id: self.id,
				content: m,
				message_id: data.id,
				sent_at: new Date().toISOString()
			}
		});

		const to = id;
		const subject = `[TeesAway] New message from: ${self.full_name}`;
		const text = `You have a new message from ${self.full_name}:\n\n"${m}"`;

		// Only send email if user is not online
		if (!$onlineUsers.includes(id)) {
			await fetch('/api/send_email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ to, subject, text })
			});
		}

		await sendMail(id, 'message', text, self.avatar_url, self.full_name, supabase);
		await loadMessages();
		await tick();
		// inputRef.focus();
	}

	async function updateLastRead() {
		const lastRead = await loadLatestMessage();

		if (lastRead) {
			await tick();
			if (bottomRef) {
				bottomRef.scrollIntoView({ behavior: 'smooth' });
			}
		}

		// console.log('Self id: ', self.id, '\nUser 1 ID: ', user1, '\nUser 2 ID: ', user2);
		// Saves the latest message read
		if (self.id == user1) {
			const chatWrite = await supabase
				.from('private_chats')
				.update({ user1LastRead: lastRead.id })
				.eq('id', chatId);

			if (chatWrite.error) {
				console.log('Update chat error: ', chatWrite.error);
			}
		} else if (self.id == user2) {
			console.log('user2');
			const { error } = await supabase
				.from('private_chats')
				.update({ user2LastRead: lastRead.id })
				.eq('id', chatId);

			if (error) {
				console.log('Update chat error: ', error);
			}
		}
	}

	onMount(async () => {
		if (taRef) {
			measureBaseline();
			autoResize();
		}

		try {
			await getOrCreateChat();
			await tick();
			await loadMessages();

			const channelName = 'private_chat_' + chatId;
			$openedModal = chatId;

			const alreadyExists = supabase
				.getChannels()
				.some((ch: { topic: string }) => ch.topic === `realtime:${channelName}`);

			const { data: session } = await supabase.auth.getSession();

			if (!session) {
				toast.error('Error getting user session, please re-login and try again.');
				return;
			}

			await supabase.realtime.setAuth(session.access_token); // Needed for private chat to be private

			userChannel = supabase.channel(channelName, {
				config: {
					private: true,
					broadcast: { self: true }
				}
			});
			if (!alreadyExists) {
				userChannel.subscribe();
			}

			// adds update user1/2 last read event
			userChannel.on('broadcast', { event: 'chat' }, async (payload) => {
				messages = [...messages, payload.payload as Message];

				updateLastRead();

				if (bottomRef) {
					bottomRef.scrollIntoView({ behavior: 'smooth' });
				}
			});

			if (!userChannel) {
				console.log('EROR SETTING CHANNEL');
				return;
			}
		} catch (err: any) {
			console.error('onMount error:', err.message || err);
		}

		window.addEventListener('beforeunload', updateLastRead);
		window.addEventListener('beforeunload', () => {
			$openedModal = '';
		});
	});
</script>

<div
	class="flex h-full flex-col bg-[#DFDFDF] shadow-2xl md:shadow-none"
	in:fly={{ duration: 500, x: 500, easing: circOut }}
	out:fly={{ duration: 500, x: 500, easing: circOut }}
>
	<!-- Header -->
	<div
		class="sticky top-0 z-50 flex h-20 w-full flex-row items-center gap-5 bg-[#DFDFDF] px-5 py-4 shadow-lg md:hidden"
	>
		<Back onclick={openProfile} />
		<div class="aspect-square w-20 overflow-hidden rounded-full">
			<img {src} alt="" class="h-full w-full object-cover" />
		</div>
		<div class="flex w-full flex-col">
			<section class="flex w-full gap-5">
				<h1 class="text-lg truncate max-w-40">
					{name}
				</h1>
				<div class="float-right flex flex-shrink-0 items-center gap-1">
					<div class="w-3">
						<img src="/icons/Golf_Ball.png" alt="" />
					</div>
					<div class="text-left">
						<p class="text-sm font-medium text-gray-500">{handicap_index}</p>
					</div>
				</div>
			</section>
			<span class='text-xs text-gray-500 truncate'>
				{member}
			</span>
		</div>
	</div>
	<!-- Body -->
	<div class="relative flex min-h-0 flex-1 flex-col gap-5">
		{#if loading}
			<LoaderChat />
		{:else}
			<main class="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-5 pt-5">
				<aside class="mb-5 w-full text-center text-sm text-gray-500">
					This is the start of your with {name}!
				</aside>
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
			</main>
		{/if}
	</div>
	<form
		class="sticky bottom-0 z-50 flex w-full items-center gap-4 px-5 pt-1"
		onsubmit={sendMessage}
		bind:this={form}
	>
		{#if !loading}
			<div
				class="group relative mb-5 flex w-full flex-1 flex-wrap items-center focus:ring-0"
				style={`height: ${h + 16}px`}
				onfocusin={() => (showIcon = true)}
				onfocusout={() => (showIcon = false)}
			>
				<textarea
					bind:value={newMessage}
					bind:this={taRef}
					rows="1"
					oninput={autoResize}
					onchange={autoResize}
					onkeydown={(e: KeyboardEvent) => {
						if (e.key === 'Backspace') {
							autoResize();
						} else if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							form?.requestSubmit(); // submits the form (fires on:submit)
						}
					}}
					class={`absolute inset-x-0 bottom-2 resize-none overflow-hidden rounded-3xl border-black
           bg-transparent px-2 py-2 pr-14 leading-6 [scrollbar-gutter:stable] focus:ring-0 focus:outline-none ${isMultiline ? 'pb-10 md:pr-2' : ''}`}
					placeholder={`Message ${name}`}
				></textarea>
				<button
					type="submit"
					class={`absolute right-5 bottom-2.5 grid h-9 w-9 cursor-pointer place-items-center
					rounded-full bg-[#52796F] text-white opacity-0
					shadow transition-opacity duration-200
					group-focus-within:opacity-100 disabled:opacity-40`}
				>
					{#if showIcon}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<path d="M22 2L11 13" transition:draw={{ delay: 300, duration: 500 }} />
							<path d="M22 2L15 22l-4-9-9-4z" transition:draw={{ duration: 500 }} />
						</svg>
					{/if}
				</button>
				<div class="h-20"></div>
			</div>
		{/if}
	</form>
</div>
