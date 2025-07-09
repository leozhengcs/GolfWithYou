<script lang='ts'>
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";

    type Message = {
        id: string;
        chat_id: string;
        sender_id: string;
        content: string;
        created_at: string;
    };
    
    let { id, gender, other_gender, verified, golf_id, name, age, handicap_index, member, src, closeModal, bio, images, self } = $props();

    let messages: Message[] = $state([]);
    let newMessage = $state('');
    let chatId = $state('');
    let channel;

    $inspect(messages);

    async function getOrCreateChat() {
        const response = await fetch('/api/chats', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ otherUserId: id })
        })

        const res = await response.json();

        if (response.ok) {
            console.log('Chat ID:', res.chatId);
            chatId = res.chatId
            // open chat UI...
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
    }

    async function sendMessage() {
        const res = await fetch('/api/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, content: newMessage })
        });

        const data = await res.json();
        if (!res.ok) {
            console.error('Send error:', data.error);
        }
    }

    onMount(async () => {
        try {
            await getOrCreateChat();
            await loadMessages();

            const channelName = 'private_chat_' + chatId;
            const alreadyExists = supabase.getChannels().some(
                (ch) => ch.topic === `realtime:${channelName}`
            );

            if (!alreadyExists) {
                channel = supabase.channel(channelName)
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
    aria-label='Close Modal' 
    onclick={closeModal} 
    onkeydown={(e) => e.key === 'Esc' ? closeModal() : null}
    transition:fade={{ duration:300 }} 
    class='absolute w-full h-full top-0 left-0 bg-gray-500/50 flex justify-center items-center z-40'
>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class='bg-white rounded-lg p-6 w-[80%] h-[80%] grid grid-cols-2' onclick={(e) => { e.stopPropagation() }} aria-label='User Modal' >
        <div class='flex flex-col gap-2'>
            <div class='w-40 aspect-square object-cover rounded-lg overflow-hidden mb-2'>
                <img {src} alt="" class='w-full h-full object-cover object-center'>
            </div>
            <section class='flex flex-col'>
                <h1 class='text-xl'>{name} 
                    <span class={`text-sm ${verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}>
                        {verified ? 'Verified' : 'Not Verified'}
                    </span>
                </h1>
                <span class='text-gray-400 text-sm'>{age} Years Old</span>
            </section>
            <section class="flex flex-col">
                <h1 class="text-xl">User Info</h1>
                <span class='text-sm'>Club Name: <span class='text-gray-400'>{member}</span></span>
                <span class='text-sm'>Handicap Index: <span class='text-gray-400'>{handicap_index}</span></span>
                <span class='text-sm'>Gender: <span class='text-gray-400'>{other_gender == '' ? gender : other_gender}</span></span>
                <span class='text-sm'>Golf Id: <span class='text-gray-400'>{golf_id}</span></span>
            </section>
            <section class="flex flex-col">
                <h1 class="text-black text-xl">Bio</h1>
                <p class="text-sm">{bio ?? "No bio yet."}</p>
            </section>
            <section class='flex flex-col'>
                <h1 class='text-xl'>User Images</h1>
            </section>
        </div>
        <div class='flex flex-col gap-5 relative overflow-y-auto'>
            <h1 class='text-2xl mb-12'>User</h1>
            <div class='flex flex-row items-end gap-5'>
                <div class='w-10 rounded-full overflow-hidden aspect-square'>
                    <img src="/images/example1.jpg" alt="" class='object-cover w-full h-full'>
                </div>
                <!-- Message Receive -->
                 {#each messages as message}
                    {console.log(message)}
                 {/each}
                <div class='bg-gray-200 w-fit rounded-lg p-2'>
                    <p class='max-w-[500px] text-wrap w-fit p-0 m-0'></p>
                </div>
            </div>
            <div class="flex flex-row items-end gap-5 justify-end">
                <div class="bg-gray-200 w-fit rounded-lg p-2">
                    <p class='max-w-[300px] text-wrap w-fit p-0 m-0'>Nice to meet you [user], I saw you were a member at [insert golf club] which was somewhere I've always wanted to go. Is it possible for you to host me in the upcoming weekend?</p>
                </div>
                <div class="w-10 rounded-full overflow-hidden aspect-square">
                    <img src="/images/example3.jpg" alt="">
                </div>
            </div>
            <div class="mt-10 flex gap-4 w-full items-center border-t pt-4 absolute bottom-0 z-50">
                <input
                    bind:value={newMessage}
                    onkeydown={(e) => { if (e.key === 'Enter') sendMessage() }}
                    class="flex-1 border rounded-full px-4 py-2 outline-none"
                    placeholder="Type your message..."
                />
                <button onclick={sendMessage} class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
    </div>
</div>