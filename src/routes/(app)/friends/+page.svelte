<script lang='ts'>
    import type { PublicUserProfile } from "$lib/types/Database";
    import { tick } from "svelte";
    import type { Message } from "$lib/types/Chat";
    import { supabase } from "$lib/supabaseClient";
    import { toast } from "svelte-sonner";

    let { data } = $props();
    let { user, friends, requests } = $derived(data);

    let chat = $state(false);
    let message = $state('');
    let chatId = $state('');
    let messages: Message[] = $state([]);
    let selectedUser = $state<PublicUserProfile | null>(null);
    let channel;
    let inputRef: HTMLInputElement | null = $state(null);
    let bottomRef: HTMLElement | null = $state(null);

    $inspect(friends);

    async function sendMessage() {
        const m = message.trim();
        if (!m) return;

        message = '';

        const res = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chat_id: chatId, content: m })
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.error || 'Failed to send');
        } else {
            await loadMessages();
            await tick();
            inputRef?.focus();
        }
    }

    const openChat = async (sender: PublicUserProfile) => {
        chat = true;
        selectedUser = sender;

        const res = await fetch('/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otherUserId: sender.id })
        });

        const chatRes = await res.json();

        if (!res.ok) {
            toast.error(chatRes.error);
            return;
        }

        chatId = chatRes.chatId;

        await loadMessages();

        const channelName = 'private_chat_' + chatId;
        const alreadyExists = supabase.getChannels().some(
            (ch) => ch.topic === `realtime:${channelName}`
        );

        if (!alreadyExists) {
            channel = supabase
                .channel(channelName)
                .on(
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
                )
                .subscribe();
        }
    }

    async function loadMessages() {
        const res = await fetch(`/api/message?chatId=${chatId}`);
        const data = await res.json();

        if (res.ok) {
            messages = data;
            await tick();
            bottomRef?.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Error loading messages:', data.error);
        }
    }

    async function acceptFriend(request_id: string) {
        const res = await fetch(`api/accept_friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                request_id,
                receiver_id: selectedUser?.id,
                sender: user
            })
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.error);
            return;
        }

        toast.success(data.data);
    }

</script>

<div class='grid grid-cols-[250px_auto] flex-1 gap-16'>
    <section class="flex flex-col">
        <h1 class='text-2xl mb-2'>Friends</h1>
        <!-- <div class='w-full flex flex-row items-center rounded-lg px-2 gap-2 text-gray-700 bg-gray-300 mb-5'>
            <span>Search</span>
            <div class='w-5'>
                <img src="/icons/Search.png" alt="Search">
            </div>
        </div> -->
        {#each friends || [] as friend}
            <button onclick={() => openChat(friend)} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                    <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                        <img src={friend.avatar_url} alt="" class='w-full h-full object-cover'>
                    </div>
                    <div class='flex items-center col-start-2'>
                        <span>{friend.full_name}</span>
                    </div>
                </button>
        {/each}
        <div class='flex flex-col'>
            {#each requests || [] as request} 
                <button onclick={() => openChat(request.sender)} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                    <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                        <img src={request.sender.avatar_url} alt="" class='w-full h-full object-cover'>
                    </div>
                    <div class='flex items-center col-start-2'>
                        <span>{request.sender.full_name}</span>
                    </div>
                </button>
            {/each}
            <!-- <button onclick={openChat} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                    <img src="/images/example1.jpg" alt="" class='w-full h-full object-cover'>
                </div>
                <div class='flex items-center col-start-2'>
                    <span>Justin Han</span>
                </div>
            </button>
            <button onclick={openChat} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                    <img src="/images/example2.jpg" alt="" class='w-full h-full object-cover'>
                </div>
                <div class='flex items-center col-start-2'>
                    <span>Alex Hughs</span>
                </div>
            </button> -->
        </div>
    </section>
    {#if chat}
        <div class="overflow-y-auto w-full flex flex-1 flex-col gap-5 pr-5 relative">
            {#each messages as message}
                {#if message.sender_id === selectedUser?.id}
                    <!-- Sender's messages -->
                    <div class="flex flex-row items-end gap-5">
                        <div class="w-10 rounded-full overflow-hidden aspect-square">
                            <img src={selectedUser?.avatar_url} alt="" class="object-cover w-full h-full" />
                        </div>
                        <div class="bg-gray-200 w-fit rounded-lg p-2 max-w-[50%] break-words">
                            <p class="whitespace-pre-wrap p-0 m-0">{message.content}</p>
                        </div>
                    </div>
                {:else}
                    <!-- Current user's messages -->
                    <div class="flex flex-row items-end gap-5 justify-end">
                        <div class="bg-gray-200 max-w-[50%] rounded-lg p-2 break-words">
                            <p class="whitespace-pre-wrap p-0 m-0">{message.content}</p>
                        </div>
                        <div class="w-10 rounded-full overflow-hidden aspect-square">
                            <img src="/images/example3.jpg" alt="">
                        </div>
                    </div>
                {/if}
            {/each}
            <div bind:this={bottomRef}></div>
            {#if requests?.some(request => request.sender.id === selectedUser?.id)}
            <!-- Incoming Friend Request, Will not allow messaging until accept -->
                <div class='gap-4 w-full items-center border-t pt-4 bottom-0 z-50 flex absolute justify-end'>
                    <button class='bg-green-400 text-white rounded-lg p-2 hover:cursor-pointer' onclick={() => {acceptFriend(requests.find(request => request.sender.id === selectedUser?.id)?.request_id as string)}}>Accept</button>
                </div>
            {:else}
                <form class="gap-4 w-full items-center border-t pt-4 bottom-0 z-50 flex absolute" onsubmit={sendMessage}>
                    <input
                        bind:value={message}
                        bind:this={inputRef}
                        class="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-0"
                        placeholder="Type your message..."
                    />
                    <button 
                        type='submit' 
                        class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            {/if}
        </div>
    {/if}
</div>